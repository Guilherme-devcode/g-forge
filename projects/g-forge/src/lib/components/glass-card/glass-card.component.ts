import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'gforge-glass-card',
  imports: [CommonModule],
  templateUrl: './glass-card.component.html',
  styleUrls: ['./glass-card.component.scss'],
})
export class GlassCardComponent {
  /** Título do card */
  @Input() title: string | null = null;

  /** Subtítulo do card */
  @Input() subtitle: string | null = null;

  /** Variante do efeito glass */
  @Input() variant: 'light' | 'dark' | 'colorful' | 'neon' = 'light';

  /** Intensidade do blur */
  @Input() blurIntensity: 'low' | 'medium' | 'high' = 'medium';

  /** Define se o card tem animação hover */
  @Input() animated: boolean = true;

  /** Define se o card tem borda brilhante */
  @Input() glowBorder: boolean = false;

  /** Cor personalizada para variante colorful */
  @Input() customColor: string | null = null;

  /** Define se o card é clicável */
  @Input() clickable: boolean = false;

  /** Classe dinâmica para personalização */
  get cardClass(): string {
    const classes = [
      'gforge-glass-card',
      `gforge-glass-card--${this.variant}`,
      `gforge-glass-card--blur-${this.blurIntensity}`
    ];

    if (this.animated) {
      classes.push('gforge-glass-card--animated');
    }

    if (this.glowBorder) {
      classes.push('gforge-glass-card--glow');
    }

    if (this.clickable) {
      classes.push('gforge-glass-card--clickable');
    }

    return classes.join(' ');
  }

  /** Estilo dinâmico para cor personalizada */
  get customStyle(): any {
    if (this.variant === 'colorful' && this.customColor) {
      return {
        '--custom-color': this.customColor,
        '--custom-color-rgb': this.hexToRgb(this.customColor)
      };
    }
    return {};
  }

  private hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `${r}, ${g}, ${b}`;
    }
    return '78, 205, 196'; // fallback para primary color
  }

  /** Verifica se há ações no slot */
  hasActions(): boolean {
    return false; // Implementação simplificada
  }
}