-- Migration: Add is_vanguard to profiles and create scholarships table

-- 1. Add is_vanguard column to profiles if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'is_vanguard') THEN
        ALTER TABLE profiles ADD COLUMN is_vanguard BOOLEAN DEFAULT false;
    END IF;
END $$;

-- 2. Create scholarships table
CREATE TABLE IF NOT EXISTS scholarships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    status TEXT NOT NULL DEFAULT 'available', -- available, granted, redeemed
    source_purchase_id TEXT, -- Stripe Session ID or similar
    granted_to_user_id UUID REFERENCES auth.users(id), -- The user who received the scholarship
    sponsor_id UUID REFERENCES auth.users(id), -- The Vanguard who purchased it (optional link)
    code TEXT -- Optional redemption code
);

-- 3. Add RLS policies for scholarships
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated users (or restrict as needed)
CREATE POLICY "Enable read access for authenticated users" ON scholarships
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow insert by service role (API) - implicitly allowed, but good to be explicit if using client
-- (Service role bypasses RLS, so mainly needed if we want user-initiated inserts, which we don't for now)
