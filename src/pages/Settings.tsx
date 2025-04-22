
import React from 'react';
import { 
  Bell, 
  Calendar, 
  Check, 
  Clock, 
  Eye, 
  Lock, 
  LogOut, 
  Settings as SettingsIcon, 
  User 
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CalendarIntegration from '@/components/CalendarIntegration';

const Settings: React.FC = () => {
  return (
    <div className="container mx-auto max-w-3xl px-4 pb-24 pt-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Customize your app experience</p>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold flex items-center mb-4">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </h2>
          <Separator className="mb-4" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notif">Email notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about task updates and assignments
                </p>
              </div>
              <Switch id="email-notif" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="due-reminder">Due date reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified before tasks are due
                </p>
              </div>
              <Switch id="due-reminder" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="collab-notif">Collaboration updates</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications when collaborators make changes
                </p>
              </div>
              <Switch id="collab-notif" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold flex items-center mb-4">
            <Calendar className="h-5 w-5 mr-2" />
            Calendar Settings
          </h2>
          <Separator className="mb-4" />
          
          <CalendarIntegration isConnected={true} />
          
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-sync">Auto-sync tasks</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically add tasks to Google Calendar
                </p>
              </div>
              <Switch id="auto-sync" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reminder">Add reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Include reminder notifications for calendar events
                </p>
              </div>
              <Switch id="reminder" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold flex items-center mb-4">
            <Eye className="h-5 w-5 mr-2" />
            Appearance
          </h2>
          <Separator className="mb-4" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark mode</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark mode
                </p>
              </div>
              <Switch id="dark-mode" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compact-view">Compact view</Label>
                <p className="text-sm text-muted-foreground">
                  Show more tasks in a condensed layout
                </p>
              </div>
              <Switch id="compact-view" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            <Lock className="mr-2 h-4 w-4" />
            Change Password
          </Button>
          
          <Button variant="outline" className="w-full text-destructive hover:text-destructive border-destructive/30">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
