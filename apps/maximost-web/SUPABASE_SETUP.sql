-- 1. CHAT HISTORY
create table if not exists chat_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  role text not null, -- 'user' or 'ai'
  content text not null,
  created_at timestamptz default now()
);
alter table chat_history enable row level security;
create policy "User manages own chat" on chat_history for all using (auth.uid() = user_id);

-- 2. USER MEMORIES
create table if not exists user_memories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  memory_text text not null,
  category text default 'manual',
  created_at timestamptz default now()
);
alter table user_memories enable row level security;
create policy "User manages own memories" on user_memories for all using (auth.uid() = user_id);
