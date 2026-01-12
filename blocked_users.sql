create table blocked_users (
  email text primary key,
  reason text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table blocked_users enable row level security;

-- Create Policy: Allow read access to everyone (so the API can check it)
create policy "Enable access for service role only" on blocked_users for all using (true);
