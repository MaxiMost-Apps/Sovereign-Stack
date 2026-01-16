-- PART 2: FRONTEND UPDATES SCHEMA
-- Run this SQL in your Supabase SQL Editor to support the new features.

-- 1. JOURNAL ENTRIES (Task A)
create table if not exists journal_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  date date not null,
  am_entry text,
  pm_entry text,
  free_entry text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, date)
);
alter table journal_entries enable row level security;
create policy "User manages own journal" on journal_entries for all using (auth.uid() = user_id);

-- 2. AI CHAT HISTORY (Task B)
-- Replaces/Augments the previous 'chat_history' table
create table if not exists ai_chat_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  role text not null, -- 'user' or 'model'
  content text not null,
  created_at timestamptz default now()
);
alter table ai_chat_history enable row level security;
create policy "User manages own AI chat" on ai_chat_history for all using (auth.uid() = user_id);
