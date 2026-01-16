import apiClient from "@/lib/apiClient";

// Types for Samsung Health data
export interface SamsungHealthAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface SamsungHealthActivityData {
  date: string;
  steps: number;
  distance: number;
  activeTime: number;
  calories: number;
}

export interface SamsungHealthSleepData {
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  efficiency: number; // 0-100
  stages?: {
    light: number;
    deep: number;
    rem: number;
    awake: number;
  };
}

export interface SamsungHealthHeartRateData {
  date: string;
  time: string;
  heartRate: number;
  restingHeartRate?: number;
}

export interface SamsungHealthBloodPressureData {
  date: string;
  time: string;
  systolic: number;
  diastolic: number;
  pulse: number;
}

export class SamsungHealthService {
  private apiKey: string;
  private redirectUri: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private expiresAt: number = 0;

  constructor() {
    this.apiKey = import.meta.env.VITE_SAMSUNG_HEALTH_API_KEY || '';
    this.redirectUri = `${window.location.origin}/fitness-tracker/samsung-health/callback`;
    this.loadTokens();
  }

  public isConfigured(): boolean {
    return Boolean(this.apiKey);
  }

  public isAuthenticated(): boolean {
    return Boolean(this.accessToken && Date.now() < this.expiresAt);
  }

  public getAuthUrl(): string {
    const state = this.generateRandomState();
    localStorage.setItem('samsung_health_auth_state', state);
    return `https://api.health.samsung.com/auth/authorize?client_id=${this.apiKey}&response_type=code&redirect_uri=${encodeURIComponent(this.redirectUri)}&state=${state}`;
  }

  public async handleAuthCallback(code: string, state: string): Promise<boolean> {
    const savedState = localStorage.getItem('samsung_health_auth_state');
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
      console.error('Failed to authenticate with Samsung Health:', error);
      return false;
    }
  }

  public async getActivityData(startDate: string, endDate: string): Promise<SamsungHealthActivityData[]> {
    await this.ensureValidToken();
    const url = `https://api.health.samsung.com/health/v1/tracking/step_count?start_time=${startDate}T00:00:00Z&end_time=${endDate}T23:59:59Z`;
    const caloriesUrl = `https://api.health.samsung.com/health/v1/tracking/calories_burned?start_time=${startDate}T00:00:00Z&end_time=${endDate}T23:59:59Z`;
    try {
      const stepsResponse = await fetch(url, { headers: { 'Authorization': `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' } });
      if (!stepsResponse.ok) throw new Error(`Samsung Health API error: ${stepsResponse.status} ${stepsResponse.statusText}`);
      const stepsData = await stepsResponse.json();

      const caloriesResponse = await fetch(caloriesUrl, { headers: { 'Authorization': `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' } });
      const caloriesData = await caloriesResponse.json();

      return this.processActivityData(stepsData, caloriesData);
    } catch (error) {
      console.error('Failed to fetch Samsung Health activity data:', error);
      throw error;
    }
  }

  public async getSleepData(startDate: string, endDate: string): Promise<SamsungHealthSleepData[]> {
    await this.ensureValidToken();
    const url = `https://api.health.samsung.com/health/v1/tracking/sleep?start_time=${startDate}T00:00:00Z&end_time=${endDate}T23:59:59Z`;
    try {
      const response = await fetch(url, { headers: { 'Authorization': `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' } });
      if (!response.ok) throw new Error(`Samsung Health API error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      return this.processSleepData(data);
    } catch (error) {
      console.error('Failed to fetch Samsung Health sleep data:', error);
      throw error;
    }
  }

  public async getHeartRateData(startDate: string, endDate: string): Promise<SamsungHealthHeartRateData[]> {
    await this.ensureValidToken();
    const url = `https://api.health.samsung.com/health/v1/tracking/heart_rate?start_time=${startDate}T00:00:00Z&end_time=${endDate}T23:59:59Z`;
    try {
      const response = await fetch(url, { headers: { 'Authorization': `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' } });
      if (!response.ok) throw new Error(`Samsung Health API error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      return this.processHeartRateData(data);
    } catch (error) {
      console.error('Failed to fetch Samsung Health heart rate data:', error);
      throw error;
    }
  }

  public logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.expiresAt = 0;
    localStorage.removeItem('samsung_health_access_token');
    localStorage.removeItem('samsung_health_refresh_token');
    localStorage.removeItem('samsung_health_expires_at');
    localStorage.removeItem('samsung_health_auth_state');
  }

  private async exchangeCodeForToken(code: string): Promise<SamsungHealthAuthResponse> {
    return await apiClient('/api/fitness-trackers/samsung-health/token', {
      method: 'POST',
      body: { code, redirectUri: this.redirectUri, apiKey: this.apiKey }
    });
  }

  private async ensureValidToken(): Promise<void> {
    if (!this.isAuthenticated() && this.refreshToken) {
      try {
        const data = await apiClient('/api/fitness-trackers/samsung-health/refresh', {
          method: 'POST',
          body: { refreshToken: this.refreshToken, apiKey: this.apiKey }
        });
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.expiresAt = Date.now() + (data.expires_in * 1000);
        this.saveTokens();
      } catch (error) {
        console.error('Failed to refresh Samsung Health token:', error);
        this.logout();
        throw new Error('Authentication expired. Please log in again.');
      }
    } else if (!this.isAuthenticated()) {
      throw new Error('Not authenticated with Samsung Health. Please log in.');
    }
  }

  private processActivityData(stepsData: any, caloriesData: any): SamsungHealthActivityData[] {
    const activityByDate: Record<string, SamsungHealthActivityData> = {};
    if (stepsData.items) {
      for (const item of stepsData.items) {
        const date = item.start_time.split('T')[0];
        if (!activityByDate[date]) activityByDate[date] = { date, steps: 0, distance: 0, activeTime: 0, calories: 0 };
        activityByDate[date].steps += item.count || 0;
        activityByDate[date].distance += item.distance || 0;
        activityByDate[date].activeTime += item.active_time || 0;
      }
    }
    if (caloriesData.items) {
      for (const item of caloriesData.items) {
        const date = item.start_time.split('T')[0];
        if (!activityByDate[date]) activityByDate[date] = { date, steps: 0, distance: 0, activeTime: 0, calories: 0 };
        activityByDate[date].calories += item.calories || 0;
      }
    }
    return Object.values(activityByDate).sort((a, b) => a.date.localeCompare(b.date));
  }

  private processSleepData(data: any): SamsungHealthSleepData[] {
    if (!data.items) return [];
    return data.items.map((item: any) => {
      const start = new Date(item.start_time);
      const end = new Date(item.end_time);
      let stages = undefined;
      if (item.stages) {
        stages = { light: 0, deep: 0, rem: 0, awake: 0 };
        for (const stage of item.stages) {
          if (stages.hasOwnProperty(stage.type)) stages[stage.type as keyof typeof stages] += stage.duration || 0;
        }
      }
      return {
        date: start.toISOString().split('T')[0],
        startTime: item.start_time,
        endTime: item.end_time,
        duration: Math.round((end.getTime() - start.getTime()) / 60000),
        efficiency: item.efficiency || 0,
        stages
      };
    });
  }

  private processHeartRateData(data: any): SamsungHealthHeartRateData[] {
    if (!data.items) return [];
    return data.items.map((item: any) => ({
      date: item.timestamp.split('T')[0],
      time: item.timestamp.split('T')[1].replace('Z', ''),
      heartRate: item.heart_rate || 0,
      restingHeartRate: item.resting_heart_rate
    }));
  }

  private saveTokens(): void {
    if (this.accessToken) localStorage.setItem('samsung_health_access_token', this.accessToken);
    if (this.refreshToken) localStorage.setItem('samsung_health_refresh_token', this.refreshToken);
    if (this.expiresAt) localStorage.setItem('samsung_health_expires_at', this.expiresAt.toString());
  }

  private loadTokens(): void {
    this.accessToken = localStorage.getItem('samsung_health_access_token');
    this.refreshToken = localStorage.getItem('samsung_health_refresh_token');
    const expiresAt = localStorage.getItem('samsung_health_expires_at');
    this.expiresAt = expiresAt ? parseInt(expiresAt) : 0;
  }

  private generateRandomState(): string {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
}