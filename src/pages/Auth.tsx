
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Navigate } from 'react-router-dom';

export default function Auth() {
  const { user, signInWithGoogle } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto max-w-md min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Welcome to TaskSync</h1>
          <p className="text-muted-foreground">
            Sign in to sync your tasks with Google Calendar
          </p>
        </div>

        <Button 
          onClick={signInWithGoogle} 
          className="w-full"
          size="lg"
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
