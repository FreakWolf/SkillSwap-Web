import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  TrendingUp,
  Clock,
  Coins,
  Star,
  BookOpen,
  Calendar,
  Download,
  BarChart3,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface AnalyticsDashboardProps {
  userData: any;
  onNavigate: (screen: string) => void;
}

export function AnalyticsDashboard({ userData, onNavigate }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock analytics data
  const overviewStats = {
    totalSessions: 156,
    teachingHours: 87.5,
    learningHours: 42.3,
    creditsEarned: 2175,
    creditsSpent: 846,
    averageRating: 4.8,
    responseRate: 98,
    completionRate: 94
  };

  const sessionsData = [
    { month: 'Jan', teaching: 12, learning: 8 },
    { month: 'Feb', teaching: 15, learning: 6 },
    { month: 'Mar', teaching: 18, learning: 10 },
    { month: 'Apr', teaching: 22, learning: 12 },
    { month: 'May', teaching: 20, learning: 9 },
    { month: 'Jun', teaching: 25, learning: 15 }
  ];

  const creditsData = [
    { month: 'Jan', earned: 300, spent: 120 },
    { month: 'Feb', earned: 375, spent: 90 },
    { month: 'Mar', earned: 450, spent: 150 },
    { month: 'Apr', earned: 550, spent: 180 },
    { month: 'May', earned: 500, spent: 156 },
    { month: 'Jun', earned: 625, spent: 210 }
  ];

  const skillsDistribution = [
    { name: 'JavaScript', value: 35, color: '#3b82f6' },
    { name: 'Spanish', value: 25, color: '#8b5cf6' },
    { name: 'Python', value: 20, color: '#10b981' },
    { name: 'Design', value: 15, color: '#f59e0b' },
    { name: 'Other', value: 5, color: '#6b7280' }
  ];

  const topSkills = [
    { skill: 'JavaScript', sessions: 45, hours: 52.5, rating: 4.9, trend: 'up' },
    { skill: 'Spanish', sessions: 32, hours: 28.0, rating: 4.8, trend: 'up' },
    { skill: 'Python', sessions: 28, hours: 31.5, rating: 4.7, trend: 'down' },
    { skill: 'UI/UX Design', sessions: 18, hours: 22.0, rating: 5.0, trend: 'up' },
    { skill: 'Guitar', sessions: 12, hours: 15.0, rating: 4.6, trend: 'stable' }
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 6.5 },
    { day: 'Tue', hours: 8.0 },
    { day: 'Wed', hours: 5.5 },
    { day: 'Thu', hours: 7.5 },
    { day: 'Fri', hours: 6.0 },
    { day: 'Sat', hours: 4.0 },
    { day: 'Sun', hours: 3.5 }
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Track your learning and teaching progress</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="p-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="teaching">Teaching</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <Badge variant="outline" className="gap-1 text-green-600 border-green-200">
                      <ArrowUp className="w-3 h-3" />
                      12%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Total Sessions</p>
                  <p className="text-3xl font-bold text-gray-900">{overviewStats.totalSessions}</p>
                  <p className="text-xs text-gray-500 mt-1">+18 from last month</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <Badge variant="outline" className="gap-1 text-green-600 border-green-200">
                      <ArrowUp className="w-3 h-3" />
                      8%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Teaching Hours</p>
                  <p className="text-3xl font-bold text-gray-900">{overviewStats.teachingHours}</p>
                  <p className="text-xs text-gray-500 mt-1">+6.5 hours this month</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-green-600" />
                    </div>
                    <Badge variant="outline" className="gap-1 text-gray-600 border-gray-200">
                      0%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Average Rating</p>
                  <p className="text-3xl font-bold text-gray-900">{overviewStats.averageRating}</p>
                  <p className="text-xs text-gray-500 mt-1">Based on 142 reviews</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Coins className="w-6 h-6 text-amber-600" />
                    </div>
                    <Badge variant="outline" className="gap-1 text-green-600 border-green-200">
                      <ArrowUp className="w-3 h-3" />
                      22%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Credits Earned</p>
                  <p className="text-3xl font-bold text-gray-900">{overviewStats.creditsEarned}</p>
                  <p className="text-xs text-gray-500 mt-1">+385 this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-6">
              {/* Sessions Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Sessions Over Time</CardTitle>
                  <CardDescription>Teaching and learning sessions by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={sessionsData}>
                      <defs>
                        <linearGradient id="teaching" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="learning" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="teaching" stroke="#8b5cf6" fillOpacity={1} fill="url(#teaching)" strokeWidth={2} />
                      <Area type="monotone" dataKey="learning" stroke="#3b82f6" fillOpacity={1} fill="url(#learning)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Credits Flow */}
              <Card>
                <CardHeader>
                  <CardTitle>Credits Flow</CardTitle>
                  <CardDescription>Earned vs spent over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={creditsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="earned" fill="#10b981" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="spent" fill="#ef4444" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-3 gap-6">
              {/* Skills Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills Distribution</CardTitle>
                  <CardDescription>Breakdown by skill category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={skillsDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent ? percent * 100 : 0).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {skillsDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Weekly Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>Hours spent per day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={weeklyActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="day" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Response Rate</span>
                      <span className="text-sm font-semibold">{overviewStats.responseRate}%</span>
                    </div>
                    <Progress value={overviewStats.responseRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Completion Rate</span>
                      <span className="text-sm font-semibold">{overviewStats.completionRate}%</span>
                    </div>
                    <Progress value={overviewStats.completionRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Student Satisfaction</span>
                      <span className="text-sm font-semibold">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">On-time Arrival</span>
                      <span className="text-sm font-semibold">99%</span>
                    </div>
                    <Progress value={99} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Skills Table */}
            <Card>
              <CardHeader>
                <CardTitle>Top Skills</CardTitle>
                <CardDescription>Your most active skills and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topSkills.map((skill) => (
                    <div key={skill.skill} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{skill.skill}</h4>
                          {skill.trend === 'up' && (
                            <Badge variant="outline" className="gap-1 text-green-600 border-green-200">
                              <TrendingUp className="w-3 h-3" />
                              Trending
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{skill.sessions}</p>
                          <p className="text-xs text-gray-500">Sessions</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{skill.hours}</p>
                          <p className="text-xs text-gray-500">Hours</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <p className="text-2xl font-bold text-gray-900">{skill.rating}</p>
                          </div>
                          <p className="text-xs text-gray-500">Rating</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teaching">
            <Card>
              <CardContent className="p-12 text-center">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Teaching Analytics</h3>
                <p className="text-gray-600">Detailed teaching metrics and insights coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learning">
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Learning Analytics</h3>
                <p className="text-gray-600">Detailed learning progress and insights coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial">
            <Card>
              <CardContent className="p-12 text-center">
                <Coins className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Financial Analytics</h3>
                <p className="text-gray-600">Detailed financial reports and insights coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
