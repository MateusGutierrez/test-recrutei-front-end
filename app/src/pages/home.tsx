import React from 'react';
import Content from '@/components/content';
import Modal from '@/components/modal';
import KanbanBoard from '@/components/kanban-board';

const Home: React.FC = () => {
  return (
    <Content>
      <section>
        <Modal />
        <KanbanBoard />
      </section>
    </Content>
  );
};

export default Home;
