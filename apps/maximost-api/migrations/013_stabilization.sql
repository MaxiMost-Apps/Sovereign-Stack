-- Ensure columns exist and are permissive
ALTER TABLE habits
ADD COLUMN IF NOT EXISTS current_value int DEFAULT 0,
ADD COLUMN IF NOT EXISTS target_value int DEFAULT 1,
ALTER COLUMN metadata SET DEFAULT '{}'::jsonb;

-- Force RLS to allow EVERYTHING for the owner
DROP POLICY IF EXISTS "Users can ALL own habits" ON habits;
CREATE POLICY "Users can ALL own habits" ON habits
FOR ALL USING (auth.uid() = user_id);
