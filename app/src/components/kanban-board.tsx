import { v4 as uuidv4 } from 'uuid';
import { Label } from './ui/label';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  useDroppable
} from '@dnd-kit/core';
import {
  rectSortingStrategy,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useMemo, useState } from 'react';
import { Button } from './ui/button';
import TaskCard from './task-card';

type Column = {
  id: string | number;
  title: string;
};

export type Task = {
  id: string | number;
  columnId: string | number;
  content: string;
};

const columns: Column[] = [
  {
    id: uuidv4(),
    title: 'Ideias'
  },
  {
    id: uuidv4(),
    title: 'A Fazer'
  },
  {
    id: uuidv4(),
    title: 'Fazendo'
  },
  {
    id: uuidv4(),
    title: 'Feito'
  }
];

interface ColumnProps {
  column: Column;
  createTask: (id: string | number) => void;
  tasks: Task[];
}

const ColumnContainer: React.FC<ColumnProps> = ({
  column,
  createTask,
  tasks
}) => {
  const taskIds = useMemo(() => tasks.map(item => item.id), [tasks]);
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      columnId: column.id
    }
  });

  return (
    <div ref={setNodeRef} className="border border-black w-full h-full p-2">
      <Label>{column.title}</Label>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {tasks.map(item => (
            <TaskCard task={item} key={item.id} columnId={column.id} />
          ))}
        </div>
      </SortableContext>
      <Button onClick={() => createTask(column.id)}>Add task</Button>
    </div>
  );
};

const KanbanBoard: React.FC = () => {
  const [task, setTask] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const createTask = (id: number | string) => {
    const newTask: Task = {
      id: uuidv4(),
      columnId: id,
      content: `task ${task.length + 1}`
    };
    setTask([...task, newTask]);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over || active.id === over.id) return;
    const activeTask = task.find(t => t.id === active.id);
    if (!activeTask) return;

    const newColumnId = over.id; // <- pega direto do over.id

    if (!newColumnId || newColumnId === activeTask.columnId) return;

    setTask(prev =>
      prev.map(t =>
        t.id === activeTask.id ? { ...t, columnId: newColumnId } : t
      )
    );
  };

  return (
    <div>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={onDragEnd}
        onDragStart={event => {
          const draggedId = event.active.id;
          const draggedTask = task.find(t => t.id === draggedId);
          if (draggedTask) setActiveTask(draggedTask);
        }}
      >
        <DragOverlay>
          {activeTask ? (
            <TaskCard
              task={activeTask}
              columnId={activeTask.columnId}
              isOverlay
            />
          ) : null}
        </DragOverlay>
        <div className="flex justify-between items-start gap-2 h-full">
          {columns.map(col => (
            <SortableContext
              key={col.id}
              items={task
                .filter(item => item.columnId === col.id)
                .map(item => item.id)}
              strategy={rectSortingStrategy}
            >
              <ColumnContainer
                column={col}
                createTask={createTask}
                tasks={task.filter(item => item.columnId === col.id)}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
};
export default KanbanBoard;
