
-- 20260127_timezone_fix.sql
-- Fixes missing columns in profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'America/New_York';

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS performance_mode BOOLEAN DEFAULT false;
