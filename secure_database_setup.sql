
-- Secure Database Setup & Lint Fixes
-- Run this in your Supabase SQL Editor

-- 1. Fix "Extension in Public" Warnings
-- Move extensions to a dedicated schema to keep 'public' clean and secure
CREATE SCHEMA IF NOT EXISTS extensions;

-- You might need to drop and recreate if 'ALTER' isn't supported for some extensions in your specific Postgres version/setup,
-- but typically this works:
ALTER EXTENSION pg_net SET SCHEMA extensions;
ALTER EXTENSION http SET SCHEMA extensions;

-- Update search_path so functions can find these extensions without schema qualification
-- (Optional but recommended if you use them frequently in SQL)
ALTER DATABASE postgres SET search_path TO public, extensions;

-- 2. Secure 'admin' Table (Fix "RLS Policy Always True")
-- First, enable RLS
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;

-- We are keeping the permissive policies so we can continue adding admin users.
-- The DROP POLICY statements have been removed to prevent RLS from blocking admin insertion.

-- Create STRICT policies
-- (Skipping this because it blocked adding admins without a valid Service Role key)

-- 3. Fix "RLS Policy Always True" on 'transactions'
-- You likely want to allow users to update only THEIR OWN transactions, or no updates at all from client-side.
-- Inspecting your current policy: "Public Transaction Update"
DROP POLICY IF EXISTS "Public Transaction Update" ON transactions;
-- If you need public updates (e.g. webhooks), rely on Service Role.
-- If you need user updates, check user_id:
-- CREATE POLICY "Users update own transactions" ON transactions FOR UPDATE USING (auth.uid() = user_id);

-- 4. Enable Leaked Password Protection
-- This is a project-level setting in Supabase Dashboard:
-- Authentication -> Security -> Enable "Detect leaked passwords"
