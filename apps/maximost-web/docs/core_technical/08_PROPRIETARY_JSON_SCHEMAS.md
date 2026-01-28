# 🧬 PROPRIETARY DATA STRUCTURES

## 1. THE HABIT DNA (`HabitDefinition`)
* **Location:** `src/data/sovereign_library.ts`
* **Purpose:** The static definition of a protocol. This is immutable.

```typescript
interface HabitDefinition {
  id: string;              // Unique Master ID (e.g., 'h_morning_sun')
  title: string;           // Display Title (e.g., 'Morning Sunlight')
  description: string;     // Tactical Brief
  category: 'mind' | 'body' | 'spirit' | 'business' | 'asset';
  system_tags: string[];   // ['dopamine', 'circadian', 'metabolic']
  
  // The Configuration that drives the Dashboard Logic
  default_config: {
    frequency_type: 'ABSOLUTE' | 'FREQUENCY';
    target_days: number;   // 7 for Absolute, 1-6 for Frequency
    time_of_day: 'morning' | 'afternoon' | 'evening' | 'any';
  };
  
  // The Titan Visuals
  visuals: {
    icon: string;          // Lucide React icon name (e.g., 'Sun')
    color: string;         // Tailwind class (e.g., 'bg-amber-500')
  };
}

THE USER STATE (UserHabit)
Location: Supabase Table habits

Purpose: The user's specific relationship with a habit.

TypeScript
interface UserHabit {
  id: string;              // UUID (Primary Key)
  user_id: string;         // UUID (Foreign Key to profiles)
  habit_id: string;        // Links to HabitDefinition.id
  status: 'active' | 'paused' | 'archived';
  streak: number;          // Current streak count
  longest_streak: number;  // All-time record
  last_completed: string;  // ISO Date (YYYY-MM-DD)
  
  // Custom Overrides (Optional)
  custom_config?: {
    frequency_type?: 'ABSOLUTE' | 'FREQUENCY';
    target_days?: number;
  };
}

THE BIOMETRIC PACKET
Location: Ingested via API -> Stored in biometric_data

Purpose: Raw data form before analysis.

JSON
{
  "source": "oura",        // 'oura', 'apple', 'whoop', 'manual'
  "metric": "readiness",   // 'hrv', 'sleep_score', 'steps'
  "value": 85,             // Numeric value
  "unit": "score",         // 'ms', 'count', 'score'
  "timestamp": "2026-01-28T12:00:00Z",
  "signature": "hmac_sha256_hash" // Security Seal
}