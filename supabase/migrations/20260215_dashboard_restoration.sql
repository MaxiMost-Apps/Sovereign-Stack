-- 1. STANDARDIZE COLUMN NAMES
DO $$BEGIN
  IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name = 'habit_logs' AND column_name = 'id_of_habit') THEN
    ALTER TABLE public.habit_logs RENAME COLUMN id_of_habit TO habit_id;
  END IF;
END $$;

-- 2. INJECT IDENTITY LENSES & TYPES
ALTER TABLE public.habits
ADD COLUMN IF NOT EXISTS lens_stoic TEXT,
ADD COLUMN IF NOT EXISTS lens_operator TEXT,
ADD COLUMN IF NOT EXISTS lens_scientist TEXT,
ADD COLUMN IF NOT EXISTS lens_visionary TEXT,
ADD COLUMN IF NOT EXISTS habit_type TEXT DEFAULT 'ABSOLUTE', -- ABSOLUTE, QUANTITY, TIMER
ADD COLUMN IF NOT EXISTS visual_color TEXT DEFAULT 'blue',
ADD COLUMN IF NOT EXISTS stack_labels TEXT,
ADD COLUMN IF NOT EXISTS goal_target INTEGER DEFAULT 1;

-- 3. SECURITY ALIGNMENT
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
-- Check if policy exists before creating to avoid errors in repeated runs
DO $$BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'habits' AND policyname = 'Users manage own habits'
  ) THEN
    CREATE POLICY "Users manage own habits" ON public.habits USING (auth.uid() = user_id);
  END IF;
END $$;
