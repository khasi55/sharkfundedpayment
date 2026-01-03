-- Run this in your Supabase SQL Editor to fix the "column does not exist" error
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS merchan t_upi_id text;
