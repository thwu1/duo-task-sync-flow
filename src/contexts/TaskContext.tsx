
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '@/types';
import { mockTasks } from '@/data/mockData';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    // Load mock data
    setTasks(mockTasks);
  }, []);

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task${Date.now()}`, // Simple ID generation
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    console.log('Task added:', newTask);
    // In a real app, we'd sync with Google Calendar here
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    );
    console.log('Task updated:', id);
    // In a real app, we'd update Google Calendar event here
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    console.log('Task deleted:', id);
    // In a real app, we'd delete the Google Calendar event here
  };
  
  const toggleTaskCompletion = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    console.log('Task completion toggled:', id);
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      updateTask, 
      deleteTask,
      toggleTaskCompletion
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
