-- Migration: 002_schema_repair.sql
-- Fix Missing Identity and Sync Failures

-- 1. Ensure User Habits table has required columns
ALTER TABLE habits ADD COLUMN IF NOT EXISTS start_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS slug TEXT;

-- 2. Backfill Title from Name (if Name exists, otherwise Title remains null or needs fetch)
-- Assuming 'name' column exists based on previous code usage
UPDATE habits SET title = name WHERE title IS NULL;

-- 3. Ensure Start Date is set
-- Using created_at if available, else today
UPDATE habits SET start_date = COALESCE(created_at::DATE, CURRENT_DATE) WHERE start_date IS NULL;
