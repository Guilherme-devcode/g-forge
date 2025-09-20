import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from '../lib/components/accordion/accordion.component';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Accordion para exibir conteúdo colapsável em seções organizadas.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'filled', 'minimal']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    multiple: {
      control: { type: 'boolean' }
    },
    animated: {
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<AccordionComponent>;

export const Default: Story = {
  args: {
    items: [
      {
        id: 1,
        title: 'Seção 1',
        content: '<p>Este é o conteúdo da primeira seção do accordion.</p><p>Você pode incluir <strong>HTML</strong> aqui.</p>',
        expanded: true
      },
      {
        id: 2,
        title: 'Seção 2',
        content: 'Conteúdo da segunda seção com informações importantes.'
      },
      {
        id: 3,
        title: 'Seção 3',
        content: 'Terceira seção com mais detalhes e explicações.'
      }
    ],
    variant: 'default',
    size: 'medium',
    multiple: false,
    animated: true
  }
};

export const Multiple: Story = {
  args: {
    ...Default.args,
    multiple: true,
    items: [
      {
        id: 1,
        title: 'Configurações Gerais',
        content: 'Ajuste as configurações básicas do sistema.',
        expanded: true
      },
      {
        id: 2,
        title: 'Configurações de Usuário',
        content: 'Personalize sua experiência de usuário.',
        expanded: true
      },
      {
        id: 3,
        title: 'Configurações Avançadas',
        content: 'Opções para usuários experientes.'
      }
    ]
  }
};

export const Bordered: Story = {
  args: {
    ...Default.args,
    variant: 'bordered'
  }
};

export const Filled: Story = {
  args: {
    ...Default.args,
    variant: 'filled'
  }
};

export const Minimal: Story = {
  args: {
    ...Default.args,
    variant: 'minimal'
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

export const WithDisabledItem: Story = {
  args: {
    ...Default.args,
    items: [
      {
        id: 1,
        title: 'Item Ativo',
        content: 'Este item pode ser expandido normalmente.'
      },
      {
        id: 2,
        title: 'Item Desabilitado',
        content: 'Este conteúdo não pode ser acessado.',
        disabled: true
      },
      {
        id: 3,
        title: 'Outro Item Ativo',
        content: 'Este item também está disponível.'
      }
    ]
  }
};