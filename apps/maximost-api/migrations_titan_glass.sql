
-- 20260127_titan_glass_profiles.sql
-- Adds support for Titan Glass UI preferences
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'America/New_York';

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS day_start TEXT DEFAULT '06:00';

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS day_end TEXT DEFAULT '22:00';

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS performance_mode BOOLEAN DEFAULT false;
