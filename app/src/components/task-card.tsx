import { useSortable } from '@dnd-kit/sortable';
import { Task } from './kanban-board';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  task: Task;
  columnId: string | number;
  isOverlay?: boolean;
}

const TaskCard: React.FC<Props> = ({ task, columnId, isOverlay = false }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
      columnId
    },
    disabled: isOverlay // evita conflito no overlay
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging || isOverlay ? 1000 : 'auto',
    backgroundColor: isDragging || isOverlay ? '#f0f0f0' : 'white',
    cursor: 'grab'
  };

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      style={style}
      {...(!isOverlay ? attributes : {})}
      {...(!isOverlay ? listeners : {})}
      className="bg-white p-2 border rounded shadow"
    >
      <p>{task.content}</p>
    </div>
  );
};

export default TaskCard;
