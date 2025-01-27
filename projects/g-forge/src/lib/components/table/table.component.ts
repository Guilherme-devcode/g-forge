import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { InputTextComponent } from '../input-text/input-text.component';

@Component({
  selector: 'gforge-table',
  imports: [CommonModule, FormsModule, InputTextComponent, ButtonComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  /** Dados da tabela */
  @Input() data: any[] = [];

  /** Colunas da tabela */
  @Input() columns: { field: string; header: string; sortable?: boolean }[] =
    [];

  /** Habilitar paginação */
  @Input() pagination: boolean = false;

  /** Itens por página */
  @Input() itemsPerPage: number = 10;

  /** Página atual */
  @Input() currentPage: number = 1;

  /** Total de itens (para paginação externa) */
  @Input() totalItems?: number;

  /** Habilitar cabeçalho fixo */
  @Input() fixedHeader: boolean = false;

  /** Habilitar scroll infinito */
  @Input() infiniteScroll: boolean = false;

  /** Evento disparado ao atingir o final do scroll */
  @Output() scrolled = new EventEmitter<void>();

  /** Habilitar busca */
  @Input() searchable: boolean = false;

  /** Placeholder para a busca */
  @Input() searchPlaceholder: string = 'Search...';

  /** Evento disparado ao buscar */
  @Output() searched = new EventEmitter<string>();

  /** Evento disparado ao ordenar */
  @Output() sorted = new EventEmitter<{
    field: string;
    order: 'asc' | 'desc';
  }>();

  /** Dados filtrados */
  filteredData: any[] = [];

  /** Termo de busca */
  searchTerm: string = '';

  ngOnInit(): void {
    this.filteredData = [...this.data];
  }

  /** Atualiza os dados filtrados com base no termo de busca */
  onSearch(text: string): void {
    this.searchTerm = text;
    this.filteredData = this.data.filter((item) =>
      this.columns.some((col) =>
        String(item[col.field])
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      )
    );
    this.searched.emit(this.searchTerm);
  }

  /** Ordena a tabela */
  onSort(column: { field: string; sortable?: boolean }): void {
    if (!column.sortable) return;

    const currentOrder =
      this.filteredData.length > 1 &&
      this.filteredData[0][column.field] <=
        this.filteredData[this.filteredData.length - 1][column.field]
        ? 'asc'
        : 'desc';

    const order = currentOrder === 'asc' ? 'desc' : 'asc';

    this.filteredData.sort((a, b) => {
      const aValue = a[column.field];
      const bValue = b[column.field];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return order === 'asc'
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });

    this.sorted.emit({ field: column.field, order });
  }

  /** Evento de scroll */
  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      this.scrolled.emit();
    }
  }

  /** Paginação: Retorna os dados da página atual */
  get paginatedData(): any[] {
    if (!this.pagination) return this.filteredData;

    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number[] {
    const total = this.filteredData.length;
    const pages = Math.ceil(total / this.itemsPerPage);
    return Array.from({ length: pages }, (_, i) => i + 1);
  }
}
