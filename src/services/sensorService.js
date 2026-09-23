import { supabase, isConfigured } from '../lib/supabase';
import { levelFromPct } from '../utils/status';

const TABLE_NAME = 'sensor_readings';

// Fetch existing readings
export const fetchReadings = async (n = 200) => {
  if (!isConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(n);

  if (error) {
    console.error('Supabase fetch error:', error);
    throw error;
  }

  return data ? data.reverse() : [];
};

// Subscribe to new Supabase readings
export const subscribe = (callback) => {
  if (!isConfigured || !supabase) {
    return () => {};
  }

  const channel = supabase
    .channel('sensor-readings-realtime')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: TABLE_NAME,
      },
      (payload) => {
        console.log('New Supabase reading:', payload.new);
        callback(payload.new);
      }
    )
    .subscribe((status) => {
      console.log('Supabase realtime status:', status);
    });

  return () => {
    supabase.removeChannel(channel);
  };
};

// Insert a reading
export const insertReading = async (reading) => {
  if (!isConfigured || !supabase) {
    console.warn('Supabase is not configured.');
    return null;
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(reading)
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    throw error;
  }

  return data;
};

// ----------------------------------------------------
// Demo data
// Used only when Supabase configuration is missing
// ----------------------------------------------------

let demoLevel = 80;

export const demoReading = (deviceId = 'BOTTLE_001') => {
  demoLevel = Math.max(
    0,
    demoLevel +
      (Math.random() < 0.8
        ? -Math.random() * 2
        : 25)
  );

  if (demoLevel < 2 && Math.random() < 0.3) {
    demoLevel = 90;
  }

  demoLevel = Math.min(100, demoLevel);

  const turbidity = Math.round(
    2600 -
      Math.random() * 900 -
      (demoLevel < 30 ? 600 : 0)
  );

  let waterQuality;

  if (turbidity >= 2300) {
    waterQuality = 'CLEAR';
  } else if (turbidity >= 1800) {
    waterQuality = 'SLIGHTLY TURBID';
  } else {
    waterQuality = 'TURBID';
  }

  return {
    id: crypto.randomUUID(),
    device_id: deviceId,
    water_level_status: levelFromPct(demoLevel),
    water_level_percentage: Math.round(demoLevel),
    turbidity_value: turbidity,
    water_quality_status: waterQuality,
    esp32_status: 'CONNECTED',
    created_at: new Date().toISOString(),
  };
};

// Export configuration status
export { isConfigured };