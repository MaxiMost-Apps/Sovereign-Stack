-- Emergency Migration: Sovereign Keys Table
-- Ensures the table exists for the Architect Scholarship logic.

CREATE TABLE IF NOT EXISTS public.sovereign_keys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    key_code TEXT NOT NULL UNIQUE,
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'redeemed', 'revoked')),
    redeemed_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    redeemed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.sovereign_keys ENABLE ROW LEVEL SECURITY;

-- Policy: Owners can view their keys
DROP POLICY IF EXISTS "Owners view keys" ON public.sovereign_keys;
CREATE POLICY "Owners view keys" ON public.sovereign_keys
    FOR SELECT USING (auth.uid() = owner_id);

-- Policy: Admins view all
DROP POLICY IF EXISTS "Admins view all keys" ON public.sovereign_keys;
CREATE POLICY "Admins view all keys" ON public.sovereign_keys
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND (role = 'admin' OR role = 'ROOT_ADMIN')
        )
    );
