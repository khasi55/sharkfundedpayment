-- Create transactions table
create table public.transactions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  amount numeric not null,
  utr text not null unique,
  order_id text,
  status text not null default 'pending',
  customer_details jsonb
);

-- Enable Row Level Security
alter table public.transactions enable row level security;

-- Create policy to allow anyone to insert transactions (for demo purposes)
-- In production, you might want to restrict this or use a server-side insert
create policy "Enable insert for all users"
on public.transactions
for insert
to public
with check (true);

-- Create policy to allow reading own transactions (if we had auth)
-- For now, we'll just allow reading by anyone for demo, or restrict to service role
create policy "Enable read access for all users"
on public.transactions
for select
to public
using (true);

-- Create webhook_logs table for persistence
create table public.webhook_logs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  utr text,
  amount numeric,
  sender text,
  raw_text text,
  payload jsonb
);

-- Enable RLS
alter table public.webhook_logs enable row level security;

-- Allow insert from public (for the webhook) - In production, restrict this!
create policy "Enable insert for all users"
on public.webhook_logs
for insert
to public
with check (true);

-- Allow read access
create policy "Enable read access for all users"
on public.webhook_logs
for select
to public
using (true);
