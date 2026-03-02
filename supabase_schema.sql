-- SQL script to create the necessary tables in Supabase

-- Create the profiles table to store user profile information and skills
CREATE TABLE IF NOT EXISTS profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  bio TEXT,
  location TEXT,
  languages TEXT[],
  profile_picture TEXT,
  skills JSONB DEFAULT '{"teach": [], "learn": []}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on updated_at for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_updated_at ON profiles(updated_at);

-- Enable Row Level Security for the profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for the profiles table
-- Allow authenticated users to view their own profile
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow authenticated users to update their own profile
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Allow authenticated users to insert their own profile
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Optional: Function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Optional: Trigger to update updated_at when a profile is modified
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
