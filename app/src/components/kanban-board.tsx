import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  MouseSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useCallback, useState } from 'react';
import TaskCard from './task-card';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import ColumnContainer, { columns } from './column';
import { Task } from '@/store/interface';
import useTaskStore from '@/store';

const KanbanBoard: React.FC = () => {
  const { updateTaskColumn, tasks } = useTaskStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  );
  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveTask(null);
      if (!over || active.id === over.id) return;
      const activeTask = tasks.find(t => t.id === active.id);
      if (!activeTask) return;
      const overColumnId = over?.data?.current?.columnId;
      if (!overColumnId || overColumnId === activeTask.columnId) return;
      updateTaskColumn(activeTask.id, overColumnId);
    },
    [tasks, updateTaskColumn]
  );

  return (
    <ScrollArea className="w-full overflow-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={onDragEnd}
        onDragStart={event => {
          const draggedId = event.active.id;
          const draggedTask = tasks.find(t => t.id === draggedId);
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
        <div className="flex justify-between items-start h-full">
          {columns.map(col => (
            <SortableContext
              key={col.id}
              items={tasks
                .filter(item => item && item.columnId === col.id)
                .map(item => item.id)}
              strategy={rectSortingStrategy}
            >
              <ColumnContainer
                column={col}
                tasks={tasks.filter(item => item && item.columnId === col.id)}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
      <ScrollBar orientation="horizontal" className="bg-gray-300" />
    </ScrollArea>
  );
};
export default KanbanBoard;
