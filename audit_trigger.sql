-- 1. Create the Function to Log Changes
CREATE OR REPLACE FUNCTION log_payment_config_changes()
RETURNS TRIGGER AS $$
DECLARE
    log_action text;
    log_details jsonb;
    current_user_email text;
BEGIN
    -- Determine Action Name
    log_action := 'DB_' || TG_OP; -- e.g., DB_INSERT, DB_UPDATE, DB_DELETE

    -- Prepare Details
    IF (TG_OP = 'DELETE') THEN
        log_details := row_to_json(OLD);
    ELSE
        log_details := row_to_json(NEW);
    END IF;

    -- Try to capture the user if possible (useful if using Supabase Auth in unexpected ways)
    -- Otherwise marks it as 'SUPABASE_DIRECT_EDIT'
    current_user_email := 'SUPABASE_DIRECT_EDIT';

    -- Insert into admin_audit_logs
    INSERT INTO admin_audit_logs (admin_email, action, details, ip_address)
    VALUES (
        current_user_email,
        log_action,
        log_details,
        'Direct DB Change'
    );
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create the Trigger
DROP TRIGGER IF EXISTS log_payment_config_audit ON payment_configs;

CREATE TRIGGER log_payment_config_audit
AFTER INSERT OR UPDATE OR DELETE ON payment_configs
FOR EACH ROW EXECUTE FUNCTION log_payment_config_changes();
