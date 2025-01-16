import { Meta } from '@storybook/angular';
import { ButtonComponent } from '../lib/components/button/button.component';

export default {
  title: 'G-Forge/Button',
  component: ButtonComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} as Meta<ButtonComponent>;

export const Primary = {
  args: {
    label: 'Primary',
    variant: 'secondary',
    size: 'small',
    disabled: false,
  },
};

export const Secondary = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'large',
    disabled: false,
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
};
