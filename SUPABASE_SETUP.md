# Supabase Setup Guide

This guide explains how to set up Supabase to work with the SkillSwap application, including storage buckets for profile pictures.

## Prerequisites
- A Supabase account
- A Supabase project created
- Your Supabase URL and Anon Key configured in the `.env.local` file

## Step 1: Create Storage Bucket

1. Log in to your Supabase dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create Bucket**
4. Enter `profile-pictures` as the bucket name
5. Set **Public Access** to **Enable** (this makes profile pictures publicly accessible)
6. Click **Create Bucket**

## Step 2: Set Bucket Policies

1. In the Storage dashboard, select the `profile-pictures` bucket
2. Click on the **Policies** tab
3. Click **Create Policy** for each of the following:

### Policy 1: Allow authenticated users to upload their own profile pictures
- Policy name: `Allow authenticated users to upload profile pictures`
- Policy for: `INSERT`
- Definition: `(bucket_id = 'profile-pictures' AND auth.role() = 'authenticated')`

### Policy 2: Allow authenticated users to update their own profile pictures
- Policy name: `Allow authenticated users to update profile pictures`
- Policy for: `UPDATE`
- Definition: `(bucket_id = 'profile-pictures' AND auth.role() = 'authenticated')`

### Policy 3: Allow authenticated users to delete their own profile pictures
- Policy name: `Allow authenticated users to delete profile pictures`
- Policy for: `DELETE`
- Definition: `(bucket_id = 'profile-pictures' AND auth.role() = 'authenticated')`

### Policy 4: Allow everyone to view profile pictures
- Policy name: `Allow public access to profile pictures`
- Policy for: `SELECT`
- Definition: `(bucket_id = 'profile-pictures')`

## Step 3: Run Database Schema

1. In your Supabase dashboard, navigate to **SQL Editor**
2. Click **New Query**
3. Copy and paste the content from `supabase_schema.sql`
4. Click **Run** to create the `profiles` table

## Step 4: Verify Configuration

1. Ensure your `.env.local` file has the correct Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=your-supabase-url
   REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

2. Restart your application:
   ```bash
   npm run start
   ```

## Troubleshooting

### Common Errors

1. **Bucket not found**
   - Cause: The `profile-pictures` bucket doesn't exist in your Supabase project
   - Fix: Follow Step 1 to create the bucket

2. **Permission denied**
   - Cause: Incorrect bucket policies
   - Fix: Verify the policies in Step 2 are correctly configured

3. **400 Bad Request**
   - Cause: Invalid file type or size
   - Fix: Ensure you're uploading images smaller than 5MB

## Additional Notes

- Profile pictures are stored with unique filenames in the format: `userId-timestamp-filename`
- Images are automatically cached for 1 hour (3600 seconds)
- The application handles bucket errors gracefully with helpful error messages

For more information, refer to the [Supabase Storage documentation](https://supabase.com/docs/guides/storage).
