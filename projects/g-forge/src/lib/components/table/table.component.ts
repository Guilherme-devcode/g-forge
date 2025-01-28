import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import {
  DropdownComponent,
  DropdownOption,
} from '../dropdown/dropdown.component';
import { InputTextComponent } from '../input-text/input-text.component';

@Component({
  selector: 'gforge-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextComponent,
    ButtonComponent,
    DropdownComponent,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  /** Table data */
  @Input() public data: any[] = [];

  /** Table columns */
  @Input() public columns: {
    field: string;
    header: string;
    sortable?: boolean;
  }[] = [];

  /** Enable pagination */
  @Input() public pagination: boolean = false;

  /** Items per page */
  @Input() public itemsPerPage: number = 10;

  /** Current page */
  @Input() public currentPage: number = 1;

  /** Total items (for external pagination) */
  @Input() public totalItems?: number;

  /** Enable fixed header */
  @Input() public fixedHeader: boolean = false;

  /** Enable infinite scroll */
  @Input() public infiniteScroll: boolean = false;

  /** Context menu options */
  @Input() public contextMenu: { id: string; name: string; symbol?: string }[] =
    [];

  /** Search enable */
  @Input() public searchable: boolean = false;

  /** Search placeholder */
  @Input() public searchPlaceholder: string = 'Search...';

  /** Show actions column */
  @Input() public showActionsColumn: boolean = false;

  /** Actions column label */
  @Input() public actionsLabel: string = 'Actions';

  /** Triggered when scrolled to the end */
  @Output() public scrolled: EventEmitter<void> = new EventEmitter<void>();

  /** Triggered when a search is performed */
  @Output() public searched: EventEmitter<string> = new EventEmitter<string>();

  /** Triggered when a column is sorted */
  @Output() public sorted: EventEmitter<{
    field: string;
    order: 'asc' | 'desc';
  }> = new EventEmitter<{ field: string; order: 'asc' | 'desc' }>();

  /** Triggered when a context menu item is clicked */
  @Output() public menuClicked: EventEmitter<{ menuItem: any; rowData: any }> =
    new EventEmitter<{ menuItem: any; rowData: any }>();

  /** Filtered data based on search term */
  public filteredData: any[] = [];

  /** Current search term */
  public searchTerm: string = '';

  /** Context menu position */
  public menuPosition = { x: 0, y: 0 };

  /** Display context menu */
  public showContextMenu: boolean = false;

  /** Selected row for context menu */
  public selectedRow: any;

  /** Dropdown options for items per page */
  public itemsPerPageDropdownOptions: DropdownOption[] = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.filteredData = [...this.data];
  }

  /** Handles search input changes */
  public onSearch(text: string): void {
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

  /** Handles right-click to open context menu */
  public onRightClick(event: MouseEvent, row: any): void {
    event.preventDefault();
    this.menuPosition = { x: event.clientX, y: event.clientY };
    this.showContextMenu = true;
    this.selectedRow = row;
    this.cdr.detectChanges();
  }

  /** Handles action menu click */
  public onActionMenuClick(event: MouseEvent, row: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.menuPosition = { x: event.clientX, y: event.clientY };
    this.showContextMenu = true;
    this.selectedRow = row;
    this.cdr.detectChanges();
  }

  /** Handles menu item click */
  public onMenuItemClick(menuItem: any): void {
    this.menuClicked.emit({ menuItem, rowData: this.selectedRow });
    this.showContextMenu = false;
  }

  /** Closes the context menu when clicking outside */
  public onOutsideClick(): void {
    this.showContextMenu = false;
  }

  /** Handles sorting a column */
  public onSort(column: { field: string; sortable?: boolean }): void {
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

  /** Updates the items per page */
  public onItemsPerPageChange(option: DropdownOption): void {
    this.itemsPerPage = option.value;
    this.currentPage = 1;
  }

  /** Navigates to the previous page */
  public goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /** Navigates to the next page */
  public goToNextPage(): void {
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
    }
  }

  /** Handles scroll events */
  public onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      this.scrolled.emit();
    }
  }

  /** Returns paginated data */
  public get paginatedData(): any[] {
    if (!this.pagination) return this.filteredData;

    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(start, start + this.itemsPerPage);
  }

  /** Calculates total pages */
  public get totalPages(): number[] {
    const total = this.filteredData.length;
    const pages = Math.ceil(total / this.itemsPerPage);
    return Array.from({ length: pages }, (_, i) => i + 1);
  }
}
