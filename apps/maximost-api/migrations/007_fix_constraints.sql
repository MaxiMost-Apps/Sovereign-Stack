-- Migration: 007_fix_constraints.sql
-- Fix Duplicate Key Errors by enforcing known constraints for Upsert

-- 1. Habits Table (User Habits)
-- Ensure (user_id, slug) is unique so ON CONFLICT (user_id, slug) works
ALTER TABLE habits DROP CONSTRAINT IF EXISTS habits_user_id_slug_key;
ALTER TABLE habits ADD CONSTRAINT habits_user_id_slug_key UNIQUE (user_id, slug);

-- 2. Habit Logs Table
-- Ensure (user_id, habit_id, completed_at) is unique for toggle upsert
ALTER TABLE habit_logs DROP CONSTRAINT IF EXISTS habit_logs_user_id_habit_id_completed_at_key;
ALTER TABLE habit_logs ADD CONSTRAINT habit_logs_user_id_habit_id_completed_at_key UNIQUE (user_id, habit_id, completed_at);
