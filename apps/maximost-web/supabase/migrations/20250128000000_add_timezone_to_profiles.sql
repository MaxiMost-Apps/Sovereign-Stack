-- MIGRATION: Add timezone to profiles (Idempotent)
-- DATE: 2025-01-28
-- AUTHOR: Cyrus (The Skeleton)

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'timezone') THEN
        ALTER TABLE public.profiles ADD COLUMN timezone TEXT DEFAULT 'UTC';
    END IF;
END $$;

-- Fix existing nulls if any
UPDATE public.profiles SET timezone = 'UTC' WHERE timezone IS NULL;
