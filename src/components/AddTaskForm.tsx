
import React, { useState } from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import { Task } from '@/types';
import { currentUser, collaborators } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Calendar, CalendarPlus, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const AddTaskForm: React.FC = () => {
  const { addTask } = useTaskContext();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [tags, setTags] = useState('');
  const [assignedTo, setAssignedTo] = useState(currentUser.id);
  const [addToCalendar, setAddToCalendar] = useState(true);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!title.trim()) return;

    // Process tags
    const tagList = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    // Create new task
    const newTask: Omit<Task, 'id'> = {
      title,
      description: description || undefined,
      completed: false,
      dueDate: dueDate ? format(dueDate, 'yyyy-MM-dd') : undefined,
      priority,
      tags: tagList.length > 0 ? tagList : undefined,
      createdBy: currentUser.id,
      assignedTo,
      // In a real app, we would generate this after adding to Google Calendar
      calendarEventId: addToCalendar ? `cal${Date.now()}` : undefined
    };

    addTask(newTask);
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate(undefined);
    setTags('');
    setAssignedTo(currentUser.id);
    setAddToCalendar(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-10 rounded-full h-14 w-14 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Name</Label>
            <Input
              id="title"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add details about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(value: Task['priority']) => setPriority(value)}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, 'PPP') : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => {
                      setDueDate(date);
                      setDatePickerOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              placeholder="work, project, research"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="assignedTo">Assign To</Label>
            <Select value={assignedTo} onValueChange={setAssignedTo}>
              <SelectTrigger id="assignedTo">
                <SelectValue placeholder="Assign to" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={currentUser.id}>Me (Alex)</SelectItem>
                <SelectItem value={collaborators[0].id}>Jamie</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="calendar" 
              checked={addToCalendar} 
              onCheckedChange={(checked) => setAddToCalendar(checked as boolean)}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="calendar" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
                <CalendarPlus className="mr-2 h-4 w-4" />
                Add to Google Calendar
              </Label>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskForm;
