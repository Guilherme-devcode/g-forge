import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressBarComponent } from '../lib/components/progress-bar/progress-bar.component';

const meta: Meta<ProgressBarComponent> = {
  title: 'Components/Progress Bar',
  component: ProgressBarComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Progress Bar para exibir o progresso de operações e carregamentos.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'extra-large']
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'striped', 'animated', 'gradient', 'neon']
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'info', 'secondary', 'custom']
    },
    shape: {
      control: { type: 'select' },
      options: ['rounded', 'square', 'pill']
    },
    valueFormat: {
      control: { type: 'select' },
      options: ['percentage', 'value', 'fraction', 'custom']
    },
    textPosition: {
      control: { type: 'select' },
      options: ['inside', 'outside', 'center']
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical']
    }
  }
};

export default meta;
type Story = StoryObj<ProgressBarComponent>;

export const Default: Story = {
  args: {
    value: 65,
    max: 100,
    min: 0,
    size: 'medium',
    variant: 'default',
    color: 'primary',
    shape: 'rounded',
    showValue: true,
    valueFormat: 'percentage',
    textPosition: 'center',
    animated: false
  }
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h4>Small</h4>
          <gforge-progress-bar value="45" size="small" [showValue]="true"></gforge-progress-bar>
        </div>
        <div>
          <h4>Medium</h4>
          <gforge-progress-bar value="65" size="medium" [showValue]="true"></gforge-progress-bar>
        </div>
        <div>
          <h4>Large</h4>
          <gforge-progress-bar value="85" size="large" [showValue]="true"></gforge-progress-bar>
        </div>
        <div>
          <h4>Extra Large</h4>
          <gforge-progress-bar value="75" size="extra-large" [showValue]="true"></gforge-progress-bar>
        </div>
      </div>
    `
  })
};

export const Colors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <gforge-progress-bar value="60" color="primary" [showValue]="true" customText="Primary"></gforge-progress-bar>
        <gforge-progress-bar value="75" color="success" [showValue]="true" customText="Success"></gforge-progress-bar>
        <gforge-progress-bar value="45" color="warning" [showValue]="true" customText="Warning"></gforge-progress-bar>
        <gforge-progress-bar value="30" color="danger" [showValue]="true" customText="Danger"></gforge-progress-bar>
        <gforge-progress-bar value="80" color="info" [showValue]="true" customText="Info"></gforge-progress-bar>
        <gforge-progress-bar value="55" color="secondary" [showValue]="true" customText="Secondary"></gforge-progress-bar>
      </div>
    `
  })
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h4>Default</h4>
          <gforge-progress-bar value="65" variant="default" [showValue]="true"></gforge-progress-bar>
        </div>
        <div>
          <h4>Striped</h4>
          <gforge-progress-bar value="65" variant="striped" [showValue]="true"></gforge-progress-bar>
        </div>
        <div>
          <h4>Animated Striped</h4>
          <gforge-progress-bar value="65" variant="animated" [showValue]="true"></gforge-progress-bar>
        </div>
        <div>
          <h4>Gradient</h4>
          <gforge-progress-bar value="65" variant="gradient" [showValue]="true"></gforge-progress-bar>
        </div>
        <div>
          <h4>Neon</h4>
          <gforge-progress-bar value="65" variant="neon" [showValue]="true"></gforge-progress-bar>
        </div>
      </div>
    `
  })
};

export const Shapes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h4>Rounded</h4>
          <gforge-progress-bar value="65" shape="rounded" size="large" [showValue]="true"></gforge-progress-bar>
        </div>
        <div>
          <h4>Square</h4>
          <gforge-progress-bar value="65" shape="square" size="large" [showValue]="true"></gforge-progress-bar>
        </div>
        <div>
          <h4>Pill</h4>
          <gforge-progress-bar value="65" shape="pill" size="large" [showValue]="true"></gforge-progress-bar>
        </div>
      </div>
    `
  })
};

export const TextPositions: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h4>Outside</h4>
          <gforge-progress-bar value="65" textPosition="outside" [showValue]="true" size="large"></gforge-progress-bar>
        </div>
        <div>
          <h4>Center</h4>
          <gforge-progress-bar value="65" textPosition="center" [showValue]="true" size="large"></gforge-progress-bar>
        </div>
        <div>
          <h4>Inside</h4>
          <gforge-progress-bar value="65" textPosition="inside" [showValue]="true" size="large"></gforge-progress-bar>
        </div>
      </div>
    `
  })
};

export const ValueFormats: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h4>Percentage</h4>
          <gforge-progress-bar value="65" valueFormat="percentage" [showValue]="true"></gforge-progress-bar>
        </div>
        <div>
          <h4>Value</h4>
          <gforge-progress-bar value="65" valueFormat="value" [showValue]="true"></gforge-progress-bar>
        </div>
        <div>
          <h4>Fraction</h4>
          <gforge-progress-bar value="65" valueFormat="fraction" [showValue]="true"></gforge-progress-bar>
        </div>
        <div>
          <h4>Custom Text</h4>
          <gforge-progress-bar value="65" customText="Processando..." [showValue]="true"></gforge-progress-bar>
        </div>
      </div>
    `
  })
};

export const WithBuffer: Story = {
  args: {
    value: 45,
    bufferValue: 75,
    showBuffer: true,
    showValue: true,
    size: 'large',
    customText: 'Carregando... (Buffer: 75%)'
  }
};

export const Indeterminate: Story = {
  args: {
    value: 0,
    indeterminate: true,
    size: 'medium',
    color: 'primary',
    animated: true
  }
};

export const Segmented: Story = {
  args: {
    segments: [
      { value: 30, color: '#28a745', label: 'Completo' },
      { value: 20, color: '#ffc107', label: 'Em Progresso' },
      { value: 15, color: '#dc3545', label: 'Pendente' }
    ],
    max: 100,
    size: 'large'
  }
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; align-items: flex-end; height: 300px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <gforge-progress-bar value="45" orientation="vertical" [showValue]="true" textPosition="outside"></gforge-progress-bar>
          <span>45%</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <gforge-progress-bar value="70" orientation="vertical" color="success" [showValue]="true" textPosition="outside"></gforge-progress-bar>
          <span>70%</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <gforge-progress-bar value="85" orientation="vertical" color="warning" [showValue]="true" textPosition="outside"></gforge-progress-bar>
          <span>85%</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <gforge-progress-bar value="30" orientation="vertical" color="danger" [showValue]="true" textPosition="outside"></gforge-progress-bar>
          <span>30%</span>
        </div>
      </div>
    `
  })
};

export const CustomColor: Story = {
  args: {
    value: 75,
    color: 'custom',
    customColor: '#e74c3c',
    showValue: true,
    size: 'large',
    customText: 'Cor Personalizada'
  }
};