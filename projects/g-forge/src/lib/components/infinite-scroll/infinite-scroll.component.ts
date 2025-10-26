import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gf-infinite-scroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements AfterViewInit, OnDestroy {
  @Input() threshold: number = 200;
  @Input() debounceTime: number = 300;
  @Input() loading: boolean = false;
  @Input() hasMore: boolean = true;
  @Input() loadingText: string = 'Carregando...';
  @Input() noMoreText: string = 'Não há mais itens';
  @Input() errorText: string = 'Erro ao carregar';
  @Input() retryText: string = 'Tentar novamente';
  @Input() showLoadingSpinner: boolean = true;
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';
  @Input() disabled: boolean = false;

  @Output() loadMore = new EventEmitter<void>();
  @Output() retry = new EventEmitter<void>();

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('sentinel', { static: false }) sentinel!: ElementRef<HTMLDivElement>;

  hasError: boolean = false;
  private intersectionObserver?: IntersectionObserver;
  private debounceTimer?: number;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.intersectionObserver?.disconnect();
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }

  private setupIntersectionObserver() {
    if (typeof IntersectionObserver === 'undefined' || this.disabled) return;

    const options: IntersectionObserverInit = {
      root: this.scrollContainer?.nativeElement || null,
      rootMargin: `${this.threshold}px`,
      threshold: 0.1
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.ngZone.run(() => {
        entries.forEach(entry => {
          if (entry.isIntersecting && this.hasMore && !this.loading && !this.hasError) {
            this.debouncedLoadMore();
          }
        });
      });
    }, options);

    if (this.sentinel) {
      this.intersectionObserver.observe(this.sentinel.nativeElement);
    }
  }

  private debouncedLoadMore() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = window.setTimeout(() => {
      this.triggerLoadMore();
    }, this.debounceTime);
  }

  private triggerLoadMore() {
    if (this.disabled || this.loading || !this.hasMore || this.hasError) return;
    
    this.hasError = false;
    this.loadMore.emit();
  }

  onRetry() {
    this.hasError = false;
    this.retry.emit();
  }

  setError(error: boolean = true) {
    this.hasError = error;
  }

  scrollToTop() {
    if (this.scrollContainer) {
      const element = this.scrollContainer.nativeElement;
      element.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  scrollToBottom() {
    if (this.scrollContainer) {
      const element = this.scrollContainer.nativeElement;
      if (this.direction === 'vertical') {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth'
        });
      } else {
        element.scrollTo({
          left: element.scrollWidth,
          behavior: 'smooth'
        });
      }
    }
  }
}