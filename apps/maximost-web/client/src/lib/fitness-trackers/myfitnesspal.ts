import apiClient from "@/lib/apiClient";

// Types for MyFitnessPal data
export interface MyFitnessPalAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface MyFitnessPalFoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
  servingAmount: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface MyFitnessPalNutritionData {
  date: string;
  goalCalories: number;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  meals: {
    breakfast: MyFitnessPalFoodItem[];
    lunch: MyFitnessPalFoodItem[];
    dinner: MyFitnessPalFoodItem[];
    snack: MyFitnessPalFoodItem[];
  };
}

export interface MyFitnessPalWaterData {
  date: string;
  goalAmount: number; // in milliliters
  actualAmount: number; // in milliliters
}

export interface MyFitnessPalWeight {
  date: string;
  weight: number; // in kilograms
}

export class MyFitnessPalService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private expiresAt: number = 0;

  constructor() {
    this.clientId = import.meta.env.VITE_MYFITNESSPAL_CLIENT_ID || '';
    this.clientSecret = import.meta.env.VITE_MYFITNESSPAL_CLIENT_SECRET || '';
    this.redirectUri = `${window.location.origin}/fitness-tracker/myfitnesspal/callback`;
    this.loadTokens();
  }

  public isConfigured(): boolean {
    return Boolean(this.clientId && this.clientSecret);
  }

  public isAuthenticated(): boolean {
    return Boolean(this.accessToken && Date.now() < this.expiresAt);
  }

  public getAuthUrl(): string {
    const scope = 'diary meals water';
    const state = this.generateRandomState();
    localStorage.setItem('myfitnesspal_auth_state', state);
    return `https://auth.myfitnesspal.com/oauth2/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`;
  }

  public async handleAuthCallback(code: string, state: string): Promise<boolean> {
    const savedState = localStorage.getItem('myfitnesspal_auth_state');
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
      console.error('Failed to authenticate with MyFitnessPal:', error);
      return false;
    }
  }

  public async getNutritionData(startDate: string, endDate: string): Promise<MyFitnessPalNutritionData[]> {
    await this.ensureValidToken();
    const nutritionData: MyFitnessPalNutritionData[] = [];
    for (let date = new Date(startDate); date <= new Date(endDate); date.setDate(date.getDate() + 1)) {
      const formattedDate = date.toISOString().split('T')[0];
      const dayData = await this.fetchDayNutritionData(formattedDate);
      nutritionData.push(dayData);
    }
    return nutritionData;
  }

  public async getWaterData(startDate: string, endDate: string): Promise<MyFitnessPalWaterData[]> {
    await this.ensureValidToken();
    const waterData: MyFitnessPalWaterData[] = [];
    for (let date = new Date(startDate); date <= new Date(endDate); date.setDate(date.getDate() + 1)) {
      const formattedDate = date.toISOString().split('T')[0];
      const dayData = await this.fetchDayWaterData(formattedDate);
      waterData.push(dayData);
    }
    return waterData;
  }

  public async getWeightData(startDate: string, endDate: string): Promise<MyFitnessPalWeight[]> {
    await this.ensureValidToken();
    const url = `https://api.myfitnesspal.com/v2/measurements/weight?from=${startDate}&to=${endDate}`;
    const response = await fetch(url, { headers: { 'Authorization': `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' } });
    if (!response.ok) throw new Error(`MyFitnessPal API error: ${response.status} ${response.statusText}`);
    const data = await response.json();
    return data.items.map((item: any) => ({ date: item.date, weight: item.value }));
  }

  public logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.expiresAt = 0;
    localStorage.removeItem('myfitnesspal_access_token');
    localStorage.removeItem('myfitnesspal_refresh_token');
    localStorage.removeItem('myfitnesspal_expires_at');
    localStorage.removeItem('myfitnesspal_auth_state');
  }

  private async exchangeCodeForToken(code: string): Promise<MyFitnessPalAuthResponse> {
    return await apiClient('/api/fitness-trackers/myfitnesspal/token', {
      method: 'POST',
      body: { code, clientId: this.clientId, clientSecret: this.clientSecret, redirectUri: this.redirectUri }
    });
  }

  private async ensureValidToken(): Promise<void> {
    if (!this.isAuthenticated() && this.refreshToken) {
      try {
        const data = await apiClient('/api/fitness-trackers/myfitnesspal/refresh', {
          method: 'POST',
          body: { refreshToken: this.refreshToken, clientId: this.clientId, clientSecret: this.clientSecret }
        });
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.expiresAt = Date.now() + (data.expires_in * 1000);
        this.saveTokens();
      } catch (error) {
        console.error('Failed to refresh MyFitnessPal token:', error);
        this.logout();
        throw new Error('Authentication expired. Please log in again.');
      }
    } else if (!this.isAuthenticated()) {
      throw new Error('Not authenticated with MyFitnessPal. Please log in.');
    }
  }

  private async fetchDayNutritionData(date: string): Promise<MyFitnessPalNutritionData> {
    const url = `https://api.myfitnesspal.com/v2/diary?date=${date}`;
    const response = await fetch(url, { headers: { 'Authorization': `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' } });
    if (!response.ok) throw new Error(`MyFitnessPal API error: ${response.status} ${response.statusText}`);
    const data = await response.json();
    return this.processNutritionData(date, data);
  }

  private async fetchDayWaterData(date: string): Promise<MyFitnessPalWaterData> {
    const url = `https://api.myfitnesspal.com/v2/diary/water?date=${date}`;
    const response = await fetch(url, { headers: { 'Authorization': `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' } });
    if (!response.ok) throw new Error(`MyFitnessPal API error: ${response.status} ${response.statusText}`);
    const data = await response.json();
    return { date, goalAmount: data.goal || 0, actualAmount: data.actual || 0 };
  }

  private processNutritionData(date: string, data: any): MyFitnessPalNutritionData {
    const result: MyFitnessPalNutritionData = {
      date,
      goalCalories: data.goals?.calories || 0,
      totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0,
      meals: { breakfast: [], lunch: [], dinner: [], snack: [] }
    };
    if (data.meals) {
      for (const meal of data.meals) {
        const mealType = meal.name.toLowerCase() as keyof typeof result.meals;
        if (result.meals[mealType] && meal.foods) {
          for (const food of meal.foods) {
            const foodItem: MyFitnessPalFoodItem = {
              name: food.name,
              calories: food.nutritionalContents?.energy?.value || 0,
              protein: food.nutritionalContents?.protein?.value || 0,
              carbs: food.nutritionalContents?.carbohydrates?.value || 0,
              fat: food.nutritionalContents?.fat?.value || 0,
              servingSize: food.servingSize?.name || 'serving',
              servingAmount: food.servingSize?.value || 1,
              mealType
            };
            result.meals[mealType].push(foodItem);
            result.totalCalories += foodItem.calories;
            result.totalProtein += foodItem.protein;
            result.totalCarbs += foodItem.carbs;
            result.totalFat += foodItem.fat;
          }
        }
      }
    }
    return result;
  }

  private saveTokens(): void {
    if (this.accessToken) localStorage.setItem('myfitnesspal_access_token', this.accessToken);
    if (this.refreshToken) localStorage.setItem('myfitnesspal_refresh_token', this.refreshToken);
    if (this.expiresAt) localStorage.setItem('myfitnesspal_expires_at', this.expiresAt.toString());
  }

  private loadTokens(): void {
    this.accessToken = localStorage.getItem('myfitnesspal_access_token');
    this.refreshToken = localStorage.getItem('myfitnesspal_refresh_token');
    const expiresAt = localStorage.getItem('myfitnesspal_expires_at');
    this.expiresAt = expiresAt ? parseInt(expiresAt) : 0;
  }

  private generateRandomState(): string {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
}