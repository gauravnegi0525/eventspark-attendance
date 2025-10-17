-- Example schema for events/participants/registrations
-- Run this in Supabase SQL Editor or via supabase CLI

create extension if not exists pgcrypto;

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  starts_at timestamptz,
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);

create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  entry_uuid text unique,
  event_id uuid references events(id),
  checkin_status text default 'Pending',
  created_at timestamptz default now()
);

create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid references participants(id),
  event_id uuid references events(id),
  created_at timestamptz default now()
);

-- Enable RLS on events if you plan to restrict per-user access
-- Uncomment and adapt policies as needed.
-- alter table events enable row level security;
-- create policy "Events are viewable by owner" on events for select using (created_by = auth.uid());


-- Add an index for lookup by entry_uuid
create index if not exists idx_participants_entry_uuid on participants(entry_uuid);

-- Prevent duplicate registrations for the same event by email (case-insensitive)
do $$ begin
  if not exists (
    select 1 from pg_indexes where tablename = 'participants' and indexname = 'uniq_event_email'
  ) then
    execute 'create unique index uniq_event_email on participants (event_id, lower(email));';
  end if;
end$$;

-- Prevent duplicate team names for the same event (case-insensitive)
do $$ begin
  if not exists (
    select 1 from pg_indexes where tablename = 'participants' and indexname = 'uniq_event_teamname'
  ) then
    execute 'create unique index uniq_event_teamname on participants (event_id, lower(team_name));';
  end if;
end$$;
