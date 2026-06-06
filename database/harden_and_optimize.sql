-- Security and Performance Migration
-- 1. Harden Row Level Security (RLS) on transactions table
-- Drop existing update and insert policies
DROP POLICY IF EXISTS "Public Transaction Update" ON public.transactions;
DROP POLICY IF EXISTS "Enable update access for all users" ON public.transactions;
DROP POLICY IF EXISTS "Public Transaction Initiate" ON public.transactions;
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.transactions;

-- Re-create INSERT policy (must not insert as 'verified')
CREATE POLICY "Public Transaction Initiate" ON public.transactions 
FOR INSERT TO public 
WITH CHECK (amount >= 0 AND (status IS NULL OR status IS DISTINCT FROM 'verified'));

-- Re-create UPDATE policy (must not update status to 'verified')
CREATE POLICY "Public Transaction Update" ON public.transactions 
FOR UPDATE TO public 
USING (true) 
WITH CHECK (status IS NULL OR status IS DISTINCT FROM 'verified');

-- 2. Performance Optimization Indexes
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_utr ON transactions(utr);
