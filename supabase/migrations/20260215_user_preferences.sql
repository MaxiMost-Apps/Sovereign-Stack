-- Create User Preferences Table
CREATE TABLE IF NOT EXISTS public.user_preferences (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    active_lens TEXT DEFAULT 'stoic',
    settings JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Create Policy
CREATE POLICY "Users manage own preferences" ON public.user_preferences
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Grant Access
GRANT ALL ON public.user_preferences TO authenticated;
GRANT ALL ON public.user_preferences TO service_role;
