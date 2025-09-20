import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface AccordionItem {
  id: string | number;
  title: string;
  content: string;
  disabled?: boolean;
  expanded?: boolean;
}

@Component({
  selector: 'gforge-accordion',
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  /** Lista de itens do accordion */
  @Input() items: AccordionItem[] = [];

  /** Permite múltiplos itens abertos simultaneamente */
  @Input() multiple: boolean = false;

  /** Variante visual do accordion */
  @Input() variant: 'default' | 'bordered' | 'filled' | 'minimal' = 'default';

  /** Tamanho do accordion */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /** Animação de abertura/fechamento */
  @Input() animated: boolean = true;

  /** Ícones personalizados */
  @Input() expandIcon: string = '▼';
  @Input() collapseIcon: string = '▲';

  /** Evento emitido quando um item é expandido/colapsado */
  @Output() itemToggled = new EventEmitter<{item: AccordionItem, expanded: boolean}>();

  /** Evento emitido quando a seleção muda */
  @Output() selectionChanged = new EventEmitter<AccordionItem[]>();

  /** Alterna o estado de um item */
  toggleItem(item: AccordionItem): void {
    if (item.disabled) return;

    const wasExpanded = item.expanded || false;

    if (!this.multiple) {
      // Fecha todos os outros itens se multiple = false
      this.items.forEach(i => {
        if (i !== item) {
          i.expanded = false;
        }
      });
    }

    // Alterna o item atual
    item.expanded = !wasExpanded;

    // Emite eventos
    this.itemToggled.emit({ item, expanded: item.expanded });
    this.selectionChanged.emit(this.getExpandedItems());
  }

  /** Retorna os itens expandidos */
  getExpandedItems(): AccordionItem[] {
    return this.items.filter(item => item.expanded);
  }

  /** Expande todos os itens (apenas se multiple = true) */
  expandAll(): void {
    if (!this.multiple) return;
    
    this.items.forEach(item => {
      if (!item.disabled) {
        item.expanded = true;
      }
    });
    
    this.selectionChanged.emit(this.getExpandedItems());
  }

  /** Colapsa todos os itens */
  collapseAll(): void {
    this.items.forEach(item => {
      item.expanded = false;
    });
    
    this.selectionChanged.emit(this.getExpandedItems());
  }

  /** Classe CSS dinâmica para o accordion */
  get accordionClass(): string {
    const classes = [
      'gforge-accordion',
      `gforge-accordion--${this.variant}`,
      `gforge-accordion--${this.size}`
    ];

    if (this.animated) {
      classes.push('gforge-accordion--animated');
    }

    return classes.join(' ');
  }

  /** Classe CSS dinâmica para cada item */
  getItemClass(item: AccordionItem): string {
    const classes = ['gforge-accordion__item'];

    if (item.expanded) {
      classes.push('gforge-accordion__item--expanded');
    }

    if (item.disabled) {
      classes.push('gforge-accordion__item--disabled');
    }

    return classes.join(' ');
  }

  /** Retorna o ícone apropriado para o estado do item */
  getItemIcon(item: AccordionItem): string {
    return item.expanded ? this.collapseIcon : this.expandIcon;
  }
}