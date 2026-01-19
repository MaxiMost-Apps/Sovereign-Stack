-- 1. ADD THE MISSING COLUMNS (Fixes 'target_count' & Frequency crashes)
ALTER TABLE habits
ADD COLUMN IF NOT EXISTS target_count INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS daily_goal INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS frequency TEXT DEFAULT 'daily',
ADD COLUMN IF NOT EXISTS base_color TEXT DEFAULT '#6366F1',
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- 2. WIPE THE "GHOST" DATA (42 Items -> 0 Items)
TRUNCATE TABLE habits CASCADE;

-- 3. SEED THE "CORE 4" (Fixes 'Habit Not Found' errors)
INSERT INTO habits (slug, title, category, frequency, target_count, base_color, metadata)
VALUES
  ('morning-sunlight', 'Morning Sunlight', 'BIO', 'daily', 1, '#F59E0B', '{"logic": "Circadian Anchor"}'),
  ('sauna-heat', 'Sauna / Heat', 'BIO', 'daily', 20, '#EF4444', '{"logic": "Heat Shock Protein activation"}'),
  ('intermittent-fasting', 'Intermittent Fasting', 'FUEL', 'daily', 16, '#10B981', '{"logic": "Metabolic flexibility"}'),
  ('shadow-audit', 'The Shadow Audit', 'STOIC', 'daily', 1, '#6366F1', '{"logic": "End of Watch debrief"}')
-- (Cyrus will script the rest, but this gets the CORE 4 working immediately)
ON CONFLICT (slug) DO UPDATE SET
  frequency = EXCLUDED.frequency,
  base_color = EXCLUDED.base_color;
