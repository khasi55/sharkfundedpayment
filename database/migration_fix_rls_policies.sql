-- Drop existing policies to ensure clean slate
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."transactions";
DROP POLICY IF EXISTS "Enable insert access for all users" ON "public"."transactions";
DROP POLICY IF EXISTS "Enable update access for all users" ON "public"."transactions";
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;

-- Re-enable RLS just in case
ALTER TABLE "public"."transactions" ENABLE ROW LEVEL SECURITY;

-- create permissive policies for transactions
CREATE POLICY "Enable read access for all users" ON "public"."transactions"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert access for all users" ON "public"."transactions"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON "public"."transactions"
AS PERMISSIVE FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Storage bucket handling
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment_proofs', 'payment_proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Allow public uploads"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'payment_proofs');

CREATE POLICY "Allow public read"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'payment_proofs');
