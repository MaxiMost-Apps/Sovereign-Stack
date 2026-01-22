-- 1. CLEANUP DUPLICATES (Required before applying constraint)
DELETE FROM habit_logs a USING habit_logs b
WHERE a.id < b.id AND a.user_id = b.user_id AND a.habit_id = b.habit_id AND a.completed_at = b.completed_at;

-- 2. APPLY CONSTRAINT (Enables "Toggle" logic)
-- Note: 'habit_logs_unique_day' might already exist from a previous step.
-- We add 'habit_logs_unique_entry' as requested, or rely on existing if column signature matches.
-- To be safe and follow instructions exactly:
ALTER TABLE habit_logs DROP CONSTRAINT IF EXISTS habit_logs_unique_day; -- Drop previous if exists to avoid conflict/redundancy
ALTER TABLE habit_logs DROP CONSTRAINT IF EXISTS habit_logs_unique_entry;
ALTER TABLE habit_logs ADD CONSTRAINT habit_logs_unique_entry UNIQUE (user_id, habit_id, completed_at);

-- 3. FIX PROFILE COLUMNS (Enables Preferences Save)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS neural_config JSONB DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'maximost_blue';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS voice_protocol TEXT DEFAULT 'stoic';
