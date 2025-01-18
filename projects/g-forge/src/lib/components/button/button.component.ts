import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'gforge-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /** Texto do botão (simples) */
  @Input() label: string | null = null;

  /** Variantes do botão */
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';

  /** Tamanhos do botão */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /** Desabilita o botão */
  @Input() disabled: boolean = false;

  /** Evento emitido ao clicar no botão */
  @Output() clicked = new EventEmitter<Event>();

  /** Classe dinâmica para personalização */
  get buttonClass(): string {
    return `gforge-button gforge-button--${this.variant} gforge-button--${this.size}`;
  }

  /** Ação ao clicar no botão */
  onClick(event: Event): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
