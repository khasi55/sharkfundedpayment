-- Add session_id column to transactions table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'transactions' AND column_name = 'session_id') THEN
        ALTER TABLE transactions ADD COLUMN session_id text;
    END IF;
END $$;

-- Create index on session_id for performance
CREATE INDEX IF NOT EXISTS idx_transactions_session_id ON transactions(session_id);

-- Update the generate_order_id function
CREATE OR REPLACE FUNCTION generate_order_id()
RETURNS TRIGGER AS $$
BEGIN
    -- Only generate Order ID if status is 'verified' AND order_id is currently NULL
    -- This handles both INSERT (auto-verify) and UPDATE (manual verify)
    IF NEW.status = 'verified' AND (NEW.order_id IS NULL OR NEW.order_id = '') THEN
        NEW.order_id := 'SF-2025-' || nextval('order_id_seq');
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ensure trigger runs on INSERT (already exists, but good to confirm)
DROP TRIGGER IF EXISTS set_order_id_trigger ON transactions;
CREATE TRIGGER set_order_id_trigger
BEFORE INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION generate_order_id();

-- Add trigger for UPDATE (to handle manual verification approval)
DROP TRIGGER IF EXISTS set_order_id_update_trigger ON transactions;
CREATE TRIGGER set_order_id_update_trigger
BEFORE UPDATE ON transactions
FOR EACH ROW
EXECUTE FUNCTION generate_order_id();
