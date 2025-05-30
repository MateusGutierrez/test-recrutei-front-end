import { Task } from '@/store/interface';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { columns } from './column';
import done from '../assets/done.svg';
import Modal from './modal';
import useIsVisible from '@/hooks/useIsVisible';
import { useCallback, useContext, useEffect } from 'react';
import { Context } from '@/provider';
import { Loader2 } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { last } from 'lodash';

interface Props {
  task: Task;
  columnId: string | number;
  isOverlay?: boolean;
}

function calculateRemainingDays(targetDate: string | Date): number {
  const now = new Date();
  const deadline = new Date(targetDate);
  const diffTime = deadline.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}
function getRemainingDaysColorClass(days: number): string {
  if (days <= 0) return 'text-red-600';
  if (days <= 5) return 'text-yellow-600';
  if (days <= 10) return 'text-green-600';
  return 'text-green-600';
}

const TaskContentModal: React.FC = () => {
  const { get_task_info, taskData } = useContext(Context);
  const remainingDays = calculateRemainingDays(taskData?.date as Date);
  const warningLabel =
    remainingDays <= 0 ? 'Atrasado' : `Faltam ${remainingDays} dias`;

  useEffect(() => {
    get_task_info();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {taskData ? (
        <div className="flex flex-col gap-4">
          <div className="flex w-full justify-between">
            <div className="w-full">
              <div className="flex w-full justify-between">
                <Label className="text-sm font-semibold text-[#333]">
                  {taskData.title}
                </Label>
                <div className="flex items-center gap-2">
                  <p
                    className={`text-[10px] font-semibold ${getRemainingDaysColorClass(remainingDays)}`}
                  >
                    {warningLabel}
                  </p>
                  <p className="rounded-[8px] flex justify-between items-center h-[26px] p-3 border border-dotted border-[#747F93] text-[10px] font-semibold text-[#333]">
                    {new Date(taskData.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap text-[#747F93] text-xs font-normal gap-1">
                <span>Responsáveis:</span>
                {taskData.responsible.map((name, i) => (
                  <span key={i}>
                    {i > 0 && ','} {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Textarea
            value={taskData.description}
            className="resize-none bg-[#F1F3F6] text-xs font-normal text-[#747F93] rounded-xl p-4"
            disabled
          />
        </div>
      ) : (
        <div className="flex gap-2 justify-center items-center">
          <Loader2 className="animate-spin text-primary" size={20} />
          <p>Carregando usuários...</p>
        </div>
      )}
    </div>
  );
};

const TaskCard: React.FC<Props> = ({ task, columnId, isOverlay = false }) => {
  const { hide, isVisible, show } = useIsVisible();
  const { setTaskData } = useContext(Context);
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
    disabled: isOverlay
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging || isOverlay ? 1000 : 'auto',
    backgroundColor: isDragging || isOverlay ? '#f0f0f0' : 'white',
    cursor: 'grab'
  };

  const formattedDate = new Date(task.date).toLocaleDateString('pt-BR');
  const remainingDays = calculateRemainingDays(task.date);
  const doneStyle =
    columnId === last(columns)?.id && 'border-[#63B150] border-1';
  const warningLabel =
    remainingDays <= 0 ? 'Atrasado' : `Faltam ${remainingDays} dias`;
  const LastColumnWarningLabel =
    remainingDays <= 0 ? 'Fora do Prazo' : `Dentro do prazo`;

  const closeModal = useCallback(() => {
    setTaskData(null);
    hide();
  }, [hide, setTaskData]);
  return (
    <>
      <Modal
        show={show}
        isVisible={isVisible}
        hide={closeModal}
        children={<TaskContentModal />}
      />
      <div
        onClick={show}
        ref={!isOverlay ? setNodeRef : undefined}
        style={style}
        {...(!isOverlay && attributes)}
        {...(!isOverlay && listeners)}
        className={cn(
          'bg-white border rounded-[24px] p-4 flex flex-col justify-between h-[176px] relative',
          doneStyle
        )}
      >
        {columnId === last(columns)?.id && (
          <img src={done} width={14} className="absolute top-[-1px]" />
        )}
        <div className="flex flex-col gap-1">
          <Label className="text-[14px] text-[#333333] font-[600]">
            {task.task}
          </Label>
          <p className="text-[10px] text-[#747F93] font-[400] max-h-[45px] overflow-hidden">
            {task.description}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <div className="rounded-[12px] flex justify-between items-center h-[28px] p-1 border border-dotted border-[#747F93]">
            <p className="text-[10px] text-[#747F93] font-[400]">
              Data Limite: {formattedDate}
            </p>
            <p
              className={`text-[10px] font-[600] ${getRemainingDaysColorClass(remainingDays)}`}
            >
              {columnId === last(columns)?.id
                ? LastColumnWarningLabel
                : warningLabel}
            </p>
          </div>
        </div>

        <div className="flex gap-1">
          {task.admin.map(user => (
            <span
              className="bg-[#1E90FF] h-[26px] rounded-[8px] text-[10px] font-[400] px-2 leading-[100%] flex items-center text-white"
              key={user}
            >
              {user}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskCard;
