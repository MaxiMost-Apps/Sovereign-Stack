-- Migration: Create sovereign_keys table for Scholarship Protocol
-- Created: 2026-02-18

CREATE TABLE IF NOT EXISTS sovereign_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  key_code TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'AVAILABLE',
  recipient_email TEXT,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  redeemed_by_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_sovereign_keys_code ON sovereign_keys(key_code);
CREATE INDEX IF NOT EXISTS idx_sovereign_keys_creator ON sovereign_keys(creator_id);

-- RLS Policies
ALTER TABLE sovereign_keys ENABLE ROW LEVEL SECURITY;

-- Creators can view their own keys
CREATE POLICY "Creators can view own keys" ON sovereign_keys
  FOR SELECT USING (auth.uid() = creator_id);

-- Service role has full access (no policy needed usually, but good to be explicit if strict)
-- (Supabase service role bypasses RLS by default)

-- Public can check if a key is valid/available (via RPC or specific query, but simpler via API)
-- We'll restrict direct access to creators only. Redemption happens via secure API endpoint.
