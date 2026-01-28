-- 1. DROP THE BROKEN TABLE
DROP TABLE IF EXISTS habits CASCADE;

-- 2. CREATE THE FRESH TABLE (Aligned with Titan Code)
CREATE TABLE habits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  habit_id text NOT NULL,
  title text,
  status text DEFAULT 'active', -- 'active', 'archived', 'completed'
  streak int DEFAULT 0,
  last_completed date,
  metadata jsonb DEFAULT '{}'::jsonb,

  -- Prevent duplicate entries for the same habit
  UNIQUE(user_id, habit_id)
);

-- 3. ENABLE SECURITY (Fixes 406 Not Acceptable)
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

-- 4. GRANT PERMISSIONS (Fixes 400 Bad Request)
CREATE POLICY "Users can ALL on own habits"
ON habits FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 5. VERIFY (Should return 0 rows, no error)
SELECT * FROM habits LIMIT 1;
