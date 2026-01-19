-- FIX MISSING COLUMNS (Unlocks Editing & Saving)
ALTER TABLE habits
ADD COLUMN IF NOT EXISTS streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS longest_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_completions INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS target_count INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS frequency TEXT DEFAULT 'daily',
ADD COLUMN IF NOT EXISTS daily_goal INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS base_color TEXT DEFAULT '#6366F1',
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Fix the "Ghost" Duplicate Error (Optional but safe)
-- Drop unique constraint on slug if it exists (habits should be unique per USER, not global)
ALTER TABLE habits DROP CONSTRAINT IF EXISTS habits_slug_key;
ALTER TABLE habits DROP CONSTRAINT IF EXISTS habits_slug_unique;
