import { createClient, SupabaseClient } from '@supabase/supabase-js';

// This variable will hold our single instance of the client.
let supabaseInstance: SupabaseClient | null = null;

/**
 * A function that returns a singleton instance of the Supabase client.
 * On first call, it creates the client. On subsequent calls, it returns
 * the existing instance. This guarantees only one client ever exists.
 */
export const getSupabaseClient = (): SupabaseClient => {
  // If the instance already exists, return it immediately.
  if (supabaseInstance) {
    return supabaseInstance;
  }

  // Get the environment variables, with error checking.
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key are required. Please check your .env file.");
  }

  // Create the client, store it in our private variable, and return it.
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
};
