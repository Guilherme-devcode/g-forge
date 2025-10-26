import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { InputTextComponent } from '../input-text/input-text.component';

export interface DataGridColumn {
  key: string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'actions';
  format?: (value: any) => string;
  actions?: DataGridAction[];
}

export interface DataGridAction {
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  action: (row: any) => void;
}

export interface DataGridConfig {
  pagination?: {
    enabled: boolean;
    pageSize: number;
    pageSizeOptions: number[];
  };
  sorting?: {
    enabled: boolean;
    multiSort: boolean;
  };
  filtering?: {
    enabled: boolean;
    globalSearch: boolean;
  };
  selection?: {
    enabled: boolean;
    multiple: boolean;
  };
}

@Component({
  selector: 'gforge-data-grid',
  imports: [CommonModule, FormsModule, ButtonComponent, InputTextComponent],
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnInit, OnChanges {
  Math = Math;
  
  /** Dados da tabela */
  @Input() data: any[] = [];

  /** Configuração das colunas */
  @Input() columns: DataGridColumn[] = [];

  /** Configurações gerais */
  @Input() config: DataGridConfig = {
    pagination: { enabled: true, pageSize: 10, pageSizeOptions: [5, 10, 25, 50] },
    sorting: { enabled: true, multiSort: false },
    filtering: { enabled: true, globalSearch: true },
    selection: { enabled: false, multiple: false }
  };

  /** Tema visual */
  @Input() theme: 'default' | 'dark' | 'neon' | 'minimal' = 'default';

  /** Loading state */
  @Input() loading: boolean = false;

  /** Evento de seleção de linha */
  @Output() rowSelected = new EventEmitter<any>();

  /** Evento de múltiplas seleções */
  @Output() selectionChanged = new EventEmitter<any[]>();

  /** Evento de ordenação */
  @Output() sortChanged = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>();

  /** Evento de filtro */
  @Output() filterChanged = new EventEmitter<{column: string, value: string}>();

  // Estados internos
  filteredData: any[] = [];
  paginatedData: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  selectedRows: any[] = [];
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  globalSearchTerm: string = '';
  columnFilters: {[key: string]: string} = {};

  ngOnInit(): void {
    this.processData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['config']) {
      this.processData();
    }
  }

  /** Processa os dados (filtro, ordenação, paginação) */
  processData(): void {
    let processedData = [...this.data];

    // Aplicar filtros
    if (this.config.filtering?.enabled) {
      processedData = this.applyFilters(processedData);
    }

    // Aplicar ordenação
    if (this.config.sorting?.enabled && this.sortColumn) {
      processedData = this.applySorting(processedData);
    }

    this.filteredData = processedData;

    // Aplicar paginação
    if (this.config.pagination?.enabled) {
      this.applyPagination();
    } else {
      this.paginatedData = this.filteredData;
    }
  }

  /** Aplica filtros aos dados */
  applyFilters(data: any[]): any[] {
    let filtered = data;

    // Filtro global
    if (this.globalSearchTerm && this.config.filtering?.globalSearch) {
      filtered = filtered.filter(row =>
        this.columns.some(col => {
          const value = row[col.key];
          return value && value.toString().toLowerCase().includes(this.globalSearchTerm.toLowerCase());
        })
      );
    }

    // Filtros por coluna
    Object.keys(this.columnFilters).forEach(columnKey => {
      const filterValue = this.columnFilters[columnKey];
      if (filterValue) {
        filtered = filtered.filter(row => {
          const value = row[columnKey];
          return value && value.toString().toLowerCase().includes(filterValue.toLowerCase());
        });
      }
    });

    return filtered;
  }

  /** Aplica ordenação aos dados */
  applySorting(data: any[]): any[] {
    return data.sort((a, b) => {
      const aValue = a[this.sortColumn!];
      const bValue = b[this.sortColumn!];
      
      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;
      
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  /** Aplica paginação */
  applyPagination(): void {
    const pageSize = this.config.pagination!.pageSize;
    this.totalPages = Math.ceil(this.filteredData.length / pageSize);
    
    const startIndex = (this.currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
  }

  /** Ordena por coluna */
  sortByColumn(column: DataGridColumn): void {
    if (!column.sortable || !this.config.sorting?.enabled) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.sortChanged.emit({ column: column.key, direction: this.sortDirection });
    this.processData();
  }

  /** Filtra por coluna */
  filterByColumn(column: DataGridColumn, value: string): void {
    this.columnFilters[column.key] = value;
    this.filterChanged.emit({ column: column.key, value });
    this.currentPage = 1;
    this.processData();
  }

  /** Pesquisa global */
  onGlobalSearch(searchTerm: string): void {
    this.globalSearchTerm = searchTerm;
    this.currentPage = 1;
    this.processData();
  }

  /** Seleciona linha */
  selectRow(row: any): void {
    if (!this.config.selection?.enabled) return;

    if (this.config.selection.multiple) {
      const index = this.selectedRows.findIndex(r => r === row);
      if (index > -1) {
        this.selectedRows.splice(index, 1);
      } else {
        this.selectedRows.push(row);
      }
      this.selectionChanged.emit([...this.selectedRows]);
    } else {
      this.selectedRows = [row];
      this.rowSelected.emit(row);
    }
  }

  /** Verifica se linha está selecionada */
  isRowSelected(row: any): boolean {
    return this.selectedRows.includes(row);
  }

  /** Navega para página */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyPagination();
    }
  }

  /** Muda tamanho da página */
  changePageSize(size: number): void {
    if (this.config.pagination) {
      this.config.pagination.pageSize = size;
      this.currentPage = 1;
      this.processData();
    }
  }

  /** Formata valor da célula */
  formatCellValue(row: any, column: DataGridColumn): string {
    const value = row[column.key];
    if (column.format) {
      return column.format(value);
    }
    return value?.toString() || '';
  }

  /** Classes CSS dinâmicas */
  get gridClass(): string {
    return `gforge-data-grid gforge-data-grid--${this.theme}`;
  }

  /** Gera array de páginas para paginação */
  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  /** TrackBy function para melhor performance */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  /** Toggle seleção de todas as linhas */
  toggleAllRows(): void {
    if (!this.config.selection?.multiple) return;

    if (this.selectedRows.length === this.paginatedData.length) {
      this.selectedRows = [];
    } else {
      this.selectedRows = [...this.paginatedData];
    }
    
    this.selectionChanged.emit([...this.selectedRows]);
  }
}