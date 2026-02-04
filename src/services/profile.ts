import { supabase } from '../utils/supabase';

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
  category: string;
}

export interface UserProfile {
  userId: string;
  bio: string;
  location: string;
  languages: string[];
  profilePicture: string;
  skills: {
    teach: Skill[];
    learn: Skill[];
  };
}

export const profileService = {
  // Save or update user profile data
  async saveProfile(profileData: UserProfile): Promise<void> {
    const { userId, bio, location, languages, profilePicture } = profileData;
    
    const { error } = await supabase.from('profiles').upsert({
      user_id: userId,
      bio,
      location,
      languages,
      profile_picture: profilePicture,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    });
    
    if (error) {
      throw new Error(`Failed to save profile: ${error.message}`);
    }
  },
  
  // Save or update user skills
  async saveSkills(userId: string, skills: {
    teach: Skill[];
    learn: Skill[];
  }): Promise<void> {
    const { error } = await supabase.from('profiles').update({
      skills,
      updated_at: new Date().toISOString()
    }).eq('user_id', userId);
    
    if (error) {
      throw new Error(`Failed to save skills: ${error.message}`);
    }
  },
  
  // Get complete user profile including skills
  async getProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // Profile not found
        return null;
      }
      throw new Error(`Failed to get profile: ${error.message}`);
    }
    
    return {
      userId: data.user_id,
      bio: data.bio || '',
      location: data.location || '',
      languages: data.languages || [],
      profilePicture: data.profile_picture || '',
      skills: data.skills || { teach: [], learn: [] }
    };
  },
  
  // Save complete profile with skills in one call
  async saveCompleteProfile(profileData: UserProfile): Promise<void> {
    const { userId, bio, location, languages, profilePicture, skills } = profileData;
    
    const { error } = await supabase.from('profiles').upsert({
      user_id: userId,
      bio,
      location,
      languages,
      profile_picture: profilePicture,
      skills,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    });
    
    if (error) {
      throw new Error(`Failed to save complete profile: ${error.message}`);
    }
  }
};
