import type { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from '../lib/components/alert/alert.component';

const meta: Meta<AlertComponent> = {
  title: 'Components/Alert',
  component: AlertComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Alert para exibir mensagens importantes, notificações e avisos aos usuários.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'danger', 'primary', 'secondary']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'top']
    },
    closable: {
      control: { type: 'boolean' }
    },
    bordered: {
      control: { type: 'boolean' }
    },
    filled: {
      control: { type: 'boolean' }
    },
    animated: {
      control: { type: 'boolean' }
    },
    allowHtml: {
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Informação',
    message: 'Esta é uma mensagem informativa para o usuário.',
    closable: false,
    filled: true,
    animated: true
  }
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <gforge-alert variant="success" title="Sucesso" message="Operação realizada com sucesso!"></gforge-alert>
        <gforge-alert variant="info" title="Informação" message="Aqui está uma informação importante."></gforge-alert>
        <gforge-alert variant="warning" title="Atenção" message="Verifique os dados antes de continuar."></gforge-alert>
        <gforge-alert variant="danger" title="Erro" message="Ocorreu um erro durante a operação."></gforge-alert>
        <gforge-alert variant="primary" title="Destaque" message="Mensagem de destaque principal."></gforge-alert>
        <gforge-alert variant="secondary" title="Secundário" message="Informação secundária."></gforge-alert>
      </div>
    `
  })
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <gforge-alert variant="info" title="Pequeno" message="Alert de tamanho pequeno." size="small"></gforge-alert>
        <gforge-alert variant="info" title="Médio" message="Alert de tamanho médio." size="medium"></gforge-alert>
        <gforge-alert variant="info" title="Grande" message="Alert de tamanho grande." size="large"></gforge-alert>
      </div>
    `
  })
};

export const Closable: Story = {
  args: {
    variant: 'warning',
    title: 'Aviso',
    message: 'Este alert pode ser fechado pelo usuário.',
    closable: true
  }
};

export const WithoutTitle: Story = {
  args: {
    variant: 'success',
    message: 'Mensagem de sucesso sem título.',
    closable: true
  }
};

export const WithActions: Story = {
  args: {
    variant: 'danger',
    title: 'Confirmar Exclusão',
    message: 'Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.',
    actions: [
      {
        label: 'Excluir',
        variant: 'danger',
        action: () => console.log('Item excluído')
      },
      {
        label: 'Cancelar',
        variant: 'secondary',
        action: () => console.log('Ação cancelada')
      }
    ]
  }
};

export const Outlined: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <gforge-alert variant="success" title="Sucesso" message="Alert outline de sucesso." [filled]="false"></gforge-alert>
        <gforge-alert variant="warning" title="Atenção" message="Alert outline de atenção." [filled]="false"></gforge-alert>
        <gforge-alert variant="danger" title="Erro" message="Alert outline de erro." [filled]="false"></gforge-alert>
      </div>
    `
  })
};

export const Bordered: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <gforge-alert variant="info" title="Com Borda" message="Alert com borda destacada." [bordered]="true"></gforge-alert>
        <gforge-alert variant="success" title="Com Borda" message="Alert com borda destacada." [bordered]="true"></gforge-alert>
      </div>
    `
  })
};

export const CustomIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <gforge-alert variant="info" title="Dica" message="Use ícones personalizados." icon="💡"></gforge-alert>
        <gforge-alert variant="success" title="Parabéns" message="Você conquistou um badge!" icon="🏆"></gforge-alert>
        <gforge-alert variant="warning" title="Bateria Baixa" message="Conecte o carregador." icon="🔋"></gforge-alert>
      </div>
    `
  })
};

export const IconPosition: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <gforge-alert variant="info" title="Ícone à Esquerda" message="O ícone está posicionado à esquerda do conteúdo." iconPosition="left"></gforge-alert>
        <gforge-alert variant="info" title="Ícone no Topo" message="O ícone está posicionado no topo do conteúdo, centralizando o layout." iconPosition="top"></gforge-alert>
      </div>
    `
  })
};

export const WithHtmlContent: Story = {
  args: {
    variant: 'info',
    title: 'Conteúdo HTML',
    message: 'Este alert suporta <strong>HTML</strong>, incluindo <em>formatação</em> e <a href="#" onclick="alert(\'Link clicado!\'); return false;">links</a>.',
    allowHtml: true
  }
};

export const AutoDismiss: Story = {
  args: {
    variant: 'success',
    title: 'Auto Dismiss',
    message: 'Este alert será fechado automaticamente em 5 segundos.',
    autoDismiss: 5,
    closable: true
  }
};

export const ComplexExample: Story = {
  args: {
    variant: 'warning',
    title: 'Atualização do Sistema',
    message: 'Uma nova versão está disponível. Recomendamos que você atualize para obter as últimas funcionalidades e correções de segurança.',
    icon: '🔄',
    closable: true,
    bordered: true,
    size: 'large',
    actions: [
      {
        label: 'Atualizar Agora',
        variant: 'primary',
        action: () => console.log('Iniciando atualização...')
      },
      {
        label: 'Lembrar Depois',
        variant: 'secondary',
        action: () => console.log('Lembrete configurado')
      },
      {
        label: 'Não Mostrar Novamente',
        variant: 'secondary',
        action: () => console.log('Preferência salva')
      }
    ]
  }
};