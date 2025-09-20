import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'gforge-neon-button',
  imports: [CommonModule],
  templateUrl: './neon-button.component.html',
  styleUrls: ['./neon-button.component.scss'],
})
export class NeonButtonComponent {
  /** Texto do botão */
  @Input() label: string | null = null;

  /** Cor neon do botão */
  @Input() neonColor: string = '#00ff88';

  /** Tamanho do botão */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /** Estilo do efeito neon */
  @Input() glowStyle: 'pulse' | 'static' | 'flicker' | 'wave' = 'pulse';

  /** Define se o botão está desabilitado */
  @Input() disabled: boolean = false;

  /** Define se o botão tem efeito de scan line */
  @Input() scanLine: boolean = true;

  /** Evento emitido ao clicar */
  @Output() clicked = new EventEmitter<Event>();

  /** Classe dinâmica */
  get buttonClass(): string {
    const classes = [
      'gforge-neon-button',
      `gforge-neon-button--${this.size}`,
      `gforge-neon-button--${this.glowStyle}`
    ];

    if (this.disabled) {
      classes.push('gforge-neon-button--disabled');
    }

    if (this.scanLine) {
      classes.push('gforge-neon-button--scan');
    }

    return classes.join(' ');
  }

  /** Estilo dinâmico para cor neon */
  get customStyle(): any {
    const rgb = this.hexToRgb(this.neonColor);
    return {
      '--neon-color': this.neonColor,
      '--neon-color-rgb': rgb
    };
  }

  onClick(event: Event): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }

  private hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `${r}, ${g}, ${b}`;
    }
    return '0, 255, 136';
  }
}