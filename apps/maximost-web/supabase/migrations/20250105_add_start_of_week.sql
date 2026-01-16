-- Add start_of_week column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS start_of_week text DEFAULT 'MONDAY';
