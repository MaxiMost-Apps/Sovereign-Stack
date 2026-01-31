-- Standardize the ID column for logs
DO $$BEGIN
  IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name = 'habit_logs' AND column_name = 'id_of_habit') THEN
    ALTER TABLE public.habit_logs RENAME COLUMN id_of_habit TO habit_id;
  END IF;
END $$;

-- Ensure all required columns exist for the Dash to render
ALTER TABLE public.habits
ADD COLUMN IF NOT EXISTS lens_stoic TEXT,
ADD COLUMN IF NOT EXISTS lens_operator TEXT,
ADD COLUMN IF NOT EXISTS lens_scientist TEXT,
ADD COLUMN IF NOT EXISTS lens_visionary TEXT,
ADD COLUMN IF NOT EXISTS habit_type TEXT DEFAULT 'ABSOLUTE',
ADD COLUMN IF NOT EXISTS visual_color TEXT DEFAULT 'blue',
ADD COLUMN IF NOT EXISTS stack_labels TEXT,
ADD COLUMN IF NOT EXISTS goal_target INTEGER DEFAULT 1;

-- Fix RLS if needed (ensure policies exist)
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
DO $$BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'habits' AND policyname = 'Users manage own habits') THEN
    CREATE POLICY "Users manage own habits" ON public.habits USING (auth.uid() = user_id);
  END IF;
END $$;
