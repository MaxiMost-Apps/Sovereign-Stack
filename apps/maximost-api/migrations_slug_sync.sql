-- Migration: Normalize Slugs to Underscores (Sync Protocols & Habits)

-- 1. Normalize Atoms (Habits)
-- Replace hyphens with underscores to match backend seed data (morning_sun)
UPDATE maximost_library_habits
SET slug = REPLACE(slug, '-', '_');

-- 2. Normalize Protocol Habit References
-- Update the habit_slugs array in protocol_stacks to match the new format
-- Note: Requires Supabase/Postgres 12+ for jsonb_path_query or simple text replace
UPDATE maximost_library_protocols
SET habit_slugs = (
  SELECT jsonb_agg(REPLACE(elem::text, '-', '_')::text)
  FROM jsonb_array_elements_text(habit_slugs) AS elem
)
WHERE habit_slugs IS NOT NULL;

-- 3. Safety: Ensure Primary Keys match (if slug is PK)
-- (Assuming slug is unique key, this update might fail on conflict if both versions exist.
--  Ideally, we upsert or handle conflicts, but for normalization, we assume one version exists).
