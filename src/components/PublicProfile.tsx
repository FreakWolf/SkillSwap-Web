import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar } from './ui/calendar';
import { 
  Star, 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  MessageCircle, 
  Heart,
  Flag,
  Shield,
  BookOpen,
  GraduationCap,
  ArrowLeft
} from 'lucide-react';

interface PublicProfileProps {
  userData: any;
  onNavigate: (screen: string, data?: any) => void;
}

export function PublicProfile({ userData, onNavigate }: PublicProfileProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock profile data
  const profileData = {
    id: '123',
    name: 'Sarah Chen',
    avatar: '',
    location: 'San Francisco, CA',
    memberSince: '2023',
    rating: 4.9,
    totalReviews: 247,
    totalStudents: 1247,
    responseTime: '2 hours',
    languages: ['English', 'Mandarin', 'Spanish'],
    verified: true,
    bio: 'Experienced software engineer with 8+ years in full-stack development. Passionate about teaching JavaScript, React, and modern web technologies. I believe in learning by building real projects.',
    teachingSkills: [
      { name: 'JavaScript', level: 'Expert', students: 456, rating: 4.9 },
      { name: 'React', level: 'Expert', students: 342, rating: 4.8 },
      { name: 'Node.js', level: 'Advanced', students: 234, rating: 4.9 },
      { name: 'Python', level: 'Intermediate', students: 123, rating: 4.7 }
    ],
    learningSkills: [
      { name: 'Machine Learning', level: 'Beginner' },
      { name: 'UI/UX Design', level: 'Beginner' }
    ],
    achievements: [
      'Top 10% Teacher',
      'Quick Responder',
      'Student Favorite',
      'Verified Expert'
    ],
    availability: {
      timezone: 'PST',
      slots: [
        { day: 'Monday', times: ['9:00 AM', '2:00 PM', '7:00 PM'] },
        { day: 'Tuesday', times: ['10:00 AM', '3:00 PM'] },
        { day: 'Wednesday', times: ['9:00 AM', '1:00 PM', '6:00 PM'] },
        { day: 'Friday', times: ['11:00 AM', '4:00 PM'] }
      ]
    }
  };

  const reviews = [
    {
      id: 1,
      student: 'Alex Johnson',
      rating: 5,
      date: '2024-03-10',
      skill: 'JavaScript',
      comment: 'Sarah is an amazing teacher! She explains complex concepts in a very clear way and provides practical examples.'
    },
    {
      id: 2,
      student: 'Maria Garcia',
      rating: 5,
      date: '2024-03-08',
      skill: 'React',
      comment: 'Excellent session on React hooks. Very patient and knowledgeable. Highly recommended!'
    },
    {
      id: 3,
      student: 'David Kim',
      rating: 4,
      date: '2024-03-05',
      skill: 'Node.js',
      comment: 'Great introduction to backend development. Clear explanations and good pace.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onNavigate('marketplace')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Flag className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="text-2xl">
                      {profileData.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1>{profileData.name}</h1>
                      {profileData.verified && (
                        <Shield className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {profileData.location}
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        Member since {profileData.memberSince}
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-current text-yellow-500" />
                        <span>{profileData.rating}</span>
                        <span className="text-muted-foreground ml-1">
                          ({profileData.totalReviews} reviews)
                        </span>
                      </div>
                      <div className="text-muted-foreground">
                        {profileData.totalStudents} students taught
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profileData.achievements.map((achievement) => (
                        <Badge key={achievement} variant="secondary">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-muted-foreground">{profileData.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Reviews Tabs */}
            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="history">Teaching History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="skills" className="space-y-6">
                {/* Teaching Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Skills I Teach
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profileData.teachingSkills.map((skill) => (
                        <div key={skill.name} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4>{skill.name}</h4>
                            <Badge variant="outline">{skill.level}</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{skill.students} students</span>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
                              {skill.rating}
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className="w-full mt-3"
                            onClick={() => onNavigate('booking', { skill: skill.name, teacher: profileData.name })}
                          >
                            Book Session
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Skills I'm Learning
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profileData.learningSkills.map((skill) => (
                        <Badge key={skill.name} variant="secondary">
                          {skill.name} ({skill.level})
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {review.student.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm">{review.student}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating 
                                  ? 'fill-current text-yellow-500' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <Badge variant="outline" className="mb-2">
                        {review.skill}
                      </Badge>
                      <p className="text-sm">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="history">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center text-muted-foreground">
                      <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Teaching history details would be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button className="w-full" onClick={() => onNavigate('booking', { teacher: profileData.name })}>
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Book a Session
                </Button>
                <Button variant="outline" className="w-full" onClick={() => onNavigate('chat')}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response time</span>
                  <span>{profileData.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Languages</span>
                  <span>{profileData.languages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Skills taught</span>
                  <span>{profileData.teachingSkills.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
                <CardDescription>Times shown in {profileData.availability.timezone}</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <div className="mt-4 space-y-2">
                  {profileData.availability.slots.map((slot) => (
                    <div key={slot.day} className="text-sm">
                      <div className="font-medium">{slot.day}</div>
                      <div className="text-muted-foreground">
                        {slot.times.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}