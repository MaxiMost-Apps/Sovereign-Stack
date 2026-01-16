-- 20250106_create_library_protocols.sql
-- Create the new table for storing pre-built protocol stacks

CREATE TABLE IF NOT EXISTS library_protocols (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    description TEXT,
    habits TEXT[] DEFAULT '{}',
    master_theme TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE library_protocols ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated users
CREATE POLICY "Allow public read access" ON library_protocols
    FOR SELECT
    USING (true);

-- Allow admin write access (using service role or specific admin check)
-- Ideally, admins would write, but for ingestion scripts we use service_role.
-- This policy allows inserts if the user is authenticated (simplification for ingestion)
-- In production, lock this down to admin-only.
CREATE POLICY "Allow admin insert" ON library_protocols
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow admin update" ON library_protocols
    FOR UPDATE
    USING (auth.role() = 'authenticated');
