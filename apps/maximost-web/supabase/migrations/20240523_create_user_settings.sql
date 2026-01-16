-- Create user_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  coach_preference TEXT DEFAULT 'stoic',
  day_end_offset INTEGER DEFAULT 0,
  reduced_motion BOOLEAN DEFAULT FALSE,
  start_of_week TEXT DEFAULT 'MONDAY',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create Policy for Insert/Update/Select
CREATE POLICY "Users can manage their own settings" ON user_settings
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
