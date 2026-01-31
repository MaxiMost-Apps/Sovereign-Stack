-- 1. SCHEMAS
CREATE SCHEMA IF NOT EXISTS health;

-- 2. HABITS (The Battlefield Foundation)
-- This fixes the "habit_id" column error seen in console
CREATE TABLE IF NOT EXISTS public.habits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    visual_color TEXT DEFAULT '#3b82f6',
    -- IDENTITY LENS FIELDS (The pre-filled drawer data)
    lens_stoic TEXT,
    lens_operator TEXT,
    lens_scientist TEXT,
    lens_visionary TEXT,
    -- CONFIG
    stack_labels TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HABIT LOGS (The Toggle/Circle logic)
CREATE TABLE IF NOT EXISTS public.habit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    habit_id UUID REFERENCES public.habits(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    date DATE NOT NULL,
    status TEXT DEFAULT 'pending', -- 'completed' triggers blue glow
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(habit_id, date)
);

-- 4. BIO-METRICS (The Health Schema)
CREATE TABLE IF NOT EXISTS health.glucose_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    sgv INTEGER NOT NULL,
    recorded_at TIMESTAMPTZ NOT NULL,
    UNIQUE(user_id, recorded_at)
);

-- 5. SECURITY (RLS)
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own habits" ON public.habits USING (auth.uid() = user_id);
CREATE POLICY "Users manage own logs" ON public.habit_logs USING (auth.uid() = user_id);