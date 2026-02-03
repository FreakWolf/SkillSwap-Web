import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { 
  Star, 
  Clock, 
  CheckCircle, 
  Flag,
  Calendar,
  ThumbsUp,
  MessageCircle,
  BookOpen,
  TrendingUp,
  Award
} from 'lucide-react';

interface SessionRatingProps {
  userData: any;
  sessionData?: any;
  onNavigate: (screen: string, data?: any) => void;
}

export function SessionRating({ userData, sessionData, onNavigate }: SessionRatingProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [skillProgress, setSkillProgress] = useState<Record<string, number>>({});
  const [quickTags, setQuickTags] = useState<string[]>([]);
  const [followUpBooking, setFollowUpBooking] = useState(false);

  // Mock session data
  const session = sessionData || {
    id: 1,
    title: 'JavaScript Fundamentals',
    participant: 'Alex Johnson',
    type: 'learning',
    duration: 65,
    skill: 'JavaScript',
    date: new Date().toLocaleDateString(),
    topics: ['Variables', 'Functions', 'Arrays', 'Loops']
  };

  const availableTags = [
    'Excellent teacher',
    'Clear explanations',
    'Good pace',
    'Interactive session',
    'Well prepared',
    'Patient',
    'Knowledgeable',
    'Encouraging',
    'Good examples',
    'Helpful resources'
  ];

  const skillAreas = [
    { name: 'JavaScript Basics', before: 30, after: 60 },
    { name: 'Function Understanding', before: 20, after: 70 },
    { name: 'Array Methods', before: 10, after: 50 },
    { name: 'Problem Solving', before: 40, after: 65 }
  ];

  const handleTagToggle = (tag: string) => {
    setQuickTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmitRating = () => {
    // In a real app, this would submit to backend
    console.log('Submitting rating:', {
      sessionId: session.id,
      rating,
      feedback,
      quickTags,
      skillProgress,
      followUpBooking
    });

    // Navigate back to dashboard or session history
    onNavigate('dashboard');
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <h1>Session Complete!</h1>
                <p className="text-sm text-muted-foreground">Rate your experience</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Rating Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback>
                      {session.participant.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3>{session.title}</h3>
                    <p className="text-muted-foreground">with {session.participant}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {session.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDuration(session.duration)}
                      </div>
                    </div>
                  </div>
                  <Badge>{session.skill}</Badge>
                </div>

                {/* Topics Covered */}
                <div className="mb-6">
                  <h4 className="mb-3">Topics Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {session.topics.map((topic: string) => (
                      <Badge key={topic} variant="outline">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Rate Your Session</CardTitle>
                <CardDescription>How was your learning experience?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Star Rating */}
                <div className="text-center">
                  <div className="flex justify-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-muted-foreground">
                      {rating === 5 ? 'Excellent!' : 
                       rating === 4 ? 'Very Good!' :
                       rating === 3 ? 'Good' :
                       rating === 2 ? 'Fair' : 'Needs Improvement'}
                    </p>
                  )}
                </div>

                {/* Quick Tags */}
                <div>
                  <h4 className="mb-3">What made this session great?</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableTags.map((tag) => (
                      <Button
                        key={tag}
                        variant={quickTags.includes(tag) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleTagToggle(tag)}
                        className="justify-start h-auto py-2"
                      >
                        <ThumbsUp className="w-3 h-3 mr-2" />
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Written Feedback */}
                <div>
                  <h4 className="mb-3">Additional Feedback</h4>
                  <Textarea
                    placeholder="Share more details about your experience, what you learned, or suggestions for improvement..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Your Learning Progress
                </CardTitle>
                <CardDescription>How do you feel about these skills now?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillAreas.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{skill.name}</span>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>Before: {skill.before}%</span>
                        <span>→</span>
                        <span className="text-green-600">After: {skill.after}%</span>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={skill.before} className="h-2 opacity-50" />
                      <Progress 
                        value={skill.after} 
                        className="h-2 absolute top-0 left-0" 
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Follow-up Booking */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="followup"
                    checked={followUpBooking}
                    onCheckedChange={(checked) => setFollowUpBooking(checked as boolean)}
                  />
                  <div>
                    <label htmlFor="followup" className="text-sm cursor-pointer">
                      I'd like to book another session with {session.participant}
                    </label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Continue your learning journey with the same teacher
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                Skip Rating
              </Button>
              <Button 
                onClick={handleSubmitRating}
                disabled={rating === 0}
                className="px-8"
              >
                Submit Rating
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievement */}
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                <h3>Session Complete!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You've completed {session.duration} minutes of learning
                </p>
                <Badge className="bg-green-100 text-green-800">
                  +{Math.round(session.duration / 10)} XP earned
                </Badge>
              </CardContent>
            </Card>

            {/* Teacher Stats */}
            <Card>
              <CardHeader>
                <CardTitle>About {session.participant}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total sessions</span>
                  <span>247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average rating</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
                    <span>4.9</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response time</span>
                  <span>2 hours</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Teacher
                </Button>
              </CardContent>
            </Card>

            {/* Learning Streak */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">🔥</div>
                <h4>Learning Streak</h4>
                <p className="text-2xl mb-2">7 days</p>
                <p className="text-sm text-muted-foreground">
                  Keep it up! You're on a roll.
                </p>
              </CardContent>
            </Card>

            {/* Report Issue */}
            <Card>
              <CardContent className="p-4">
                <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
                  <Flag className="w-4 h-4 mr-2" />
                  Report an Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}