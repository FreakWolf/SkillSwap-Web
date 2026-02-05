import { useEffect, useState } from "react";
import { profileService, UserProfile } from "../services/profile";
import {
  Home,
  Search,
  Calendar,
  MessageSquare,
  Bell,
  User,
  Settings,
  BarChart3,
  Crown,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface AppLayoutProps {
  children: React.ReactNode;
  currentScreen: string;
  userData: any;
  onNavigate: (screen: string, data?: any) => void;
}

export function AppLayout({
  children,
  currentScreen,
  userData,
  onNavigate,
}: AppLayoutProps) {
  const [unreadMessages] = useState(3);
  const [unreadNotifications] = useState(5);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (userData?.id) {
        const profile = await profileService.getProfile(userData.id);
        setUserProfile(profile);
      }
    };
    fetchProfile();
  }, [userData?.id]);

  const navigation = [
    { name: "Dashboard", icon: Home, screen: "dashboard" },
    { name: "Marketplace", icon: Search, screen: "marketplace" },
    { name: "Calendar", icon: Calendar, screen: "calendar" },
    { name: "Messages", icon: MessageSquare, screen: "messages", badge: unreadMessages },
    { name: "Notifications", icon: Bell, screen: "notifications", badge: unreadNotifications },
    { name: "Analytics", icon: BarChart3, screen: "analytics" },
  ];

  const isActive = (screen: string) => currentScreen === screen;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo/Brand */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="font-bold text-xl text-blue-600">SkillSwap</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.screen}
                onClick={() => onNavigate(item.screen)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${
                  isActive(item.screen)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 text-left">{item.name}</span>
                {item.badge && item.badge > 0 && (
                  <Badge variant="destructive" className="h-5 min-w-5 px-1 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-gray-200">
            <button
              onClick={() => onNavigate("offerSkill")}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Offer a Skill</span>
            </button>
          </div>

          {userData?.isPremium && (
            <button
              onClick={() => onNavigate("premium")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive("premium")
                  ? "bg-amber-50 text-amber-600"
                  : "text-amber-600 hover:bg-amber-50"
              }`}
            >
              <Crown className="w-5 h-5" />
              <span>Premium Features</span>
            </button>
          )}
        </nav>

        {/* User Profile Section */}
        <div className="p-3 border-t border-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={userProfile?.profilePicture || userData?.avatar} />
                  <AvatarFallback>
                    {userData?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                    {userData?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {userData?.email || "user@example.com"}
                  </p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate("userProfile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate("settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate("auth")} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
