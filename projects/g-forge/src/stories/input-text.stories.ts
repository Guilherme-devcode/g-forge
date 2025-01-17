import { Meta } from '@storybook/angular';
import { InputTextComponent } from '../lib/components/input-text/input-text.component';

export default {
  title: 'G-Forge/Input',
  component: InputTextComponent,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
    mask: {
      control: 'select',
      options: ['cpf', 'money', 'currency', null],
      description: 'Máscara a ser aplicada no input',
    },
    disabled: {
      control: 'boolean',
    },
    currencyType: {
      control: 'select',
      options: ['BRL', 'USD'],
      description: 'Tipo de moeda a ser usado (Real ou Dólar)',
    },
  },
} as Meta<InputTextComponent>;

export const Default = {
  args: {
    placeholder: 'Digite algo',
    value: '',
    type: 'text',
    mask: null,
    maxLength: 20,
    disabled: false,
  },
};

export const Password = {
  args: {
    placeholder: 'Digite sua senha',
    value: '',
    type: 'password',
    mask: null,
    maxLength: 20,
    disabled: false,
  },
};

export const Disabled = {
  args: {
    placeholder: 'Este campo está desabilitado',
    value: '',
    type: 'text',
    mask: null,
    maxLength: 20,
    disabled: true,
  },
};

export const CPF = {
  args: {
    placeholder: 'Digite seu CPF',
    value: '12345678900',
    type: 'text',
    mask: 'cpf',
    disabled: false,
  },
};

export const Invalid = {
  args: {
    placeholder: 'Campo inválido',
    value: '',
    type: 'text',
    mask: null,
    maxLength: 20,
    disabled: false,
    isInvalid: true,
  },
};

export const Currency = {
  args: {
    placeholder: 'Digite um valor em Reais',
    value: '1234567',
    type: 'text',
    mask: 'currency',
    currencyType: 'USD',
    disabled: false,
    maxLength: 20,
  },
};
