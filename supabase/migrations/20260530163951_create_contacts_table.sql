/*
  # Create contacts table for website inquiries

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `company` (text, optional)
      - `website_type` (text, optional)
      - `message` (text, required)
      - `created_at` (timestamp with timezone, defaults to now())

  2. Security
    - Enable RLS on `contacts` table
    - Add policy for anyone to insert contact form submissions
    - No SELECT, UPDATE, or DELETE policies (data is managed server-side only)

  3. Indexes
    - Index on created_at for querying recent contacts
    - Index on email for lookups

  This table stores contact form submissions from website visitors.
  The RLS policy allows public insertions for the contact form to work
  without authentication, while keeping data secure otherwise.
*/

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text DEFAULT '',
  website_type text DEFAULT '',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contacts FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);