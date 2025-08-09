/*
Run this in Supabase SQL editor BEFORE enabling policies below.
*/
create type user_role as enum ('admin','supervisor','chatter');

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role user_role not null default 'chatter',
  is_active boolean not null default true
);

create table if not exists profiles (
  user_id uuid primary key references users(id) on delete cascade,
  display_name text,
  timezone text default 'UTC',
  supervisor_id uuid references users(id)
);

create table if not exists models (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  platform text default 'onlyfans',
  notes text
);

create table if not exists chatter_model_assignments (
  id uuid primary key default gen_random_uuid(),
  chatter_id uuid not null references users(id) on delete cascade,
  model_id uuid not null references models(id) on delete cascade,
  is_active boolean not null default true
);
create index on chatter_model_assignments(chatter_id);
create index on chatter_model_assignments(model_id);

create table if not exists shifts (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  start_at timestamptz not null,
  end_at timestamptz not null,
  capacity int not null default 1,
  locked boolean not null default false,
  model_id uuid references models(id)
);
create index on shifts(start_at);

create table if not exists shift_assignments (
  id uuid primary key default gen_random_uuid(),
  shift_id uuid not null references shifts(id) on delete cascade,
  chatter_id uuid not null references users(id) on delete cascade,
  status text not null default 'assigned'
);
create index on shift_assignments(shift_id);
create index on shift_assignments(chatter_id);

create table if not exists clock_logs (
  id uuid primary key default gen_random_uuid(),
  chatter_id uuid not null references users(id) on delete cascade,
  shift_id uuid references shifts(id),
  clock_in_at timestamptz not null,
  clock_out_at timestamptz,
  active boolean not null default true
);
create index on clock_logs(chatter_id);
create index on clock_logs(active);

create table if not exists sales (
  id uuid primary key default gen_random_uuid(),
  chatter_id uuid not null references users(id) on delete cascade,
  model_id uuid not null references models(id) on delete cascade,
  subscriber_username text not null,
  amount_usd numeric(12,2) not null,
  sold_at timestamptz not null default now(),
  shift_id uuid references shifts(id)
);
create index on sales(chatter_id, sold_at);
create index on sales(model_id, sold_at);

create table if not exists payout_rules (
  id uuid primary key default gen_random_uuid(),
  chatter_id uuid not null references users(id) on delete cascade,
  pct numeric(5,2) not null,
  effective_from date not null,
  effective_to date
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  chatter_id uuid not null references users(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  subtotal_usd numeric(14,2) not null,
  pct numeric(5,2) not null,
  total_usd numeric(14,2) not null,
  status text not null default 'draft',
  generated_at timestamptz not null default now()
);

create table if not exists availability_windows (
  id uuid primary key default gen_random_uuid(),
  chatter_id uuid not null references users(id) on delete cascade,
  week_of date not null,
  day_of_week int not null,
  start_at time not null,
  end_at time not null
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  kind text not null,
  payload jsonb not null default '{}',
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references users(id),
  action text not null,
  target_table text,
  target_id uuid,
  meta jsonb default '{}',
  created_at timestamptz not null default now()
);

create table if not exists settings (
  key text primary key,
  value jsonb not null
);

-- Helper function for reports
create or replace function daily_totals()
returns table(d date, chatter_id uuid, gross numeric)
language sql stable as $$
  select date_trunc('day', sold_at)::date as d, chatter_id, sum(amount_usd) as gross
  from sales group by 1,2 order by 1 desc;
$$;
