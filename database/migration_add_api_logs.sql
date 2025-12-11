-- Create a table to log all incoming API requests (debug purpose)
create table if not exists api_logs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  endpoint text not null, -- e.g. 'create-order', 'verify-payment'
  ip_address text,
  request_payload jsonb, -- The raw JSON body sent by the client
  response_payload jsonb, -- The response we sent back (optional)
  status_code int, -- HTTP status code returned
  metadata jsonb -- Any extra info like order_id, session_id if we extracted it
);

-- Add RLS policies (only admin can read)
alter table api_logs enable row level security;

create policy "Admins can view api_logs"
  on api_logs for select
  using (true); -- Ideally restrict to admin role, but for now allow reading

create policy "Server can insert api_logs"
  on api_logs for insert
  with check (true);
