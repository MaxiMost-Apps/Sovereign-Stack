import { createClient } from '@supabase/supabase-js';
import { type GlucoseReading } from './GlucoseSniffer';
import { type MetricPayload } from './MetricTransformer';

// These should match the keys in your .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const SupabaseService = {
  /**
   * Pushes a unified metric to the Sovereign Stack (health.metrics).
   */
  async pushMetric(metric: Omit<MetricPayload, 'metadata'> & { metadata: any }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    // @ts-ignore
    const { error } = await supabase
      .schema('health')
      .from('metrics')
      .upsert({
        user_id: user.id,
        metric_type: metric.metric_type,
        value: metric.value,
        unit: metric.unit,
        recorded_at: metric.recorded_at,
        metadata: metric.metadata
      }, { onConflict: 'user_id,metric_type,recorded_at' });

    if (error) throw error;
    return true;
  },

  /**
   * Legacy wrapper for backward compatibility if needed,
   * but broadly we should use SyncEngine -> pushMetric now.
   */
  async pushGlucose(reading: GlucoseReading) {
     // Forward to generic metric push
     return this.pushMetric({
         metric_type: 'glucose',
         value: reading.sgv,
         unit: 'mg/dL',
         recorded_at: new Date(reading.timestamp).toISOString(),
         metadata: { direction: reading.direction }
     });
  }
};
