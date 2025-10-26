import type { Meta, StoryObj } from '@storybook/angular';
import { ParticleSystemComponent } from '../lib/components/particle-system/particle-system.component';

const meta: Meta<ParticleSystemComponent> = {
  title: 'Innovative/Particle System',
  component: ParticleSystemComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    effect: {
      control: { type: 'select' },
      options: ['float', 'explosion', 'spiral', 'wave', 'constellation', 'rain'],
    },
    shapes: {
      control: { type: 'multi-select' },
      options: ['circle', 'square', 'triangle', 'star'],
    },
  },
};

export default meta;
type Story = StoryObj<ParticleSystemComponent>;

export const Default: Story = {
  args: {
    width: 600,
    height: 400,
    particleCount: 50,
    particleSize: 3,
    particleSpeed: 1,
    effect: 'float',
    interactive: false,
    colors: ['#4ecdc4', '#44a08d', '#093637', '#20bf6b'],
    shapes: ['circle'],
  },
};

export const Interactive: Story = {
  args: {
    width: 600,
    height: 400,
    particleCount: 100,
    particleSize: 4,
    particleSpeed: 2,
    effect: 'explosion',
    interactive: true,
    followMouse: true,
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'],
    shapes: ['circle', 'star'],
  },
};

export const Constellation: Story = {
  args: {
    width: 600,
    height: 400,
    particleCount: 30,
    particleSize: 2,
    particleSpeed: 0.5,
    effect: 'constellation',
    interactive: true,
    colors: ['#4ecdc4', '#ffffff'],
    shapes: ['circle'],
  },
};

export const Rain: Story = {
  args: {
    width: 600,
    height: 400,
    particleCount: 100,
    particleSize: 2,
    particleSpeed: 3,
    effect: 'rain',
    gravity: 0.1,
    wind: 0.05,
    colors: ['#74b9ff', '#0984e3', '#6c5ce7'],
    shapes: ['circle'],
  },
};

export const WithContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <gf-particle-system 
        [width]="600" 
        [height]="400" 
        [particleCount]="80" 
        effect="float" 
        [interactive]="true"
        [colors]="['#4ecdc4', '#44a08d', '#093637']">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: white; text-align: center; z-index: 10; position: relative;">
          <h2 style="margin: 0; font-size: 2.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">Particle Background</h2>
          <p style="margin: 10px 0 0 0; font-size: 1.2rem; opacity: 0.9;">Interactive particle system with content overlay</p>
        </div>
      </gf-particle-system>
    `,
  }),
};