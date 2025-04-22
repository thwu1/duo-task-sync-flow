
import { Task, User, Collaborator } from '@/types';

// Mock user data
export const currentUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=9b87f5&color=fff'
};

export const collaborators: Collaborator[] = [
  {
    id: 'user2',
    name: 'Jamie Smith',
    email: 'jamie@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Jamie+Smith&background=7E69AB&color=fff',
    status: 'active'
  }
];

// Mock task data
export const mockTasks: Task[] = [
  {
    id: 'task1',
    title: 'Complete project proposal',
    description: 'Finish the draft and send for review',
    completed: false,
    dueDate: '2025-05-01',
    priority: 'high',
    tags: ['work', 'project'],
    createdBy: 'user1',
    assignedTo: 'user1',
    calendarEventId: 'event1'
  },
  {
    id: 'task2',
    title: 'Schedule team meeting',
    description: 'Coordinate with everyone for availability',
    completed: true,
    dueDate: '2025-04-25',
    priority: 'medium',
    tags: ['work', 'meeting'],
    createdBy: 'user2',
    assignedTo: 'user2',
    calendarEventId: 'event2'
  },
  {
    id: 'task3',
    title: 'Review design mockups',
    description: 'Provide feedback on the new UI designs',
    completed: false,
    dueDate: '2025-04-28',
    priority: 'medium',
    tags: ['design', 'feedback'],
    createdBy: 'user1',
    assignedTo: 'user2'
  },
  {
    id: 'task4',
    title: 'Prepare presentation slides',
    description: 'Create slides for the client meeting',
    completed: false,
    dueDate: '2025-05-05',
    priority: 'high',
    tags: ['work', 'presentation'],
    createdBy: 'user2',
    assignedTo: 'user1'
  },
  {
    id: 'task5',
    title: 'Update documentation',
    description: 'Add latest changes to the project docs',
    completed: false,
    dueDate: '2025-05-10',
    priority: 'low',
    tags: ['documentation'],
    createdBy: 'user1',
    assignedTo: 'user1'
  }
];
