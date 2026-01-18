-- Migration: Rename library_habits to atoms (Sovereign Stack)

-- 1. Rename Table if exists
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'library_habits') THEN
    ALTER TABLE public.library_habits RENAME TO atoms;
  END IF;
END $$;

-- 2. Ensure Table Exists (Fallback)
CREATE TABLE IF NOT EXISTS public.atoms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT,
    name TEXT, -- Legacy support
    description TEXT,
    category TEXT,
    type TEXT,
    target_value INTEGER,
    unit TEXT,
    icon TEXT,
    theme TEXT,
    how_instruction TEXT,
    why_instruction TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Grant Permissions
ALTER TABLE public.atoms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON public.atoms;
CREATE POLICY "Allow public read access" ON public.atoms FOR SELECT USING (true);

-- 4. Grant Admin Write (Service Role usually has bypass, but explicitly:)
-- (Service role bypasses RLS, so no policy needed for write if using service key)
