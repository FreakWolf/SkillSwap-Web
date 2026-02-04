import { supabase } from '../utils/supabase';

export const storageService = {
  // Upload profile picture to Supabase Storage
  async uploadProfilePicture(userId: string, file: File): Promise<string> {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size must be less than 5MB');
    }
    
    // Generate a unique filename
    const fileName = `${userId}-${Date.now()}-${file.name}`;
    const filePath = `${fileName}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('profile-pictures')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      if (error.message.includes('Bucket not found')) {
        throw new Error('Failed to upload image: The "profile-pictures" bucket does not exist in Supabase Storage. Please create it in your Supabase dashboard first.');
      }
      throw new Error(`Failed to upload image: ${error.message}`);
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(data.path);
    
    return urlData.publicUrl;
  },
  
  // Delete profile picture from Supabase Storage
  async deleteProfilePicture(fileUrl: string): Promise<void> {
    try {
      // Extract just the filename from the URL (not the full path)
      const urlParts = fileUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      const { error } = await supabase.storage
        .from('profile-pictures')
        .remove([fileName]);
      
      if (error) {
        if (error.message.includes('Bucket not found')) {
          // Silently handle bucket not found error during delete
          // This allows the UI to update even if storage isn't configured
          return;
        }
        throw new Error(`Failed to delete image: ${error.message}`);
      }
    } catch (error) {
      // Silently handle any deletion errors
      // This ensures the UI can still update even if storage has issues
      console.error('Error deleting profile picture:', error);
    }
  },
  
  // Get public URL for a file
  getPublicUrl(filePath: string): string {
    try {
      const { data } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Error getting public URL:', error);
      return '';
    }
  }
};
