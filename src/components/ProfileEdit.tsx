import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { 
  Upload, 
  MapPin, 
  Bell, 
  Shield, 
  Eye, 
  EyeOff,
  Plus,
  X,
  ArrowLeft,
  Save,
  CheckCircle
} from 'lucide-react';

interface ProfileEditProps {
  userData: any;
  onNavigate: (screen: string) => void;
}

export function ProfileEdit({ userData, onNavigate }: ProfileEditProps) {
  const [profileData, setProfileData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    bio: userData?.profile?.bio || '',
    location: userData?.profile?.location || '',
    phone: '',
    website: '',
    timezone: 'PST',
    hourlyRate: 25
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailBookings: true,
    emailMessages: true,
    emailReminders: true,
    pushBookings: true,
    pushMessages: false,
    pushReminders: true,
    marketingEmails: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    showEmail: false,
    showPhone: false,
    showLastSeen: true,
    profileVisibility: 'public',
    allowMessages: 'verified'
  });

  const [skills, setSkills] = useState([
    { name: 'JavaScript', type: 'teach', level: 'expert' },
    { name: 'React', type: 'teach', level: 'expert' },
    { name: 'Python', type: 'learn', level: 'beginner' }
  ]);

  const [availability, setAvailability] = useState({
    monday: { enabled: true, times: ['9:00 AM', '2:00 PM'] },
    tuesday: { enabled: true, times: ['10:00 AM'] },
    wednesday: { enabled: false, times: [] },
    thursday: { enabled: true, times: ['1:00 PM', '6:00 PM'] },
    friday: { enabled: true, times: ['11:00 AM'] },
    saturday: { enabled: false, times: [] },
    sunday: { enabled: false, times: [] }
  });

  const [newSkill, setNewSkill] = useState({ name: '', type: 'teach', level: 'beginner' });

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setSkills([...skills, { ...newSkill, name: newSkill.name.trim() }]);
      setNewSkill({ name: '', type: 'teach', level: 'beginner' });
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving profile data:', { profileData, notificationSettings, privacySettings, skills, availability });
    onNavigate('profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onNavigate('profile')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile
              </Button>
              <h1>Edit Profile</h1>
            </div>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>
          
          {/* Personal Information */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and profile picture</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="text-2xl">
                      {profileData.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">
                      JPG, PNG or GIF. Max size 5MB.
                    </p>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell others about yourself, your expertise, and teaching style..."
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
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
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Timezone & Rate */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={profileData.timezone} onValueChange={(value) => 
                      setProfileData(prev => ({ ...prev, timezone: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PST">Pacific Standard Time</SelectItem>
                        <SelectItem value="EST">Eastern Standard Time</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                        <SelectItem value="CET">Central European Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate">Hourly Rate (Credits)</Label>
                    <Input
                      id="rate"
                      type="number"
                      value={profileData.hourlyRate}
                      onChange={(e) => setProfileData(prev => ({ ...prev, hourlyRate: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p>Email Verified</p>
                      <p className="text-sm text-muted-foreground">Your email has been verified</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                    <div>
                      <p>Phone Verification</p>
                      <p className="text-sm text-muted-foreground">Verify your phone number</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Verify</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                    <div>
                      <p>Identity Verification</p>
                      <p className="text-sm text-muted-foreground">Upload government ID</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Upload</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Management */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills Management</CardTitle>
                <CardDescription>Add or remove skills you can teach or want to learn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Skills */}
                <div className="space-y-4">
                  <h3>Current Skills</h3>
                  <div className="space-y-2">
                    {skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Badge variant={skill.type === 'teach' ? 'default' : 'secondary'}>
                            {skill.type === 'teach' ? 'Teaching' : 'Learning'}
                          </Badge>
                          <span>{skill.name}</span>
                          <Badge variant="outline">{skill.level}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add New Skill */}
                <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                  <h4>Add New Skill</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <Input
                      placeholder="Skill name"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Select value={newSkill.type} onValueChange={(value: 'teach' | 'learn') => 
                      setNewSkill(prev => ({ ...prev, type: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teach">Teaching</SelectItem>
                        <SelectItem value="learn">Learning</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={newSkill.level} onValueChange={(value) => 
                      setNewSkill(prev => ({ ...prev, level: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={addSkill} disabled={!newSkill.name.trim()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Availability Calendar */}
          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Availability Calendar</CardTitle>
                <CardDescription>Set your weekly availability for teaching sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(availability).map(([day, settings]) => (
                  <div key={day} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={settings.enabled}
                        onCheckedChange={(checked) => 
                          setAvailability(prev => ({
                            ...prev,
                            [day]: { ...prev[day as keyof typeof prev], enabled: checked }
                          }))
                        }
                      />
                      <span className="capitalize min-w-[80px]">{day}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {settings.enabled && settings.times.map((time, index) => (
                        <Badge key={index} variant="outline">
                          {time}
                        </Badge>
                      ))}
                      {settings.enabled && (
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4>Email Notifications</h4>
                  {Object.entries({
                    emailBookings: 'New booking requests',
                    emailMessages: 'New messages',
                    emailReminders: 'Session reminders',
                    marketingEmails: 'Marketing and promotions'
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span>{label}</span>
                      <Switch
                        checked={notificationSettings[key as keyof typeof notificationSettings]}
                        onCheckedChange={(checked) =>
                          setNotificationSettings(prev => ({ ...prev, [key]: checked }))
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4>Push Notifications</h4>
                  {Object.entries({
                    pushBookings: 'New booking requests',
                    pushMessages: 'New messages',
                    pushReminders: 'Session reminders'
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span>{label}</span>
                      <Switch
                        checked={notificationSettings[key as keyof typeof notificationSettings]}
                        onCheckedChange={(checked) =>
                          setNotificationSettings(prev => ({ ...prev, [key]: checked }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Controls */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4>Profile Visibility</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Show email address</span>
                      <Switch
                        checked={privacySettings.showEmail}
                        onCheckedChange={(checked) =>
                          setPrivacySettings(prev => ({ ...prev, showEmail: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Show phone number</span>
                      <Switch
                        checked={privacySettings.showPhone}
                        onCheckedChange={(checked) =>
                          setPrivacySettings(prev => ({ ...prev, showPhone: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Show last seen</span>
                      <Switch
                        checked={privacySettings.showLastSeen}
                        onCheckedChange={(checked) =>
                          setPrivacySettings(prev => ({ ...prev, showLastSeen: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4>Who can message you?</h4>
                  <Select 
                    value={privacySettings.allowMessages} 
                    onValueChange={(value) => 
                      setPrivacySettings(prev => ({ ...prev, allowMessages: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="everyone">Everyone</SelectItem>
                      <SelectItem value="verified">Verified users only</SelectItem>
                      <SelectItem value="students">Students only</SelectItem>
                      <SelectItem value="none">No one</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}