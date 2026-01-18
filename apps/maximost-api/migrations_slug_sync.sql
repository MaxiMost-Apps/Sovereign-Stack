-- Migration: Normalize Slugs to Hyphens (Sync Protocols & Habits)

-- 1. Normalize Atoms (Habits)
-- Replace underscores with hyphens to match frontend request (morning_sun -> morning-sun)
UPDATE maximost_library_habits
SET slug = REPLACE(slug, '_', '-');

-- 2. Normalize Protocol Habit References
UPDATE maximost_library_protocols
SET habit_slugs = (
  SELECT jsonb_agg(REPLACE(elem::text, '_', '-')::text)
  FROM jsonb_array_elements_text(habit_slugs) AS elem
)
WHERE habit_slugs IS NOT NULL;
