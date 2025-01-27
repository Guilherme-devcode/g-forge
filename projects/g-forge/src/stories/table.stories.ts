import { FormsModule } from '@angular/forms';
import { Meta, moduleMetadata } from '@storybook/angular';
import { TableComponent } from '../lib/components/table/table.component';

export default {
  title: 'G-Forge/Table',
  component: TableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FormsModule, TableComponent],
    }),
  ],
  argTypes: {
    data: { description: 'Dados da tabela' },
    columns: { description: 'Definição de colunas' },
    pagination: { control: 'boolean', description: 'Habilitar paginação' },
    itemsPerPage: { control: 'number', description: 'Itens por página' },
    infiniteScroll: {
      control: 'boolean',
      description: 'Habilitar scroll infinito',
    },
    searchable: { control: 'boolean', description: 'Habilitar busca' },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder para o campo de busca',
    },
    fixedHeader: {
      control: 'boolean',
      description: 'Habilitar cabeçalho fixo',
    },
  },
} as Meta<TableComponent>;

// Cenário padrão
export const Default = {
  args: {
    data: [
      { id: 1, name: 'John Doe', age: 25 },
      { id: 2, name: 'Jane Smith', age: 30 },
    ],
    columns: [
      { field: 'id', header: 'ID', sortable: true },
      { field: 'name', header: 'Name', sortable: true },
      { field: 'age', header: 'Age' },
    ],
    pagination: true,
    itemsPerPage: 5,
    searchable: true,
    searchPlaceholder: 'Search by any field...',
  },
};

// Cenário com scroll infinito
export const InfiniteScroll = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      age: Math.floor(Math.random() * 50) + 20,
    })),
    columns: [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'age', header: 'Age' },
    ],
    infiniteScroll: true,
    searchable: false,
  },
};

// Cenário com cabeçalho fixo
export const FixedHeader = {
  args: {
    data: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      age: Math.floor(Math.random() * 50) + 20,
    })),
    columns: [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'age', header: 'Age' },
    ],
    fixedHeader: true,
    pagination: false,
    searchable: true,
    searchPlaceholder: 'Search...',
  },
};

// Cenário com apenas busca habilitada
export const SearchOnly = {
  args: {
    data: [
      { id: 1, name: 'John Doe', age: 25 },
      { id: 2, name: 'Jane Smith', age: 30 },
      { id: 3, name: 'Alice Johnson', age: 28 },
      { id: 4, name: 'Robert Brown', age: 35 },
    ],
    columns: [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'age', header: 'Age' },
    ],
    searchable: true,
    searchPlaceholder: 'Search by name...',
  },
};

// Cenário sem paginação nem busca
export const NoPaginationNoSearch = {
  args: {
    data: [
      { id: 1, name: 'John Doe', age: 25 },
      { id: 2, name: 'Jane Smith', age: 30 },
      { id: 3, name: 'Alice Johnson', age: 28 },
      { id: 4, name: 'Robert Brown', age: 35 },
    ],
    columns: [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'age', header: 'Age' },
    ],
    pagination: false,
    searchable: false,
  },
};

// Cenário com paginação personalizada
export const CustomPagination = {
  args: {
    data: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      age: Math.floor(Math.random() * 50) + 20,
    })),
    columns: [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'age', header: 'Age' },
    ],
    pagination: true,
    itemsPerPage: 3,
  },
};
