-- FlowLabs RLS Policy Repair
-- Run this in Supabase SQL Editor to fix data access issues

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view their own leads" ON leads;
DROP POLICY IF EXISTS "Users can view own leads" ON leads;
DROP POLICY IF EXISTS "Users can create their own leads" ON leads;
DROP POLICY IF EXISTS "Users can insert own leads" ON leads;
DROP POLICY IF EXISTS "Users can update their own leads" ON leads;
DROP POLICY IF EXISTS "Users can update own leads" ON leads;
DROP POLICY IF EXISTS "Users can delete their own leads" ON leads;
DROP POLICY IF EXISTS "Users can delete own leads" ON leads;

-- Recreate policies with consistent naming
CREATE POLICY "Users can view own leads" 
  ON leads FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own leads" 
  ON leads FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own leads" 
  ON leads FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own leads" 
  ON leads FOR DELETE 
  USING (auth.uid() = user_id);

-- Verify RLS is enabled
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Show all policies
SELECT schemaname, tablename, policyname, permissive, cmd
FROM pg_policies
WHERE tablename = 'leads'
ORDER BY policyname;
