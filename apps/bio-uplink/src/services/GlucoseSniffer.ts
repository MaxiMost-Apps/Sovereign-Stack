// apps/bio-uplink/src/services/GlucoseSniffer.ts

export interface GlucoseReading {
  sgv: number;      // Serum Glucose Value
  direction: string; // Arrow (DoubleUp, Flat, etc.)
  timestamp: number;
}

const LOCAL_LOOPHOLE_URL = 'http://127.0.0.1:17580/sgv.json';

export const GlucoseSniffer = {
  /**
   * Sniffs the local port for a broadcasted CGM reading.
   * This bypasses the need for Dexcom Cloud login.
   */
  async sniffLocalPort(): Promise<GlucoseReading | null> {
    try {
      // We use a short timeout because if it's not there, we don't want to hang
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(LOCAL_LOOPHOLE_URL, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });

      clearTimeout(id);

      if (!response.ok) return null;

      const data = await response.json();
      // Most local broadcasters return an array of recent readings
      if (Array.isArray(data) && data.length > 0) {
        return {
          sgv: data[0].sgv,
          direction: data[0].direction || 'Flat',
          timestamp: data[0].date || Date.now()
        };
      }
      return null;
    } catch (err) {
      console.log('Sniffer: Local port 17580 not broadcasting or unreachable.');
      return null;
    }
  }
};
