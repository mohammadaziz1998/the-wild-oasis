import { createClient } from '@supabase/supabase-js';

/////////////////
export const supabaseUrl = 'https://rlyfhswzafdrqfrvykkz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJseWZoc3d6YWZkcnFmcnZ5a2t6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2NjgxOTYsImV4cCI6MjAyNjI0NDE5Nn0.AHdkX69ZrCuJFvRFgV7rDVf6AQHCYKliBDP9QhrK0Y0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
