import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Button> = {
  title: 'Components/ui/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: 'select',
      description: 'Button variants',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link'
      ]
    },
    size: {
      control: 'select',
      description: 'button sizes',
      options: ['default', 'sm', 'lg', 'icon']
    }
  }
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    disabled: false,
    onClick: action('default click'),
    children: 'Default button',
    className: ''
  }
};
