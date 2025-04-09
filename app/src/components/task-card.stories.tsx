import type { Meta, StoryObj } from '@storybook/react';
import TaskCard from './task-card';
import { Context } from '@/provider';
import { columns } from './column';

const mockTask = {
  id: 'task-1',
  task: 'Exemplo de title',
  title: 'Exemplo de title',
  description: 'Descrição de exemplo para visualização no storybook',
  date: new Date().toISOString(),
  columnId: columns[0].id,
  admin: ['João', 'Maria'],
  responsible: ['João', 'Maria'],
  status: 'pendente'
};

const withMockContext = (StoryComponent: React.FC) => (
  <Context.Provider
    value={{
      get_task_info: () => console.log('Mock get_task_info'),
      setTaskData: () => {},
      taskData: mockTask
    }}
  >
    <StoryComponent />
  </Context.Provider>
);

const meta: Meta<typeof TaskCard> = {
  title: 'Components/TaskCard',
  component: TaskCard,
  decorators: [withMockContext],
  parameters: {
    layout: 'centered'
  }
};

export default meta;

type Story = StoryObj<typeof TaskCard>;

export const Default: Story = {
  args: {
    task: mockTask,
    columnId: columns[0].id,
    isOverlay: false
  }
};

export const DoneCard: Story = {
  args: {
    task: mockTask,
    columnId: columns[columns.length - 1].id,
    isOverlay: false
  }
};
