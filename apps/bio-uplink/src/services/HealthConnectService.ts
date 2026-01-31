import { Capacitor } from '@capacitor/core';
import { HealthConnect } from 'capacitor-health-connect';
import { SyncEngine } from './SyncEngine';
import { MetricTransformer } from './MetricTransformer';

export const HealthConnectService = {

  async checkAvailability(): Promise<boolean> {
    if (Capacitor.getPlatform() !== 'android') return false;
    const result = await HealthConnect.checkAvailability();
    return result.availability === 'Available';
  },

  async requestPermissions() {
    if (Capacitor.getPlatform() !== 'android') return;

    // Note: 'read' permissions for the Vital 15
    await HealthConnect.requestHealthPermissions({
        read: ['Steps', 'SleepSession', 'HeartRate', 'OxygenSaturation', 'BodyFat', 'Weight'] as any,
        write: []
    });
  },

  async pollData(): Promise<number> {
      if (Capacitor.getPlatform() !== 'android') return 0;

      const now = new Date();
      const startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Last 24 hours
      let ingestedCount = 0;

      try {
          // 1. Steps
          const steps = await HealthConnect.readRecords({
              type: 'Steps',
              timeRangeFilter: { type: 'between', startTime, endTime: now }
          });

          for (const record of steps.records) {
              if ('count' in record) {
                  await this.ingest('steps', record.count, record.startTime);
                  ingestedCount++;
              }
          }

          // 2. Weight
          const weight = await HealthConnect.readRecords({
              type: 'Weight',
              timeRangeFilter: { type: 'between', startTime, endTime: now }
          });
          for (const record of weight.records) {
              if ('weight' in record) {
                  // Assuming value is in kilograms if unit is kilogram,
                  // but we should check or just pass value and MetricTransformer handles it?
                  // The plugin definition says Mass = { value, unit }.
                  // Let's assume standard unit or pass raw.
                  // For robustness, let's normalize to KG here if possible or tag unit.
                  // MetricTransformer expects 'weight_kg' or 'weight_lbs'.
                  // Let's assume the value is what it is, and metadata captures unit.
                  let val = record.weight.value;
                  let label = 'weight_kg';
                  if (record.weight.unit === 'pound') {
                      label = 'weight_lbs';
                  } else if (record.weight.unit === 'gram') {
                      val = val / 1000;
                  }

                  await this.ingest(label, val, record.time);
                  ingestedCount++;
              }
          }

          // 3. Body Fat
          const bodyFat = await HealthConnect.readRecords({
              type: 'BodyFat',
              timeRangeFilter: { type: 'between', startTime, endTime: now }
          });
          for (const record of bodyFat.records) {
              if ('percentage' in record) {
                   await this.ingest('body_fat', record.percentage.value, record.time);
                   ingestedCount++;
              }
          }

          // 4. Oxygen Saturation
          const spo2 = await HealthConnect.readRecords({
              type: 'OxygenSaturation',
              timeRangeFilter: { type: 'between', startTime, endTime: now }
          });
          for (const record of spo2.records) {
              if ('percentage' in record) {
                  await this.ingest('spo2', record.percentage.value, record.time);
                  ingestedCount++;
              }
          }

      } catch (e) {
          console.error("Health Connect Poll Error:", e);
      }
      return ingestedCount;
  },

  async ingest(label: string, value: number, timestamp: string | Date) {
      const metric = MetricTransformer.transformToMetric({
          source_type: 'HEALTH_CONNECT',
          label,
          value,
          timestamp: typeof timestamp === 'string' ? timestamp : timestamp.toISOString(),
          metadata: { provider: 'Android Health Connect' }
      });
      await SyncEngine.queueItem(metric);
  }
};
