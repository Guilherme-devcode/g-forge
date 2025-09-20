import { Meta, StoryObj } from '@storybook/angular';
import { GlassCardComponent } from '../lib/components/glass-card/glass-card.component';

export default {
  title: 'G-Forge/GlassCard',
  component: GlassCardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'dark', 'colorful', 'neon'],
    },
    blurIntensity: {
      control: 'select',
      options: ['low', 'medium', 'high'],
    },
    customColor: {
      control: 'color',
    },
  },
  decorators: [
    (story) => ({
      template: `
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          ${story()}
        </div>
      `,
    }),
  ],
} as Meta<GlassCardComponent>;

type Story = StoryObj<GlassCardComponent>;

export const Light: Story = {
  args: {
    title: 'Glass Card Light',
    subtitle: 'Efeito glassmorphism claro',
    variant: 'light',
    blurIntensity: 'medium',
    animated: true,
    glowBorder: false,
    clickable: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <gforge-glass-card 
        [title]="title"
        [subtitle]="subtitle"
        [variant]="variant"
        [blurIntensity]="blurIntensity"
        [animated]="animated"
        [glowBorder]="glowBorder"
        [clickable]="clickable">
        
        <p>Este é um exemplo de glass card com efeito glassmorphism. 
        O efeito cria uma aparência translúcida e moderna.</p>
        
        <ul>
          <li>Backdrop blur effect</li>
          <li>Bordas translúcidas</li>
          <li>Animações suaves</li>
        </ul>
        
      </gforge-glass-card>
    `,
  }),
};

export const Dark: Story = {
  args: {
    title: 'Glass Card Dark',
    subtitle: 'Efeito glassmorphism escuro',
    variant: 'dark',
    blurIntensity: 'medium',
    animated: true,
    glowBorder: false,
    clickable: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <gforge-glass-card 
        [title]="title"
        [subtitle]="subtitle"
        [variant]="variant"
        [blurIntensity]="blurIntensity"
        [animated]="animated"
        [glowBorder]="glowBorder"
        [clickable]="clickable">
        
        <p>Versão escura do glass card, perfeita para interfaces dark mode.</p>
        
        <div style="margin-top: 20px;">
          <strong>Características:</strong>
          <ul style="margin-top: 10px;">
            <li>Fundo escuro translúcido</li>
            <li>Texto claro</li>
            <li>Bordas sutis</li>
          </ul>
        </div>
        
      </gforge-glass-card>
    `,
  }),
};

export const Colorful: Story = {
  args: {
    title: 'Glass Card Colorful',
    subtitle: 'Com cor personalizada',
    variant: 'colorful',
    customColor: '#ff6b6b',
    blurIntensity: 'medium',
    animated: true,
    glowBorder: true,
    clickable: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <gforge-glass-card 
        [title]="title"
        [subtitle]="subtitle"
        [variant]="variant"
        [customColor]="customColor"
        [blurIntensity]="blurIntensity"
        [animated]="animated"
        [glowBorder]="glowBorder"
        [clickable]="clickable">
        
        <p>Glass card com cor personalizada e borda brilhante!</p>
        
        <div style="display: flex; gap: 10px; margin-top: 20px;">
          <div style="padding: 10px; background: rgba(255, 255, 255, 0.2); border-radius: 8px;">
            🎨 Cor customizável
          </div>
          <div style="padding: 10px; background: rgba(255, 255, 255, 0.2); border-radius: 8px;">
            ✨ Efeito glow
          </div>
        </div>
        
      </gforge-glass-card>
    `,
  }),
};

export const Neon: Story = {
  args: {
    title: 'Glass Card Neon',
    subtitle: 'Estilo cyberpunk',
    variant: 'neon',
    blurIntensity: 'high',
    animated: true,
    glowBorder: true,
    clickable: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <gforge-glass-card 
        [title]="title"
        [subtitle]="subtitle"
        [variant]="variant"
        [blurIntensity]="blurIntensity"
        [animated]="animated"
        [glowBorder]="glowBorder"
        [clickable]="clickable">
        
        <p>🚀 Glass card com tema neon cyberpunk!</p>
        
        <div style="margin-top: 20px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div style="padding: 15px; background: rgba(0, 255, 136, 0.1); border: 1px solid rgba(0, 255, 136, 0.3); border-radius: 8px;">
              <strong>SISTEMA</strong><br>
              <small>ONLINE</small>
            </div>
            <div style="padding: 15px; background: rgba(0, 255, 136, 0.1); border: 1px solid rgba(0, 255, 136, 0.3); border-radius: 8px;">
              <strong>STATUS</strong><br>
              <small>ATIVO</small>
            </div>
          </div>
        </div>
        
      </gforge-glass-card>
    `,
  }),
  decorators: [
    (story) => ({
      template: `
        <div style="
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
          padding: 40px;
          min-height: 400px;
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

export const WithActions: Story = {
  args: {
    title: 'Card com Ações',
    subtitle: 'Exemplo com botões de ação',
    variant: 'light',
    blurIntensity: 'medium',
    animated: true,
    glowBorder: false,
    clickable: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <gforge-glass-card 
        [title]="title"
        [subtitle]="subtitle"
        [variant]="variant"
        [blurIntensity]="blurIntensity"
        [animated]="animated"
        [glowBorder]="glowBorder"
        [clickable]="clickable">
        
        <p>Este card possui botões de ação na parte inferior.</p>
        
        <div style="margin: 20px 0;">
          <h4 style="margin: 0 0 10px 0;">Recursos:</h4>
          <ul style="margin: 0;">
            <li>Área de ações personalizável</li>
            <li>Layout flexível</li>
            <li>Integração com outros componentes</li>
          </ul>
        </div>
        
        <div slot="actions" style="display: flex; gap: 8px;">
          <button style="
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 6px;
            color: inherit;
            cursor: pointer;
          ">Cancelar</button>
          <button style="
            padding: 8px 16px;
            background: rgba(78, 205, 196, 0.8);
            border: 1px solid rgba(78, 205, 196, 1);
            border-radius: 6px;
            color: white;
            cursor: pointer;
          ">Confirmar</button>
        </div>
        
      </gforge-glass-card>
    `,
  }),
};