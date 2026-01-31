-- 1. Enable Vector Extension
create extension if not exists vector;

-- 2. Create Memories Table
create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  content text,
  embedding vector(768), -- Gemini 768 dimensions
  metadata jsonb,
  created_at timestamptz default now()
);

-- 3. Security (RLS)
alter table public.memories enable row level security;

create policy "User manages memories" on public.memories
  using (auth.uid() = user_id);

-- 4. The RPC Search Function (Critical for RAG)
create or replace function match_memories (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  content text,
  similarity float
)
language sql stable
as $$
  select
    memories.id,
    memories.content,
    1 - (memories.embedding <=> query_embedding) as similarity
  from memories
  where 1 - (memories.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
