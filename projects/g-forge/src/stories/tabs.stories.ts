import type { Meta, StoryObj } from '@storybook/angular';
import { TabsComponent } from '../lib/components/tabs/tabs.component';

const meta: Meta<TabsComponent> = {
  title: 'Components/Tabs',
  component: TabsComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Tabs para navegação por abas com conteúdo organizado.'
      }
    }
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right']
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'pills', 'underline', 'bordered', 'minimal']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    scrollable: {
      control: { type: 'boolean' }
    },
    centered: {
      control: { type: 'boolean' }
    },
    closable: {
      control: { type: 'boolean' }
    },
    animated: {
      control: { type: 'boolean' }
    },
    lazy: {
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<TabsComponent>;

export const Default: Story = {
  args: {
    tabs: [
      {
        id: 'tab1',
        label: 'Dashboard',
        content: '<h3>Dashboard</h3><p>Bem-vindo ao painel principal do sistema.</p><p>Aqui você encontra as informações mais importantes.</p>'
      },
      {
        id: 'tab2',
        label: 'Usuários',
        content: '<h3>Gerenciar Usuários</h3><p>Lista de todos os usuários do sistema.</p><ul><li>Usuário 1</li><li>Usuário 2</li><li>Usuário 3</li></ul>'
      },
      {
        id: 'tab3',
        label: 'Relatórios',
        content: '<h3>Relatórios</h3><p>Visualize relatórios detalhados e estatísticas.</p>'
      },
      {
        id: 'tab4',
        label: 'Configurações',
        content: '<h3>Configurações</h3><p>Ajuste as configurações do sistema conforme necessário.</p>'
      }
    ],
    activeTabId: 'tab1',
    position: 'top',
    variant: 'default',
    size: 'medium',
    animated: true
  }
};

export const Pills: Story = {
  args: {
    ...Default.args,
    variant: 'pills'
  }
};

export const Underline: Story = {
  args: {
    ...Default.args,
    variant: 'underline'
  }
};

export const Bordered: Story = {
  args: {
    ...Default.args,
    variant: 'bordered'
  }
};

export const VerticalLeft: Story = {
  args: {
    ...Default.args,
    position: 'left'
  }
};

export const VerticalRight: Story = {
  args: {
    ...Default.args,
    position: 'right'
  }
};

export const WithIcons: Story = {
  args: {
    ...Default.args,
    tabs: [
      {
        id: 'home',
        label: 'Home',
        icon: '🏠',
        content: '<h3>Página Inicial</h3><p>Conteúdo da página inicial.</p>'
      },
      {
        id: 'profile',
        label: 'Perfil',
        icon: '👤',
        content: '<h3>Seu Perfil</h3><p>Informações do seu perfil de usuário.</p>'
      },
      {
        id: 'settings',
        label: 'Configurações',
        icon: '⚙️',
        content: '<h3>Configurações</h3><p>Ajuste suas preferências aqui.</p>'
      }
    ]
  }
};

export const WithBadges: Story = {
  args: {
    ...Default.args,
    tabs: [
      {
        id: 'messages',
        label: 'Mensagens',
        badge: 5,
        content: '<h3>Mensagens</h3><p>Você tem 5 mensagens não lidas.</p>'
      },
      {
        id: 'notifications',
        label: 'Notificações',
        badge: '12',
        content: '<h3>Notificações</h3><p>12 notificações pendentes.</p>'
      },
      {
        id: 'tasks',
        label: 'Tarefas',
        content: '<h3>Tarefas</h3><p>Lista de tarefas pendentes.</p>'
      }
    ]
  }
};

export const Closable: Story = {
  args: {
    ...Default.args,
    closable: true,
    tabs: [
      {
        id: 'doc1',
        label: 'Documento 1',
        content: '<h3>Documento 1</h3><p>Conteúdo do primeiro documento.</p>',
        closable: true
      },
      {
        id: 'doc2',
        label: 'Documento 2',
        content: '<h3>Documento 2</h3><p>Conteúdo do segundo documento.</p>',
        closable: true
      },
      {
        id: 'doc3',
        label: 'Documento 3 (Fixo)',
        content: '<h3>Documento 3</h3><p>Este documento não pode ser fechado.</p>',
        closable: false
      }
    ]
  }
};

export const Scrollable: Story = {
  args: {
    ...Default.args,
    scrollable: true,
    tabs: Array.from({ length: 15 }, (_, i) => ({
      id: `tab${i + 1}`,
      label: `Aba ${i + 1}`,
      content: `<h3>Conteúdo da Aba ${i + 1}</h3><p>Este é o conteúdo da aba número ${i + 1}.</p>`
    }))
  }
};

export const Centered: Story = {
  args: {
    ...Default.args,
    centered: true,
    tabs: Default.args!.tabs!.slice(0, 3)
  }
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small'
  }
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large'
  }
};