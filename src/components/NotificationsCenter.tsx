import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Bell, 
  Calendar, 
  MessageCircle, 
  Star,
  AlertCircle,
  CheckCircle,
  Info,
  Clock,
  MoreVertical,
  Check,
  X,
  Settings
} from 'lucide-react';
import { Separator } from './ui/separator';

interface NotificationsCenterProps {
  userData: any;
  onNavigate: (screen: string) => void;
}

export function NotificationsCenter({ userData, onNavigate }: NotificationsCenterProps) {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'booking',
      title: 'New session booked',
      message: 'Emma Thompson booked a JavaScript session with you for tomorrow at 2:00 PM',
      timestamp: '5 minutes ago',
      read: false,
      icon: Calendar,
      color: 'blue',
      actionable: true
    },
    {
      id: 2,
      type: 'message',
      title: 'New message',
      message: 'Carlos Rodriguez sent you a message about rescheduling',
      timestamp: '1 hour ago',
      read: false,
      icon: MessageCircle,
      color: 'purple',
      actionable: true
    },
    {
      id: 3,
      type: 'rating',
      title: 'New review received',
      message: 'Sarah Chen left you a 5-star review for your Python session',
      timestamp: '2 hours ago',
      read: false,
      icon: Star,
      color: 'yellow',
      actionable: false
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Session starting soon',
      message: 'Your Spanish lesson with Carlos Rodriguez starts in 30 minutes',
      timestamp: '3 hours ago',
      read: true,
      icon: Clock,
      color: 'orange',
      actionable: false
    },
    {
      id: 5,
      type: 'success',
      title: 'Session completed',
      message: 'Your JavaScript session with Alex Johnson was completed successfully',
      timestamp: '1 day ago',
      read: true,
      icon: CheckCircle,
      color: 'green',
      actionable: false
    },
    {
      id: 6,
      type: 'info',
      title: 'Platform update',
      message: 'New features added: Screen sharing and virtual whiteboard now available',
      timestamp: '2 days ago',
      read: true,
      icon: Info,
      color: 'blue',
      actionable: false
    },
    {
      id: 7,
      type: 'booking',
      title: 'Booking request',
      message: 'John Smith requested a booking for UI/UX Design session next week',
      timestamp: '2 days ago',
      read: true,
      icon: Calendar,
      color: 'blue',
      actionable: true
    },
    {
      id: 8,
      type: 'alert',
      title: 'Session cancelled',
      message: 'Your guitar lesson scheduled for today has been cancelled by the teacher',
      timestamp: '3 days ago',
      read: true,
      icon: AlertCircle,
      color: 'red',
      actionable: false
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const getIconColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      orange: 'bg-orange-100 text-orange-600',
      green: 'bg-green-100 text-green-600',
      red: 'bg-red-100 text-red-600'
    };
    return colors[color] || colors.blue;
  };

  const markAllAsRead = () => {
    // Handle marking all as read
  };

  return (
    <div className="h-full overflow-hidden flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
            <p className="text-sm text-gray-500 mt-1">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Filters Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Filter</h3>
            <div className="space-y-1">
              <button
                onClick={() => setFilter('all')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span className="flex-1 text-left">All Notifications</span>
                <Badge variant="secondary" className="text-xs">
                  {notifications.length}
                </Badge>
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'unread'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span className="flex-1 text-left">Unread</span>
                {unreadCount > 0 && (
                  <Badge variant="default" className="text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </button>

              <Separator className="my-3" />

              <button
                onClick={() => setFilter('booking')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'booking'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span className="flex-1 text-left">Bookings</span>
              </button>
              <button
                onClick={() => setFilter('message')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'message'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="flex-1 text-left">Messages</span>
              </button>
              <button
                onClick={() => setFilter('rating')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'rating'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Star className="w-4 h-4" />
                <span className="flex-1 text-left">Reviews</span>
              </button>
              <button
                onClick={() => setFilter('reminder')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'reminder'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className="flex-1 text-left">Reminders</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Notifications List */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${getIconColor(notification.color)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h4 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-gray-500">{notification.timestamp}</span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                      {notification.actionable && (
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {notification.type === 'booking' && (
                            <>
                              <Button size="sm">Accept</Button>
                              <Button size="sm" variant="outline">
                                Decline
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}

            {filteredNotifications.length === 0 && (
              <div className="text-center py-16">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-600">You're all caught up!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
