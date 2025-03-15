import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_URL;
const supabaseKey = import.meta.env.VITE_API;
export const supabase = createClient(supabaseUrl, supabaseKey)