
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CalendarCheck, CalendarX } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

interface CalendarIntegrationProps {
  isConnected?: boolean;
}

const CalendarIntegration: React.FC<CalendarIntegrationProps> = ({ 
  isConnected = false 
}) => {
  const [connected, setConnected] = useState(isConnected);
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setConnected(true);
      setLoading(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setConnected(false);
      setLoading(false);
    }, 1000);
  };

  if (connected) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-green-500 text-green-600 flex items-center">
              <CalendarCheck className="mr-1 h-3 w-3" />
              Connected
            </Badge>
            <span className="text-sm text-muted-foreground">Google Calendar</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDisconnect}
            disabled={loading}
            className="text-destructive mt-2 md:mt-0"
          >
            {loading ? "Disconnecting..." : "Disconnect"}
          </Button>
        </div>
        
        <Alert>
          <Calendar className="h-4 w-4" />
          <AlertTitle>Sync is active</AlertTitle>
          <AlertDescription>
            All new tasks with due dates will automatically create events in your Google Calendar.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-orange-500 text-orange-600 flex items-center">
            <CalendarX className="mr-1 h-3 w-3" />
            Not Connected
          </Badge>
          <span className="text-sm text-muted-foreground">Google Calendar</span>
        </div>
      </div>
      
      <Alert variant="destructive">
        <Calendar className="h-4 w-4" />
        <AlertTitle>Calendar sync is disabled</AlertTitle>
        <AlertDescription>
          Connect your Google Calendar to automatically sync tasks and due dates.
        </AlertDescription>
      </Alert>
      
      <Button 
        onClick={handleConnect} 
        disabled={loading}
        className="w-full"
      >
        {loading ? "Connecting..." : "Connect Google Calendar"}
      </Button>
    </div>
  );
};

export default CalendarIntegration;
