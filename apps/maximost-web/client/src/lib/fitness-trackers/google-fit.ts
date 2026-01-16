import apiClient from "@/lib/apiClient";

// Types for Google Fit data
export interface GoogleFitAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface GoogleFitActivityData {
  date: string;
  steps: number;
  distance: number; // in meters
  activeMinutes: number;
  calories: number;
}

export interface GoogleFitSleepData {
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  efficiency: number; // 0-100 scale (estimated)
  sleepStages?: {
    light: number; // in minutes
    deep: number;
    rem: number;
    awake: number;
  };
}

export interface GoogleFitHeartRateData {
  date: string;
  time: string;
  heartRate: number;
}

export class GoogleFitService {
  private clientId: string;
  private redirectUri: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private expiresAt: number = 0;

  constructor() {
    this.clientId = import.meta.env.VITE_GOOGLE_FIT_CLIENT_ID || '';
    this.redirectUri = `${window.location.origin}/fitness-tracker/google-fit/callback`;
    this.loadTokens();
  }

  public isConfigured(): boolean {
    return Boolean(this.clientId);
  }

  public isAuthenticated(): boolean {
    return Boolean(this.accessToken && Date.now() < this.expiresAt);
  }

  public getAuthUrl(): string {
    const scope = 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.sleep.read';
    const state = this.generateRandomState();
    localStorage.setItem('google_fit_auth_state', state);
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}&access_type=offline&prompt=consent`;
  }

  public async handleAuthCallback(code: string, state: string): Promise<boolean> {
    const savedState = localStorage.getItem('google_fit_auth_state');
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
      console.error('Failed to authenticate with Google Fit:', error);
      return false;
    }
  }

  public async getActivityData(startDate: string, endDate: string): Promise<GoogleFitActivityData[]> {
    await this.ensureValidToken();
    try {
      const startTimeMillis = new Date(startDate).setHours(0, 0, 0, 0);
      const endTimeMillis = new Date(endDate).setHours(23, 59, 59, 999);
      const requestBodyBase = {
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis,
        endTimeMillis
      };

      const [stepsResponse, caloriesResponse, distanceResponse, activeMinutesResponse] = await Promise.all([
        this.fetchGoogleFitData({ ...requestBodyBase, aggregateBy: [{ dataTypeName: 'com.google.step_count.delta', dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps' }] }),
        this.fetchGoogleFitData({ ...requestBodyBase, aggregateBy: [{ dataTypeName: 'com.google.calories.expended', dataSourceId: 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended' }] }),
        this.fetchGoogleFitData({ ...requestBodyBase, aggregateBy: [{ dataTypeName: 'com.google.distance.delta', dataSourceId: 'derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta' }] }),
        this.fetchGoogleFitData({ ...requestBodyBase, aggregateBy: [{ dataTypeName: 'com.google.active_minutes', dataSourceId: 'derived:com.google.active_minutes:com.google.android.gms:merge_active_minutes' }] })
      ]);

      return this.processActivityData(stepsResponse, caloriesResponse, distanceResponse, activeMinutesResponse);
    } catch (error) {
      console.error('Failed to fetch Google Fit activity data:', error);
      throw error;
    }
  }

  public async getSleepData(startDate: string, endDate: string): Promise<GoogleFitSleepData[]> {
    await this.ensureValidToken();
    try {
      const startTimeMillis = new Date(startDate).setHours(0, 0, 0, 0);
      const endTimeMillis = new Date(endDate).setHours(23, 59, 59, 999);
      const sleepRequestBody = {
        aggregateBy: [{ dataTypeName: 'com.google.sleep.segment' }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis,
        endTimeMillis
      };
      const sleepResponse = await this.fetchGoogleFitData(sleepRequestBody);
      return this.processSleepData(sleepResponse);
    } catch (error) {
      console.error('Failed to fetch Google Fit sleep data:', error);
      throw error;
    }
  }

  public async getHeartRateData(startDate: string, endDate: string): Promise<GoogleFitHeartRateData[]> {
    await this.ensureValidToken();
    try {
      const startTimeMillis = new Date(startDate).setHours(0, 0, 0, 0);
      const endTimeMillis = new Date(endDate).setHours(23, 59, 59, 999);
      const heartRateRequestBody = {
        aggregateBy: [{ dataTypeName: 'com.google.heart_rate.bpm', dataSourceId: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm' }],
        bucketByTime: { durationMillis: 3600000 },
        startTimeMillis,
        endTimeMillis
      };
      const heartRateResponse = await this.fetchGoogleFitData(heartRateRequestBody);
      return this.processHeartRateData(heartRateResponse);
    } catch (error) {
      console.error('Failed to fetch Google Fit heart rate data:', error);
      throw error;
    }
  }

  public logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.expiresAt = 0;
    localStorage.removeItem('google_fit_access_token');
    localStorage.removeItem('google_fit_refresh_token');
    localStorage.removeItem('google_fit_expires_at');
    localStorage.removeItem('google_fit_auth_state');
  }

  private async exchangeCodeForToken(code: string): Promise<GoogleFitAuthResponse> {
    return await apiClient('/api/fitness-trackers/google-fit/token', {
      method: 'POST',
      body: { code, redirectUri: this.redirectUri }
    });
  }

  private async ensureValidToken(): Promise<void> {
    if (!this.isAuthenticated() && this.refreshToken) {
      try {
        const data = await apiClient('/api/fitness-trackers/google-fit/refresh', {
          method: 'POST',
          body: { refreshToken: this.refreshToken }
        });
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token || this.refreshToken;
        this.expiresAt = Date.now() + (data.expires_in * 1000);
        this.saveTokens();
      } catch (error) {
        console.error('Failed to refresh Google Fit token:', error);
        this.logout();
        throw new Error('Authentication expired. Please log in again.');
      }
    } else if (!this.isAuthenticated()) {
      throw new Error('Not authenticated with Google Fit. Please log in.');
    }
  }

  private async fetchGoogleFitData(requestBody: any): Promise<any> {
    const response = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    if (!response.ok) throw new Error(`Google Fit API error: ${response.status} ${response.statusText}`);
    return await response.json();
  }

  private processActivityData(stepsData: any, caloriesData: any, distanceData: any, activeMinutesData: any): GoogleFitActivityData[] {
    const activityByDate: Record<string, GoogleFitActivityData> = {};
    const processBucket = (bucketData: any, key: keyof GoogleFitActivityData, isFp: boolean = false) => {
      if (bucketData.bucket) {
        bucketData.bucket.forEach((bucket: any) => {
          const date = new Date(parseInt(bucket.startTimeMillis)).toISOString().split('T')[0];
          if (!activityByDate[date]) activityByDate[date] = { date, steps: 0, distance: 0, activeMinutes: 0, calories: 0 };
          if (bucket.dataset[0]?.point[0]?.value[0]) {
            activityByDate[date][key] += Math.round(isFp ? bucket.dataset[0].point[0].value[0].fpVal : bucket.dataset[0].point[0].value[0].intVal || 0);
          }
        });
      }
    };
    processBucket(stepsData, 'steps');
    processBucket(caloriesData, 'calories', true);
    processBucket(distanceData, 'distance', true);
    processBucket(activeMinutesData, 'activeMinutes');
    return Object.values(activityByDate).sort((a, b) => a.date.localeCompare(b.date));
  }

  private processSleepData(data: any): GoogleFitSleepData[] {
    const sleepSessions: Record<string, GoogleFitSleepData> = {};
    if (data.bucket) {
      data.bucket.forEach((bucket: any) => {
        if (bucket.dataset[0]?.point) {
          bucket.dataset[0].point.forEach((point: any) => {
            if (point.value) {
              const startTimeMillis = parseInt(point.startTimeNanos) / 1000000;
              const endTimeMillis = parseInt(point.endTimeNanos) / 1000000;
              const startDate = new Date(startTimeMillis);
              const date = startDate.toISOString().split('T')[0];
              const sessionId = `${date}_${startTimeMillis}`;
              if (!sleepSessions[sessionId]) {
                sleepSessions[sessionId] = {
                  date,
                  startTime: startDate.toISOString(),
                  endTime: new Date(endTimeMillis).toISOString(),
                  duration: Math.round((endTimeMillis - startTimeMillis) / 60000),
                  efficiency: 0,
                  sleepStages: { light: 0, deep: 0, rem: 0, awake: 0 }
                };
              }
              const durationMinutes = Math.round((endTimeMillis - startTimeMillis) / 60000);
              const sleepType = point.value[0].intVal;
              if (sleepSessions[sessionId].sleepStages) {
                switch (sleepType) {
                  case 1: sleepSessions[sessionId].sleepStages!.awake += durationMinutes; break;
                  case 4: sleepSessions[sessionId].sleepStages!.light += durationMinutes; break;
                  case 5: sleepSessions[sessionId].sleepStages!.deep += durationMinutes; break;
                  case 6: sleepSessions[sessionId].sleepStages!.rem += durationMinutes; break;
                }
              }
            }
          });
        }
      });
    }
    Object.values(sleepSessions).forEach(session => {
      if (session.sleepStages) {
        const totalTime = session.duration;
        const awakeTime = session.sleepStages.awake;
        session.efficiency = totalTime > 0 ? Math.round(((totalTime - awakeTime) / totalTime) * 100) : 0;
      }
    });
    return Object.values(sleepSessions).sort((a, b) => a.date.localeCompare(b.date));
  }

  private processHeartRateData(data: any): GoogleFitHeartRateData[] {
    const heartRateData: GoogleFitHeartRateData[] = [];
    if (data.bucket) {
      data.bucket.forEach((bucket: any) => {
        if (bucket.dataset[0]?.point) {
          bucket.dataset[0].point.forEach((point: any) => {
            if (point.value) {
              const timeMillis = parseInt(point.startTimeNanos) / 1000000;
              const date = new Date(timeMillis);
              heartRateData.push({
                date: date.toISOString().split('T')[0],
                time: date.toISOString().split('T')[1].replace('Z', ''),
                heartRate: Math.round(point.value[0].fpVal || 0)
              });
            }
          });
        }
      });
    }
    return heartRateData.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  }

  private saveTokens(): void {
    if (this.accessToken) localStorage.setItem('google_fit_access_token', this.accessToken);
    if (this.refreshToken) localStorage.setItem('google_fit_refresh_token', this.refreshToken);
    if (this.expiresAt) localStorage.setItem('google_fit_expires_at', this.expiresAt.toString());
  }

  private loadTokens(): void {
    this.accessToken = localStorage.getItem('google_fit_access_token');
    this.refreshToken = localStorage.getItem('google_fit_refresh_token');
    const expiresAt = localStorage.getItem('google_fit_expires_at');
    this.expiresAt = expiresAt ? parseInt(expiresAt) : 0;
  }

  private generateRandomState(): string {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
}