-- 1. Add Role Column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- 2. Create Lore Table (The Neural Bridge)
CREATE TABLE IF NOT EXISTS system_lore (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category TEXT, -- e.g., 'Sleep', 'Discipline', 'Nutrition'
  content TEXT NOT NULL, -- The specific instruction/study
  is_active BOOLEAN DEFAULT TRUE,
  embedding VECTOR(1536) -- Optional: for future AI/Vector search if needed, nullable
);

-- Enable RLS on system_lore
ALTER TABLE system_lore ENABLE ROW LEVEL SECURITY;

-- 3. Set Founder as Admin (Placeholder - User must run manually or I can't guess ID)
-- UPDATE profiles SET role = 'admin' WHERE id = 'YOUR_USER_ID_HERE';

-- 4. Create "God Policy" for Admin
-- Policy for profiles table (Admin can do anything)
CREATE POLICY "Admin All Access Profiles" ON profiles
  FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- Policy for system_lore (Admin All Access)
CREATE POLICY "Admin All Access Lore" ON system_lore
  FOR ALL
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- Policy for system_lore (User Select only)
CREATE POLICY "User Read Lore" ON system_lore
  FOR SELECT
  USING (true);
