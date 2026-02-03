import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  MessageCircle, 
  Clock, 
  Archive,
  MoreVertical,
  Star,
  Users,
  Send,
  Paperclip,
  Smile,
  CheckCheck,
  Check
} from 'lucide-react';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

interface MessagingInboxProps {
  userData: any;
  onNavigate: (screen: string, data?: any) => void;
}

export function MessagingInbox({ userData, onNavigate }: MessagingInboxProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageInput, setMessageInput] = useState('');

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      participant: {
        name: 'Sarah Chen',
        avatar: '',
        status: 'online'
      },
      lastMessage: {
        text: 'Great! Looking forward to our JavaScript session tomorrow at 2 PM.',
        timestamp: '2 min ago',
        unread: false,
        sender: 'them'
      },
      skill: 'JavaScript',
      type: 'learning',
      unreadCount: 0
    },
    {
      id: 2,
      participant: {
        name: 'Carlos Rodriguez',
        avatar: '',
        status: 'offline'
      },
      lastMessage: {
        text: 'Could we reschedule our Spanish lesson to Thursday?',
        timestamp: '1 hour ago',
        unread: true,
        sender: 'them'
      },
      skill: 'Spanish',
      type: 'teaching',
      unreadCount: 2
    },
    {
      id: 3,
      participant: {
        name: 'Emma Thompson',
        avatar: '',
        status: 'online'
      },
      lastMessage: {
        text: 'Thanks for the design tips! I\'ve implemented your feedback.',
        timestamp: '3 hours ago',
        unread: false,
        sender: 'you'
      },
      skill: 'UI/UX Design',
      type: 'learning',
      unreadCount: 0
    },
    {
      id: 4,
      participant: {
        name: 'John Smith',
        avatar: '',
        status: 'away'
      },
      lastMessage: {
        text: 'Let me know if you have any questions about the Python assignment.',
        timestamp: 'Yesterday',
        unread: false,
        sender: 'you'
      },
      skill: 'Python',
      type: 'teaching',
      unreadCount: 0
    },
    {
      id: 5,
      participant: {
        name: 'Mike Johnson',
        avatar: '',
        status: 'offline'
      },
      lastMessage: {
        text: 'The guitar practice session was amazing! Same time next week?',
        timestamp: '2 days ago',
        unread: false,
        sender: 'them'
      },
      skill: 'Guitar',
      type: 'learning',
      unreadCount: 0
    }
  ];

  // Mock messages for selected conversation
  const messages = [
    {
      id: 1,
      sender: 'them',
      text: 'Hi! I saw your profile and I\'m interested in learning JavaScript.',
      timestamp: '10:30 AM',
      read: true
    },
    {
      id: 2,
      sender: 'you',
      text: 'Hello! That\'s great. I\'d be happy to help you learn JavaScript. What\'s your current experience level?',
      timestamp: '10:32 AM',
      read: true
    },
    {
      id: 3,
      sender: 'them',
      text: 'I\'m a complete beginner. I know some HTML and CSS, but haven\'t touched JavaScript yet.',
      timestamp: '10:35 AM',
      read: true
    },
    {
      id: 4,
      sender: 'you',
      text: 'Perfect! We can start with the basics and work our way up. I recommend 1-hour sessions, twice a week to start.',
      timestamp: '10:36 AM',
      read: true
    },
    {
      id: 5,
      sender: 'them',
      text: 'That sounds good! What times work for you?',
      timestamp: '10:40 AM',
      read: true
    },
    {
      id: 6,
      sender: 'you',
      text: 'I\'m available on Tuesdays and Thursdays from 2-6 PM. Does that work for you?',
      timestamp: '10:42 AM',
      read: true
    },
    {
      id: 7,
      sender: 'them',
      text: 'Yes! How about Tuesdays at 2 PM and Thursdays at 3 PM?',
      timestamp: '11:15 AM',
      read: true
    },
    {
      id: 8,
      sender: 'you',
      text: 'Perfect! I\'ll send you a booking request for those times. We can start this week if you\'re ready.',
      timestamp: '11:20 AM',
      read: true
    },
    {
      id: 9,
      sender: 'them',
      text: 'Great! Looking forward to our JavaScript session tomorrow at 2 PM.',
      timestamp: '11:22 AM',
      read: true
    }
  ];

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);

  const filteredConversations = conversations.filter(conv => 
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      setMessageInput('');
    }
  };

  return (
    <div className="h-full overflow-hidden flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
            <p className="text-sm text-gray-500 mt-1">Communicate with your teachers and students</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Conversations List */}
        <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="w-full grid grid-cols-3 rounded-none border-b h-11">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="teaching">Teaching</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="flex-1 overflow-y-auto mt-0">
              <div className="divide-y divide-gray-100">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left ${
                      selectedConversation === conv.id ? 'bg-blue-50 hover:bg-blue-50' : ''
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {conv.participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conv.participant.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate">{conv.participant.name}</h4>
                        <span className="text-xs text-gray-500 shrink-0">{conv.lastMessage.timestamp}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs mb-1">
                        {conv.skill}
                      </Badge>
                      <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                        {conv.lastMessage.sender === 'you' && 'You: '}
                        {conv.lastMessage.text}
                      </p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <Badge className="shrink-0 h-5 min-w-5 rounded-full px-1.5">
                        {conv.unreadCount}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="learning" className="flex-1 overflow-y-auto mt-0">
              <div className="divide-y divide-gray-100">
                {filteredConversations.filter(c => c.type === 'learning').map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left ${
                      selectedConversation === conv.id ? 'bg-blue-50 hover:bg-blue-50' : ''
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {conv.participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conv.participant.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate">{conv.participant.name}</h4>
                        <span className="text-xs text-gray-500 shrink-0">{conv.lastMessage.timestamp}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs mb-1">
                        {conv.skill}
                      </Badge>
                      <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                        {conv.lastMessage.sender === 'you' && 'You: '}
                        {conv.lastMessage.text}
                      </p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <Badge className="shrink-0 h-5 min-w-5 rounded-full px-1.5">
                        {conv.unreadCount}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="teaching" className="flex-1 overflow-y-auto mt-0">
              <div className="divide-y divide-gray-100">
                {filteredConversations.filter(c => c.type === 'teaching').map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left ${
                      selectedConversation === conv.id ? 'bg-blue-50 hover:bg-blue-50' : ''
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {conv.participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conv.participant.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate">{conv.participant.name}</h4>
                        <span className="text-xs text-gray-500 shrink-0">{conv.lastMessage.timestamp}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs mb-1">
                        {conv.skill}
                      </Badge>
                      <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                        {conv.lastMessage.sender === 'you' && 'You: '}
                        {conv.lastMessage.text}
                      </p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <Badge className="shrink-0 h-5 min-w-5 rounded-full px-1.5">
                        {conv.unreadCount}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </aside>

        {/* Chat Panel */}
        <main className="flex-1 flex flex-col bg-white">
          {selectedConversationData ? (
            <>
              {/* Chat Header */}
              <div className="h-16 border-b border-gray-200 px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {selectedConversationData.participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversationData.participant.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedConversationData.participant.name}</h3>
                    <p className="text-xs text-gray-500">
                      {selectedConversationData.participant.status === 'online' ? 'Active now' : 'Offline'}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {selectedConversationData.skill}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => onNavigate('videoCall')}>
                    Start Video Call
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 px-6 py-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-md ${message.sender === 'you' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            message.sender === 'you'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <div className={`flex items-center gap-1 mt-1 px-2 ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                          {message.sender === 'you' && (
                            <CheckCheck className={`w-3 h-3 ${message.read ? 'text-blue-600' : 'text-gray-400'}`} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="w-5 h-5 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Smile className="w-5 h-5 text-gray-500" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
