-- EMERGENCY POISON FLUSH
-- Deletes all active habits for the specified user to clear "poison" data causing dashboard crashes.
-- Run this in the Supabase SQL Editor.

DELETE FROM habits
WHERE user_id = 'a8f36177-2f08-4da4-b6b6-cbc8e065cc5f';

-- Optional: Clear journal logs if needed (Uncomment to execute)
-- DELETE FROM habit_logs WHERE user_id = 'a8f36177-2f08-4da4-b6b6-cbc8e065cc5f';
