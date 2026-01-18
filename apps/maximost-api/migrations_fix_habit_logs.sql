-- Fix habit_logs Unique Constraint for Upsert
-- This ensures the ON CONFLICT clause in the API works correctly.

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'habit_logs_user_habit_date_key') THEN
        ALTER TABLE public.habit_logs
        ADD CONSTRAINT habit_logs_user_habit_date_key UNIQUE (user_id, habit_id, completed_at);
    END IF;
END $$;
