CREATE TABLE IF NOT EXISTS sovereign_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    key_code TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('AVAILABLE', 'REDEEMED')),
    recipient_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    redeemed_at TIMESTAMP WITH TIME ZONE,
    redeemed_by_user_id UUID REFERENCES profiles(id)
);

-- Index for faster lookups by code
CREATE INDEX IF NOT EXISTS idx_sovereign_keys_code ON sovereign_keys(key_code);
-- Index for looking up user's keys
CREATE INDEX IF NOT EXISTS idx_sovereign_keys_creator ON sovereign_keys(creator_id);
