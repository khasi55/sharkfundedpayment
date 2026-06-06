-- Database Security Hardening Script (v2.5 - Dynamic & Idempotent)
-- Optimized for Supabase: Addresses search_path, extensions, and RLS bypasses.
-- Restores SELECT access for admin dashboard and INSERT/UPDATE for checkout flow.

-- 1. Setup Extensions Schema
CREATE SCHEMA IF NOT EXISTS extensions;
GRANT USAGE ON SCHEMA extensions TO postgres, anon, authenticated, service_role;

-- 2. Move Extensions out of Public Schema (Graceful)
DO $$
BEGIN
    BEGIN
        IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_net' AND (SELECT nspname FROM pg_namespace n JOIN pg_extension e ON e.extnamespace = n.oid WHERE e.extname = 'pg_net') = 'public') THEN
            ALTER EXTENSION pg_net SET SCHEMA extensions;
            RAISE NOTICE 'Moved pg_net to extensions schema.';
        END IF;
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Skipped moving pg_net: %', SQLERRM;
    END;
    
    BEGIN
        IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'http' AND (SELECT nspname FROM pg_namespace n JOIN pg_extension e ON e.extnamespace = n.oid WHERE e.extname = 'http') = 'public') THEN
            ALTER EXTENSION http SET SCHEMA extensions;
            RAISE NOTICE 'Moved http to extensions schema.';
        END IF;
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Skipped moving http: %', SQLERRM;
    END;
END $$;

-- 3. Dynamic Function Search Path Hardening
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT n.nspname as schema_name, p.proname as func_name, pg_get_function_identity_arguments(p.oid) as args
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
    LOOP
        BEGIN
            EXECUTE format('ALTER FUNCTION %I.%I(%s) SET search_path = public', r.schema_name, r.func_name, r.args);
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Skipped func %I.%I(%s): %', r.schema_name, r.func_name, r.args, SQLERRM;
        END;
    END LOOP;
END $$;

-- 4. Dynamic RLS Hardening (Clean Slate Approach)
DO $$
DECLARE
    target_table text;
    target_tables text[] := ARRAY['transactions', 'admin', 'webhook_logs', 'action_otps', 'payment_config', 'api_logs', 'admin_audit_logs', 'notifications', 'blocked_users'];
    r RECORD;
BEGIN
    FOREACH target_table IN ARRAY target_tables LOOP
        IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = target_table) THEN
            -- Enable RLS
            EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', target_table);
            
            -- Drop ALL existing policies for this table to ensure a clean slate
            FOR r IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = target_table LOOP
                EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', r.policyname, target_table);
            END LOOP;
            
            -- Default: ALL access for service_role (Secure)
            EXECUTE format('CREATE POLICY "Service Role Full Access" ON public.%I FOR ALL TO service_role USING (true) WITH CHECK (true)', target_table);
            
            -- Specific Public Access Exceptions (Minimal)
            
            -- Webhook Logs: Needs public INSERT (for incoming webhooks)
            IF target_table = 'webhook_logs' THEN
                EXECUTE 'CREATE POLICY "Public Webhook Insert" ON public.webhook_logs FOR INSERT TO public WITH CHECK (id IS NOT NULL)';
            END IF;
            
            -- Transactions: Needs public INSERT/SELECT/UPDATE for checkout
            -- SELECT is allowed publicly to fetch order details by ID (UUID obscurity)
            IF target_table = 'transactions' THEN
                EXECUTE 'CREATE POLICY "Public Transaction Initiate" ON public.transactions FOR INSERT TO public WITH CHECK (amount >= 0)';
                EXECUTE 'CREATE POLICY "Public Transaction Read" ON public.transactions FOR SELECT TO public USING (true)';
                EXECUTE 'CREATE POLICY "Public Transaction Update" ON public.transactions FOR UPDATE TO public USING (true) WITH CHECK (id IS NOT NULL)';
            END IF;
            
            -- API Logs: Needs public INSERT (for logging incoming requests)
            IF target_table = 'api_logs' THEN
                EXECUTE 'CREATE POLICY "Public Log Insert" ON public.api_logs FOR INSERT TO public WITH CHECK (id IS NOT NULL)';
            END IF;

            RAISE NOTICE 'Hardened RLS for table: %', target_table;
        END IF;
    END LOOP;
END $$;

-- 5. Platform Security Reminders
-- =======================================================
-- 1. Enable "Leaked Password Protection" in Supabase Auth Dashboard.
-- 2. Upgrade Postgres Version in Supabase Infrastructure Dashboard.
-- =======================================================
