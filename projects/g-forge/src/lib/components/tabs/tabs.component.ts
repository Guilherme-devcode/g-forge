import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';

export interface TabItem {
  id: string | number;
  label: string;
  content?: string;
  disabled?: boolean;
  icon?: string;
  badge?: string | number;
  closable?: boolean;
}

@Component({
  selector: 'gforge-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit, OnChanges {
  /** Lista de abas */
  @Input() tabs: TabItem[] = [];

  /** ID da aba ativa */
  @Input() activeTabId: string | number | null = null;

  /** Posição das abas */
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  /** Variante visual */
  @Input() variant: 'default' | 'pills' | 'underline' | 'bordered' | 'minimal' = 'default';

  /** Tamanho das abas */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /** Permite scroll horizontal quando há muitas abas */
  @Input() scrollable: boolean = false;

  /** Centraliza as abas */
  @Input() centered: boolean = false;

  /** Permite fechar abas */
  @Input() closable: boolean = false;

  /** Animação de transição entre conteúdos */
  @Input() animated: boolean = true;

  /** Lazy loading do conteúdo */
  @Input() lazy: boolean = false;

  /** Evento emitido quando uma aba é selecionada */
  @Output() tabSelected = new EventEmitter<TabItem>();

  /** Evento emitido quando uma aba é fechada */
  @Output() tabClosed = new EventEmitter<TabItem>();

  /** Evento emitido quando a ordem das abas muda */
  @Output() tabsReordered = new EventEmitter<TabItem[]>();

  /** Aba atualmente ativa */
  activeTab: TabItem | null = null;

  /** Abas que já foram visitadas (para lazy loading) */
  private visitedTabs: Set<string | number> = new Set();

  ngOnInit(): void {
    this.initializeActiveTab();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeTabId'] || changes['tabs']) {
      this.initializeActiveTab();
    }
  }

  /** Inicializa a aba ativa */
  private initializeActiveTab(): void {
    if (this.activeTabId !== null) {
      const tab = this.tabs.find(t => t.id === this.activeTabId);
      if (tab && !tab.disabled) {
        this.activeTab = tab;
        this.visitedTabs.add(tab.id);
        return;
      }
    }

    // Se não há aba especificada ou ela não existe, seleciona a primeira não desabilitada
    const firstEnabledTab = this.tabs.find(t => !t.disabled);
    if (firstEnabledTab) {
      this.activeTab = firstEnabledTab;
      this.visitedTabs.add(firstEnabledTab.id);
    }
  }

  /** Seleciona uma aba */
  selectTab(tab: TabItem): void {
    if (tab.disabled || tab === this.activeTab) return;

    this.activeTab = tab;
    this.visitedTabs.add(tab.id);
    this.tabSelected.emit(tab);
  }

  /** Fecha uma aba */
  closeTab(tab: TabItem, event: Event): void {
    event.stopPropagation();
    
    if (!tab.closable && !this.closable) return;

    const index = this.tabs.indexOf(tab);
    this.tabs.splice(index, 1);

    // Se a aba fechada era a ativa, seleciona outra
    if (this.activeTab === tab) {
      const newActiveTab = this.tabs[index] || this.tabs[index - 1] || this.tabs[0];
      if (newActiveTab) {
        this.selectTab(newActiveTab);
      } else {
        this.activeTab = null;
      }
    }

    this.tabClosed.emit(tab);
  }

  /** Verifica se uma aba está ativa */
  isTabActive(tab: TabItem): boolean {
    return this.activeTab === tab;
  }

  /** Verifica se o conteúdo de uma aba deve ser renderizado */
  shouldRenderTabContent(tab: TabItem): boolean {
    if (!this.lazy) return true;
    return this.visitedTabs.has(tab.id);
  }

  /** Classe CSS dinâmica para o container */
  get tabsClass(): string {
    const classes = [
      'gforge-tabs',
      `gforge-tabs--${this.variant}`,
      `gforge-tabs--${this.size}`,
      `gforge-tabs--${this.position}`
    ];

    if (this.scrollable) {
      classes.push('gforge-tabs--scrollable');
    }

    if (this.centered) {
      classes.push('gforge-tabs--centered');
    }

    if (this.animated) {
      classes.push('gforge-tabs--animated');
    }

    return classes.join(' ');
  }

  /** Classe CSS dinâmica para cada aba */
  getTabClass(tab: TabItem): string {
    const classes = ['gforge-tabs__tab'];

    if (this.isTabActive(tab)) {
      classes.push('gforge-tabs__tab--active');
    }

    if (tab.disabled) {
      classes.push('gforge-tabs__tab--disabled');
    }

    if (tab.closable || this.closable) {
      classes.push('gforge-tabs__tab--closable');
    }

    return classes.join(' ');
  }

  /** TrackBy function para performance */
  trackByFn(index: number, item: TabItem): any {
    return item.id;
  }

  /** Move uma aba para uma nova posição (para drag and drop futuro) */
  moveTab(fromIndex: number, toIndex: number): void {
    const tab = this.tabs.splice(fromIndex, 1)[0];
    this.tabs.splice(toIndex, 0, tab);
    this.tabsReordered.emit([...this.tabs]);
  }

  /** Adiciona uma nova aba */
  addTab(tab: TabItem): void {
    this.tabs.push(tab);
  }

  /** Remove uma aba por ID */
  removeTab(tabId: string | number): void {
    const tab = this.tabs.find(t => t.id === tabId);
    if (tab) {
      this.closeTab(tab, new Event('close'));
    }
  }

  /** Navega para a próxima aba */
  nextTab(): void {
    if (!this.activeTab) return;

    const currentIndex = this.tabs.indexOf(this.activeTab);
    const nextIndex = (currentIndex + 1) % this.tabs.length;
    const nextTab = this.tabs[nextIndex];

    if (nextTab && !nextTab.disabled) {
      this.selectTab(nextTab);
    }
  }

  /** Navega para a aba anterior */
  previousTab(): void {
    if (!this.activeTab) return;

    const currentIndex = this.tabs.indexOf(this.activeTab);
    const prevIndex = currentIndex === 0 ? this.tabs.length - 1 : currentIndex - 1;
    const prevTab = this.tabs[prevIndex];

    if (prevTab && !prevTab.disabled) {
      this.selectTab(prevTab);
    }
  }
}