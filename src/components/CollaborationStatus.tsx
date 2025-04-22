
import React from 'react';
import { Collaborator } from '@/types';
import { currentUser, collaborators } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';

const CollaborationStatus: React.FC = () => {
  const activeCollaborators = collaborators.filter(
    collab => collab.status === 'active'
  );
  
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Collaborating with</h3>
      </div>
      
      <div className="flex -space-x-2">
        {/* Current user avatar */}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Avatar className="border-2 border-background w-8 h-8">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent className="w-60">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{currentUser.name} (You)</h4>
                <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                <Badge variant="secondary" className="mt-2">Owner</Badge>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        {/* Collaborators avatars */}
        {activeCollaborators.map(collaborator => (
          <HoverCard key={collaborator.id}>
            <HoverCardTrigger asChild>
              <Avatar className="border-2 border-background w-8 h-8">
                <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-60">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                  <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{collaborator.name}</h4>
                  <p className="text-sm text-muted-foreground">{collaborator.email}</p>
                  <Badge variant="outline" className="mt-2">Collaborator</Badge>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default CollaborationStatus;
