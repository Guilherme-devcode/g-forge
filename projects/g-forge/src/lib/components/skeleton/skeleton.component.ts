import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface SkeletonLine {
  width?: string;
  height?: string;
  marginBottom?: string;
}

@Component({
  selector: 'gforge-skeleton',
  imports: [CommonModule],
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent {
  /** Tipo de skeleton */
  @Input() variant: 'text' | 'circular' | 'rectangular' | 'rounded' | 'avatar' | 'card' | 'list' | 'table' | 'custom' = 'text';

  /** Largura do skeleton */
  @Input() width: string | number = '100%';

  /** Altura do skeleton */
  @Input() height: string | number = '1em';

  /** Número de linhas (para variant text) */
  @Input() lines: number = 1;

  /** Configuração das linhas customizadas */
  @Input() customLines: SkeletonLine[] = [];

  /** Animação do skeleton */
  @Input() animation: 'pulse' | 'wave' | 'none' = 'pulse';

  /** Velocidade da animação */
  @Input() animationSpeed: 'slow' | 'normal' | 'fast' = 'normal';

  /** Cor base do skeleton */
  @Input() baseColor: string = '#e2e8f0';

  /** Cor de destaque da animação */
  @Input() highlightColor: string = '#f1f5f9';

  /** Bordas arredondadas */
  @Input() rounded: boolean = false;

  /** Valor do border-radius */
  @Input() borderRadius: string = '4px';

  /** Espaçamento entre linhas */
  @Input() lineSpacing: string = '0.5em';

  /** Loading state - mostra conteúdo real quando false */
  @Input() loading: boolean = true;

  /** Configurações para variant 'card' */
  @Input() cardConfig = {
    showAvatar: true,
    showTitle: true,
    showSubtitle: true,
    showContent: true,
    contentLines: 3
  };

  /** Configurações para variant 'list' */
  @Input() listConfig = {
    items: 3,
    showAvatar: true,
    showSecondaryText: true
  };

  /** Configurações para variant 'table' */
  @Input() tableConfig = {
    rows: 5,
    columns: 4,
    showHeader: true
  };

  /** Classe CSS dinâmica */
  get skeletonClass(): string {
    const classes = [
      'gforge-skeleton',
      `gforge-skeleton--${this.variant}`,
      `gforge-skeleton--${this.animation}`,
      `gforge-skeleton--${this.animationSpeed}`
    ];

    if (this.rounded) {
      classes.push('gforge-skeleton--rounded');
    }

    return classes.join(' ');
  }

  /** Estilo dinâmico */
  get skeletonStyle(): any {
    const style: any = {
      '--skeleton-base-color': this.baseColor,
      '--skeleton-highlight-color': this.highlightColor,
      '--line-spacing': this.lineSpacing
    };

    if (this.variant === 'text' || this.variant === 'rectangular' || this.variant === 'custom') {
      style.width = typeof this.width === 'number' ? `${this.width}px` : this.width;
      style.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
    }

    if (this.rounded || this.variant === 'rounded') {
      style.borderRadius = this.borderRadius;
    }

    if (this.variant === 'circular' || this.variant === 'avatar') {
      const size = typeof this.width === 'number' ? `${this.width}px` : this.width;
      style.width = size;
      style.height = size;
      style.borderRadius = '50%';
    }

    return style;
  }

  /** Gera array para as linhas de texto */
  get textLines(): SkeletonLine[] {
    if (this.customLines.length > 0) {
      return this.customLines;
    }

    const lines: SkeletonLine[] = [];
    for (let i = 0; i < this.lines; i++) {
      const isLast = i === this.lines - 1;
      lines.push({
        width: isLast && this.lines > 1 ? '75%' : '100%',
        height: '1em',
        marginBottom: isLast ? '0' : this.lineSpacing
      });
    }
    return lines;
  }

  /** Gera array para itens da lista */
  get listItems(): number[] {
    return Array(this.listConfig.items).fill(0).map((_, i) => i);
  }

  /** Gera array para linhas da tabela */
  get tableRows(): number[] {
    const totalRows = this.tableConfig.showHeader ? this.tableConfig.rows + 1 : this.tableConfig.rows;
    return Array(totalRows).fill(0).map((_, i) => i);
  }

  /** Gera array para colunas da tabela */
  get tableColumns(): number[] {
    return Array(this.tableConfig.columns).fill(0).map((_, i) => i);
  }

  /** Verifica se é linha de cabeçalho da tabela */
  isTableHeader(rowIndex: number): boolean {
    return this.tableConfig.showHeader && rowIndex === 0;
  }

  /** TrackBy function para performance */
  trackByIndex(index: number): number {
    return index;
  }

  /** Estilo para linha customizada */
  getLineStyle(line: SkeletonLine): any {
    return {
      width: line.width || '100%',
      height: line.height || '1em',
      marginBottom: line.marginBottom || '0'
    };
  }
}