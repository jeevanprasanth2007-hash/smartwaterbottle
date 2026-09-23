create table if not exists sensor_readings(
 id uuid primary key default gen_random_uuid(), device_id text, water_level_status text,
 water_level_percentage numeric, turbidity_value numeric, water_quality_status text,
 esp32_status text default 'CONNECTED', created_at timestamptz default now());
alter publication supabase_realtime add table sensor_readings;
alter table sensor_readings enable row level security;
-- Dashboard (anon) can read; ESP32 inserts with anon key too (or use an Edge Function for stricter control).
create policy "read" on sensor_readings for select using (true);
create policy "insert" on sensor_readings for insert with check (true);
