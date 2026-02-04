import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

import { Upload, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { storageService } from '../services/storage';

interface ProfileSetupProps {
  userData: any;
  onComplete: (profileData: any) => void;
  onSkip: () => void;
}

export function ProfileSetup({ userData, onComplete, onSkip }: ProfileSetupProps) {
  const [profileData, setProfileData] = useState({
    profilePicture: '',
    bio: '',
    location: '',
    languages: [] as string[]
  });
  const [isUploading, setIsUploading] = useState(false);

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const availableLanguages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Chinese', 'Japanese', 'Korean', 'Arabic', 'Russian', 'Hindi'
  ];

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const handleComplete = () => {
    onComplete({
      ...userData,
      profile: {
        ...profileData,
        languages: selectedLanguages
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white">
        <CardHeader className="text-center px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">Set Up Your Profile</CardTitle>
          <CardDescription className="text-sm">Tell us a bit about yourself to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center text-black text-xl sm:text-2xl font-medium shadow-sm">
              {profileData.profilePicture ? (
                <img 
                  src={profileData.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <>{userData.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}</>
              )}
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm"
                onClick={() => document.getElementById('profile-picture-input')?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Upload Photo'}
              </Button>
              <input
                id="profile-picture-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  setIsUploading(true);
                  
                  try {
                    // Use storage service to upload the image
                    const publicUrl = await storageService.uploadProfilePicture(userData.id, file);
                    
                    // Update profile data with the public URL
                    setProfileData(prev => ({
                      ...prev,
                      profilePicture: publicUrl
                    }));
                    
                    toast.success('Profile picture uploaded successfully!');
                  } catch (error) {
                    console.error('Error uploading profile picture:', error);
                    toast.error((error as Error).message || 'Failed to upload profile picture. Please try again.');
                  } finally {
                    setIsUploading(false);
                  }
                }}
              />
              {profileData.profilePicture && (
                <Button
                  variant="link"
                  size="sm"
                  className="text-xs text-red-500 p-0 bg-red-500 text-white"
                  onClick={async () => {
                    try {
                      // Delete from storage first
                      await storageService.deleteProfilePicture(profileData.profilePicture);
                      
                      // Then update state
                      setProfileData(prev => ({
                        ...prev,
                        profilePicture: ''
                      }));
                      
                      toast.success('Profile picture removed successfully!');
                    } catch (error) {
                      console.error('Error removing profile picture:', error);
                      // Even if storage deletion fails, still update the state
                      setProfileData(prev => ({
                        ...prev,
                        profilePicture: ''
                      }));
                      toast.error('Failed to remove profile picture from storage, but it has been removed from your profile.');
                    }
                  }}
                >
                  Remove Photo
                </Button>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">About Me</Label>
            <Textarea
              id="bio"
              placeholder="Tell others about yourself, your interests, and what you're passionate about..."
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              className="resize-none bg-neutral-200"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="City, Country"
                value={profileData.location}
                onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                className="pl-10 bg-neutral-200"
              />
            </div>
          </div>

          {/* Language Proficiency */}
          <div className="space-y-3">
            <Label>Languages You Speak</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableLanguages.map((language) => {
                const isSelected = selectedLanguages.includes(language);
                return (
                  <Button
                    key={language}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLanguageToggle(language)}
                    className={`justify-start text-sm ${isSelected ? 'bg-black text-white hover:bg-gray-800' : ''}`}
                  >
                    {language}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
            <Button variant="outline" className="w-full sm:w-auto" onClick={onSkip}>
              Skip for Now
            </Button>
            <Button onClick={handleComplete} className="w-full sm:w-auto bg-black text-white">
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}