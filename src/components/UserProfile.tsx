import { useState } from "react";
import { ArrowLeft, Edit3, Star, TrendingUp, Calendar, MessageSquare,  Settings, Plus, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";

interface UserProfileProps {
  userData: any;
  onNavigate: (screen: string, data?: any) => void;
}

export function UserProfile({ userData, onNavigate }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in real app this would come from props/API
  const profileData = {
    name: userData?.name || "Sarah Chen",
    email: userData?.email || "sarah.chen@email.com",
    avatar: userData?.avatar || "",
    joinDate: "March 2024",
    location: "San Francisco, CA",
    totalCredits: 2847,
    creditsSpent: 1450,
    creditsEarned: 4297,
    rating: 4.8,
    totalReviews: 127,
    skillsTaught: 4,
    skillsLearning: 6,
    completedSessions: 89,
    hoursTeaching: 156,
    hoursLearning: 78
  };

  const teachingSkills = [
    {
      id: 1,
      title: "React Development Fundamentals",
      category: "Programming",
      students: 23,
      rating: 4.9,
      earnings: 1840,
      status: "active"
    },
    {
      id: 2,
      title: "UI/UX Design Principles",
      category: "Design",
      students: 18,
      rating: 4.7,
      earnings: 1260,
      status: "active"
    },
    {
      id: 3,
      title: "JavaScript for Beginners",
      category: "Programming",
      students: 31,
      rating: 4.8,
      earnings: 2480,
      status: "paused"
    }
  ];

  const learningSkills = [
    {
      id: 1,
      title: "Advanced Python Programming",
      instructor: "Dr. Michael Rodriguez",
      progress: 75,
      nextSession: "Dec 28, 2024",
      status: "in-progress"
    },
    {
      id: 2,
      title: "Digital Marketing Strategy",
      instructor: "Emma Thompson",
      progress: 40,
      nextSession: "Dec 30, 2024",
      status: "in-progress"
    },
    {
      id: 3,
      title: "Photography Composition",
      instructor: "James Park",
      progress: 100,
      nextSession: null,
      status: "completed"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "session_completed",
      title: "Taught React Development session",
      student: "Alex Johnson",
      time: "2 hours ago",
      credits: 80
    },
    {
      id: 2,
      type: "session_attended",
      title: "Attended Python Programming session",
      instructor: "Dr. Michael Rodriguez",
      time: "1 day ago",
      credits: -60
    },
    {
      id: 3,
      type: "skill_completed",
      title: "Completed Photography Composition",
      instructor: "James Park",
      time: "3 days ago",
      credits: 0
    },
    {
      id: 4,
      type: "review_received",
      title: "Received 5-star review",
      student: "Maria Garcia",
      time: "5 days ago",
      credits: 0
    }
  ];

  const achievements = [
    { title: "Super Teacher", description: "Taught 50+ students", icon: "🏆", earned: true },
    { title: "Quick Learner", description: "Completed 5 skills in 30 days", icon: "⚡", earned: true },
    { title: "Community Helper", description: "Helped 100+ students", icon: "🤝", earned: true },
    { title: "Expert Level", description: "Maintain 4.8+ rating for 6 months", icon: "⭐", earned: false },
    { title: "Knowledge Seeker", description: "Learn 10 different skills", icon: "📚", earned: false },
    { title: "Mentor Master", description: "Earn 5000+ credits teaching", icon: "💎", earned: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => onNavigate("dashboard")} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg sm:text-xl">My Profile</h1>
                <p className="text-muted-foreground text-sm">Manage your learning journey</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={() => onNavigate("profileEdit")} className="w-full sm:w-auto">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" onClick={() => onNavigate("settings")} className="w-full sm:w-auto">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-8">
        {/* Profile Header */}
        <Card className="mb-6 sm:mb-8">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mx-auto sm:mx-0">
                  <AvatarImage src={profileData.avatar} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl sm:text-2xl">{profileData.name}</h2>
                  <p className="text-muted-foreground text-sm sm:text-base">{profileData.location}</p>
                  <p className="text-sm text-muted-foreground">Member since {profileData.joinDate}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm sm:text-base">{profileData.rating}</span>
                    <span className="text-muted-foreground text-sm">({profileData.totalReviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:ml-auto">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl text-green-600">{profileData.totalCredits}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Total Credits</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl">{profileData.skillsTaught}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Skills Teaching</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl">{profileData.skillsLearning}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Skills Learning</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl">{profileData.completedSessions}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Sessions</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="grid w-max grid-cols-5 min-w-full sm:min-w-0 sm:w-full">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="teaching" className="text-xs sm:text-sm">Teaching</TabsTrigger>
              <TabsTrigger value="learning" className="text-xs sm:text-sm">Learning</TabsTrigger>
              <TabsTrigger value="activity" className="text-xs sm:text-sm">Activity</TabsTrigger>
              <TabsTrigger value="achievements" className="text-xs sm:text-sm">Achievements</TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Quick Stats */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendingUp className="w-5 h-5" />
                      Performance Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <h4 className="text-base sm:text-lg">Teaching Stats</h4>
                        <div className="space-y-2 mt-2">
                          <div className="flex justify-between text-sm">
                            <span>Hours Taught</span>
                            <span>{profileData.hoursTeaching}h</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Credits Earned</span>
                            <span className="text-green-600">+{profileData.creditsEarned}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Average Rating</span>
                            <span>{profileData.rating}/5.0</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg">Learning Stats</h4>
                        <div className="space-y-2 mt-2">
                          <div className="flex justify-between text-sm">
                            <span>Hours Learned</span>
                            <span>{profileData.hoursLearning}h</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Credits Spent</span>
                            <span className="text-blue-600">-{profileData.creditsSpent}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Skills Completed</span>
                            <span>3</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full text-sm" onClick={() => onNavigate("offerSkill")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Offer New Skill
                  </Button>
                  <Button variant="outline" className="w-full text-sm" onClick={() => onNavigate("marketplace")}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Browse Skills
                  </Button>
                  <Button variant="outline" className="w-full text-sm" onClick={() => onNavigate("calendar")}>
                    <Calendar className="w-4 h-4 mr-2" />
                    View Calendar
                  </Button>
                  <Button variant="outline" className="w-full text-sm" onClick={() => onNavigate("messages")}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Teaching Tab */}
          <TabsContent value="teaching" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h3 className="text-lg sm:text-xl">Skills You're Teaching</h3>
              <Button onClick={() => onNavigate("offerSkill")} className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add New Skill
              </Button>
            </div>
            
            <div className="grid gap-4">
              {teachingSkills.map(skill => (
                <Card key={skill.id}>
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h4 className="text-base sm:text-lg">{skill.title}</h4>
                          <Badge variant={skill.status === "active" ? "default" : "secondary"} className="w-fit">
                            {skill.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2 text-sm sm:text-base">{skill.category}</p>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                          <span>{skill.students} students</span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {skill.rating}
                          </span>
                          <span className="text-green-600">+{skill.earnings} credits earned</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h3 className="text-lg sm:text-xl">Skills You're Learning</h3>
              <Button onClick={() => onNavigate("marketplace")} className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Find New Skills
              </Button>
            </div>
            
            <div className="grid gap-4">
              {learningSkills.map(skill => (
                <Card key={skill.id}>
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h4 className="text-base sm:text-lg">{skill.title}</h4>
                          <Badge variant={skill.status === "completed" ? "default" : "secondary"} className="w-fit">
                            {skill.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3 text-sm sm:text-base">with {skill.instructor}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{skill.progress}%</span>
                          </div>
                          <Progress value={skill.progress} className="h-2" />
                          {skill.nextSession && (
                            <p className="text-sm text-muted-foreground">
                              Next session: {skill.nextSession}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <Card key={activity.id}>
                  <CardContent className="pt-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.type === "session_completed" || activity.type === "session_attended" 
                            ? `with ${activity.student || activity.instructor}` 
                            : activity.type === "skill_completed"
                            ? `by ${activity.instructor}`
                            : `from ${activity.student}`
                          } • {activity.time}
                        </p>
                      </div>
                      {activity.credits !== 0 && (
                        <Badge variant={activity.credits > 0 ? "default" : "secondary"} className="w-fit">
                          {activity.credits > 0 ? '+' : ''}{activity.credits} credits
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl">Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className={achievement.earned ? "border-green-200 bg-green-50" : "opacity-60"}>
                  <CardContent className="pt-4 sm:pt-6 text-center">
                    <div className="text-2xl sm:text-3xl mb-2">{achievement.icon}</div>
                    <h4 className={`text-sm sm:text-base ${achievement.earned ? "text-green-800" : ""}`}>{achievement.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">{achievement.description}</p>
                    {achievement.earned && (
                      <Badge className="mt-2" variant="default">Earned</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}