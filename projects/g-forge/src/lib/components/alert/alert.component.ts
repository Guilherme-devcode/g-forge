import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

export interface AlertAction {
  label: string;
  action: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: string;
}

@Component({
  selector: 'gforge-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  /** Tipo/variante do alerta */
  @Input() variant: 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'secondary' = 'info';

  /** Título do alerta */
  @Input() title: string = '';

  /** Mensagem do alerta */
  @Input() message: string = '';

  /** Ícone do alerta */
  @Input() icon: string = '';

  /** Permite fechar o alerta */
  @Input() closable: boolean = false;

  /** Auto-dismiss após X segundos */
  @Input() autoDismiss: number = 0;

  /** Mostra borda */
  @Input() bordered: boolean = false;

  /** Estilo filled/outline */
  @Input() filled: boolean = true;

  /** Tamanho do alerta */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /** Posição do ícone */
  @Input() iconPosition: 'left' | 'top' = 'left';

  /** Ações do alerta */
  @Input() actions: AlertAction[] = [];

  /** Permite HTML no conteúdo */
  @Input() allowHtml: boolean = false;

  /** Animação de entrada */
  @Input() animated: boolean = true;

  /** Evento emitido quando o alerta é fechado */
  @Output() closed = new EventEmitter<void>();

  /** Evento emitido quando uma ação é executada */
  @Output() actionExecuted = new EventEmitter<AlertAction>();

  /** Estado de visibilidade */
  isVisible: boolean = true;

  /** Timer para auto-dismiss */
  private dismissTimer?: number;

  /** Ícones padrão para cada variante */
  private readonly defaultIcons: { [key: string]: string } = {
    success: '✓',
    info: 'ℹ',
    warning: '⚠',
    danger: '✕',
    primary: '●',
    secondary: '○'
  };

  ngOnInit(): void {
    if (this.autoDismiss > 0) {
      this.startAutoDismissTimer();
    }
  }

  ngOnDestroy(): void {
    this.clearAutoDismissTimer();
  }

  /** Inicia o timer de auto-dismiss */
  private startAutoDismissTimer(): void {
    this.dismissTimer = window.setTimeout(() => {
      this.close();
    }, this.autoDismiss * 1000);
  }

  /** Limpa o timer de auto-dismiss */
  private clearAutoDismissTimer(): void {
    if (this.dismissTimer) {
      window.clearTimeout(this.dismissTimer);
      this.dismissTimer = undefined;
    }
  }

  /** Fecha o alerta */
  close(): void {
    this.isVisible = false;
    this.clearAutoDismissTimer();
    
    // Aguarda a animação antes de emitir o evento
    setTimeout(() => {
      this.closed.emit();
    }, this.animated ? 300 : 0);
  }

  /** Executa uma ação */
  executeAction(action: AlertAction): void {
    action.action();
    this.actionExecuted.emit(action);
  }

  /** Pausa o auto-dismiss quando hover */
  pauseAutoDismiss(): void {
    if (this.autoDismiss > 0) {
      this.clearAutoDismissTimer();
    }
  }

  /** Retoma o auto-dismiss quando sai do hover */
  resumeAutoDismiss(): void {
    if (this.autoDismiss > 0 && this.isVisible) {
      this.startAutoDismissTimer();
    }
  }

  /** Retorna o ícone a ser exibido */
  get displayIcon(): string {
    return this.icon || this.defaultIcons[this.variant] || '';
  }

  /** Classe CSS dinâmica */
  get alertClass(): string {
    const classes = [
      'gforge-alert',
      `gforge-alert--${this.variant}`,
      `gforge-alert--${this.size}`,
      `gforge-alert--icon-${this.iconPosition}`
    ];

    if (this.bordered) {
      classes.push('gforge-alert--bordered');
    }

    if (!this.filled) {
      classes.push('gforge-alert--outline');
    }

    if (this.animated) {
      classes.push('gforge-alert--animated');
    }

    if (!this.isVisible) {
      classes.push('gforge-alert--hidden');
    }

    if (this.closable) {
      classes.push('gforge-alert--closable');
    }

    return classes.join(' ');
  }

  /** Verifica se tem conteúdo no slot */
  get hasContent(): boolean {
    return !!(this.title || this.message);
  }

  /** Verifica se deve mostrar o ícone */
  get shouldShowIcon(): boolean {
    return !!this.displayIcon;
  }

  /** Verifica se deve mostrar ações */
  get shouldShowActions(): boolean {
    return this.actions.length > 0;
  }

  /** Classe para botão de ação */
  getActionClass(action: AlertAction): string {
    const variant = action.variant || 'secondary';
    return `gforge-alert__action gforge-alert__action--${variant}`;
  }
}