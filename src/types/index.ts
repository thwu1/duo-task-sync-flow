
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  tags?: string[];
  createdBy: string;
  assignedTo?: string;
  calendarEventId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Collaborator extends User {
  status: 'active' | 'invited';
}
