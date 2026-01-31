import { type GlucoseReading } from "./GlucoseSniffer";

export interface MetricPayload {
    metric_type: string;
    value: number;
    unit: string;
    recorded_at: string;
    metadata: any; // JSON object
}

export type RawData = {
  source_type: 'SNIFFER' | 'FILE' | 'MANUAL';
  label: string; // e.g., 'sgv', 'hrv_ms', 'weight_kg'
  value: any;
  timestamp: string | number;
  metadata?: any;
};

export const MetricTransformer = {
    /**
     * Legacy wrapper for GlucoseSniffer to match generic transform
     */
    fromGlucose(reading: GlucoseReading): MetricPayload {
        return this.transformToMetric({
            source_type: 'SNIFFER',
            label: 'sgv',
            value: reading.sgv,
            timestamp: reading.timestamp
        });
    },

    /**
     * The "Big 5" Normalizer
     */
    transformToMetric(raw: RawData): MetricPayload {
        const recorded_at = new Date(raw.timestamp).toISOString();

        switch (raw.label.toLowerCase()) {
            case 'sgv': // Glucose from Sniffer
            case 'blood_glucose':
            return {
                metric_type: 'glucose',
                value: Number(raw.value),
                unit: 'mg/dL',
                recorded_at,
                metadata: { source: raw.source_type, ...raw.metadata }
            };

            case 'hrv':
            case 'hrv_ms':
            return {
                metric_type: 'hrv',
                value: Number(raw.value),
                unit: 'ms',
                recorded_at,
                metadata: { source: raw.source_type, ...raw.metadata }
            };

            case 'weight_kg': // Standardize to LBS for the HUD
            return {
                metric_type: 'weight',
                value: Number(raw.value) * 2.20462,
                unit: 'lbs',
                recorded_at,
                metadata: { source: raw.source_type, original_unit: 'kg', ...raw.metadata }
            };

            case 'step_count':
            case 'steps':
            return {
                metric_type: 'steps',
                value: Math.floor(Number(raw.value)),
                unit: 'count',
                recorded_at,
                metadata: { source: raw.source_type, ...raw.metadata }
            };

            case 'sleep_minutes':
            return {
                metric_type: 'sleep_duration',
                value: Number((Number(raw.value) / 60).toFixed(2)), // Convert to hours
                unit: 'hours',
                recorded_at,
                metadata: { source: raw.source_type, original_unit: 'minutes', ...raw.metadata }
            };

            default:
            // Generic fallback for unknown metrics
            return {
                metric_type: raw.label,
                value: Number(raw.value),
                unit: 'unknown',
                recorded_at,
                metadata: { source: raw.source_type, unmapped: true, ...raw.metadata }
            };
        }
    }
};
