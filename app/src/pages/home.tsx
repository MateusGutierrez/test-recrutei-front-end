import React from 'react';
import Content from '@/components/content';
import Modal from '@/components/modal';
import KanbanBoard from '@/components/kanban-board';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import TaskForm from '@/components/form';
import useIsVisible from '@/hooks/useIsVisible';

const Home: React.FC = () => {
  const { isVisible, hide, show } = useIsVisible();
  return (
    <Content>
      <section>
        <Modal
          hide={hide}
          show={show}
          isVisible={isVisible}
          trigger={
            <div className="text-center mb-4 bg-white w-[162px] h-[72px] rounded-b-[16px] flex items-center justify-center m-auto">
              <Button
                className="h-[40px] rounded-[32px] font-bold cursor-pointer"
                onClick={() => show()}
              >
                Adicionar Tarefa
              </Button>
            </div>
          }
          children={
            <>
              <DialogHeader>
                <DialogTitle>Adicionar Tarefa</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes da nova tarefa
                </DialogDescription>
              </DialogHeader>
              <TaskForm hide={hide} />
            </>
          }
        />

        <div className="flex justify-end">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="rounded-full text-[#ADB8CB] h-[40px]"
              disabled
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="secondary"
              className="rounded-full bg-white text-[#ADB8CB] h-[40px]"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <KanbanBoard />
      </section>
    </Content>
  );
};

export default Home;
