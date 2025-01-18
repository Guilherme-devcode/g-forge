import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

export interface DropdownOption {
  label: string;
  value: any;
}

@Component({
  selector: 'gforge-dropdown',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  /** Label inicial do botão */
  @Input() label: string = 'Dropdown';

  /** Opções do dropdown */
  @Input() options: DropdownOption[] = [];

  /** Variantes do botão no dropdown */
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';

  /** Tamanho do botão no dropdown */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /** Define se o dropdown está desabilitado */
  @Input() disabled: boolean = false;

  /** Emite a opção selecionada */
  @Output() selected = new EventEmitter<DropdownOption>();

  /** Estado aberto ou fechado */
  isOpen: boolean = false;

  /** Opção atualmente selecionada */
  selectedOption: DropdownOption | null = null;

  /** Alterna o estado do dropdown */
  toggleDropdown(event: Event): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  /** Seleciona uma opção */
  selectOption(option: DropdownOption): void {
    this.selectedOption = option;
    this.selected.emit(option);
    this.isOpen = false;
  }
}
