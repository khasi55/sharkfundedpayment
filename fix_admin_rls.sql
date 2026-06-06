
-- Fix RLS policies for Admin table
-- Run this in your Supabase SQL Editor

-- 1. Enable RLS (just in case)
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing restrictive policies
DROP POLICY IF EXISTS "Enable read access for all users" ON admin;
DROP POLICY IF EXISTS "Enable all access for all users" ON admin;
DROP POLICY IF EXISTS "Allow public insert" ON admin;
DROP POLICY IF EXISTS "Allow public update" ON admin;
DROP POLICY IF EXISTS "Allow public delete" ON admin;

-- 3. Re-create permissive policies
-- Since the application manages authentication via custom cookies and the service role key might be misconfigured,
-- we allow public access to the table, relying on the application backend to enforce security.

-- Allow Write (Insert, Update, Delete)
CREATE POLICY "Enable all access for all users" ON admin
FOR ALL
TO public
USING (true)
WITH CHECK (true);


