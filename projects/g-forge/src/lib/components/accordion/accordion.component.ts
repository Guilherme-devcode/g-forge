import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gf-accordion-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="accordion-item"
         [class.expanded]="expanded"
         [class.disabled]="disabled"
         [attr.data-variant]="variant">
      
      <div class="accordion-header"
           (click)="onToggle()"
           (keydown)="onKeyDown($event)"
           tabindex="0"
           role="button"
           [attr.aria-expanded]="expanded"
           [attr.aria-disabled]="disabled">
        
        <div class="header-content">
          <i *ngIf="icon" [class]="icon" class="header-icon"></i>
          <span class="header-title">{{ title }}</span>
          <span *ngIf="badge" class="header-badge">{{ badge }}</span>
        </div>

        <div class="header-actions">
          <div class="expand-icon" [class.rotated]="expanded">
            <svg viewBox="0 0 24 24">
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
            </svg>
          </div>
        </div>

        <div class="header-ripple"></div>
      </div>

      <div class="accordion-content" 
           [style.max-height]="expanded ? contentHeight + 'px' : '0px'"
           #contentElement>
        <div class="content-inner" #contentInner>
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./accordion.component.scss']
})
export class AccordionItemComponent {
  @Input() title!: string;
  @Input() icon?: string;
  @Input() badge?: string | number;
  @Input() disabled: boolean = false;
  @Input() expanded: boolean = false;
  @Input() variant: 'default' | 'card' | 'minimal' | 'bordered' = 'default';

  @Output() toggleEvent = new EventEmitter<boolean>();

  contentHeight: number = 0;

  ngAfterViewInit() {
    this.calculateContentHeight();
  }

  onToggle() {
    if (this.disabled) return;
    this.expanded = !this.expanded;
    this.toggleEvent.emit(this.expanded);
    this.calculateContentHeight();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onToggle();
    }
  }

  private calculateContentHeight() {
    setTimeout(() => {
      const contentInner = document.querySelector('.content-inner') as HTMLElement;
      if (contentInner) {
        this.contentHeight = contentInner.scrollHeight;
      }
    });
  }
}

@Component({
  selector: 'gf-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements AfterContentInit {
  @Input() multiple: boolean = false;
  @Input() variant: 'default' | 'card' | 'minimal' | 'bordered' = 'default';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: 'primary' | 'secondary' | 'neutral' = 'neutral';

  @Output() itemToggle = new EventEmitter<{index: number, expanded: boolean}>();

  @ContentChildren(AccordionItemComponent) items!: QueryList<AccordionItemComponent>;

  ngAfterContentInit() {
    this.items.forEach((item, index) => {
      item.variant = this.variant;
      item.toggleEvent.subscribe((expanded: boolean) => {
        if (!this.multiple && expanded) {
          this.items.forEach((otherItem, otherIndex) => {
            if (otherIndex !== index) {
              otherItem.expanded = false;
            }
          });
        }
        this.itemToggle.emit({index, expanded});
      });
    });
  }

  expandAll() {
    if (this.multiple) {
      this.items.forEach(item => {
        if (!item.disabled) {
          item.expanded = true;
        }
      });
    }
  }

  collapseAll() {
    this.items.forEach(item => {
      item.expanded = false;
    });
  }
}