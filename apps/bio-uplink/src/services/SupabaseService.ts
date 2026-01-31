import { createClient } from '@supabase/supabase-js';
import { type GlucoseReading } from './GlucoseSniffer';

// These should match the keys in your .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const SupabaseService = {
  /**
   * Pushes a sniffed glucose reading to the Sovereign Stack.
   */
  async pushGlucose(reading: GlucoseReading) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    // @ts-ignore
    const { error } = await supabase
      .schema('health')
      .from('glucose_readings')
      .insert({
        user_id: user.id,
        sgv: reading.sgv,
        direction: reading.direction,
        recorded_at: new Date(reading.timestamp).toISOString()
      });

    if (error) {
      if (error.code === '23505') {
        console.log('Supabase: Reading already exists (Duplicate).');
      } else {
        throw error;
      }
    }
    return true;
  }
};
