import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  closable?: boolean;
  badge?: string | number;
}

@Component({
  selector: 'gf-tab',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  host: {
    '[class.active]': 'active',
    '[class.disabled]': 'disabled'
  }
})
export class TabComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() icon?: string;
  @Input() disabled: boolean = false;
  @Input() closable: boolean = false;
  @Input() badge?: string | number;

  active: boolean = false;
}

@Component({
  selector: 'gf-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit, OnDestroy {
  @Input() variant: 'default' | 'pills' | 'underline' | 'cards' | 'vertical' | 'morphism' = 'default';
  @Input() color: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() animated: boolean = true;
  @Input() scrollable: boolean = false;
  @Input() centered: boolean = false;
  @Input() fullWidth: boolean = false;

  @Output() tabChange = new EventEmitter<string>();
  @Output() tabClose = new EventEmitter<string>();

  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  @ViewChild('tabsContainer', { static: false }) tabsContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('activeIndicator', { static: false }) activeIndicator!: ElementRef<HTMLDivElement>;

  activeTabId: string = '';
  indicatorStyle: any = {};
  private resizeObserver?: ResizeObserver;

  ngAfterContentInit() {
    if (this.tabs.length > 0) {
      const firstTab = this.tabs.find(tab => !tab.disabled) || this.tabs.first;
      this.selectTab(firstTab.id);
    }

    this.tabs.changes.subscribe(() => {
      this.updateIndicator();
    });

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateIndicator();
      });
      this.resizeObserver.observe(this.tabsContainer?.nativeElement);
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  selectTab(tabId: string) {
    const tab = this.tabs.find(t => t.id === tabId);
    if (!tab || tab.disabled) return;

    this.tabs.forEach(t => t.active = false);
    tab.active = true;
    this.activeTabId = tabId;
    this.tabChange.emit(tabId);

    setTimeout(() => this.updateIndicator(), 0);
  }

  closeTab(tabId: string, event: Event) {
    event.stopPropagation();
    this.tabClose.emit(tabId);
  }

  private updateIndicator() {
    if (!this.activeIndicator || !this.tabsContainer) return;

    const activeTab = this.tabsContainer.nativeElement.querySelector(`[data-tab-id="${this.activeTabId}"]`) as HTMLElement;
    if (!activeTab) return;

    const containerRect = this.tabsContainer.nativeElement.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    if (this.variant === 'vertical') {
      this.indicatorStyle = {
        transform: `translateY(${tabRect.top - containerRect.top}px)`,
        height: `${tabRect.height}px`,
        width: '3px'
      };
    } else {
      this.indicatorStyle = {
        transform: `translateX(${tabRect.left - containerRect.left}px)`,
        width: `${tabRect.width}px`,
        height: '3px'
      };
    }
  }

  onTabKeyDown(event: KeyboardEvent, tabId: string) {
    const tabsArray = this.tabs.toArray().filter(t => !t.disabled);
    const currentIndex = tabsArray.findIndex(t => t.id === tabId);

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabsArray.length - 1;
        this.selectTab(tabsArray[prevIndex].id);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = currentIndex < tabsArray.length - 1 ? currentIndex + 1 : 0;
        this.selectTab(tabsArray[nextIndex].id);
        break;
      case 'Home':
        event.preventDefault();
        this.selectTab(tabsArray[0].id);
        break;
      case 'End':
        event.preventDefault();
        this.selectTab(tabsArray[tabsArray.length - 1].id);
        break;
    }
  }

  scrollTabs(direction: 'left' | 'right') {
    if (!this.tabsContainer) return;
    
    const container = this.tabsContainer.nativeElement;
    const scrollAmount = 200;
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }
}