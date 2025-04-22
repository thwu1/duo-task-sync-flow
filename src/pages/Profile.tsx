
import React from 'react';
import { currentUser, collaborators } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Check, Edit, Mail, User, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Profile: React.FC = () => {
  return (
    <div className="container mx-auto max-w-3xl px-4 pb-24 pt-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Manage your account and collaborations</p>
        </div>

        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="bg-gradient-to-r from-purple to-purple-light h-32 relative">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white bg-black/20 hover:bg-black/30">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="px-6 pb-6 relative">
            <Avatar className="h-24 w-24 border-4 border-background absolute -top-12">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="pt-16">
              <h2 className="text-2xl font-bold">{currentUser.name}</h2>
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-1" />
                <span>{currentUser.email}</span>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Badge className="bg-purple text-white">
                  <User className="h-3 w-3 mr-1" />
                  Account Owner
                </Badge>
                <Badge variant="outline" className="border-purple text-purple-dark">
                  <Calendar className="h-3 w-3 mr-1" />
                  Calendar Connected
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">
            <Users className="h-5 w-5 inline mr-2" />
            Collaborators
          </h2>
          <Separator className="mb-4" />
          
          {collaborators.map((collaborator) => (
            <div key={collaborator.id} className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                  <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{collaborator.name}</h3>
                  <p className="text-sm text-muted-foreground">{collaborator.email}</p>
                </div>
              </div>
              <Badge className="bg-green-500 text-white">
                <Check className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          ))}
          
          <Button className="w-full mt-4">
            <Users className="h-4 w-4 mr-2" />
            Invite New Collaborator
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
