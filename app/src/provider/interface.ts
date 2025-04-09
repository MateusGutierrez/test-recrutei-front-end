export interface ContextProps {
  children: React.ReactNode;
}

export interface FetchedTask {
  id: string | number;
  date: Date | string;
  description: string;
  responsible: string[];
  status: string;
  title: string;
}

export interface IContext {
  get_task_info: () => void;
  taskData: FetchedTask | null;
  setTaskData: (value: FetchedTask | null) => void;
}
