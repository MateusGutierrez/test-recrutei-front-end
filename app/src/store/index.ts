import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Store } from './interface';

const useTaskStore = create<Store>()(
  persist(
    set => ({
      tasks: [],
      addTask: task => {
        if (!task || !task.id || !task.columnId) return;
        set(state => ({ tasks: [...state.tasks, task] }));
      },
      updateTaskColumn: (taskId, newColumnId) =>
        set(state => ({
          tasks: state.tasks.map(t =>
            t.id === taskId ? { ...t, columnId: newColumnId } : t
          )
        }))
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useTaskStore;
