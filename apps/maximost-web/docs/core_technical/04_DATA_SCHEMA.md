# 💾 DATA SCHEMA (SUPABASE)

## 1. CORE TABLES

### `profiles` (The User)
* **`id`** (UUID, PK): Links to `auth.users`.
* **`lens`** (Text): The chosen theme (e.g., 'FORTITUDE', 'REASON').
* **`coach_mode`** (Text): The AI personality ('STOIC', 'OPERATOR').
* **`timezone`** (Text): Critical for date calculation (Default: 'America/New_York').
* **`performance_mode`** (Boolean): Reduces motion for performance.

### `habits` (The Protocol)
* **`id`** (UUID, PK): Unique ID.
* **`habit_id`** (Text): The "Master ID" linking to `sovereign_library.ts` (e.g., `h_morning_sun`).
* **`status`** (Enum): `'active' | 'paused' | 'archived'`.
* **`frequency_type`** (Enum): `'ABSOLUTE'` (Daily) or `'FREQUENCY'` (X times/week).
* **`metadata`** (JSONB): Stores v12 configuration (icons, colors).

### `biometric_data` (The Bio-Rig)
* **`id`** (UUID, PK).
* **`source`** (Text): 'apple', 'samsung', 'oura', 'terra'.
* **`metric`** (Text): 'hrv', 'sleep_score', 'steps'.
* **`value`** (Numeric): The raw data point.
* **`recorded_at`** (Timestamp): When it happened.

### `telemetry_logs` (The AI Feed)
* Stores anonymous usage data for the "Static Brain" to analyze patterns without exposing PII.

## 2. SECURITY (THE BIO-SEALS)
* **RLS (Row Level Security):** ENABLED on all tables.
* **Policy:** Users can only `SELECT`, `INSERT`, `UPDATE` their own rows (`auth.uid() = user_id`).
* **Service Role:** The Backend (Phoenix) bypasses RLS for ingestion but sanitizes data before storage.