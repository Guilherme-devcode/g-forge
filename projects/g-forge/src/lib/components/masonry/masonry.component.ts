import { Component, Input, ContentChildren, QueryList, AfterContentInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gf-masonry-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="masonry-item-content" 
         [style.transition]="'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'"
         [style.opacity]="positioned ? 1 : 0">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '[style.position]': '"absolute"',
    '[style.width]': 'width + "px"',
    '[style.left]': 'x + "px"',
    '[style.top]': 'y + "px"',
    '[style.transition]': '"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"'
  }
})
export class MasonryItemComponent {
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  positioned: boolean = false;
}

@Component({
  selector: 'gf-masonry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss']
})
export class MasonryComponent implements AfterContentInit, OnDestroy {
  @Input() columns: number = 3;
  @Input() gap: number = 16;
  @Input() responsive: boolean = true;
  @Input() breakpoints: { [key: number]: number } = {
    1200: 4,
    992: 3,
    768: 2,
    576: 1
  };
  @Input() animationDelay: number = 50;
  @Input() loadAnimation: 'fade' | 'slide' | 'scale' | 'none' = 'fade';

  @ContentChildren(MasonryItemComponent) items!: QueryList<MasonryItemComponent>;
  @ViewChild('container', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;
  private currentColumns: number = 3;
  private columnHeights: number[] = [];
  private containerWidth: number = 0;

  constructor(private ngZone: NgZone) {}

  ngAfterContentInit() {
    this.setupObservers();
    this.calculateLayout();

    this.items.changes.subscribe(() => {
      this.calculateLayout();
    });
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
  }

  private setupObservers() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.ngZone.run(() => {
          this.calculateLayout();
        });
      });

      if (this.containerRef) {
        this.resizeObserver.observe(this.containerRef.nativeElement);
      }
    }

    if (typeof MutationObserver !== 'undefined') {
      this.mutationObserver = new MutationObserver(() => {
        this.ngZone.run(() => {
          this.calculateLayout();
        });
      });

      if (this.containerRef) {
        this.mutationObserver.observe(this.containerRef.nativeElement, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style', 'class']
        });
      }
    }

    if (this.responsive) {
      window.addEventListener('resize', () => {
        this.calculateLayout();
      });
    }
  }

  private calculateColumns(): number {
    if (!this.responsive) {
      return this.columns;
    }

    const width = this.containerRef?.nativeElement.offsetWidth || 0;
    
    for (const [breakpoint, cols] of Object.entries(this.breakpoints).sort((a, b) => parseInt(b[0]) - parseInt(a[0]))) {
      if (width >= parseInt(breakpoint)) {
        return cols;
      }
    }

    return 1;
  }

  private calculateLayout() {
    if (!this.containerRef || !this.items.length) return;

    this.containerWidth = this.containerRef.nativeElement.offsetWidth;
    this.currentColumns = this.calculateColumns();
    this.columnHeights = new Array(this.currentColumns).fill(0);

    const itemWidth = (this.containerWidth - (this.gap * (this.currentColumns - 1))) / this.currentColumns;

    this.items.forEach((item, index) => {
      const element = (item as any).elementRef?.nativeElement;
      if (!element) return;

      item.width = itemWidth;
      
      setTimeout(() => {
        const height = element.offsetHeight;
        item.height = height;

        const shortestColumnIndex = this.getShortestColumnIndex();
        const x = shortestColumnIndex * (itemWidth + this.gap);
        const y = this.columnHeights[shortestColumnIndex];

        item.x = x;
        item.y = y;
        item.positioned = true;

        this.columnHeights[shortestColumnIndex] += height + this.gap;

        if (this.loadAnimation !== 'none') {
          this.animateItemIn(item, index);
        }
      }, index * this.animationDelay);
    });

    setTimeout(() => {
      this.updateContainerHeight();
    }, this.items.length * this.animationDelay + 100);
  }

  private getShortestColumnIndex(): number {
    let shortestIndex = 0;
    let shortestHeight = this.columnHeights[0];

    for (let i = 1; i < this.columnHeights.length; i++) {
      if (this.columnHeights[i] < shortestHeight) {
        shortestHeight = this.columnHeights[i];
        shortestIndex = i;
      }
    }

    return shortestIndex;
  }

  private updateContainerHeight() {
    const maxHeight = Math.max(...this.columnHeights);
    if (this.containerRef) {
      this.containerRef.nativeElement.style.height = `${maxHeight}px`;
    }
  }

  private animateItemIn(item: MasonryItemComponent, index: number) {
    const element = (item as any).elementRef?.nativeElement;
    if (!element) return;

    switch (this.loadAnimation) {
      case 'fade':
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 50);
        break;

      case 'slide':
        element.style.transform = 'translateX(-100px)';
        setTimeout(() => {
          element.style.transform = 'translateX(0)';
        }, 50);
        break;

      case 'scale':
        element.style.transform = 'scale(0)';
        setTimeout(() => {
          element.style.transform = 'scale(1)';
        }, 50);
        break;
    }
  }

  refresh() {
    this.calculateLayout();
  }

  getContainerHeight(): number {
    return Math.max(...this.columnHeights);
  }
}