import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { Calendar } from 'lucide-react';

interface AuthScreenProps {
  onComplete: (userData: any) => void;
}

export function AuthScreen({ onComplete }: AuthScreenProps) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthdate: '',
    agreeToTerms: false
  });

  const handleLogin = () => {
    // Mock login - in real app would validate credentials
    onComplete({ 
      id: '1', 
      email: loginData.email, 
      name: 'User', 
      isNewUser: false 
    });
  };

  const handleRegister = () => {
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!registerData.agreeToTerms) {
      alert('Please agree to the terms of service');
      return;
    }
    
    onComplete({
      id: Date.now().toString(),
      email: registerData.email,
      name: registerData.name,
      birthdate: registerData.birthdate,
      isNewUser: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center px-4 sm:px-6">
          <div className="mx-auto mb-4 p-3 bg-primary rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
            <span className="text-primary-foreground text-xl sm:text-2xl">🎓</span>
          </div>
          <CardTitle className="text-lg sm:text-xl">SkillSwap</CardTitle>
          <CardDescription className="text-sm">Learn skills, teach others, grow together</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="text-sm">Login</TabsTrigger>
              <TabsTrigger value="register" className="text-sm">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <Button onClick={handleLogin} className="w-full">
                Login
              </Button>
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Or continue with</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    Google
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    Facebook
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  value={registerData.name}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-birthdate">Birth Date</Label>
                <Input
                  id="register-birthdate"
                  type="date"
                  value={registerData.birthdate}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, birthdate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm">Confirm Password</Label>
                <Input
                  id="register-confirm"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={registerData.agreeToTerms}
                  onCheckedChange={(checked) => 
                    setRegisterData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                  }
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>
              <Button onClick={handleRegister} className="w-full">
                Create Account
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}