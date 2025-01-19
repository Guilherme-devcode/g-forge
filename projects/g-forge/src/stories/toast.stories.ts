import { Meta } from '@storybook/angular';
import { ToastService } from '../lib/services/toast.service';
import { ToastWrapperComponent } from './components/toast-wrapper.component';

export default {
  title: 'G-Forge/Toast',
  component: ToastWrapperComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'info', 'warning'],
      description: 'Tipo do toast',
    },
    message: {
      control: 'text',
      description: 'Mensagem a ser exibida no toast',
    },
    title: {
      control: 'text',
      description: 'Título do toast (opcional)',
    },
    duration: {
      control: 'number',
      description: 'Duração do toast em milissegundos (opcional)',
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Posição do toast na tela',
    },
  },
} as Meta;

export const Success = {
  render: () => ({
    component: ToastWrapperComponent,
    props: {
      type: 'success',
      message: 'Operação realizada com sucesso!',
      title: 'Sucesso',
      duration: 3000,
      position: 'top-right',
    },
    moduleMetadata: {
      providers: [ToastService],
    },
  }),
};

export const Error = {
  render: () => ({
    component: ToastWrapperComponent,
    props: {
      type: 'error',
      message: 'Ocorreu um erro inesperado.',
      title: 'Erro',
      duration: 3000,
      position: 'top-left',
    },
    moduleMetadata: {
      providers: [ToastService],
    },
  }),
};

export const Info = {
  render: () => ({
    component: ToastWrapperComponent,
    props: {
      type: 'info',
      message: 'Aqui está uma informação importante.',
      title: 'Informação',
      duration: 3000,
      position: 'bottom-left',
    },
    moduleMetadata: {
      providers: [ToastService],
    },
  }),
};

export const Warning = {
  render: () => ({
    component: ToastWrapperComponent,
    props: {
      type: 'warning',
      message: 'Atenção! Verifique os detalhes.',
      title: 'Aviso',
      duration: 3000,
      position: 'bottom-right',
    },
    moduleMetadata: {
      providers: [ToastService],
    },
  }),
};

export const Dynamic = {
  render: () => ({
    component: ToastWrapperComponent,
    props: {
      message: 'Este é um toast dinâmico.',
      duration: 3000,
      position: 'top-left',
    },
    moduleMetadata: {
      providers: [ToastService],
    },
  }),
};
