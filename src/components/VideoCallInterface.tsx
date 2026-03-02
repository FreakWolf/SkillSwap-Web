import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff,
  Share,
  MessageCircle,
  Settings,
  Monitor,
  Maximize,
  Minimize,
  Users,
  Clock,
  Send,
} from 'lucide-react';

interface VideoCallInterfaceProps {
  userData: any;
  sessionData?: any;
  onNavigate: (screen: string, data?: any) => void;
}

export function VideoCallInterface({ userData, sessionData, onNavigate }: VideoCallInterfaceProps) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [chatMessage, setChatMessage] = useState('');
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('good');

  // Mock session data
  const session = sessionData || {
    id: 1,
    title: 'JavaScript Fundamentals',
    participant: 'Alex Johnson',
    type: 'teaching',
    duration: 60,
    startTime: new Date(),
    skill: 'JavaScript'
  };

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Alex Johnson',
      message: 'Hi! Ready to start learning JavaScript?',
      timestamp: '2:01 PM',
      isMe: false
    },
    {
      id: 2,
      sender: 'You',
      message: 'Yes, excited to get started! I have my code editor ready.',
      timestamp: '2:02 PM',
      isMe: true
    }
  ]);

  // Simulate call timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate connection quality changes
  useEffect(() => {
    const qualityTimer = setInterval(() => {
      const qualities: ('excellent' | 'good' | 'poor')[] = ['excellent', 'good', 'poor'];
      setConnectionQuality(qualities[Math.floor(Math.random() * qualities.length)]);
    }, 10000);

    return () => clearInterval(qualityTimer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: 'You',
        message: chatMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');
    }
  };

  const handleEndCall = () => {
    // Navigate to session rating screen
    onNavigate('sessionRating', { session, duration: callDuration });
  };

  const getQualityColor = () => {
    switch (connectionQuality) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-gray-900 flex flex-col`}>
      {/* Header */}
      {!isFullscreen && (
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4 text-white">
                <Video className="w-5 h-5" />
                <div>
                  <h1 className="text-lg">{session.title}</h1>
                  <p className="text-sm text-gray-300">with {session.participant}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-white">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(callDuration)}</span>
                </div>
                <div className={`flex items-center space-x-1 ${getQualityColor()}`}>
                  <div className="flex space-x-1">
                    <div className="w-1 h-3 bg-current rounded"></div>
                    <div className={`w-1 h-3 rounded ${connectionQuality !== 'poor' ? 'bg-current' : 'bg-gray-500'}`}></div>
                    <div className={`w-1 h-3 rounded ${connectionQuality === 'excellent' ? 'bg-current' : 'bg-gray-500'}`}></div>
                  </div>
                  <span className="text-xs capitalize">{connectionQuality}</span>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Video Area */}
      <div className="flex-1 flex">
        {/* Main Video */}
        <div className="flex-1 relative bg-black">
          {/* Participant Video (Main) */}
          <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
            <div className="text-center text-white">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarFallback className="text-4xl">
                  {session.participant.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-2xl mb-2">{session.participant}</h3>
              <Badge variant="secondary">{session.skill} Teacher</Badge>
            </div>
          </div>

          {/* My Video (Picture-in-Picture) */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg overflow-hidden border-2 border-white/20">
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-2">
                  <AvatarFallback>
                    {userData?.name?.split(' ').map((n: string) => n[0]).join('') || 'You'}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm">You</p>
              </div>
            </div>
          </div>

          {/* Screen Share Indicator */}
          {isScreenSharing && (
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
              <Monitor className="w-4 h-4 mr-2" />
              Sharing Screen
            </div>
          )}

          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              Recording
            </div>
          )}

          {/* Fullscreen Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-56 text-white hover:bg-white/20"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </Button>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-white border-l flex flex-col">
            <div className="p-4 border-b">
              <h3 className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </h3>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-lg ${
                      msg.isMe 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t flex space-x-2">
              <Input
                placeholder="Type a message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-20 space-x-4">
            {/* Audio Control */}
            <Button
              variant={isAudioOn ? "secondary" : "destructive"}
              size="lg"
              className="rounded-full w-12 h-12"
              onClick={() => setIsAudioOn(!isAudioOn)}
            >
              {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>

            {/* Video Control */}
            <Button
              variant={isVideoOn ? "secondary" : "destructive"}
              size="lg"
              className="rounded-full w-12 h-12"
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>

            {/* Screen Share */}
            <Button
              variant={isScreenSharing ? "default" : "secondary"}
              size="lg"
              className="rounded-full w-12 h-12"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
            >
              <Share className="w-5 h-5" />
            </Button>

            {/* Chat Toggle */}
            <Button
              variant={showChat ? "default" : "secondary"}
              size="lg"
              className="rounded-full w-12 h-12"
              onClick={() => setShowChat(!showChat)}
            >
              <MessageCircle className="w-5 h-5" />
            </Button>

            {/* Record */}
            <Button
              variant={isRecording ? "destructive" : "secondary"}
              size="lg"
              className="rounded-full w-12 h-12"
              onClick={() => setIsRecording(!isRecording)}
            >
              <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-white' : 'bg-red-500'}`}></div>
            </Button>

            {/* Settings */}
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full w-12 h-12"
            >
              <Settings className="w-5 h-5" />
            </Button>

            {/* End Call */}
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-12 h-12 ml-8"
              onClick={handleEndCall}
            >
              <PhoneOff className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Participants Panel (when multiple users) */}
      <div className="absolute bottom-24 left-4 bg-gray-800/90 rounded-lg p-3 text-white">
        <div className="flex items-center space-x-2 text-sm">
          <Users className="w-4 h-4" />
          <span>2 participants</span>
        </div>
      </div>
    </div>
  );
}