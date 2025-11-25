-- Fix missing columns in leads and clients tables

-- Add personalizationLine column to leads table if it doesn't exist
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS personalizationLine TEXT;

-- Add automationsRunning column to clients table if it doesn't exist
ALTER TABLE clients 
ADD COLUMN IF NOT EXISTS automationsRunning INTEGER DEFAULT 0;

-- Add title column to clients table if it doesn't exist (needed for conversion)
ALTER TABLE clients 
ADD COLUMN IF NOT EXISTS title TEXT;

-- Add email column to clients table if it doesn't exist (needed for conversion)
ALTER TABLE clients 
ADD COLUMN IF NOT EXISTS email TEXT;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';
