import apiClient from "@/lib/apiClient";

// Types for Garmin data
export interface GarminAuthResponse {
  access_token: string;
  token_secret: string;
  user_id: string;
}

export interface GarminActivityData {
  date: string;
  steps: number;
  distance: number; // in meters
  activeMinutes: number;
  calories: number;
}

export interface GarminSleepData {
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  efficiency: number; // 0-100 scale
  sleepStages?: {
    deep: number; // in minutes
    light: number;
    rem: number;
    awake: number;
  };
}

export interface GarminHeartRateData {
  date: string;
  restingHeartRate: number;
  maxHeartRate?: number;
  averageHeartRate?: number;
  samples?: Array<{
    time: string;
    heartRate: number;
  }>;
}

export class GarminService {
  private consumerKey: string;
  private accessToken: string | null = null;
  private tokenSecret: string | null = null;
  private userId: string | null = null;

  constructor() {
    this.consumerKey = import.meta.env.VITE_GARMIN_CONSUMER_KEY || '';
    this.loadTokens();
  }

  public isConfigured(): boolean {
    return Boolean(this.consumerKey);
  }

  public isAuthenticated(): boolean {
    return Boolean(this.accessToken && this.tokenSecret);
  }

  public async startAuthFlow(): Promise<string> {
    const callbackUrl = `${window.location.origin}/fitness-tracker/garmin/callback`;
    const state = this.generateRandomState();
    localStorage.setItem('garmin_auth_state', state);
    return `https://connect.garmin.com/oauthConfirm?oauth_token=REQUEST_TOKEN&oauth_callback=${encodeURIComponent(callbackUrl)}&state=${state}`;
  }

  public async handleAuthCallback(oauthToken: string, oauthVerifier: string, state: string): Promise<boolean> {
    const savedState = localStorage.getItem('garmin_auth_state');
    if (state !== savedState) {
      throw new Error('OAuth state mismatch. Authentication failed.');
    }
    try {
      const tokenData: GarminAuthResponse = await apiClient('/api/fitness-trackers/garmin/token', {
        method: 'POST',
        body: {
          oauth_token: oauthToken,
          oauth_verifier: oauthVerifier
        }
      });
      this.accessToken = tokenData.access_token;
      this.tokenSecret = tokenData.token_secret;
      this.userId = tokenData.user_id;
      this.saveTokens();
      return true;
    } catch (error) {
      console.error('Failed to authenticate with Garmin:', error);
      return false;
    }
  }

  public async getActivityData(startDate: string, endDate: string): Promise<GarminActivityData[]> {
    if (!this.isAuthenticated()) throw new Error('Not authenticated with Garmin.');
    const url = `/api/fitness-trackers/garmin/activity?user_id=${this.userId}&start_date=${startDate}&end_date=${endDate}`;
    const data = await apiClient(url, { headers: { 'Authorization': `Bearer ${this.accessToken}` } });
    return data.map((item: any) => ({
      date: item.date,
      steps: item.steps || 0,
      distance: item.distance || 0,
      activeMinutes: item.activeMinutes || 0,
      calories: item.calories || 0
    }));
  }

  public async getSleepData(startDate: string, endDate: string): Promise<GarminSleepData[]> {
    if (!this.isAuthenticated()) throw new Error('Not authenticated with Garmin.');
    const url = `/api/fitness-trackers/garmin/sleep?user_id=${this.userId}&start_date=${startDate}&end_date=${endDate}`;
    const data = await apiClient(url, { headers: { 'Authorization': `Bearer ${this.accessToken}` } });
    return data.map((item: any) => ({
      date: item.date,
      startTime: item.startTime,
      endTime: item.endTime,
      duration: item.duration || 0,
      efficiency: item.efficiency || 0,
      sleepStages: item.sleepStages ? {
        deep: item.sleepStages.deep || 0,
        light: item.sleepStages.light || 0,
        rem: item.sleepStages.rem || 0,
        awake: item.sleepStages.awake || 0
      } : undefined
    }));
  }

  public async getHeartRateData(startDate: string, endDate: string): Promise<GarminHeartRateData[]> {
    if (!this.isAuthenticated()) throw new Error('Not authenticated with Garmin.');
    const url = `/api/fitness-trackers/garmin/heart-rate?user_id=${this.userId}&start_date=${startDate}&end_date=${endDate}`;
    const data = await apiClient(url, { headers: { 'Authorization': `Bearer ${this.accessToken}` } });
    return data.map((item: any) => ({
      date: item.date,
      restingHeartRate: item.restingHeartRate || 0,
      maxHeartRate: item.maxHeartRate,
      averageHeartRate: item.averageHeartRate,
      samples: item.samples
    }));
  }

  public logout(): void {
    this.accessToken = null;
    this.tokenSecret = null;
    this.userId = null;
    localStorage.removeItem('garmin_access_token');
    localStorage.removeItem('garmin_token_secret');
    localStorage.removeItem('garmin_user_id');
    localStorage.removeItem('garmin_auth_state');
  }

  private saveTokens(): void {
    if (this.accessToken) localStorage.setItem('garmin_access_token', this.accessToken);
    if (this.tokenSecret) localStorage.setItem('garmin_token_secret', this.tokenSecret);
    if (this.userId) localStorage.setItem('garmin_user_id', this.userId);
  }

  private loadTokens(): void {
    this.accessToken = localStorage.getItem('garmin_access_token');
    this.tokenSecret = localStorage.getItem('garmin_token_secret');
    this.userId = localStorage.getItem('garmin_user_id');
  }

  private generateRandomState(): string {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
}