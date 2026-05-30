/*
  # Update RLS Policies for Admin Operations

  Since the admin panel uses a simple password check (not Supabase Auth),
  we need to allow anonymous users to perform CRUD operations.
  
  Security Note: In production, you should use Supabase Auth properly.
  For this demo, we enable anon access but you can restrict by IP or other means.

  1. Drop existing restrictive policies
  2. Allow anon and authenticated full access for admin operations
*/

-- Drop existing INSERT, UPDATE, DELETE policies for products
DROP POLICY IF EXISTS "Authenticated can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated can update products" ON products;
DROP POLICY IF EXISTS "Authenticated can delete products" ON products;

-- Create new policies allowing anon access for admin operations
CREATE POLICY "Anyone can insert products"
  ON products FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update products"
  ON products FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete products"
  ON products FOR DELETE
  TO anon, authenticated
  USING (true);

-- Drop existing INSERT, UPDATE, DELETE policies for reviews
DROP POLICY IF EXISTS "Authenticated can insert reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated can update reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated can delete reviews" ON reviews;

-- Create new policies allowing anon access for admin operations
CREATE POLICY "Anyone can insert reviews"
  ON reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update reviews"
  ON reviews FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete reviews"
  ON reviews FOR DELETE
  TO anon, authenticated
  USING (true);

-- Drop existing INSERT, UPDATE, DELETE policies for settings
DROP POLICY IF EXISTS "Authenticated can insert settings" ON settings;
DROP POLICY IF EXISTS "Authenticated can update settings" ON settings;
DROP POLICY IF EXISTS "Authenticated can delete settings" ON settings;

-- Create new policies allowing anon access for admin operations
CREATE POLICY "Anyone can insert settings"
  ON settings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update settings"
  ON settings FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete settings"
  ON settings FOR DELETE
  TO anon, authenticated
  USING (true);
