import type { Meta, StoryObj } from '@storybook/angular';
import { SliderComponent } from '../lib/components/slider/slider.component';

const meta: Meta<SliderComponent> = {
  title: 'Advanced UI/Slider',
  component: SliderComponent,
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
      options: ['default', 'neon', 'gradient', 'pulse'],
    },
  },
};

export default meta;
type Story = StoryObj<SliderComponent>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    color: 'primary',
    size: 'medium',
    variant: 'default',
  },
};

export const WithTicks: Story = {
  args: {
    min: 0,
    max: 100,
    step: 10,
    showValue: true,
    showTicks: true,
    tickCount: 6,
    color: 'primary',
    size: 'medium',
    variant: 'default',
  },
};

export const NeonEffect: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    color: 'primary',
    size: 'medium',
    variant: 'neon',
  },
};

export const WithParticles: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    showParticles: true,
    color: 'primary',
    size: 'medium',
    variant: 'gradient',
  },
};

export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 30px; width: 300px;">
        <div>
          <h4>Small</h4>
          <gf-slider [min]="0" [max]="100" [showValue]="true" size="small" color="primary"></gf-slider>
        </div>
        <div>
          <h4>Medium</h4>
          <gf-slider [min]="0" [max]="100" [showValue]="true" size="medium" color="secondary"></gf-slider>
        </div>
        <div>
          <h4>Large</h4>
          <gf-slider [min]="0" [max]="100" [showValue]="true" size="large" color="success"></gf-slider>
        </div>
      </div>
    `,
  }),
};