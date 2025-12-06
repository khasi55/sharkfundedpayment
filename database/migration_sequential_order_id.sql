-- Create a sequence for Order IDs starting from 1
CREATE SEQUENCE IF NOT EXISTS order_id_seq START 1;

-- Function to generate the custom Order ID
CREATE OR REPLACE FUNCTION generate_order_id()
RETURNS TRIGGER AS $$
BEGIN
    -- Only generate if order_id is not already set (or if we want to override it)
    -- For this requirement, we want to generate it on INSERT if it's not provided,
    -- OR if the provided one is just a UUID/Session ID and we want the "Official" one.
    -- However, the user wants the URL to be the UUID (Session ID) and the Order ID to be SF-2025-X.
    -- So we will treat the 'order_id' column in the DB as the OFFICIAL ID.
    -- The UUID from the URL should probably be stored in a separate 'session_id' column, 
    -- OR we can just overwrite the 'order_id' column if we don't care about storing the session UUID in that specific column.
    
    -- Let's assume we want to overwrite whatever is passed as order_id with the sequential one,
    -- OR we can add a new column 'session_id' to store the UUID.
    -- For simplicity and to match the request "order id add in that place after payment is sucess",
    -- we will generate it here.
    
    NEW.order_id := 'SF-2025-' || nextval('order_id_seq');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to run before INSERT
DROP TRIGGER IF EXISTS set_order_id_trigger ON transactions;
CREATE TRIGGER set_order_id_trigger
BEFORE INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION generate_order_id();
