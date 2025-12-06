-- Run this command in your Supabase SQL Editor to add the missing column
ALTER TABLE public.transactions 
ADD COLUMN IF NOT EXISTS order_id text;
