import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface AuthScreenProps {
  onComplete: (userData: any) => void;
}

export function AuthScreen({ onComplete }: AuthScreenProps) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    birthdate: "",
    agreeToTerms: false,
  });

  const handleLogin = () => {
    // Mock login - in real app would validate credentials
    onComplete({
      id: "1",
      email: loginData.email,
      name: "User",
      isNewUser: false,
    });
  };

  const handleRegister = () => {
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!registerData.agreeToTerms) {
      alert("Please agree to the terms of service");
      return;
    }

    onComplete({
      id: Date.now().toString(),
      email: registerData.email,
      name: registerData.name,
      birthdate: registerData.birthdate,
      isNewUser: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center px-4 sm:px-6">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="SkillSwap Logo"
              className="h-20 w-23 object-contain"
            />
          </div>
          {/* <CardTitle className="text-lg sm:text-xl">SkillSwap</CardTitle> */}
          <CardDescription className="text-sm">
            Learn skills, teach others, grow together
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-neutral-200 rounded-full p-1 mb-4">
              <TabsTrigger
                value="login"
                className="text-xs py-0.5 px-2 h-7 rounded-full data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="text-xs py-0.5 px-2 h-7 rounded-full data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 ">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  className="bg-neutral-200"
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  className="bg-neutral-200"
                  id="login-password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <Button
                onClick={handleLogin}
                className="w-full bg-black text-white"
              >
                Login
              </Button>
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Or continue with
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    Facebook
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  className="bg-neutral-200"
                  id="register-name"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  className="bg-neutral-200"
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-birthdate">Birth Date</Label>
                <Input
                  className="bg-neutral-200"
                  id="register-birthdate"
                  type="date"
                  value={registerData.birthdate}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      birthdate: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  className="bg-neutral-200"
                  id="register-password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm">Confirm Password</Label>
                <Input
                  className="bg-neutral-200"
                  id="register-confirm"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={registerData.agreeToTerms}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      agreeToTerms: e.target.checked,
                    }))
                  }
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label className="text-sm leading-relaxed">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>
              <Button
                onClick={handleRegister}
                className="w-full bg-black text-white"
              >
                Create Account
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
