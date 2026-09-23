import { supabase, isConfigured } from "../lib/supabase";
import { levelFromPct } from "../utils/status";

const TABLE = "sensor_readings";

// ============================================
// FETCH EXISTING READINGS
// ============================================

export const fetchReadings = async (deviceId = "BOTTLE_001") => {
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("device_id", deviceId)
    .order("created_at", { ascending: true })
    .limit(200);

  if (error) {
    console.error("❌ Supabase fetch error:", error);
    throw error;
  }

  console.log("✅ Supabase readings loaded:", data);

  return data || [];
};

// ============================================
// REALTIME SUBSCRIPTION
// ============================================

export const subscribe = (deviceId, callback) => {
  if (!supabase) {
    console.error("❌ Supabase client is not available");
    return () => {};
  }

  console.log("🔌 Starting Supabase realtime...");
  console.log("Device:", deviceId);

  const channel = supabase
    .channel(`sensor-readings-${deviceId}-${Date.now()}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: TABLE,
        filter: `device_id=eq.${deviceId}`,
      },
      (payload) => {
        console.log("🔥 NEW SENSOR DATA:", payload.new);

        callback(payload.new);
      }
    )
    .subscribe((status, error) => {
      console.log("📡 Supabase realtime status:", status);

      if (error) {
        console.error("❌ Supabase realtime error:", error);
      }

      if (status === "SUBSCRIBED") {
        console.log("✅ SUPABASE REALTIME CONNECTED!");
      }

      if (status === "CHANNEL_ERROR") {
        console.error("❌ SUPABASE CHANNEL ERROR");
      }

      if (status === "TIMED_OUT") {
        console.error("❌ SUPABASE REALTIME TIMEOUT");
      }
    });

  return () => {
    console.log("🔌 Removing realtime channel...");
    supabase.removeChannel(channel);
  };
};

// ============================================
// INSERT SENSOR DATA
// ============================================

export const insertReading = async (reading) => {
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  console.log("📤 Sending sensor data:", reading);

  const { data, error } = await supabase
    .from(TABLE)
    .insert([reading])
    .select()
    .single();

  if (error) {
    console.error("❌ Insert error:", error);
    throw error;
  }

  console.log("✅ Data inserted:", data);

  return data;
};

// ============================================
// DEMO DATA
// ============================================

let lvl = 80;

export const demoReading = (device = "BOTTLE_001") => {

  lvl = Math.max(
    0,
    lvl + (Math.random() < 0.8 ? -Math.random() * 2 : 25)
  );

  if (lvl < 2 && Math.random() < 0.3) {
    lvl = 90;
  }

  lvl = Math.min(100, lvl);

  const turbidity =
    Math.round(
      2600 -
      Math.random() * 900 -
      (lvl < 30 ? 600 : 0)
    );

  return {
    id: crypto.randomUUID(),
    device_id: device,
    water_level_status: levelFromPct(lvl),
    water_level_percentage: Math.round(lvl),
    turbidity_value: turbidity,
    water_quality_status:
      turbidity >= 2300
        ? "CLEAR"
        : turbidity >= 1800
        ? "SLIGHTLY TURBID"
        : "TURBID",
    esp32_status: "CONNECTED",
    created_at: new Date().toISOString(),
  };
};

export { isConfigured };