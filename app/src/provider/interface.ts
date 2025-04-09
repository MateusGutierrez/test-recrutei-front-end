export interface ContextProps {
  children: React.ReactNode;
}
export interface IContext {
  get_task_info: () => Promise<void>;
}
