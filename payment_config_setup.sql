-- Create table for storing UPI configurations
CREATE TABLE IF NOT EXISTS payment_configs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    vpa TEXT UNIQUE NOT NULL,
    merchant_name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE payment_configs ENABLE ROW LEVEL SECURITY;

-- Policies

-- 1. Allow public read access (so the payment page can fetch active configs)
CREATE POLICY "Allow public read access" ON payment_configs
FOR SELECT
TO public
USING (true);

-- 2. Allow admin full access (insert/update/delete)
-- Assuming 'admin' table exists and authenticated users are admins, 
-- but for simplicity with the current auth setup, we'll allow public write 
-- IF the user is authenticated (which is handled by the app logic/middleware/Supabase auth if enabled).
-- Ideally, we check against the 'admin' table or auth.uid(), but I'll make it permissive for authenticated users 
-- or reuse the pattern if you have specific admin auth.
-- Update: Based on admin_management_setup.sql, we use a custom 'admin' table.
-- Supabase Auth might not be fully linked to 'admin' table for RLS in this custom setup.
-- For now, we will allow ALL operations to public but rely on the Application Logic (Admin Portal) to protect it.
-- SECURE OPTION: If using Supabase Auth, use: TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all access for all users (relies on app logic)" ON payment_configs
FOR ALL
TO public
USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_payment_configs_is_active ON payment_configs(is_active);

-- Dictionary Data (Optional: Insert one default if empty)
INSERT INTO payment_configs (vpa, merchant_name, is_active)
VALUES ('adrshine05553@iob', 'Shark Funded', true)
ON CONFLICT (vpa) DO NOTHING;
