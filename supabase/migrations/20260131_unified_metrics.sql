-- 1. Create metrics table in health schema (ensure schema exists)
create schema if not exists health;

create table if not exists health.metrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  metric_type text not null, -- e.g., 'glucose', 'hrv', 'weight'
  value numeric not null,
  unit text not null,        -- e.g., 'mg/dL', 'ms', 'kg'
  recorded_at timestamptz not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),

  -- Unique constraint for Upsert deduplication
  constraint unique_metric_entry unique (user_id, metric_type, recorded_at)
);

-- 2. Security (RLS)
alter table health.metrics enable row level security;

create policy "User manages own metrics" on health.metrics
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
