import { Meta } from '@storybook/angular';
import {
  DropdownComponent,
  DropdownOption,
} from '../lib/components/dropdown/dropdown.component';

export default {
  title: 'G-Forge/Dropdown',
  component: DropdownComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto do botão do dropdown',
    },
    options: {
      control: 'object',
      description: 'Lista de opções disponíveis no dropdown',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Define o estilo do botão',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Define o tamanho do botão',
    },
    disabled: {
      control: 'boolean',
      description: 'Define se o dropdown está desabilitado',
    },
  },
} as Meta<DropdownComponent>;

const dropdownOptions: DropdownOption[] = [
  { label: 'Opção 1', value: 1 },
  { label: 'Opção 2', value: 2 },
  { label: 'Opção 3', value: 3 },
];

export const Default = {
  args: {
    label: 'Dropdown',
    options: dropdownOptions,
    variant: 'primary',
    size: 'medium',
    disabled: false,
  },
};

export const Secondary = {
  args: {
    label: 'Dropdown Secundário',
    options: dropdownOptions,
    variant: 'secondary',
    size: 'medium',
    disabled: false,
  },
};

export const Danger = {
  args: {
    label: 'Dropdown Perigoso',
    options: dropdownOptions,
    variant: 'danger',
    size: 'medium',
    disabled: false,
  },
};

export const Small = {
  args: {
    label: 'Dropdown Pequeno',
    options: dropdownOptions,
    variant: 'primary',
    size: 'small',
    disabled: false,
  },
};

export const Large = {
  args: {
    label: 'Dropdown Grande',
    options: dropdownOptions,
    variant: 'primary',
    size: 'large',
    disabled: false,
  },
};

export const Disabled = {
  args: {
    label: 'Dropdown Desabilitado',
    options: dropdownOptions,
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
};
