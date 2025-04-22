import React from 'react';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { useTaskContext } from '@/contexts/TaskContext';
import { Badge } from '@/components/ui/badge';
import CalendarIntegration from '@/components/CalendarIntegration';
import { format } from 'date-fns';
const Calendar: React.FC = () => {
  const {
    tasks
  } = useTaskContext();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  // Function to get tasks for a specific date
  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => task.dueDate && format(new Date(task.dueDate), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
  };

  // Generate a list of dates with tasks
  const getDaysWithTasks = () => {
    const days: Record<string, number> = {};
    tasks.forEach(task => {
      if (task.dueDate) {
        const date = format(new Date(task.dueDate), 'yyyy-MM-dd');
        days[date] = (days[date] || 0) + 1;
      }
    });
    return days;
  };
  const daysWithTasks = getDaysWithTasks();
  const tasksForSelectedDate = selectedDate ? getTasksForDate(selectedDate) : [];
  return <div className="container mx-auto max-w-3xl px-4 pb-24 pt-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground">View and manage your scheduled tasks</p>
        </div>
        
        <CalendarIntegration isConnected={true} />
        
        <div className="bg-card rounded-lg border p-3 md:p-6 shadow-sm">
          <CalendarUI mode="single" selected={selectedDate} onSelect={setSelectedDate} modifiers={{
          withTasks: date => {
            const dateKey = format(date, 'yyyy-MM-dd');
            return !!daysWithTasks[dateKey];
          }
        }} modifiersClassNames={{
          withTasks: "with-tasks"
        }} components={{
          DayContent: ({
            date
          }) => {
            const dateKey = format(date, 'yyyy-MM-dd');
            const count = daysWithTasks[dateKey] || 0;
            return <div className="relative w-full h-full flex items-center justify-center">
                    {date.getDate()}
                    {count > 0 && <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-purple" aria-label={`${count} tasks`} />}
                  </div>;
          }
        }} className="mx-0 px-[200px]" />
        </div>
        
        <div className="bg-card rounded-lg border p-4 shadow-sm">
          <h2 className="text-lg font-medium mb-4">
            {selectedDate ? <>Tasks for {format(selectedDate, 'MMMM d, yyyy')}</> : <>Select a date to view tasks</>}
          </h2>
          
          {selectedDate && <div className="space-y-2">
              {tasksForSelectedDate.length > 0 ? tasksForSelectedDate.map(task => <div key={task.id} className={`p-3 rounded-md border ${task.completed ? 'bg-muted opacity-70' : 'bg-background'}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                          {task.title}
                        </span>
                        <Badge className="ml-2" variant="outline">
                          {task.priority}
                        </Badge>
                      </div>
                      <Badge className={`
                          ${task.completed ? 'bg-task-completed' : 'bg-purple'}
                          text-white
                        `}>
                        {task.completed ? 'Completed' : 'Active'}
                      </Badge>
                    </div>
                  </div>) : <p className="text-muted-foreground text-center py-4">
                  No tasks scheduled for this day
                </p>}
            </div>}
        </div>
      </div>
    </div>;
};
export default Calendar;