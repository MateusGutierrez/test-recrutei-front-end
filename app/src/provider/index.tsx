import { createContext, useCallback } from 'react';
import { ContextProps, IContext } from './interface';

const endpoint = import.meta.env.VITE_JSON_URL;

export const Context = createContext({} as IContext);

export const Provider = ({ children }: ContextProps) => {
  const get_task_info = useCallback(async () => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Erro ao carregar os dados');
      const data = response.json()
      console.log(data)
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  return (
    <Context.Provider value={{ get_task_info }}>{children}</Context.Provider>
  );
};
