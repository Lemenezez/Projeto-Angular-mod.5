export interface Task {
  _id: string;
  title: string;
  category: string;
  description: string;
  dueDate: string;
  dueTime: string;
  completed: boolean;
}