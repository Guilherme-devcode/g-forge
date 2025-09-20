import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from '../lib/components/avatar/avatar.component';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Avatar',
  component: AvatarComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Avatar para exibir imagens de perfil, iniciais ou ícones de usuário.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square', 'rounded']
    },
    status: {
      control: { type: 'select' },
      options: ['none', 'online', 'offline', 'away', 'busy']
    },
    statusPosition: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left']
    },
    clickable: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
    bordered: {
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const Default: Story = {
  args: {
    name: 'João Silva',
    size: 'md',
    shape: 'circle'
  }
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Foto do usuário',
    name: 'João Silva',
    size: 'md',
    shape: 'circle'
  }
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <gforge-avatar name="João Silva" size="xs"></gforge-avatar>
        <gforge-avatar name="João Silva" size="sm"></gforge-avatar>
        <gforge-avatar name="João Silva" size="md"></gforge-avatar>
        <gforge-avatar name="João Silva" size="lg"></gforge-avatar>
        <gforge-avatar name="João Silva" size="xl"></gforge-avatar>
        <gforge-avatar name="João Silva" size="2xl"></gforge-avatar>
      </div>
    `
  })
};

export const Shapes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <gforge-avatar name="João Silva" shape="circle" size="lg"></gforge-avatar>
        <gforge-avatar name="João Silva" shape="rounded" size="lg"></gforge-avatar>
        <gforge-avatar name="João Silva" shape="square" size="lg"></gforge-avatar>
      </div>
    `
  })
};

export const WithStatus: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <gforge-avatar name="Online" status="online" size="lg"></gforge-avatar>
        <gforge-avatar name="Offline" status="offline" size="lg"></gforge-avatar>
        <gforge-avatar name="Away" status="away" size="lg"></gforge-avatar>
        <gforge-avatar name="Busy" status="busy" size="lg"></gforge-avatar>
      </div>
    `
  })
};

export const WithBadge: Story = {
  args: {
    name: 'João Silva',
    size: 'lg',
    badge: '5',
    badgeColor: '#ff4757'
  }
};

export const Clickable: Story = {
  args: {
    name: 'João Silva',
    size: 'lg',
    clickable: true,
    status: 'online'
  }
};

export const Bordered: Story = {
  args: {
    name: 'João Silva',
    size: 'lg',
    bordered: true,
    borderColor: '#4ecdc4'
  }
};

export const CustomColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <gforge-avatar name="João Silva" bgColor="#ff6b6b" size="lg"></gforge-avatar>
        <gforge-avatar name="Maria Santos" bgColor="#4ecdc4" size="lg"></gforge-avatar>
        <gforge-avatar name="Pedro Costa" bgColor="#45b7d1" size="lg"></gforge-avatar>
        <gforge-avatar name="Ana Oliveira" bgColor="#f9ca24" textColor="#333" size="lg"></gforge-avatar>
      </div>
    `
  })
};

export const GroupedAvatars: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center;">
        <gforge-avatar name="João Silva" grouped groupIndex="1" size="md"></gforge-avatar>
        <gforge-avatar name="Maria Santos" grouped groupIndex="2" size="md"></gforge-avatar>
        <gforge-avatar name="Pedro Costa" grouped groupIndex="3" size="md"></gforge-avatar>
        <gforge-avatar name="Ana Oliveira" grouped groupIndex="4" size="md"></gforge-avatar>
        <gforge-avatar badge="+5" grouped groupIndex="5" size="md" bgColor="#6c757d"></gforge-avatar>
      </div>
    `
  })
};

export const FallbackStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="text-align: center;">
          <gforge-avatar name="João Silva" size="lg"></gforge-avatar>
          <div style="margin-top: 8px; font-size: 12px;">Com Nome</div>
        </div>
        <div style="text-align: center;">
          <gforge-avatar src="invalid-url.jpg" name="Maria Santos" size="lg"></gforge-avatar>
          <div style="margin-top: 8px; font-size: 12px;">URL Inválida</div>
        </div>
        <div style="text-align: center;">
          <gforge-avatar size="lg"></gforge-avatar>
          <div style="margin-top: 8px; font-size: 12px;">Sem Nome</div>
        </div>
      </div>
    `
  })
};

export const Disabled: Story = {
  args: {
    name: 'João Silva',
    size: 'lg',
    disabled: true,
    status: 'offline'
  }
};