import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'gforge-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnChanges {
  /** URL da imagem do avatar */
  @Input() src: string = '';

  /** Texto alternativo para a imagem */
  @Input() alt: string = 'Avatar';

  /** Nome para gerar iniciais */
  @Input() name: string = '';

  /** Tamanho do avatar */
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number = 'md';

  /** Formato do avatar */
  @Input() shape: 'circle' | 'square' | 'rounded' = 'circle';

  /** Cor de fundo para iniciais */
  @Input() bgColor: string = '';

  /** Cor do texto das iniciais */
  @Input() textColor: string = '#ffffff';

  /** Ícone padrão quando não há imagem nem nome */
  @Input() defaultIcon: string = '👤';

  /** Status do usuário */
  @Input() status: 'online' | 'offline' | 'away' | 'busy' | 'none' = 'none';

  /** Posição do indicador de status */
  @Input() statusPosition: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'bottom-right';

  /** Badge/contador */
  @Input() badge: string | number = '';

  /** Cor do badge */
  @Input() badgeColor: string = '#ff4757';

  /** Permite clique no avatar */
  @Input() clickable: boolean = false;

  /** Desabilita o avatar */
  @Input() disabled: boolean = false;

  /** Borda do avatar */
  @Input() bordered: boolean = false;

  /** Cor da borda */
  @Input() borderColor: string = '#e1e5e9';

  /** Grupo de avatares (para sobreposição) */
  @Input() grouped: boolean = false;

  /** Índice no grupo (para z-index) */
  @Input() groupIndex: number = 0;

  /** Evento emitido quando o avatar é clicado */
  @Output() clicked = new EventEmitter<Event>();

  /** Evento emitido quando a imagem falha ao carregar */
  @Output() imageError = new EventEmitter<Event>();

  /** Evento emitido quando a imagem carrega com sucesso */
  @Output() imageLoaded = new EventEmitter<Event>();

  /** Estado interno da imagem */
  imageLoadError: boolean = false;

  /** Iniciais geradas */
  initials: string = '';

  /** Cor de fundo gerada */
  generatedBgColor: string = '';

  /** Cores predefinidas para geração automática */
  private readonly colorPalette: string[] = [
    '#f56565', '#ed8936', '#ecc94b', '#48bb78', '#38b2ac',
    '#4299e1', '#667eea', '#9f7aea', '#ed64a6', '#f093fb',
    '#a8edea', '#fed7d7', '#feebc8', '#c6f6d5', '#b2f5ea',
    '#bee3f8', '#c3dafe', '#d6bcfa', '#fbb6ce', '#fed7e2'
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] || changes['bgColor']) {
      this.generateInitials();
      this.generateBackgroundColor();
    }
    if (changes['src']) {
      this.imageLoadError = false;
    }
  }

  /** Gera as iniciais do nome */
  private generateInitials(): void {
    if (!this.name) {
      this.initials = '';
      return;
    }

    const words = this.name.trim().split(/\s+/);
    if (words.length === 1) {
      this.initials = words[0].substring(0, 2).toUpperCase();
    } else {
      this.initials = (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
  }

  /** Gera cor de fundo baseada no nome */
  private generateBackgroundColor(): void {
    if (this.bgColor) {
      this.generatedBgColor = this.bgColor;
      return;
    }

    if (!this.name) {
      this.generatedBgColor = '#9ca3af';
      return;
    }

    // Gera hash simples do nome
    let hash = 0;
    for (let i = 0; i < this.name.length; i++) {
      hash = this.name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Usa o hash para selecionar uma cor da paleta
    const index = Math.abs(hash) % this.colorPalette.length;
    this.generatedBgColor = this.colorPalette[index];
  }

  /** Manipula erro de carregamento da imagem */
  onImageError(event: Event): void {
    this.imageLoadError = true;
    this.imageError.emit(event);
  }

  /** Manipula sucesso no carregamento da imagem */
  onImageLoad(event: Event): void {
    this.imageLoadError = false;
    this.imageLoaded.emit(event);
  }

  /** Manipula clique no avatar */
  onClick(event: Event): void {
    if (!this.disabled && this.clickable) {
      this.clicked.emit(event);
    }
  }

  /** Classe CSS dinâmica */
  get avatarClass(): string {
    const classes = [
      'gforge-avatar',
      `gforge-avatar--${this.shape}`,
      `gforge-avatar--${this.getSizeClass()}`
    ];

    if (this.clickable && !this.disabled) {
      classes.push('gforge-avatar--clickable');
    }

    if (this.disabled) {
      classes.push('gforge-avatar--disabled');
    }

    if (this.bordered) {
      classes.push('gforge-avatar--bordered');
    }

    if (this.grouped) {
      classes.push('gforge-avatar--grouped');
    }

    if (this.status !== 'none') {
      classes.push('gforge-avatar--has-status');
    }

    if (this.badge) {
      classes.push('gforge-avatar--has-badge');
    }

    return classes.join(' ');
  }

  /** Retorna a classe de tamanho */
  private getSizeClass(): string {
    if (typeof this.size === 'number') {
      return 'custom';
    }
    return this.size;
  }

  /** Estilo dinâmico do avatar */
  get avatarStyle(): any {
    const style: any = {};

    if (typeof this.size === 'number') {
      style.width = `${this.size}px`;
      style.height = `${this.size}px`;
      style.fontSize = `${this.size * 0.4}px`;
    }

    if (this.bordered && this.borderColor) {
      style.borderColor = this.borderColor;
    }

    if (this.grouped) {
      style.zIndex = this.groupIndex;
    }

    return style;
  }

  /** Estilo do conteúdo (iniciais/ícone) */
  get contentStyle(): any {
    const style: any = {};

    if (!this.src || this.imageLoadError) {
      style.backgroundColor = this.generatedBgColor;
      style.color = this.textColor;
    }

    return style;
  }

  /** Estilo do indicador de status */
  get statusStyle(): any {
    const style: any = {};

    // Cores do status
    const statusColors = {
      online: '#10b981',
      offline: '#6b7280',
      away: '#f59e0b',
      busy: '#ef4444'
    };

    style.backgroundColor = statusColors[this.status as keyof typeof statusColors];

    return style;
  }

  /** Estilo do badge */
  get badgeStyle(): any {
    const style: any = {};

    if (this.badgeColor) {
      style.backgroundColor = this.badgeColor;
    }

    return style;
  }

  /** Classe do indicador de status */
  get statusClass(): string {
    return `gforge-avatar__status gforge-avatar__status--${this.status} gforge-avatar__status--${this.statusPosition}`;
  }

  /** Classe do badge */
  get badgeClass(): string {
    return `gforge-avatar__badge gforge-avatar__badge--${this.statusPosition}`;
  }

  /** Verifica se deve mostrar a imagem */
  get shouldShowImage(): boolean {
    return !!(this.src && !this.imageLoadError);
  }

  /** Verifica se deve mostrar as iniciais */
  get shouldShowInitials(): boolean {
    return !this.shouldShowImage && !!this.initials;
  }

  /** Verifica se deve mostrar o ícone padrão */
  get shouldShowDefaultIcon(): boolean {
    return !this.shouldShowImage && !this.shouldShowInitials;
  }

  /** Verifica se deve mostrar o status */
  get shouldShowStatus(): boolean {
    return this.status !== 'none';
  }

  /** Verifica se deve mostrar o badge */
  get shouldShowBadge(): boolean {
    return !!(this.badge || this.badge === 0);
  }
}