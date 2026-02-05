import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Calendar, Clock, Star, Users, Coins, Search, UserPlus, TrendingUp, Award } from 'lucide-react';

interface DashboardProps {
  userData: any;
  onNavigate: (screen: string) => void;
}

export function Dashboard({ userData, onNavigate }: DashboardProps) {
  const [credits] = useState(250);

  // Mock data for recommended matches
  const recommendedMatches = [
    {
      id: 1,
      name: 'Sarah Chen',
      skill: 'JavaScript',
      level: 'Expert',
      rating: 4.9,
      location: 'San Francisco, CA',
      avatar: 'https://i.pravatar.cc/150?img=1',
      price: 25,
      availability: 'Available now'
    },
    {
      id: 2,
      name: 'Carlos Rodriguez',
      skill: 'Spanish',
      level: 'Native',
      rating: 4.8,
      location: 'Barcelona, Spain',
      avatar: 'https://i.pravatar.cc/150?img=2',
      price: 20,
      availability: 'Available today'
    },
    {
      id: 3,
      name: 'Emma Thompson',
      skill: 'UI/UX Design',
      level: 'Expert',
      rating: 5.0,
      location: 'London, UK',
      avatar: 'https://i.pravatar.cc/150?img=3',
      price: 35,
      availability: 'Tomorrow'
    }
  ];

  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      skill: 'Python',
      teacher: 'John Doe',
      date: '2024-03-15',
      time: '2:00 PM',
      duration: '1 hour',
      type: 'learning'
    },
    {
      id: 2,
      skill: 'Guitar',
      student: 'Alice Cooper',
      date: '2024-03-16',
      time: '4:00 PM',
      duration: '45 min',
      type: 'teaching'
    }
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back, {userData.name}!</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200">
              <Coins className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-900">{credits}</span>
              <span className="text-sm text-amber-700">credits</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="xl:col-span-2 space-y-6">
            {/* Call to Action Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">Ready to learn something new?</h2>
              <p className="opacity-90 mb-6 text-lg">Discover expert teachers or share your expertise with others</p>
              <div className="flex gap-4">
                <Button 
                  size="lg"
                  onClick={() => onNavigate('marketplace')}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Find a Teacher
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('offerSkill')}
                  className="border-white text-white hover:bg-white/10"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Offer a Skill
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Sessions</p>
                      <p className="text-3xl font-bold text-blue-600">12</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Completed</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Rating</p>
                      <p className="text-3xl font-bold text-green-600">4.8</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Average score</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Learning</p>
                      <p className="text-3xl font-bold text-purple-600">6</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Skills active</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Teaching</p>
                      <p className="text-3xl font-bold text-orange-600">3</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Skills offered</p>
                </CardContent>
              </Card>
            </div>

            {/* Recommended Matches */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center text-xl">
                      <Users className="w-5 h-5 mr-2" />
                      Recommended for You
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Teachers who match your learning interests
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => onNavigate('marketplace')}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedMatches.map((match) => (
                    <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all hover:border-blue-300 cursor-pointer" onClick={() => onNavigate('publicProfile')}>
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="w-14 h-14">
                          <AvatarImage src={match.avatar} alt={match.name} />
                          <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                            {match.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-lg">{match.name}</h4>
                            <div className="flex items-center text-sm text-yellow-600">
                              <Star className="w-4 h-4 mr-1 fill-current" />
                              {match.rating}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className='bg-gray-200 rounded-full px-2'>
                              {match.skill} • {match.level}
                            </Badge>
                            <span className="text-sm text-gray-500">{match.location}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-green-600 font-medium">{match.availability}</span>
                            <span className="text-sm text-gray-700">{match.price} credits/hour</span>
                          </div>
                        </div>
                      </div>
                      <Button className='bg-black text-white' onClick={(e) => { e.stopPropagation(); onNavigate('booking'); }}>
                        Book Session
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50/50 rounded-r">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className='bg-black text-white' variant={session.type === 'learning' ? 'default' : 'secondary'}>
                        {session.type === 'learning' ? 'Learning' : 'Teaching'}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {session.duration}
                      </div>
                    </div>
                    <h4 className="font-semibold text-lg">{session.skill}</h4>
                    <p className="text-sm text-gray-600">
                      {session.type === 'learning' ? `with ${session.teacher}` : `with ${session.student}`}
                    </p>
                    <p className="text-sm text-gray-900 mt-1 font-medium">
                      {session.date} at {session.time}
                    </p>
                    <Button size="sm" className="w-full mt-3 bg-black text-white" onClick={() => onNavigate('videoCall')}>
                      Join Session
                    </Button>
                  </div>
                ))}
                {upcomingSessions.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No upcoming sessions</p>
                    <Button variant="outline" size="sm" className="mt-3" onClick={() => onNavigate('marketplace')}>
                      Book a Session
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Activity Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-gray-600">Sessions completed</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-gray-600">Hours learned</span>
                  <span className="font-semibold">4.5h</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-gray-600">Hours taught</span>
                  <span className="font-semibold">2.5h</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Credits earned</span>
                  <span className="font-semibold text-green-600">+85</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
