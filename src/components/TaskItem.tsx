
import React from 'react';
import { format } from 'date-fns';
import { Task } from '@/types';
import { useTaskContext } from '@/contexts/TaskContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { 
  Calendar,
  Clock,
  Edit,
  Trash,
  User
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const { toggleTaskCompletion, deleteTask } = useTaskContext();
  
  const priorityColor = {
    low: 'bg-task-low text-white',
    medium: 'bg-task-medium text-white',
    high: 'bg-task-high text-white'
  };
  
  return (
    <div className={cn(
      "flex flex-col p-4 rounded-lg border mb-3 transition-all duration-200",
      task.completed ? "opacity-70 bg-muted" : "bg-white"
    )}>
      <div className="flex items-start gap-3">
        <Checkbox 
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => toggleTaskCompletion(task.id)}
          className="mt-1"
        />
        
        <div className="flex-1">
          <h3 className={cn(
            "text-base font-medium transition-all",
            task.completed && "line-through text-task-completed"
          )}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {task.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2">
            {task.dueDate && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 mr-1" />
                {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </div>
            )}
            
            <Badge className={priorityColor[task.priority]}>
              {task.priority}
            </Badge>
            
            {task.assignedTo && (
              <div className="flex items-center text-xs text-muted-foreground">
                <User className="w-3 h-3 mr-1" />
                {task.assignedTo === 'user1' ? 'You' : 'Jamie'}
              </div>
            )}
            
            {task.calendarEventId && (
              <Badge variant="outline" className="border-purple-light text-purple">
                <Calendar className="w-3 h-3 mr-1" />
                Calendar
              </Badge>
            )}
          </div>
          
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {task.tags.map(tag => (
                <span 
                  key={tag} 
                  className="text-xs px-2 py-0.5 bg-secondary rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onEdit(task)}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => deleteTask(task.id)}
            className="h-8 w-8 text-destructive"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
