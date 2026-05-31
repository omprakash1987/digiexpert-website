/*
  # Add phone and service columns to contacts table

  1. Modified Tables
    - `contacts`
      - Added `phone` column (text, optional)
      - Added `service` column (text, optional)

  2. Notes
    - These columns are added to better track contact inquiries
    - Phone is important for quick follow-up
    - Service helps categorize inquiries by type
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contacts' AND column_name = 'phone'
  ) THEN
    ALTER TABLE contacts ADD COLUMN phone text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contacts' AND column_name = 'service'
  ) THEN
    ALTER TABLE contacts ADD COLUMN service text DEFAULT '';
  END IF;
END $$;