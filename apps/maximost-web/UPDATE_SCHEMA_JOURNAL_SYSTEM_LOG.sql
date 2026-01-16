-- Add system_log column to journal_entries if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'journal_entries' AND column_name = 'system_log') THEN
        ALTER TABLE journal_entries ADD COLUMN system_log text;
    END IF;
END $$;
