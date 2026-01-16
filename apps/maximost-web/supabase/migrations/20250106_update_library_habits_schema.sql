-- 20250106_update_library_habits_schema.sql
-- Ensure library_habits has the correct columns for "The Big Bang" ingestion

ALTER TABLE library_habits ADD COLUMN IF NOT EXISTS how_instruction TEXT;
ALTER TABLE library_habits ADD COLUMN IF NOT EXISTS why_instruction TEXT;
ALTER TABLE library_habits ADD COLUMN IF NOT EXISTS category TEXT;
