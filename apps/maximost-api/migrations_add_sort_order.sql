-- Migration: Add sort_order to habits table (Schema Alignment)

ALTER TABLE public.habits
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Optional: Initialize sort_order based on creation date to preserve order
-- WITH numbered AS (
--   SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) - 1 as rn
--   FROM habits
-- )
-- UPDATE habits
-- SET sort_order = numbered.rn
-- FROM numbered
-- WHERE habits.id = numbered.id;
