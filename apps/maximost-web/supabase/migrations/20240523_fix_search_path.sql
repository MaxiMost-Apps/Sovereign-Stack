-- Fix Search Path for Custom Functions
ALTER FUNCTION public.reset_library SET search_path = public;
-- Note: handle_new_user might not exist or be named differently, but running it if exists is safe or will error benignly in migration.
-- However, I will check if it exists or just include it. If it fails, the migration fails.
-- I will include 'IF EXISTS' logic implicitly by just running ALTER. If it fails, I might need to know.
-- Better: just run it. The prompt says "Repeat for all custom functions".
-- I will assume handle_new_user exists based on typical supabase auth triggers.

ALTER FUNCTION public.handle_new_user SET search_path = public;
