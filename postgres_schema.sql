-- Full PostgreSQL Schema for SharkPay Database

-- Enable extensions for UUID generation if not available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    amount NUMERIC NOT NULL,
    utr TEXT,
    order_id TEXT,
    session_id TEXT,
    status TEXT DEFAULT 'pending',
    screenshot_url TEXT,
    merchant_upi_id TEXT,
    approved_by TEXT,
    customer_details JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_transactions_order_id ON transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_transactions_session_id ON transactions(session_id);
CREATE INDEX IF NOT EXISTS idx_transactions_utr ON transactions(utr);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);

-- 2. Admin Table
CREATE TABLE IF NOT EXISTS admin (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'subadmin',
    permissions JSONB DEFAULT '[]'::jsonb,
    two_factor_secret TEXT,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_admin_email ON admin(email);

-- Default Super Admin Insertion
INSERT INTO admin (email, password, name, role, permissions)
VALUES (
    'admin@sharkfunded.com', 
    'admin123', 
    'Super Admin', 
    'superadmin', 
    '["dashboard", "transactions", "webhook-logs", "users", "system-status", "api-logs", "otps", "payment-settings", "activity-logs"]'
)
ON CONFLICT (email) 
DO UPDATE SET 
    role = EXCLUDED.role,
    permissions = EXCLUDED.permissions;

-- 3. Webhook Logs Table (Receives incoming SMS & OTP notifications)
CREATE TABLE IF NOT EXISTS webhook_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    utr TEXT,
    amount NUMERIC,
    sender TEXT,
    raw_text TEXT,
    payload JSONB,
    is_otp BOOLEAN DEFAULT FALSE,
    otp_code TEXT,
    otp_name TEXT
);

CREATE INDEX IF NOT EXISTS idx_webhook_logs_utr ON webhook_logs(utr);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_is_otp ON webhook_logs(is_otp);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_created_at ON webhook_logs(created_at DESC);

-- 4. Payment Configs Table
CREATE TABLE IF NOT EXISTS payment_configs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    vpa TEXT UNIQUE NOT NULL,
    merchant_name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_payment_configs_is_active ON payment_configs(is_active);

-- Default Payment Config Insertion
INSERT INTO payment_configs (vpa, merchant_name, is_active)
VALUES ('adrshine05553@iob', 'Shark Funded', true)
ON CONFLICT (vpa) DO NOTHING;

-- 5. Action OTPs Table (Stores admin action & login verification OTPs)
CREATE TABLE IF NOT EXISTS action_otps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    otp TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_action_otps_email ON action_otps(email);

-- 6. Blocked Users Table
CREATE TABLE IF NOT EXISTS blocked_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_blocked_users_email ON blocked_users(email);

-- 7. Rate Limits Table
CREATE TABLE IF NOT EXISTS rate_limits (
    key TEXT PRIMARY KEY,
    count INT DEFAULT 1,
    last_request TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_admin_email ON audit_logs(admin_email);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- 9. API Logs Table
CREATE TABLE IF NOT EXISTS api_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    endpoint TEXT NOT NULL,
    ip_address TEXT,
    request_payload JSONB,
    response_payload JSONB,
    status_code INT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_api_logs_created_at ON api_logs(created_at DESC);
