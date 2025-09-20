import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'gforge-loading',
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  /** Tipo do loading */
  @Input() type: 'spinner' | 'dots' | 'pulse' | 'bars' | 'ripple' | 'neon' = 'spinner';

  /** Tamanho do loading */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /** Cor do loading */
  @Input() color: string = '#4ecdc4';

  /** Texto de carregamento */
  @Input() text: string | null = null;

  /** Define se o loading é overlay (fullscreen) */
  @Input() overlay: boolean = false;

  /** Tema visual */
  @Input() theme: 'default' | 'dark' | 'neon' = 'default';

  /** Classe dinâmica */
  get loadingClass(): string {
    const classes = [
      'gforge-loading',
      `gforge-loading--${this.type}`,
      `gforge-loading--${this.size}`,
      `gforge-loading--${this.theme}`
    ];

    if (this.overlay) {
      classes.push('gforge-loading--overlay');
    }

    return classes.join(' ');
  }

  /** Estilo dinâmico para cor personalizada */
  get customStyle(): any {
    const rgb = this.hexToRgb(this.color);
    return {
      '--loading-color': this.color,
      '--loading-color-rgb': rgb
    };
  }

  private hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `${r}, ${g}, ${b}`;
    }
    return '78, 205, 196';
  }
}