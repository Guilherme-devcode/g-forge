import type { Meta, StoryObj } from '@storybook/angular';
import { SwitchComponent } from '../lib/components/switch/switch.component';

const meta: Meta<SwitchComponent> = {
  title: 'Advanced UI/Switch',
  component: SwitchComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'success'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'ios', 'material', 'neon', 'morphism'],
    },
  },
};

export default meta;
type Story = StoryObj<SwitchComponent>;

export const Default: Story = {
  args: {
    color: 'primary',
    size: 'medium',
    variant: 'default',
    showLabels: false,
  },
};

export const WithLabels: Story = {
  args: {
    color: 'primary',
    size: 'medium',
    variant: 'default',
    showLabels: true,
    onLabel: 'ON',
    offLabel: 'OFF',
  },
};

export const IOSStyle: Story = {
  args: {
    color: 'success',
    size: 'medium',
    variant: 'ios',
    showLabels: false,
  },
};

export const MaterialStyle: Story = {
  args: {
    color: 'primary',
    size: 'medium',
    variant: 'material',
    showLabels: false,
  },
};

export const NeonEffect: Story = {
  args: {
    color: 'primary',
    size: 'medium',
    variant: 'neon',
    showLabels: false,
  },
};

export const Loading: Story = {
  args: {
    color: 'primary',
    size: 'medium',
    variant: 'default',
    loading: true,
  },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start;">
        <div style="display: flex; align-items: center; gap: 15px;">
          <span style="width: 80px;">Default:</span>
          <gf-switch variant="default" color="primary"></gf-switch>
        </div>
        <div style="display: flex; align-items: center; gap: 15px;">
          <span style="width: 80px;">iOS:</span>
          <gf-switch variant="ios" color="success"></gf-switch>
        </div>
        <div style="display: flex; align-items: center; gap: 15px;">
          <span style="width: 80px;">Material:</span>
          <gf-switch variant="material" color="primary"></gf-switch>
        </div>
        <div style="display: flex; align-items: center; gap: 15px;">
          <span style="width: 80px;">Neon:</span>
          <gf-switch variant="neon" color="danger"></gf-switch>
        </div>
        <div style="display: flex; align-items: center; gap: 15px;">
          <span style="width: 80px;">Morphism:</span>
          <gf-switch variant="morphism" color="secondary"></gf-switch>
        </div>
      </div>
    `,
  }),
};