-- 1. ADD SLUG COLUMN
ALTER TABLE habits ADD COLUMN IF NOT EXISTS slug TEXT;

-- 2. POPULATE SLUGS (Map Titles to Slugs)
-- This ensures the "Deploy Starters" button finds what it's looking for.
UPDATE habits SET slug = 'morning-sunlight' WHERE title = 'Morning Sunlight';
UPDATE habits SET slug = 'cold-plunge' WHERE title = 'Cold Plunge';
UPDATE habits SET slug = 'deep-work' WHERE title = 'Deep Work';
UPDATE habits SET slug = 'zone-2-cardio' WHERE title = 'Zone 2 Cardio';
UPDATE habits SET slug = 'sleep-tracking' WHERE title = 'Sleep Tracking';
UPDATE habits SET slug = 'no-sugar' WHERE title = 'No Sugar';
-- Additional common ones
UPDATE habits SET slug = 'fasted-walk' WHERE title = 'Fasted Walk';
UPDATE habits SET slug = 'shadow-audit' WHERE title = 'Shadow Audit';
UPDATE habits SET slug = 'digital-sunset' WHERE title = 'Digital Sunset';
UPDATE habits SET slug = 'morning_sun' WHERE slug IS NULL AND title = 'Morning Sunlight'; -- Legacy fix

-- 3. ENSURE UNIQUE (Scoped to User)
-- We use user_id + slug uniqueness to prevent duplicate adoptions
ALTER TABLE habits DROP CONSTRAINT IF EXISTS habits_user_id_slug_key;
ALTER TABLE habits ADD CONSTRAINT habits_user_id_slug_key UNIQUE (user_id, slug);
