
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, List, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar: React.FC = () => {
  const location = useLocation();
  
  const items = [
    {
      name: 'Tasks',
      icon: <List className="h-6 w-6" />,
      path: '/',
    },
    {
      name: 'Calendar',
      icon: <Calendar className="h-6 w-6" />,
      path: '/calendar',
    },
    {
      name: 'Profile',
      icon: <User className="h-6 w-6" />,
      path: '/profile',
    },
    {
      name: 'Settings',
      icon: <Settings className="h-6 w-6" />,
      path: '/settings',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-10">
      <div className="flex justify-around py-2">
        {items.map((item) => {
          const isActive = 
            (item.path === '/' && location.pathname === '/') || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center px-4 py-2 rounded-md transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
