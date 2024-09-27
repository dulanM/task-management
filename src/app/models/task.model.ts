export interface Task {
  _id?: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  dueDate?: string;
}