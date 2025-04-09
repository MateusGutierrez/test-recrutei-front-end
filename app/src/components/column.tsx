import { Label } from './ui/label';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import TaskCard from './task-card';
import { Column, Task } from '@/store/interface';
import { last } from 'lodash';

export const columns: Column[] = [
  { id: 'first', title: 'Ideias' },
  { id: 'second', title: 'A Fazer' },
  { id: 'third', title: 'Fazendo' },
  { id: 'fourth', title: 'Feito' }
];

interface ColumnProps {
  column: Column;
  tasks: Task[];
}

const ColumnContainer: React.FC<ColumnProps> = ({ column, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      columnId: column.id
    }
  });

  const renderTaskCount = (columnId: string) => {
    const count = tasks.length;
    if (count === 0) return null;
    const label = count === 1 ? '1 tarefa' : `${count} tarefas`;
    const lastColumnLabel =
      count === 1 ? '1 tarefa concluída' : `${count} tarefas concluídas`;
    return (
      <p className="text-[#747F93] text-[14px] font-normal">
        {columnId === last(columns)?.id ? lastColumnLabel : label}
      </p>
    );
  };

  return (
    <div
      ref={setNodeRef}
      className="w-[328px] h-[60vh] p-1 flex flex-col gap-4"
    >
      <div>
        <Label className="font-semibold text-[18px] text-[#2E2E2E]">
          {column.title}
        </Label>
        {renderTaskCount(column.id as string)}
      </div>

      <SortableContext
        items={tasks.map(task => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-1">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} columnId={column.id} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default ColumnContainer;
