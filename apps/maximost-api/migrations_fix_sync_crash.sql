-- 1. DELETE DUPLICATES (To allow the rule to be applied)
DELETE FROM habit_logs
WHERE id IN (
  SELECT id FROM (
    SELECT id,
    ROW_NUMBER() OVER (partition BY user_id, habit_id, completed_at ORDER BY id DESC) AS r
    FROM habit_logs
  ) t
  WHERE t.r > 1
);

-- 2. ADD THE CONSTRAINT (The Fix for the Red Error)
ALTER TABLE habit_logs
ADD CONSTRAINT habit_logs_unique_day
UNIQUE (user_id, habit_id, completed_at);

-- 3. VERIFY COLUMNS (Just to be safe based on your screenshots)
ALTER TABLE habits ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT 'Activity';
ALTER TABLE habits ADD COLUMN IF NOT EXISTS color TEXT DEFAULT 'maximost_blue';
