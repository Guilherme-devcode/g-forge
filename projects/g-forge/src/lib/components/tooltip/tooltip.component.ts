import { CommonModule } from '@angular/common';
import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ElementRef, 
  ViewChild, 
  HostListener,
  OnDestroy,
  AfterViewInit
} from '@angular/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';

@Component({
  selector: 'gforge-tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements AfterViewInit, OnDestroy {
  /** Conteúdo do tooltip */
  @Input() content: string = '';

  /** Posição do tooltip */
  @Input() position: TooltipPosition = 'top';

  /** Como o tooltip é acionado */
  @Input() trigger: TooltipTrigger = 'hover';

  /** Atraso para mostrar (em ms) */
  @Input() showDelay: number = 0;

  /** Atraso para esconder (em ms) */
  @Input() hideDelay: number = 0;

  /** Desabilita o tooltip */
  @Input() disabled: boolean = false;

  /** Tema do tooltip */
  @Input() theme: 'dark' | 'light' | 'primary' | 'danger' | 'warning' | 'success' = 'dark';

  /** Tamanho máximo do tooltip */
  @Input() maxWidth: string = '300px';

  /** Permite HTML no conteúdo */
  @Input() allowHtml: boolean = false;

  /** Offset do tooltip em pixels */
  @Input() offset: number = 8;

  /** Controla visibilidade manual */
  @Input() visible: boolean = false;

  /** Animação do tooltip */
  @Input() animated: boolean = true;

  /** Evento emitido quando o tooltip é mostrado */
  @Output() shown = new EventEmitter<void>();

  /** Evento emitido quando o tooltip é escondido */
  @Output() hidden = new EventEmitter<void>();

  /** Referência ao elemento do tooltip */
  @ViewChild('tooltipElement', { static: false }) tooltipElement!: ElementRef<HTMLDivElement>;

  /** Estado de visibilidade interno */
  isVisible: boolean = false;

  /** Timers para delay */
  private showTimer?: number;
  private hideTimer?: number;

  /** Posição calculada do tooltip */
  tooltipStyles: any = {};

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.trigger === 'manual') {
      this.isVisible = this.visible;
    }
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  /** Mostra o tooltip */
  show(): void {
    if (this.disabled || this.isVisible) return;

    this.clearHideTimer();

    if (this.showDelay > 0) {
      this.showTimer = window.setTimeout(() => {
        this.doShow();
      }, this.showDelay);
    } else {
      this.doShow();
    }
  }

  /** Esconde o tooltip */
  hide(): void {
    if (!this.isVisible) return;

    this.clearShowTimer();

    if (this.hideDelay > 0) {
      this.hideTimer = window.setTimeout(() => {
        this.doHide();
      }, this.hideDelay);
    } else {
      this.doHide();
    }
  }

  /** Alterna a visibilidade do tooltip */
  toggle(): void {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  /** Executa a ação de mostrar */
  private doShow(): void {
    this.isVisible = true;
    this.updatePosition();
    this.shown.emit();
  }

  /** Executa a ação de esconder */
  private doHide(): void {
    this.isVisible = false;
    this.hidden.emit();
  }

  /** Atualiza a posição do tooltip */
  private updatePosition(): void {
    if (!this.tooltipElement) return;

    setTimeout(() => {
      const triggerRect = this.elementRef.nativeElement.getBoundingClientRect();
      const tooltipRect = this.tooltipElement.nativeElement.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY
      };

      let top = 0;
      let left = 0;
      let actualPosition = this.position;

      // Calcula posição baseada na configuração
      switch (this.position) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - this.offset;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + this.offset;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - this.offset;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + this.offset;
          break;
        case 'top-left':
          top = triggerRect.top - tooltipRect.height - this.offset;
          left = triggerRect.left;
          break;
        case 'top-right':
          top = triggerRect.top - tooltipRect.height - this.offset;
          left = triggerRect.right - tooltipRect.width;
          break;
        case 'bottom-left':
          top = triggerRect.bottom + this.offset;
          left = triggerRect.left;
          break;
        case 'bottom-right':
          top = triggerRect.bottom + this.offset;
          left = triggerRect.right - tooltipRect.width;
          break;
      }

      // Ajusta se sair da viewport
      if (left < 0) {
        left = 8;
      } else if (left + tooltipRect.width > viewport.width) {
        left = viewport.width - tooltipRect.width - 8;
      }

      if (top < 0) {
        top = triggerRect.bottom + this.offset;
        actualPosition = this.getBottomPosition();
      } else if (top + tooltipRect.height > viewport.height) {
        top = triggerRect.top - tooltipRect.height - this.offset;
        actualPosition = this.getTopPosition();
      }

      this.tooltipStyles = {
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        maxWidth: this.maxWidth,
        zIndex: 9999
      };

      // Atualiza a classe para a seta
      this.tooltipElement.nativeElement.setAttribute('data-position', actualPosition);
    }, 0);
  }

  /** Retorna posição bottom equivalente */
  private getBottomPosition(): string {
    switch (this.position) {
      case 'top': return 'bottom';
      case 'top-left': return 'bottom-left';
      case 'top-right': return 'bottom-right';
      default: return 'bottom';
    }
  }

  /** Retorna posição top equivalente */
  private getTopPosition(): string {
    switch (this.position) {
      case 'bottom': return 'top';
      case 'bottom-left': return 'top-left';
      case 'bottom-right': return 'top-right';
      default: return 'top';
    }
  }

  /** Event listeners para trigger hover */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.trigger === 'hover') {
      this.show();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.trigger === 'hover') {
      this.hide();
    }
  }

  /** Event listeners para trigger click */
  @HostListener('click')
  onClick(): void {
    if (this.trigger === 'click') {
      this.toggle();
    }
  }

  /** Event listeners para trigger focus */
  @HostListener('focusin')
  onFocusIn(): void {
    if (this.trigger === 'focus') {
      this.show();
    }
  }

  @HostListener('focusout')
  onFocusOut(): void {
    if (this.trigger === 'focus') {
      this.hide();
    }
  }

  /** Event listener para fechar com ESC */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isVisible && this.trigger === 'click') {
      this.hide();
    }
  }

  /** Event listener para fechar clicando fora */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.trigger === 'click' && this.isVisible) {
      const target = event.target as Element;
      if (!this.elementRef.nativeElement.contains(target) && 
          !this.tooltipElement?.nativeElement.contains(target)) {
        this.hide();
      }
    }
  }

  /** Event listener para scroll */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.isVisible) {
      this.updatePosition();
    }
  }

  /** Event listener para resize */
  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.isVisible) {
      this.updatePosition();
    }
  }

  /** Limpa todos os timers */
  private clearTimers(): void {
    this.clearShowTimer();
    this.clearHideTimer();
  }

  /** Limpa timer de show */
  private clearShowTimer(): void {
    if (this.showTimer) {
      window.clearTimeout(this.showTimer);
      this.showTimer = undefined;
    }
  }

  /** Limpa timer de hide */
  private clearHideTimer(): void {
    if (this.hideTimer) {
      window.clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }
  }

  /** Classe CSS dinâmica */
  get tooltipClass(): string {
    const classes = [
      'gforge-tooltip',
      `gforge-tooltip--${this.theme}`,
      `gforge-tooltip--${this.position}`
    ];

    if (this.animated) {
      classes.push('gforge-tooltip--animated');
    }

    return classes.join(' ');
  }

  /** Verifica se deve mostrar o tooltip */
  get shouldShow(): boolean {
    return this.isVisible && this.content && !this.disabled;
  }
}