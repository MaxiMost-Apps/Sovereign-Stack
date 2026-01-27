-- Migration: 20260127_1500_sovereign_gamification_patch.sql
-- Description: Adds gamification columns to habits and creates telemetry_logs table.

-- 1. Add Gamification Columns to 'habits'
ALTER TABLE habits ADD COLUMN IF NOT EXISTS streak INTEGER DEFAULT 0;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS longest_streak INTEGER DEFAULT 0;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS total_completions INTEGER DEFAULT 0;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS last_completed_at TIMESTAMPTZ;

-- 2. Create 'telemetry_logs' table
CREATE TABLE IF NOT EXISTS telemetry_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    source TEXT NOT NULL,
    metric TEXT NOT NULL,
    value JSONB DEFAULT '{}'::jsonb,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS
ALTER TABLE telemetry_logs ENABLE ROW LEVEL SECURITY;

-- 4. Policies
-- Allow users to insert their own logs
CREATE POLICY "Users can insert their own telemetry" ON telemetry_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to read their own logs
CREATE POLICY "Users can view their own telemetry" ON telemetry_logs FOR SELECT USING (auth.uid() = user_id);
