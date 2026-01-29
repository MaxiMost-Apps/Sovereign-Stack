-- Stabilization Patch: Metric Tracking & Permissions

-- 1. Ensure Metric Columns Exist
ALTER TABLE habits ADD COLUMN IF NOT EXISTS current_value int DEFAULT 0;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS target_value int DEFAULT 1;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS start_date date DEFAULT CURRENT_DATE;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS is_paused boolean DEFAULT false;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS description text;

-- 2. Reset Permissions (Fixes the "Wipe on Refresh" bug)
DROP POLICY IF EXISTS "Users can ALL own habits" ON habits;
CREATE POLICY "Users can ALL own habits" ON habits
FOR ALL USING (auth.uid() = user_id);
