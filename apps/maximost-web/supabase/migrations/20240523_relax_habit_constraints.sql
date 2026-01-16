-- 1. Add Context Columns (Nullable) - Ensuring they exist and are nullable
ALTER TABLE habits ADD COLUMN IF NOT EXISTS how_instruction TEXT DEFAULT NULL;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS why_instruction TEXT DEFAULT NULL;

-- 2. Add Start Date
ALTER TABLE habits ADD COLUMN IF NOT EXISTS start_date TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- 3. Safety: Alter columns to be nullable in case they were created as NOT NULL previously
ALTER TABLE habits ALTER COLUMN how_instruction DROP NOT NULL;
ALTER TABLE habits ALTER COLUMN why_instruction DROP NOT NULL;
ALTER TABLE habits ALTER COLUMN start_date DROP NOT NULL;
