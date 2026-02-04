import { useState, useEffect } from "react";
import { AuthScreen } from "./components/AuthScreen";
import { ProfileSetup } from "./components/ProfileSetup";
import { SkillsSelection } from "./components/SkillsSelection";
import { Dashboard } from "./components/Dashboard";
import { SkillMarketplace } from "./components/SkillMarketplace";
import { PublicProfile } from "./components/PublicProfile";
import { ProfileEdit } from "./components/ProfileEdit";
import { BookingScreen } from "./components/BookingScreen";
import { MessagingInbox } from "./components/MessagingInbox";
import { CalendarView } from "./components/CalendarView";
import { VideoCallInterface } from "./components/VideoCallInterface";
import { SessionRating } from "./components/SessionRating";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { PremiumFeatures } from "./components/PremiumFeatures";
import { ChatScreen } from "./components/ChatScreen";
import { NotificationsCenter } from "./components/NotificationsCenter";
import { OfferSkill } from "./components/OfferSkill";
import { UserProfile } from "./components/UserProfile";
import { Settings } from "./components/Settings";
import { AppLayout } from "./components/AppLayout";
import { supabase } from "./utils/supabase";
import { toast } from "sonner";

type Screen =
  | "auth"
  | "profile"
  | "skills"
  | "dashboard"
  | "marketplace"
  | "publicProfile"
  | "profileEdit"
  | "booking"
  | "messages"
  | "chat"
  | "calendar"
  | "videoCall"
  | "sessionRating"
  | "analytics"
  | "premium"
  | "notifications"
  | "sessionPrep"
  | "offerSkill"
  | "userProfile"
  | "settings";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("auth");
  const [userData, setUserData] = useState<any>(null);
  const [navigationData, setNavigationData] = useState<any>(null);

  // Handle OAuth callback on page load
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const hash = window.location.hash;
      if (hash.includes("access_token")) {
        try {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          
          if (data.session) {
            const user = {
            id: data.session.user.id,
            email: data.session.user.email || '',
            name: data.session.user.user_metadata?.name || '',
            isNewUser: false,
          };
            
            // Determine the provider from user metadata
            const provider = data.session.user.app_metadata.provider || 'Google';
            toast.success(`Successfully signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}!`);
            setUserData(user);
            setCurrentScreen(user.isNewUser ? "profile" : "dashboard");
          }
        } catch (error) {
          console.error("OAuth callback error:", error);
          toast.error("Google sign in failed");
        }
      }
    };

    handleOAuthCallback();
  }, []);

  const handleAuthComplete = (user: any) => {
    setUserData(user);
    if (user.isNewUser) {
      setCurrentScreen("profile");
    } else {
      setCurrentScreen("dashboard");
    }
  };

  const handleProfileComplete = (profileData: any) => {
    setUserData(profileData);
    setCurrentScreen("skills");
  };

  const handleSkillsComplete = (skillsData: any) => {
    setUserData(skillsData);
    setCurrentScreen("dashboard");
  };

  const handleNavigate = (screen: string, data?: any) => {
    setCurrentScreen(screen as Screen);
    setNavigationData(data);
  };

  // Screens that don't use the main app layout (onboarding flows)
  const isOnboardingScreen = [
    "auth",
    "profile",
    "skills",
  ].includes(currentScreen);

  // Full-screen experiences (video calls)
  const isFullScreenExperience = ["videoCall"].includes(
    currentScreen,
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case "auth":
        return <AuthScreen onComplete={handleAuthComplete} />;
      case "profile":
        return (
          <ProfileSetup
            userData={userData}
            onComplete={handleProfileComplete}
            onSkip={() => setCurrentScreen("dashboard")}
          />
        );
      case "skills":
        return (
          <SkillsSelection
            userData={userData}
            onComplete={handleSkillsComplete}
            onNavigate={handleNavigate}
          />
        );
      case "dashboard":
        return (
          <Dashboard
            userData={userData}
            onNavigate={handleNavigate}
          />
        );
      case "marketplace":
        return (
          <SkillMarketplace
            userData={userData}
            onNavigate={handleNavigate}
          />
        );
      case "publicProfile":
        return (
          <PublicProfile
            userData={userData}
            onNavigate={handleNavigate}
          />
        );
      case "profileEdit":
        return (
          <ProfileEdit
            userData={userData}
            onNavigate={handleNavigate}
          />
        );
      case "booking":
        return (
          <BookingScreen
            userData={userData}
            bookingData={navigationData}
            onNavigate={handleNavigate}
          />
        );
      case "messages":
        return (
          <MessagingInbox
            userData={userData}
            onNavigate={handleNavigate}
          />
        );
      case "chat":
        return (
          <ChatScreen
            userData={userData}
            conversationData={navigationData}
            onNavigate={handleNavigate}
          />
        );
      case "calendar":
        return (
          <CalendarView
            userData={userData}
            onNavigate={handleNavigate}
          />
        );
      case "videoCall":
        return (
          <VideoCallInterface
            userData={userData}
            sessionData={navigationData}
            onNavigate={handleNavigate}
          />
        );
      case "sessionRating":
        return (
          <SessionRating
            userData={userData}
            sessionData={navigationData}
            onNavigate={handleNavigate}
          />
        );
      case "analytics":
        return (
          <AnalyticsDashboard
            userData={userData}
            onNavigate={handleNavigate}
          />
        );
      case "premium":
        return (
          <PremiumFeatures
            userData={userData}
            onNavigate={handleNavigate}
          />
        );
      case "notifications":
        return (
          <NotificationsCenter
            userData={userData}
            onNavigate={handleNavigate}
          />
        );
      case "sessionPrep":
        // Session preparation screen would go here - placeholder for now
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl mb-4">
                Session Preparation
              </h2>
              <p className="text-muted-foreground mb-4">
                Preparing for your session...
              </p>
              <button
                onClick={() =>
                  handleNavigate("videoCall", navigationData)
                }
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
              >
                Start Session
              </button>
              <button
                onClick={() => handleNavigate("dashboard")}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
      case "offerSkill":
        return (
          <OfferSkill
            userData={userData}
            onNavigate={handleNavigate}
          />
        );
      case "userProfile":
        return (
          <UserProfile
            userData={userData}
            onNavigate={handleNavigate}
          />
        );
      case "settings":
        return (
          <Settings
            userData={userData}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <AuthScreen onComplete={handleAuthComplete} />;
    }
  };

  // Render with or without layout based on screen type
  if (isOnboardingScreen || isFullScreenExperience) {
    return renderScreen();
  }

  return (
    <AppLayout
      currentScreen={currentScreen}
      userData={userData}
      onNavigate={handleNavigate}
    >
      {renderScreen()}
    </AppLayout>
  );
}