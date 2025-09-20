import { Meta, StoryObj } from '@storybook/angular';
import { DataGridComponent, DataGridColumn, DataGridAction } from '../lib/components/data-grid/data-grid.component';

const sampleData = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', age: 28, active: true, salary: 5500.00 },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com', age: 32, active: true, salary: 7200.00 },
  { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', age: 25, active: false, salary: 4800.00 },
  { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', age: 29, active: true, salary: 6300.00 },
  { id: 5, name: 'Carlos Lima', email: 'carlos@email.com', age: 35, active: true, salary: 8900.00 },
  { id: 6, name: 'Lucia Ferreira', email: 'lucia@email.com', age: 27, active: false, salary: 5100.00 },
  { id: 7, name: 'Roberto Alves', email: 'roberto@email.com', age: 31, active: true, salary: 7800.00 },
  { id: 8, name: 'Fernanda Souza', email: 'fernanda@email.com', age: 26, active: true, salary: 5900.00 },
];

const actions: DataGridAction[] = [
  {
    label: 'Editar',
    variant: 'primary',
    action: (row: any) => console.log('Editando:', row)
  },
  {
    label: 'Excluir',
    variant: 'danger',
    action: (row: any) => console.log('Excluindo:', row)
  }
];

const columns: DataGridColumn[] = [
  { key: 'id', title: 'ID', sortable: true, width: '80px', type: 'number' },
  { key: 'name', title: 'Nome', sortable: true, filterable: true },
  { key: 'email', title: 'Email', sortable: true, filterable: true },
  { key: 'age', title: 'Idade', sortable: true, type: 'number', width: '100px' },
  { key: 'active', title: 'Ativo', sortable: true, type: 'boolean', width: '100px' },
  { 
    key: 'salary', 
    title: 'Salário', 
    sortable: true, 
    type: 'number',
    format: (value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  },
  { key: 'actions', title: 'Ações', type: 'actions', actions, width: '150px' }
];

export default {
  title: 'G-Forge/DataGrid',
  component: DataGridComponent,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['default', 'dark', 'neon', 'minimal'],
    },
  },
} as Meta<DataGridComponent>;

type Story = StoryObj<DataGridComponent>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
    theme: 'default',
    loading: false,
    config: {
      pagination: { enabled: true, pageSize: 5, pageSizeOptions: [5, 10, 25] },
      sorting: { enabled: true, multiSort: false },
      filtering: { enabled: true, globalSearch: true },
      selection: { enabled: false, multiple: false }
    }
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleData,
    columns: columns.filter(col => col.key !== 'actions'),
    theme: 'default',
    loading: false,
    config: {
      pagination: { enabled: true, pageSize: 5, pageSizeOptions: [5, 10, 25] },
      sorting: { enabled: true, multiSort: false },
      filtering: { enabled: true, globalSearch: true },
      selection: { enabled: true, multiple: true }
    }
  },
};

export const DarkTheme: Story = {
  args: {
    data: sampleData,
    columns: columns,
    theme: 'dark',
    loading: false,
    config: {
      pagination: { enabled: true, pageSize: 5, pageSizeOptions: [5, 10, 25] },
      sorting: { enabled: true, multiSort: false },
      filtering: { enabled: true, globalSearch: true },
      selection: { enabled: false, multiple: false }
    }
  },
};

export const NeonTheme: Story = {
  args: {
    data: sampleData,
    columns: columns,
    theme: 'neon',
    loading: false,
    config: {
      pagination: { enabled: true, pageSize: 5, pageSizeOptions: [5, 10, 25] },
      sorting: { enabled: true, multiSort: false },
      filtering: { enabled: true, globalSearch: true },
      selection: { enabled: false, multiple: false }
    }
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: columns,
    theme: 'default',
    loading: true,
    config: {
      pagination: { enabled: true, pageSize: 5, pageSizeOptions: [5, 10, 25] },
      sorting: { enabled: true, multiSort: false },
      filtering: { enabled: true, globalSearch: true },
      selection: { enabled: false, multiple: false }
    }
  },
};

export const Minimal: Story = {
  args: {
    data: sampleData,
    columns: columns,
    theme: 'minimal',
    loading: false,
    config: {
      pagination: { enabled: false, pageSize: 10, pageSizeOptions: [10] },
      sorting: { enabled: true, multiSort: false },
      filtering: { enabled: false, globalSearch: false },
      selection: { enabled: false, multiple: false }
    }
  },
};