
import React, { useState } from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import TaskItem from './TaskItem';
import { Task } from '@/types';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const TaskList: React.FC = () => {
  const { tasks } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    // In a real app, this would open an edit modal or drawer
    console.log('Edit task:', task);
  };

  // Filter tasks based on current filters and search term
  const filteredTasks = tasks.filter(task => {
    // Apply completed/active filter
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'active' && task.completed) return false;
    
    // Apply search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        task.title.toLowerCase().includes(searchLower) ||
        (task.description && task.description.toLowerCase().includes(searchLower)) ||
        (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      );
    }
    
    return true;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    // Default: newest first
    return a.id.localeCompare(b.id);
  });

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        {sortedTasks.length > 0 ? (
          sortedTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onEdit={handleEdit} 
            />
          ))
        ) : (
          <div className="text-center py-10 px-4">
            <p className="text-muted-foreground">
              {searchTerm 
                ? "No tasks match your search" 
                : filter !== 'all' 
                  ? `No ${filter} tasks found` 
                  : "No tasks yet. Add your first task!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
