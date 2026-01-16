-- Schema Healing
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS display_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS callsign TEXT;

-- Role Promotion
UPDATE profiles SET role = 'ROOT_ADMIN' WHERE email = 'admin@maximost.com';

-- Enforce Security
ALTER TABLE library_habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE protocol_stacks ENABLE ROW LEVEL SECURITY;
