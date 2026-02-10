-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info', -- 'info', 'success', 'warning', 'error'
    is_read BOOLEAN DEFAULT false,
    link TEXT, -- Optional link to navigate to (e.g., /admin/transactions)
    metadata JSONB
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for admin panel)
-- In a real production app with multiple admins, you might want to restrict this
CREATE POLICY "Enable read access for all users" ON "public"."notifications"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- Allow public update access (to mark as read)
CREATE POLICY "Enable update access for all users" ON "public"."notifications"
AS PERMISSIVE FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Enable Realtime
alter publication supabase_realtime add table notifications;

-- Trigger Function: Create notification on new transaction
CREATE OR REPLACE FUNCTION notify_new_transaction()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO notifications (title, message, type, link, metadata)
    VALUES (
        'New Transaction Received',
        'Amount: ₹' || NEW.amount || ' | UTR: ' || NEW.utr,
        'info',
        '/admin/transactions',
        jsonb_build_object('transaction_id', NEW.id, 'amount', NEW.amount)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger: After Insert on transactions
DROP TRIGGER IF EXISTS on_new_transaction ON transactions;
CREATE TRIGGER on_new_transaction
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION notify_new_transaction();

-- Trigger Function: Create notification on transaction status change
CREATE OR REPLACE FUNCTION notify_transaction_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO notifications (title, message, type, link, metadata)
        VALUES (
            'Transaction Status Updated',
            'Transaction ' || NEW.utr || ' is now ' || NEW.status,
            CASE 
                WHEN NEW.status = 'verified' THEN 'success'
                WHEN NEW.status = 'rejected' THEN 'error'
                ELSE 'info'
            END,
            '/admin/transactions',
            jsonb_build_object('transaction_id', NEW.id, 'status', NEW.status)
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger: After Update on transactions
DROP TRIGGER IF EXISTS on_transaction_status_change ON transactions;
CREATE TRIGGER on_transaction_status_change
AFTER UPDATE ON transactions
FOR EACH ROW
EXECUTE FUNCTION notify_transaction_status_change();
