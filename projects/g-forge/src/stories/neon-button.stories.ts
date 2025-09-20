import { Meta, StoryObj } from '@storybook/angular';
import { NeonButtonComponent } from '../lib/components/neon-button/neon-button.component';

export default {
  title: 'G-Forge/NeonButton',
  component: NeonButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    neonColor: {
      control: 'color',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    glowStyle: {
      control: 'select',
      options: ['pulse', 'static', 'flicker', 'wave'],
    },
  },
  decorators: [
    (story) => ({
      template: `
        <div style="
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
          padding: 40px;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        ">
          ${story()}
        </div>
      `,
    }),
  ],
} as Meta<NeonButtonComponent>;

type Story = StoryObj<NeonButtonComponent>;

export const Default: Story = {
  args: {
    label: 'NEON BUTTON',
    neonColor: '#00ff88',
    size: 'medium',
    glowStyle: 'pulse',
    disabled: false,
    scanLine: true,
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
        <gforge-neon-button 
          label="SMALL"
          size="small"
          neonColor="#00ff88">
        </gforge-neon-button>
        
        <gforge-neon-button 
          label="MEDIUM"
          size="medium"
          neonColor="#00ff88">
        </gforge-neon-button>
        
        <gforge-neon-button 
          label="LARGE"
          size="large"
          neonColor="#00ff88">
        </gforge-neon-button>
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
        <gforge-neon-button 
          label="GREEN"
          neonColor="#00ff88">
        </gforge-neon-button>
        
        <gforge-neon-button 
          label="BLUE"
          neonColor="#00ccff">
        </gforge-neon-button>
        
        <gforge-neon-button 
          label="PINK"
          neonColor="#ff0080">
        </gforge-neon-button>
        
        <gforge-neon-button 
          label="ORANGE"
          neonColor="#ff6600">
        </gforge-neon-button>
        
        <gforge-neon-button 
          label="PURPLE"
          neonColor="#8800ff">
        </gforge-neon-button>
      </div>
    `,
  }),
};

export const GlowStyles: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; max-width: 400px;">
        <gforge-neon-button 
          label="PULSE"
          glowStyle="pulse"
          neonColor="#00ff88">
        </gforge-neon-button>
        
        <gforge-neon-button 
          label="STATIC"
          glowStyle="static"
          neonColor="#00ccff">
        </gforge-neon-button>
        
        <gforge-neon-button 
          label="FLICKER"
          glowStyle="flicker"
          neonColor="#ff0080">
        </gforge-neon-button>
        
        <gforge-neon-button 
          label="WAVE"
          glowStyle="wave"
          neonColor="#ff6600">
        </gforge-neon-button>
      </div>
    `,
  }),
};

export const WithoutScanLine: Story = {
  args: {
    label: 'NO SCAN LINE',
    neonColor: '#00ff88',
    size: 'medium',
    glowStyle: 'pulse',
    disabled: false,
    scanLine: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'DISABLED',
    neonColor: '#00ff88',
    size: 'medium',
    glowStyle: 'pulse',
    disabled: true,
    scanLine: true,
  },
};

export const CyberpunkTheme: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
        <h2 style="color: #00ff88; font-family: 'Courier New', monospace; text-align: center; margin: 0;">
          CYBERPUNK INTERFACE
        </h2>
        
        <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
          <gforge-neon-button 
            label="INITIALIZE"
            neonColor="#00ff88"
            glowStyle="wave">
          </gforge-neon-button>
          
          <gforge-neon-button 
            label="SCAN"
            neonColor="#00ccff"
            glowStyle="flicker">
          </gforge-neon-button>
          
          <gforge-neon-button 
            label="EXECUTE"
            neonColor="#ff0080"
            glowStyle="pulse">
          </gforge-neon-button>
        </div>
        
        <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
          <gforge-neon-button 
            label="ABORT"
            neonColor="#ff3333"
            size="small"
            glowStyle="flicker">
          </gforge-neon-button>
          
          <gforge-neon-button 
            label="RETRY"
            neonColor="#ffaa00"
            size="small"
            glowStyle="static">
          </gforge-neon-button>
          
          <gforge-neon-button 
            label="BYPASS"
            neonColor="#aa00ff"
            size="small"
            glowStyle="wave">
          </gforge-neon-button>
        </div>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  args: {
    label: 'CLICK ME',
    neonColor: '#00ff88',
    size: 'large',
    glowStyle: 'pulse',
    disabled: false,
    scanLine: true,
  },
  render: (args) => ({
    props: {
      ...args,
      onClick: () => {
        alert('Botão neon clicado! 🚀');
      }
    },
    template: `
      <gforge-neon-button 
        [label]="label"
        [neonColor]="neonColor"
        [size]="size"
        [glowStyle]="glowStyle"
        [disabled]="disabled"
        [scanLine]="scanLine"
        (clicked)="onClick()">
      </gforge-neon-button>
    `,
  }),
};