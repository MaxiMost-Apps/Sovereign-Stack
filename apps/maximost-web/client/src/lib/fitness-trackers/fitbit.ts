import apiClient from "@/lib/apiClient";

// Types for Fitbit data
export interface FitbitAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  user_id: string;
}

export interface FitbitActivityData {
  date: string;
  steps: number;
  distance: number;
  activeMinutes: number;
  calories: number;
}

export interface FitbitSleepData {
  date: string;
  duration: number; // in milliseconds
  efficiency: number; // 0-100
  startTime: string;
  endTime: string;
  sleepStages?: {
    deep: number;
    light: number;
    rem: number;
    wake: number;
  };
}

export interface FitbitHeartRateData {
  date: string;
  restingHeartRate: number;
  heartRateZones: {
    name: string;
    min: number;
    max: number;
    minutes: number;
  }[];
}

export class FitbitService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private expiresAt: number = 0;

  constructor() {
    this.clientId = import.meta.env.VITE_FITBIT_CLIENT_ID || '';
    this.clientSecret = import.meta.env.VITE_FITBIT_CLIENT_SECRET || '';
    this.redirectUri = `${window.location.origin}/fitness-tracker/fitbit/callback`;

    this.loadTokens();
  }

  public isConfigured(): boolean {
    return Boolean(this.clientId && this.clientSecret);
  }

  public isAuthenticated(): boolean {
    return Boolean(this.accessToken && Date.now() < this.expiresAt);
  }

  public getAuthUrl(): string {
    const scope = 'activity heartrate sleep profile';
    const state = this.generateRandomState();

    localStorage.setItem('fitbit_auth_state', state);

    return `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`;
  }

  public async handleAuthCallback(code: string, state: string): Promise<boolean> {
    const savedState = localStorage.getItem('fitbit_auth_state');
    if (state !== savedState) {
      throw new Error('OAuth state mismatch. Authentication failed.');
    }

    try {
      const tokenResponse = await this.exchangeCodeForToken(code);

      this.accessToken = tokenResponse.access_token;
      this.refreshToken = tokenResponse.refresh_token;
      this.expiresAt = Date.now() + (tokenResponse.expires_in * 1000);

      this.saveTokens();

      return true;
    } catch (error) {
      console.error('Failed to authenticate with Fitbit:', error);
      return false;
    }
  }

  public async getActivityData(startDate: string, endDate: string): Promise<FitbitActivityData[]> {
    await this.ensureValidToken();

    const url = `https://api.fitbit.com/1/user/-/activities/steps/date/${startDate}/${endDate}.json`;

    try {
      const response = await fetch(url, { headers: { 'Authorization': `Bearer ${this.accessToken}` } });
      if (!response.ok) throw new Error(`Fitbit API error: ${response.status} ${response.statusText}`);
      const stepsData = await response.json();

      const distanceData = await this.fetchActivityMetric('distance', startDate, endDate);
      const caloriesData = await this.fetchActivityMetric('calories', startDate, endDate);
      const activeMinutesData = await this.fetchActivityMetric('minutesVeryActive', startDate, endDate);

      return stepsData['activities-steps'].map((day: any, index: number) => ({
        date: day.dateTime,
        steps: parseInt(day.value),
        distance: parseFloat(distanceData['activities-distance'][index].value),
        calories: parseInt(caloriesData['activities-calories'][index].value),
        activeMinutes: parseInt(activeMinutesData['activities-minutesVeryActive'][index].value)
      }));
    } catch (error) {
      console.error('Failed to fetch Fitbit activity data:', error);
      throw error;
    }
  }

  public async getSleepData(startDate: string, endDate: string): Promise<FitbitSleepData[]> {
    await this.ensureValidToken();
    const url = `https://api.fitbit.com/1.2/user/-/sleep/date/${startDate}/${endDate}.json`;
    try {
      const response = await fetch(url, { headers: { 'Authorization': `Bearer ${this.accessToken}` } });
      if (!response.ok) throw new Error(`Fitbit API error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      return data.sleep.map((sleep: any) => ({
        date: sleep.dateOfSleep,
        duration: sleep.duration,
        efficiency: sleep.efficiency,
        startTime: sleep.startTime,
        endTime: sleep.endTime,
        sleepStages: sleep.levels?.summary?.stages ? {
          deep: sleep.levels.summary.stages.deep,
          light: sleep.levels.summary.stages.light,
          rem: sleep.levels.summary.stages.rem,
          wake: sleep.levels.summary.stages.wake
        } : undefined
      }));
    } catch (error) {
      console.error('Failed to fetch Fitbit sleep data:', error);
      throw error;
    }
  }

  public async getHeartRateData(startDate: string, endDate: string): Promise<FitbitHeartRateData[]> {
    await this.ensureValidToken();
    const url = `https://api.fitbit.com/1/user/-/activities/heart/date/${startDate}/${endDate}.json`;
    try {
      const response = await fetch(url, { headers: { 'Authorization': `Bearer ${this.accessToken}` } });
      if (!response.ok) throw new Error(`Fitbit API error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      return data['activities-heart'].map((day: any) => ({
        date: day.dateTime,
        restingHeartRate: day.value?.restingHeartRate || 0,
        heartRateZones: day.value?.heartRateZones || []
      }));
    } catch (error) {
      console.error('Failed to fetch Fitbit heart rate data:', error);
      throw error;
    }
  }

  public logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.expiresAt = 0;
    localStorage.removeItem('fitbit_access_token');
    localStorage.removeItem('fitbit_refresh_token');
    localStorage.removeItem('fitbit_expires_at');
    localStorage.removeItem('fitbit_auth_state');
  }

  private async exchangeCodeForToken(code: string): Promise<FitbitAuthResponse> {
    return await apiClient('/api/fitness-trackers/fitbit/token', {
      method: 'POST',
      body: {
        code,
        clientId: this.clientId,
        redirectUri: this.redirectUri
      }
    });
  }

  private async ensureValidToken(): Promise<void> {
    if (!this.isAuthenticated() && this.refreshToken) {
      try {
        const data = await apiClient('/api/fitness-trackers/fitbit/refresh', {
          method: 'POST',
          body: {
            refreshToken: this.refreshToken,
            clientId: this.clientId
          }
        });
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.expiresAt = Date.now() + (data.expires_in * 1000);
        this.saveTokens();
      } catch (error) {
        console.error('Failed to refresh Fitbit token:', error);
        this.logout();
        throw new Error('Authentication expired. Please log in again.');
      }
    } else if (!this.isAuthenticated()) {
      throw new Error('Not authenticated with Fitbit. Please log in.');
    }
  }

  private async fetchActivityMetric(metric: string, startDate: string, endDate: string): Promise<any> {
    const url = `https://api.fitbit.com/1/user/-/activities/${metric}/date/${startDate}/${endDate}.json`;
    const response = await fetch(url, { headers: { 'Authorization': `Bearer ${this.accessToken}` } });
    if (!response.ok) throw new Error(`Fitbit API error: ${response.status} ${response.statusText}`);
    return await response.json();
  }

  private saveTokens(): void {
    if (this.accessToken) localStorage.setItem('fitbit_access_token', this.accessToken);
    if (this.refreshToken) localStorage.setItem('fitbit_refresh_token', this.refreshToken);
    if (this.expiresAt) localStorage.setItem('fitbit_expires_at', this.expiresAt.toString());
  }

  private loadTokens(): void {
    this.accessToken = localStorage.getItem('fitbit_access_token');
    this.refreshToken = localStorage.getItem('fitbit_refresh_token');
    const expiresAt = localStorage.getItem('fitbit_expires_at');
    this.expiresAt = expiresAt ? parseInt(expiresAt) : 0;
  }

  private generateRandomState(): string {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
}