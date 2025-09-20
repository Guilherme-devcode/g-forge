import { Meta, StoryObj } from '@storybook/angular';
import { LoadingComponent } from '../lib/components/loading/loading.component';

export default {
  title: 'G-Forge/Loading',
  component: LoadingComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['spinner', 'dots', 'pulse', 'bars', 'ripple', 'neon'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    theme: {
      control: 'select',
      options: ['default', 'dark', 'neon'],
    },
    color: {
      control: 'color',
    },
  },
} as Meta<LoadingComponent>;

type Story = StoryObj<LoadingComponent>;

export const Spinner: Story = {
  args: {
    type: 'spinner',
    size: 'medium',
    color: '#4ecdc4',
    text: 'Carregando...',
    overlay: false,
    theme: 'default',
  },
};

export const Dots: Story = {
  args: {
    type: 'dots',
    size: 'medium',
    color: '#4ecdc4',
    text: 'Processando...',
    overlay: false,
    theme: 'default',
  },
};

export const Pulse: Story = {
  args: {
    type: 'pulse',
    size: 'medium',
    color: '#4ecdc4',
    text: 'Aguarde...',
    overlay: false,
    theme: 'default',
  },
};

export const Bars: Story = {
  args: {
    type: 'bars',
    size: 'medium',
    color: '#4ecdc4',
    text: 'Carregando dados...',
    overlay: false,
    theme: 'default',
  },
};

export const Ripple: Story = {
  args: {
    type: 'ripple',
    size: 'medium',
    color: '#4ecdc4',
    text: 'Conectando...',
    overlay: false,
    theme: 'default',
  },
};

export const Neon: Story = {
  args: {
    type: 'neon',
    size: 'medium',
    color: '#00ff88',
    text: 'INITIALIZING...',
    overlay: false,
    theme: 'neon',
  },
  decorators: [
    (story) => ({
      template: `
        <div style="
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          padding: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          ${story()}
        </div>
      `,
    }),
  ],
};

export const AllTypes: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; padding: 20px;">
        <div style="text-align: center;">
          <h4>Spinner</h4>
          <gforge-loading type="spinner" size="medium" text="Loading..."></gforge-loading>
        </div>
        
        <div style="text-align: center;">
          <h4>Dots</h4>
          <gforge-loading type="dots" size="medium" text="Processing..."></gforge-loading>
        </div>
        
        <div style="text-align: center;">
          <h4>Pulse</h4>
          <gforge-loading type="pulse" size="medium" text="Please wait..."></gforge-loading>
        </div>
        
        <div style="text-align: center;">
          <h4>Bars</h4>
          <gforge-loading type="bars" size="medium" text="Loading data..."></gforge-loading>
        </div>
        
        <div style="text-align: center;">
          <h4>Ripple</h4>
          <gforge-loading type="ripple" size="medium" text="Connecting..."></gforge-loading>
        </div>
        
        <div style="text-align: center;">
          <h4>Neon</h4>
          <gforge-loading type="neon" size="medium" color="#00ff88" text="SYSTEM READY"></gforge-loading>
        </div>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 40px; align-items: center; justify-content: center; padding: 40px;">
        <div style="text-align: center;">
          <h4>Small</h4>
          <gforge-loading type="spinner" size="small" text="Small"></gforge-loading>
        </div>
        
        <div style="text-align: center;">
          <h4>Medium</h4>
          <gforge-loading type="spinner" size="medium" text="Medium"></gforge-loading>
        </div>
        
        <div style="text-align: center;">
          <h4>Large</h4>
          <gforge-loading type="spinner" size="large" text="Large"></gforge-loading>
        </div>
      </div>
    `,
  }),
};

export const DifferentColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 30px; align-items: center; justify-content: center; padding: 40px; flex-wrap: wrap;">
        <gforge-loading type="spinner" color="#4ecdc4" text="Teal"></gforge-loading>
        <gforge-loading type="dots" color="#ff6b6b" text="Red"></gforge-loading>
        <gforge-loading type="pulse" color="#ffe66d" text="Yellow"></gforge-loading>
        <gforge-loading type="bars" color="#a8e6cf" text="Green"></gforge-loading>
        <gforge-loading type="ripple" color="#6c5ce7" text="Purple"></gforge-loading>
      </div>
    `,
  }),
};

export const DarkTheme: Story = {
  args: {
    type: 'spinner',
    size: 'medium',
    color: '#4ecdc4',
    text: 'Loading in dark mode...',
    overlay: false,
    theme: 'dark',
  },
  decorators: [
    (story) => ({
      template: `
        <div style="
          background: #1a1a1a;
          padding: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          ${story()}
        </div>
      `,
    }),
  ],
};

export const OverlayExample: Story = {
  args: {
    type: 'spinner',
    size: 'large',
    color: '#4ecdc4',
    text: 'Loading application...',
    overlay: true,
    theme: 'default',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="position: relative; height: 400px; background: #f0f0f0; padding: 20px;">
        <h2>Content behind overlay</h2>
        <p>This content is behind the loading overlay.</p>
        <p>The overlay covers the entire screen when enabled.</p>
        
        <div style="margin: 20px 0;">
          <button style="padding: 10px 20px; margin-right: 10px;">Button 1</button>
          <button style="padding: 10px 20px; margin-right: 10px;">Button 2</button>
          <button style="padding: 10px 20px;">Button 3</button>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
          <div style="padding: 20px; background: white; border-radius: 8px;">
            <h3>Card 1</h3>
            <p>Some content here...</p>
          </div>
          <div style="padding: 20px; background: white; border-radius: 8px;">
            <h3>Card 2</h3>
            <p>More content here...</p>
          </div>
        </div>
        
        <gforge-loading 
          [type]="type"
          [size]="size"
          [color]="color"
          [text]="text"
          [overlay]="overlay"
          [theme]="theme">
        </gforge-loading>
      </div>
    `,
  }),
};

export const NeonCyberpunk: Story = {
  render: () => ({
    template: `
      <div style="
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
        padding: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;
      ">
        <h2 style="color: #00ff88; font-family: 'Courier New', monospace; text-align: center; margin: 0;">
          CYBERPUNK LOADING STATES
        </h2>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px;">
          <div style="text-align: center;">
            <gforge-loading type="neon" size="large" color="#00ff88" text="INITIALIZING" theme="neon"></gforge-loading>
          </div>
          
          <div style="text-align: center;">
            <gforge-loading type="spinner" size="large" color="#00ccff" text="SCANNING" theme="neon"></gforge-loading>
          </div>
          
          <div style="text-align: center;">
            <gforge-loading type="ripple" size="large" color="#ff0080" text="PROCESSING" theme="neon"></gforge-loading>
          </div>
        </div>
      </div>
    `,
  }),
};