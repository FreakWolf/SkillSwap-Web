import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Crown,
  Check,
  X,
  Calendar,
  Video,
  BarChart3,
  Shield,
  Clock,
  Award,
  ArrowLeft,
  CreditCard,
  Gift,
  Sparkles,
} from "lucide-react";

interface PremiumFeaturesProps {
  userData: any;
  onNavigate: (screen: string) => void;
}

export function PremiumFeatures({
  userData,
  onNavigate,
}: PremiumFeaturesProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [isTrialActive, setIsTrialActive] = useState(false);

  const plans = {
    free: {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      features: [
        { name: "Up to 5 sessions per month", included: true },
        { name: "Basic messaging", included: true },
        { name: "Standard video quality", included: true },
        { name: "Community access", included: true },
        { name: "Priority support", included: false },
        { name: "Advanced analytics", included: false },
        { name: "Session recording", included: false },
        { name: "Custom scheduling", included: false },
        { name: "Premium badges", included: false },
      ],
    },
    pro: {
      name: "Pro",
      price: { monthly: 19, yearly: 190 },
      popular: true,
      features: [
        { name: "Unlimited sessions", included: true },
        { name: "Priority messaging", included: true },
        { name: "HD video quality", included: true },
        { name: "Advanced scheduling", included: true },
        { name: "Session recording (30 days)", included: true },
        { name: "Basic analytics", included: true },
        { name: "Priority support", included: true },
        { name: "Custom profile themes", included: true },
        { name: "Pro badge", included: true },
      ],
    },
    premium: {
      name: "Premium",
      price: { monthly: 39, yearly: 390 },
      features: [
        { name: "Everything in Pro", included: true },
        { name: "4K video quality", included: true },
        { name: "Unlimited session recording", included: true },
        { name: "Advanced analytics dashboard", included: true },
        { name: "White-label profile", included: true },
        { name: "API access", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Custom integrations", included: true },
        { name: "Premium badge", included: true },
      ],
    },
  };

  const currentPlan = "free"; // This would come from user data

  const premiumBenefits = [
    {
      icon: <Video className="w-6 h-6 text-blue-500" />,
      title: "HD Video Sessions",
      description:
        "Crystal clear video quality for the best learning experience",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-green-500" />,
      title: "Advanced Analytics",
      description: "Detailed insights into your teaching and learning progress",
    },
    {
      icon: <Calendar className="w-6 h-6 text-purple-500" />,
      title: "Smart Scheduling",
      description: "AI-powered scheduling that adapts to your availability",
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      title: "Priority Support",
      description: "24/7 dedicated support with faster response times",
    },
    {
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      title: "Premium Badges",
      description: "Stand out with exclusive badges and profile customization",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      title: "Exclusive Features",
      description: "Access to beta features and premium-only tools",
    },
  ];

  const usageStats = {
    sessionsUsed: 3,
    sessionsLimit: 5,
    storageUsed: 2.4,
    storageLimit: 5,
    recordingHours: 0,
    recordingLimit: 0,
  };

  const handleUpgrade = (plan: string) => {
    // In a real app, this would redirect to payment processing
    console.log(`Upgrading to ${plan} plan`);
    // Mock payment success
    alert(`Payment successful! Welcome to ${plan}!`);
  };

  const handleStartTrial = () => {
    setIsTrialActive(true);
    // In a real app, this would activate a trial period
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("dashboard")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                <h1>Premium Features</h1>
              </div>
            </div>
            <Badge
              variant="outline"
              className="text-yellow-600 border-yellow-600"
            >
              Current: {currentPlan === "free" ? "Free Plan" : currentPlan}
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trial Banner */}
        {!isTrialActive && currentPlan === "free" && (
          <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Gift className="w-8 h-8" />
                  <div>
                    <h3>Try Premium Free for 14 Days!</h3>
                    <p className="opacity-90">
                      Unlock all premium features with no commitment
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={handleStartTrial}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Start Free Trial
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Usage (for free users) */}
        {currentPlan === "free" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Current Usage</CardTitle>
              <CardDescription>
                See how you're using your free plan limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sessions this month</span>
                  <span>
                    {usageStats.sessionsUsed} / {usageStats.sessionsLimit}
                  </span>
                </div>
                <Progress
                  value={
                    (usageStats.sessionsUsed / usageStats.sessionsLimit) * 100
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Storage used</span>
                  <span>
                    {usageStats.storageUsed} GB / {usageStats.storageLimit} GB
                  </span>
                </div>
                <Progress
                  value={
                    (usageStats.storageUsed / usageStats.storageLimit) * 100
                  }
                />
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2 text-yellow-800">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    You have{" "}
                    {usageStats.sessionsLimit - usageStats.sessionsUsed}{" "}
                    sessions remaining this month
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Premium Benefits */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
              Why Go Premium?
            </CardTitle>
            <CardDescription>
              Unlock the full potential of your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumBenefits.map((benefit) => (
                <div key={benefit.title} className="text-center p-4">
                  <div className="mx-auto mb-4">{benefit.icon}</div>
                  <h4 className="mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pricing Toggle */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-4 bg-muted rounded-lg p-1">
            <Button
              variant={selectedPlan === "monthly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedPlan("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={selectedPlan === "yearly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedPlan("yearly")}
            >
              Yearly
              <Badge className="ml-2 bg-green-500">Save 17%</Badge>
            </Button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {Object.entries(plans).map(([planKey, plan]) => (
            <Card
              key={planKey}
              className={`relative ${
                plan.hasOwnProperty("popular") && (plan as any).popular
                  ? "ring-2 ring-blue-500 shadow-lg"
                  : ""
              } ${currentPlan === planKey ? "ring-2 ring-green-500" : ""}`}
            >
              {plan.hasOwnProperty("popular") && (plan as any).popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                  Most Popular
                </Badge>
              )}
              {currentPlan === planKey && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500">
                  Current Plan
                </Badge>
              )}

              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center">
                  {planKey !== "free" && (
                    <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                  )}
                  {plan.name}
                </CardTitle>
                <div className="text-4xl">
                  ${plan.price[selectedPlan]}
                  <span className="text-lg text-muted-foreground">
                    /{selectedPlan === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {selectedPlan === "yearly" && plan.price.yearly > 0 && (
                  <p className="text-sm text-green-600">
                    Save ${plan.price.monthly * 12 - plan.price.yearly} per year
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature.name}
                      className="flex items-center space-x-3"
                    >
                      {feature.included ? (
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? ""
                            : "text-muted-foreground line-through"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  {currentPlan === planKey ? (
                    <Button disabled className="w-full">
                      <Check className="w-4 h-4 mr-2" />
                      Current Plan
                    </Button>
                  ) : planKey === "free" ? (
                    <Button variant="outline" disabled className="w-full">
                      Downgrade
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => handleUpgrade(plan.name)}
                      variant={
                        plan.hasOwnProperty("popular") && (plan as any).popular
                          ? "default"
                          : "outline"
                      }
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Upgrade to {plan.name}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="mb-2">Can I cancel my subscription anytime?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll
                continue to have access to premium features until the end of
                your billing period.
              </p>
            </div>

            <div>
              <h4 className="mb-2">What happens to my data if I downgrade?</h4>
              <p className="text-sm text-muted-foreground">
                Your data remains safe. However, some premium features like
                session recordings beyond the free tier limit may become
                inaccessible.
              </p>
            </div>

            <div>
              <h4 className="mb-2">Do you offer student discounts?</h4>
              <p className="text-sm text-muted-foreground">
                Yes! We offer 50% off for students with valid educational email
                addresses. Contact support to verify your student status.
              </p>
            </div>

            <div>
              <h4 className="mb-2">Is there a money-back guarantee?</h4>
              <p className="text-sm text-muted-foreground">
                We offer a 30-day money-back guarantee for all premium plans. If
                you're not satisfied, we'll refund your payment in full.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
