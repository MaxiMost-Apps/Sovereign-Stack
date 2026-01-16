export type HabitFrequency = 'daily' | 'weekly' | '2x-week' | '3x-week' | '4x-week' | '5x-week' | '6x-week' | 'specific_days';
export type HabitCategory = 'physical' | 'nutrition' | 'sleep' | 'mental' | 'relationships' | 'financial' | 'health' | 'fitness' | 'mind' | 'social' | 'finance' | 'productivity' | 'general' | 'wisdom' | 'diet' | 'growth';
export type HabitType = 'build' | 'quit';

export interface HabitCompletion {
  id?: string;
  habitId: string;
  date: Date;
  completed: boolean;
  value?: number; // For quantitative habits
}

export interface Habit {
  id: string;
  user_id?: string; // Supabase field
  title: string;
  description?: string;

  // Visuals
  icon: string;
  iconColor?: string;
  color?: string; // New field for general color theme
  category: HabitCategory;

  // Scheduling & Logic
  type?: HabitType; // 'build' or 'quit'
  frequency: HabitFrequency; // 'daily', 'weekly', 'specific_days'
  frequency_type?: 'absolute' | 'flexible'; // 'absolute' vs 'flexible' (legacy mapping)
  target_count?: number; // For weekly targets (e.g. 3 times per week)
  specific_days?: string[] | null; // ['Mon', 'Wed']

  // Timeline
  start_date?: string; // ISO Date string
  end_date?: string; // ISO Date string
  reminders?: string[]; // Array of times ['09:00']

  // Meta
  isAbsolute?: boolean; // Legacy/UI toggle for "Strictness"
  is_archived?: boolean;
  sort_order?: number;
  created_at?: Date | string;

  // Stats (Calculated)
  streak: number;
  impact?: number; // 1-10
  effort?: number; // 1-10
  timeCommitment?: string;

  // For UI only (optional)
  completions?: HabitCompletion[];
}
