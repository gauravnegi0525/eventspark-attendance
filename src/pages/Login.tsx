import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSigningUp) {
      const { error } = await signUp(email, password);
      if (error) return toast.error(error.message || 'Sign up failed');
      toast.success('Sign up successful! Please check your email to confirm if required.');
      navigate(from, { replace: true });
    } else {
      const { error } = await signIn(email, password);
      if (error) return toast.error(error.message || 'Sign in failed');
      toast.success('Signed in successfully');
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>{isSigningUp ? 'Create account' : 'Sign in'}</CardTitle>
            <CardDescription>
              Sign in to access admin features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Password</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="flex items-center justify-between">
                <Button type="submit" className="gap-2">
                  {isSigningUp ? 'Create account' : 'Sign in'}
                </Button>
                <Button variant="ghost" onClick={() => setIsSigningUp((s) => !s)}>
                  {isSigningUp ? 'Have an account? Sign in' : 'Need an account? Sign up'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
