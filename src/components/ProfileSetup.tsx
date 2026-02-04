import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

import { Upload, MapPin } from 'lucide-react';

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
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-neutral-200 flex items-center justify-center text-black text-xl sm:text-2xl font-medium shadow-sm">
              {userData.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
            </div>
            <Button variant="outline" size="sm" className="text-sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
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