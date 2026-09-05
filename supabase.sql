-- Contact inbox for the portfolio form. Run this once in Supabase: SQL Editor -> New query.
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Allow anyone to SEND a message, but never read/list them.
alter table public.contact_messages enable row level security;

drop policy if exists "anon can insert messages" on public.contact_messages;
create policy "anon can insert messages"
  on public.contact_messages for insert
  to anon
  with check (true);

-- No select/update/delete policies: anonymous users can only insert.
-- Read new messages in Supabase: Table Editor -> contact_messages.
