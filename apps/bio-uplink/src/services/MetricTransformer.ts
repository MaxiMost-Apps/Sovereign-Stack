import { type GlucoseReading } from "./GlucoseSniffer";

export interface MetricPayload {
    metric_type: string;
    value: number;
    unit: string;
    recorded_at: string;
    metadata: any; // JSON object
}

export type RawData = {
  source_type: 'SNIFFER' | 'FILE' | 'MANUAL' | 'HEALTH_CONNECT';
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
     * The "Vital 15" Normalizer
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
            case 'rmssd':
            return {
                metric_type: 'hrv',
                value: Number(raw.value),
                unit: 'ms',
                recorded_at,
                metadata: { source: raw.source_type, ...raw.metadata }
            };

            case 'weight_kg':
            return {
                metric_type: 'weight',
                value: Number(raw.value) * 2.20462,
                unit: 'lbs',
                recorded_at,
                metadata: { source: raw.source_type, original_unit: 'kg', ...raw.metadata }
            };
            case 'weight_lbs':
            case 'weight':
            return {
                metric_type: 'weight',
                value: Number(raw.value),
                unit: 'lbs',
                recorded_at,
                metadata: { source: raw.source_type, ...raw.metadata }
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
            case 'sleep_hours':
            return {
                metric_type: 'sleep_duration',
                value: Number(raw.value),
                unit: 'hours',
                recorded_at,
                metadata: { source: raw.source_type, ...raw.metadata }
            };

            case 'body_fat':
            case 'body_fat_percentage':
            return {
                metric_type: 'body_fat',
                value: Number(raw.value),
                unit: '%',
                recorded_at,
                metadata: { source: raw.source_type, ...raw.metadata }
            };

            case 'spo2':
            case 'oxygen_saturation':
            return {
                metric_type: 'oxygen_saturation',
                value: Number(raw.value),
                unit: '%',
                recorded_at,
                metadata: { source: raw.source_type, ...raw.metadata }
            };

            case 'heart_rate':
            case 'bpm':
            return {
                metric_type: 'heart_rate',
                value: Number(raw.value),
                unit: 'bpm',
                recorded_at,
                metadata: { source: raw.source_type, ...raw.metadata }
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
