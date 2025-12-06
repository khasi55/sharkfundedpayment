ALTER TABLE transactions ADD COLUMN IF NOT EXISTS session_id TEXT;
CREATE INDEX IF NOT EXISTS idx_transactions_session_id ON transactions(session_id);
