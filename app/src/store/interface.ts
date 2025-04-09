export interface Task {
  id: string | number;
  columnId: string | number;
  task: string;
  description: string;
  admin: string[];
  date: Date | string;
}
export interface Column {
  id: string | number;
  title: string;
}
export interface Store {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTaskColumn: (id: string | number, newColumnId: string | number) => void;
}
