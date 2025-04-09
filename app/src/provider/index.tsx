import { createContext, useCallback, useState } from 'react';
import { ContextProps, FetchedTask, IContext } from './interface';

const endpoint = import.meta.env.VITE_JSON_URL;

export const Context = createContext({} as IContext);

export const Provider = ({ children }: ContextProps) => {
  const [taskData, setTaskData] = useState<FetchedTask | null>(null);
  const get_task_info = useCallback(async () => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Erro ao carregar os dados');
      const data = await response.json();
      setTaskData(data[Math.floor(Math.random() * data.length)]);
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  return (
    <Context.Provider value={{ get_task_info, taskData, setTaskData }}>
      {children}
    </Context.Provider>
  );
};
