import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'gforge-badge',
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  /** Texto do badge */
  @Input() label: string | number | null = null;

  /** Variante do badge */
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';

  /** Tamanho do badge */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /** Formato do badge */
  @Input() shape: 'rounded' | 'pill' | 'square' = 'rounded';

  /** Define se o badge é outline */
  @Input() outline: boolean = false;

  /** Define se o badge tem efeito brilhante */
  @Input() glow: boolean = false;

  /** Define se o badge pulsa */
  @Input() pulse: boolean = false;

  /** Ícone do badge */
  @Input() icon: string | null = null;

  /** Posição do badge (para uso como notification) */
  @Input() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'static' = 'static';

  /** Define se o badge é removível */
  @Input() removable: boolean = false;

  /** Cor personalizada */
  @Input() customColor: string | null = null;

  /** Classe dinâmica */
  get badgeClass(): string {
    const classes = [
      'gforge-badge',
      `gforge-badge--${this.variant}`,
      `gforge-badge--${this.size}`,
      `gforge-badge--${this.shape}`
    ];

    if (this.outline) {
      classes.push('gforge-badge--outline');
    }

    if (this.glow) {
      classes.push('gforge-badge--glow');
    }

    if (this.pulse) {
      classes.push('gforge-badge--pulse');
    }

    if (this.position !== 'static') {
      classes.push('gforge-badge--positioned', `gforge-badge--${this.position}`);
    }

    if (this.removable) {
      classes.push('gforge-badge--removable');
    }

    return classes.join(' ');
  }

  /** Estilo dinâmico para cor personalizada */
  get customStyle(): any {
    if (this.customColor) {
      const rgb = this.hexToRgb(this.customColor);
      return {
        '--badge-color': this.customColor,
        '--badge-color-rgb': rgb
      };
    }
    return {};
  }

  /** Remove o badge */
  onRemove(): void {
    // Emit event or handle removal logic
    console.log('Badge removed');
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