-- Consolidated script for Admin Management & RBAC Setup (using admin table)
-- Run this in your Supabase SQL Editor

-- 1. Create or Update the Admin Table
CREATE TABLE IF NOT EXISTS admin (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'subadmin',
    permissions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure the permissions column exists if the table already existed
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'admin' AND column_name = 'permissions') THEN
        ALTER TABLE admin ADD COLUMN permissions JSONB DEFAULT '[]'::jsonb;
    END IF;
END $$;

-- 2. Setup Row Level Security (RLS)
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable read access for all users" ON admin;
DROP POLICY IF EXISTS "Enable all access for all users" ON admin;

-- Allow reading admin list (needed for management UI)
CREATE POLICY "Enable read access for all users" ON admin
FOR SELECT
TO public
USING (true);

-- Allow full management (insert/update/delete)
CREATE POLICY "Enable all access for all users" ON admin
FOR ALL
TO public
USING (true);

-- 3. Create/Update Default Super Admin
INSERT INTO admin (email, password, name, role, permissions)
VALUES (
    'admin@sharkfunded.com', 
    'admin123', 
    'Super Admin', 
    'superadmin', 
    '["dashboard", "transactions", "webhook-logs", "users", "system-status", "api-logs", "otps"]'
)
ON CONFLICT (email) 
DO UPDATE SET 
    role = EXCLUDED.role,
    permissions = EXCLUDED.permissions;

-- 4. Admin Login RPC Function
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
$$;
