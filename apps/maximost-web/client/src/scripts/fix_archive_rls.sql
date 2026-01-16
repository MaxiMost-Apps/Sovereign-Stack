-- FIX ARCHIVE RLS POLICIES
-- Ensures the library tables are readable by everyone (including guests if needed, but definitely authenticated users)

-- 1. Enable RLS (Good practice, but we'll add policies)
ALTER TABLE library_habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_protocols ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to prevent conflicts
DROP POLICY IF EXISTS "Public Read Access" ON library_habits;
DROP POLICY IF EXISTS "Public Read Access" ON library_protocols;

-- 3. Create permissive SELECT policies
-- Allow anyone (anon + authenticated) to read the library
CREATE POLICY "Public Read Access" ON library_habits
FOR SELECT USING (true);

CREATE POLICY "Public Read Access" ON library_protocols
FOR SELECT USING (true);

-- 4. Verify grants (Sapper Check)
GRANT SELECT ON library_habits TO anon, authenticated, service_role;
GRANT SELECT ON library_protocols TO anon, authenticated, service_role;
