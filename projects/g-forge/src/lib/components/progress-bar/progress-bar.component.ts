import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface ProgressSegment {
  value: number;
  color?: string;
  label?: string;
}

@Component({
  selector: 'gforge-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnChanges {
  /** Valor atual do progresso (0-100) */
  @Input() value: number = 0;

  /** Valor máximo */
  @Input() max: number = 100;

  /** Valor mínimo */
  @Input() min: number = 0;

  /** Tamanho da barra */
  @Input() size: 'small' | 'medium' | 'large' | 'extra-large' = 'medium';

  /** Variante visual */
  @Input() variant: 'default' | 'striped' | 'animated' | 'gradient' | 'neon' = 'default';

  /** Cor da barra */
  @Input() color: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' | 'custom' = 'primary';

  /** Cor personalizada (quando color = 'custom') */
  @Input() customColor: string = '#4ecdc4';

  /** Formato da barra */
  @Input() shape: 'rounded' | 'square' | 'pill' = 'rounded';

  /** Mostra o texto do valor */
  @Input() showValue: boolean = false;

  /** Formato do texto (percentage, value, fraction) */
  @Input() valueFormat: 'percentage' | 'value' | 'fraction' | 'custom' = 'percentage';

  /** Texto personalizado */
  @Input() customText: string = '';

  /** Posição do texto */
  @Input() textPosition: 'inside' | 'outside' | 'center' = 'center';

  /** Mostra animação de progresso */
  @Input() animated: boolean = false;

  /** Barra indeterminada (loading) */
  @Input() indeterminate: boolean = false;

  /** Múltiplos segmentos */
  @Input() segments: ProgressSegment[] = [];

  /** Orientação da barra */
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Buffer value (para progress com buffer) */
  @Input() bufferValue: number = 0;

  /** Mostra buffer */
  @Input() showBuffer: boolean = false;

  /** Valor normalizado (0-1) */
  normalizedValue: number = 0;
  normalizedBufferValue: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] || changes['max'] || changes['min']) {
      this.updateNormalizedValue();
    }
    if (changes['bufferValue'] || changes['max'] || changes['min']) {
      this.updateNormalizedBufferValue();
    }
  }

  /** Atualiza o valor normalizado */
  private updateNormalizedValue(): void {
    const range = this.max - this.min;
    const adjustedValue = Math.max(this.min, Math.min(this.max, this.value));
    this.normalizedValue = range === 0 ? 0 : ((adjustedValue - this.min) / range) * 100;
  }

  /** Atualiza o valor normalizado do buffer */
  private updateNormalizedBufferValue(): void {
    const range = this.max - this.min;
    const adjustedValue = Math.max(this.min, Math.min(this.max, this.bufferValue));
    this.normalizedBufferValue = range === 0 ? 0 : ((adjustedValue - this.min) / range) * 100;
  }

  /** Classe CSS dinâmica */
  get progressClass(): string {
    const classes = [
      'gforge-progress',
      `gforge-progress--${this.size}`,
      `gforge-progress--${this.variant}`,
      `gforge-progress--${this.color}`,
      `gforge-progress--${this.shape}`,
      `gforge-progress--${this.orientation}`
    ];

    if (this.animated) {
      classes.push('gforge-progress--animated');
    }

    if (this.indeterminate) {
      classes.push('gforge-progress--indeterminate');
    }

    if (this.segments.length > 0) {
      classes.push('gforge-progress--segmented');
    }

    if (this.showBuffer) {
      classes.push('gforge-progress--buffered');
    }

    return classes.join(' ');
  }

  /** Estilo da barra de progresso */
  get progressBarStyle(): any {
    const style: any = {};

    if (this.orientation === 'horizontal') {
      style.width = `${this.normalizedValue}%`;
    } else {
      style.height = `${this.normalizedValue}%`;
    }

    if (this.color === 'custom' && this.customColor) {
      style.backgroundColor = this.customColor;
    }

    return style;
  }

  /** Estilo da barra de buffer */
  get bufferBarStyle(): any {
    const style: any = {};

    if (this.orientation === 'horizontal') {
      style.width = `${this.normalizedBufferValue}%`;
    } else {
      style.height = `${this.normalizedBufferValue}%`;
    }

    return style;
  }

  /** Texto formatado do valor */
  get formattedValue(): string {
    if (this.customText) {
      return this.customText;
    }

    switch (this.valueFormat) {
      case 'percentage':
        return `${Math.round(this.normalizedValue)}%`;
      case 'value':
        return `${this.value}`;
      case 'fraction':
        return `${this.value}/${this.max}`;
      default:
        return `${Math.round(this.normalizedValue)}%`;
    }
  }

  /** Calcula a largura de um segmento */
  getSegmentWidth(segment: ProgressSegment): number {
    const range = this.max - this.min;
    return range === 0 ? 0 : (segment.value / range) * 100;
  }

  /** Estilo de um segmento */
  getSegmentStyle(segment: ProgressSegment): any {
    const style: any = {};
    
    if (this.orientation === 'horizontal') {
      style.width = `${this.getSegmentWidth(segment)}%`;
    } else {
      style.height = `${this.getSegmentWidth(segment)}%`;
    }

    if (segment.color) {
      style.backgroundColor = segment.color;
    }

    return style;
  }

  /** Verifica se o texto deve estar visível */
  get shouldShowText(): boolean {
    return this.showValue && !this.indeterminate && this.segments.length === 0;
  }

  /** Classe para o texto */
  get textClass(): string {
    return `gforge-progress__text gforge-progress__text--${this.textPosition}`;
  }

  /** Verifica se deve mostrar o valor dentro da barra */
  get isTextInside(): boolean {
    return this.textPosition === 'inside' || this.textPosition === 'center';
  }

  /** Verifica se a barra tem progresso suficiente para texto interno */
  get hasEnoughProgressForText(): boolean {
    return this.normalizedValue > 30; // Mostra texto interno apenas se > 30%
  }
}