import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'gforge-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  /** Título do card */
  @Input() title: string | null = null;

  /** Subtítulo do card */
  @Input() subtitle: string | null = null;

  /** Variantes do card */
  @Input() variant: 'basic' | 'elevated' | 'outlined' = 'basic';

  /** Tamanhos do card */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /** Define se o card é clicável */
  @Input() clickable: boolean = false;

  /** Define se o card está desabilitado */
  @Input() disabled: boolean = false;

  /** Classe dinâmica para personalização */
  get cardClass(): string {
    const classes = [
      'gforge-card',
      `gforge-card--${this.variant}`,
      `gforge-card--${this.size}`
    ];

    if (this.clickable && !this.disabled) {
      classes.push('gforge-card--clickable');
    }

    if (this.disabled) {
      classes.push('gforge-card--disabled');
    }

    return classes.join(' ');
  }
}