
-- Create the transactions table if it doesn't exist (safeguard)
CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    amount DECIMAL NOT NULL,
    utr TEXT,
    order_id TEXT,
    status TEXT DEFAULT 'pending',
    screenshot_url TEXT,
    customer_details JSONB
);

-- Add screenshot_url column if it doesn't exist (idempotent)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'transactions' AND column_name = 'screenshot_url') THEN
        ALTER TABLE transactions ADD COLUMN screenshot_url text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'transactions' AND column_name = 'merchant_upi_id') THEN
        ALTER TABLE transactions ADD COLUMN merchant_upi_id text;
    END IF;
END $$;

-- Storage Bucket Setup
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment_proofs', 'payment_proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies (Drop first to avoid "already exists" error)
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
CREATE POLICY "Allow public uploads"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'payment_proofs');

DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
CREATE POLICY "Allow public read"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'payment_proofs');

-- RLS Policies for Transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Drop existing transaction policies to avoid conflicts
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."transactions";
DROP POLICY IF EXISTS "Enable insert access for all users" ON "public"."transactions";
DROP POLICY IF EXISTS "Enable update access for all users" ON "public"."transactions";

-- Allow anyone to read transactions (for now, for admin panel)
CREATE POLICY "Enable read access for all users" ON "public"."transactions"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- Allow anyone to insert transactions (for payment page)
CREATE POLICY "Enable insert access for all users" ON "public"."transactions"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true);

-- Allow anyone to update transactions (for admin panel approvals)
CREATE POLICY "Enable update access for all users" ON "public"."transactions"
AS PERMISSIVE FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Enable Realtime for transactions
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND schemaname = 'public' 
        AND tablename = 'transactions'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE transactions;
    END IF;
END $$;

-- Admin Table
CREATE TABLE IF NOT EXISTS admin (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'subadmin',
    permissions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS for Admin
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;

-- Simple policies to allow the Admin Management UI to work
-- (Following the existing open pattern in this schema)
DROP POLICY IF EXISTS "Enable read access for all users" ON admin;
CREATE POLICY "Enable read access for all users" ON admin FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable all access for all users" ON admin;
CREATE POLICY "Enable all access for all users" ON admin FOR ALL USING (true);

-- RPC Function for Login
CREATE OR REPLACE FUNCTION check_admin_login(email_input TEXT, password_input TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    admin_user RECORD;
BEGIN
    SELECT * INTO admin_user FROM admin WHERE email = email_input AND password = password_input;
    
    IF FOUND THEN
        RETURN jsonb_build_object(
            'success', true,
            'user', jsonb_build_object(
                'id', admin_user.id,
                'email', admin_user.email,
                'name', admin_user.name,
                'role', COALESCE(admin_user.role, 'subadmin'),
                'permissions', COALESCE(admin_user.permissions, '[]'::jsonb)
            )
        );
    ELSE
        RETURN jsonb_build_object('success', false, 'message', 'Invalid credentials');
    END IF;
END;
$$ SET search_path = public;

-- Default Admin User
INSERT INTO admin (email, password, name, role)
VALUES ('admin@sharkfunded.com', 'admin123', 'Super Admin', 'superadmin')
ON CONFLICT (email) DO NOTHING;

-- Webhook Logs Table (for storing incoming SMS/payment notifications)
CREATE TABLE IF NOT EXISTS webhook_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    utr TEXT,
    amount DECIMAL,
    sender TEXT,
    raw_text TEXT,
    payload JSONB,
    is_otp BOOLEAN DEFAULT FALSE,
    otp_code TEXT,
    otp_name TEXT
);

-- RLS for Webhook Logs
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;

-- Allow public insert (for the webhook endpoint) - In a real app, you'd want to secure this better
DROP POLICY IF EXISTS "Enable insert access for all users" ON "public"."webhook_logs";
CREATE POLICY "Enable insert access for all users" ON "public"."webhook_logs"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true);

-- Allow public read (for verification)
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."webhook_logs";
CREATE POLICY "Enable read access for all users" ON "public"."webhook_logs"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- Indexes for Performance (Critical for handling 200-300 users)
CREATE INDEX IF NOT EXISTS idx_transactions_order_id ON transactions(order_id);

-- Enable Realtime for Webhook Logs
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND schemaname = 'public' 
        AND tablename = 'webhook_logs'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE webhook_logs;
    END IF;
END $$;
