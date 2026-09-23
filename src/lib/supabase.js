import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check whether Supabase environment variables are available
export const isConfigured = Boolean(url && key);

// Create Supabase client only when configuration exists
export const supabase = isConfigured
  ? createClient(url, key)
  : null;