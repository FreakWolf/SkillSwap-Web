import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
  Send,
  Paperclip,
  Image,
  Video,
  Phone,
  Calendar,
  MapPin,
  Smile,
  Info,
  ArrowLeft,
  Search,
  VolumeX,
  Flag,
  Check,
  CheckCheck,
} from "lucide-react";

interface ChatScreenProps {
  userData: any;
  conversationData?: any;
  onNavigate: (screen: string, data?: any) => void;
}

export function ChatScreen({ conversationData, onNavigate }: ChatScreenProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock conversation data
  const conversation = conversationData?.conversation || {
    id: 1,
    participant: {
      name: "Sarah Chen",
      avatar: "",
      status: "online",
      lastSeen: "Active now",
    },
    skill: "JavaScript",
    type: "learning",
  };

  // Mock messages
  const initialMessages = useMemo(() => [
    {
      id: 1,
      sender: "them",
      content:
        "Hi! I saw you're interested in learning JavaScript. I'd love to help you get started!",
      timestamp: "2:30 PM",
      type: "text",
      status: "read",
    },
    {
      id: 2,
      sender: "me",
      content:
        "That sounds great! I'm a complete beginner but very eager to learn.",
      timestamp: "2:32 PM",
      type: "text",
      status: "read",
    },
    {
      id: 3,
      sender: "them",
      content:
        "Perfect! Let me know what your goals are and we can schedule our first session.",
      timestamp: "2:33 PM",
      type: "text",
      status: "read",
    },
    {
      id: 4,
      sender: "me",
      content:
        "I want to build web applications. When would be a good time for our first lesson?",
      timestamp: "2:35 PM",
      type: "text",
      status: "delivered",
    },
    {
      id: 5,
      sender: "them",
      content:
        "I have availability tomorrow at 2 PM or Thursday at 10 AM. Both are 1-hour sessions.",
      timestamp: "2:40 PM",
      type: "text",
      status: "read",
    },
  ], []);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate real-time messaging
  useEffect(() => {
    const simulateTyping = () => {
      if (Math.random() > 0.95) {
        // 5% chance every second
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          // Add a new message occasionally
          if (Math.random() > 0.7) {
            const newMessage = {
              id: messages.length + 1,
              sender: "them",
              content: "Let me know if you have any questions!",
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              type: "text",
              status: "delivered",
            };
            setMessages((prev) => [...prev, newMessage]);
          }
        }, 2000);
      }
    };

    const interval = setInterval(simulateTyping, 1000);
    return () => clearInterval(interval);
  }, [messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "me",
        content: message.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "text",
        status: "sent",
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      // Simulate message status updates
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg,
          ),
        );
      }, 1000);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "read" } : msg,
          ),
        );
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="w-3 h-3 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("messages")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>
                      {conversation.participant.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      conversation.participant.status === "online"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></div>
                </div>
                <div>
                  <h2>{conversation.participant.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {conversation.participant.status === "online"
                      ? "Active now"
                      : `Last seen ${conversation.participant.lastSeen}`}
                  </p>
                </div>
                <Badge variant="outline">{conversation.skill}</Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  onNavigate("videoCall", {
                    session: {
                      participant: conversation.participant.name,
                      skill: conversation.skill,
                    },
                  })
                }
              >
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInfo(!showInfo)}
              >
                <Info className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Messages */}
        <div className="flex-1 flex flex-col">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                      msg.sender === "me"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    {msg.sender !== "me" && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {conversation.participant.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        msg.sender === "me"
                          ? "bg-blue-500 text-white"
                          : "bg-white border"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <div
                        className={`flex items-center justify-between mt-1 text-xs ${
                          msg.sender === "me"
                            ? "text-blue-100"
                            : "text-muted-foreground"
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {msg.sender === "me" && (
                          <span className="ml-2">
                            {getStatusIcon(msg.status)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-end space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {conversation.participant.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white border rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="bg-white border-t p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end space-x-3">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Image className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Sidebar */}
        {showInfo && (
          <div className="w-80 bg-white border-l">
            <div className="p-6 space-y-6">
              {/* Profile */}
              <div className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">
                    {conversation.participant.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3>{conversation.participant.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  JavaScript Expert
                </p>
                <div className="flex justify-center space-x-2">
                  <Button size="sm" onClick={() => onNavigate("publicProfile")}>
                    View Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate("booking")}
                  >
                    Book Session
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <h4>Quick Actions</h4>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Session
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Share Location
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <VolumeX className="w-4 h-4 mr-2" />
                    Mute Notifications
                  </Button>
                </div>
              </div>

              {/* Shared Media */}
              <div className="space-y-2">
                <h4>Shared Media</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-muted rounded"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Session History */}
              <div className="space-y-2">
                <h4>Session History</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>JavaScript Basics</span>
                    <span className="text-muted-foreground">Mar 10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Functions & Scope</span>
                    <span className="text-muted-foreground">Mar 5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>DOM Manipulation</span>
                    <span className="text-muted-foreground">Feb 28</span>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-2 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-red-600"
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Report User
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-red-600"
                >
                  <VolumeX className="w-4 h-4 mr-2" />
                  Block User
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
