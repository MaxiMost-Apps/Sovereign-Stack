import { type GlucoseReading } from "./GlucoseSniffer";

export interface MetricPayload {
    metric_type: string;
    value: number;
    unit: string;
    recorded_at: string;
    metadata: string; // Serialized JSON
}

export const MetricTransformer = {
    fromGlucose(reading: GlucoseReading): MetricPayload {
        return {
            metric_type: 'glucose',
            value: reading.sgv,
            unit: 'mg/dL',
            recorded_at: new Date(reading.timestamp).toISOString(),
            metadata: JSON.stringify({ direction: reading.direction, source: 'sniffer_17580' })
        };
    },

    fromFile(fileData: any): MetricPayload[] {
        // Generic parser for various file formats (stealth mode)
        const metrics: MetricPayload[] = [];

        // Example: JSON Array of generic metrics
        if (Array.isArray(fileData)) {
            fileData.forEach(item => {
                if (item.type && item.value && item.timestamp) {
                    metrics.push({
                        metric_type: item.type,
                        value: Number(item.value),
                        unit: item.unit || 'unknown',
                        recorded_at: new Date(item.timestamp).toISOString(),
                        metadata: JSON.stringify(item.metadata || { source: 'file_ingest' })
                    });
                }
            });
        }

        return metrics;
    }
};
