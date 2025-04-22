
import React from 'react';
import TaskList from '@/components/TaskList';
import AddTaskForm from '@/components/AddTaskForm';
import CollaborationStatus from '@/components/CollaborationStatus';

const Tasks: React.FC = () => {
  return (
    <div className="container mx-auto max-w-3xl px-4 pb-24 pt-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground">Manage and track your collaborative tasks</p>
        </div>
        
        <CollaborationStatus />
        
        <div className="mt-4">
          <TaskList />
        </div>
      </div>
      
      <AddTaskForm />
    </div>
  );
};

export default Tasks;
