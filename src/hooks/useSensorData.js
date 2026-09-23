import {
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  fetchReadings,
  subscribe,
  demoReading,
  isConfigured,
} from "../services/sensorService";

export default function useSensorData(settings) {

  const [rows, setRows] = useState([]);
  const [now, setNow] = useState(Date.now());

  // ========================================
  // Add new realtime reading
  // ========================================

  const add = useCallback((reading) => {

    console.log("📥 Dashboard received:", reading);

    setRows((previous) => {

      // Avoid duplicate rows
      const exists = previous.some(
        (item) => item.id === reading.id
      );

      if (exists) {
        return previous;
      }

      return [...previous, reading].slice(-500);
    });

  }, []);

  // ========================================
  // Supabase / Demo
  // ========================================

  useEffect(() => {

    console.log("==============================");
    console.log("SMART WATER BOTTLE");
    console.log("==============================");

    console.log(
      "Supabase configured:",
      isConfigured
    );

    console.log(
      "Device:",
      settings.deviceId
    );

    // --------------------------------------
    // DEMO MODE
    // --------------------------------------

    if (!isConfigured) {

      console.warn(
        "⚠️ Supabase NOT configured - DEMO MODE"
      );

      setRows(
        Array.from(
          { length: 30 },
          (_, i) => ({
            ...demoReading(settings.deviceId),
            created_at: new Date(
              Date.now() - (30 - i) * 5000
            ).toISOString(),
          })
        )
      );

      const timer = setInterval(() => {

        add(
          demoReading(settings.deviceId)
        );

      }, settings.refresh * 1000);

      return () => {
        clearInterval(timer);
      };
    }

    // --------------------------------------
    // REAL SUPABASE MODE
    // --------------------------------------

    console.log(
      "🌐 Connecting to Supabase..."
    );

    let cleanup;

    fetchReadings(settings.deviceId)
      .then((data) => {

        console.log(
          "✅ Initial database data:",
          data
        );

        setRows(data);

      })
      .catch((error) => {

        console.error(
          "❌ Database fetch failed:",
          error
        );

      });

    cleanup = subscribe(
      settings.deviceId,
      add
    );

    return () => {

      if (cleanup) {
        cleanup();
      }

    };

  }, [
    settings.deviceId,
    settings.refresh,
    add,
  ]);

  // ========================================
  // Current time
  // ========================================

  useEffect(() => {

    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  // ========================================
  // Latest reading
  // ========================================

  const latest =
    rows.length > 0
      ? rows[rows.length - 1]
      : null;

  // ========================================
  // Online / Offline
  // ========================================

  const online =
    latest &&
    (now -
      new Date(latest.created_at).getTime()) /
      1000 <=
      10;

  return {
    rows,
    latest,
    online,
    now,
    demo: !isConfigured,
  };
}