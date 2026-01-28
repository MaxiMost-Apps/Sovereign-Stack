-- 1. Ensure the habits table has the correct columns
ALTER TABLE habits
ADD COLUMN IF NOT EXISTS habit_id text,
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS status text DEFAULT 'active',
ADD COLUMN IF NOT EXISTS streak int DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_completed date,
ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;

-- 2. Create an index to make queries faster (and prevent timeouts)
CREATE INDEX IF NOT EXISTS idx_habits_user_id ON habits(user_id);
CREATE INDEX IF NOT EXISTS idx_habits_habit_id ON habits(habit_id);

-- 3. Ensure Profiles exists for the settings page
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  lens text DEFAULT 'FORTITUDE',
  coach_mode text DEFAULT 'OPERATOR',
  timezone text DEFAULT 'America/New_York',
  performance_mode boolean DEFAULT false
);

-- 4. Verify RLS (Row Level Security) - Critical for "400" errors
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

-- Allow users to see and edit ONLY their own habits
CREATE POLICY "Users can view own habits" ON habits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own habits" ON habits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own habits" ON habits
  FOR UPDATE USING (auth.uid() = user_id);
