-- Migration: Initial Aegis Schema
-- Date: 2024-01-01
-- Description: Sets up profiles and aegis_audit_logs with RLS.

-- 1. PROFILES TABLE
-- This table extends auth.users.
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  tier_name text default 'INITIATE',
  is_vanguard boolean default false, -- Legacy flag
  stripe_customer_id text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

-- Policy: Users can read their own profile.
create policy "Users can read own profile"
  on profiles for select
  using ( auth.uid() = id );

-- 2. AEGIS AUDIT LOGS TABLE
-- Stores security and action logs.
create table if not exists aegis_audit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete set null,
  action_type text not null, -- e.g. 'LOGIN', 'API_KEY_GEN'
  severity text not null,    -- e.g. 'INFO', 'WARN', 'CRITICAL'
  metadata jsonb,
  timestamp timestamptz default now()
);

alter table aegis_audit_logs enable row level security;

-- Policy: Users can read their own logs.
create policy "Users can read own logs"
  on aegis_audit_logs for select
  using ( auth.uid() = user_id );

-- Policy: Architects can read all logs.
-- Checks if the current user has tier_name = 'ARCHITECT' in profiles.
create policy "Architects can read all logs"
  on aegis_audit_logs for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and tier_name = 'ARCHITECT'
    )
  );
