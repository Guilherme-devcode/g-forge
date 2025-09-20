import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface RadioOption {
  label: string;
  value: any;
  disabled?: boolean;
}

@Component({
  selector: 'gforge-radio',
  imports: [CommonModule],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent implements ControlValueAccessor {
  /** Opções do radio button */
  @Input() options: RadioOption[] = [];

  /** Nome do grupo de radio buttons */
  @Input() name: string = 'gforge-radio-' + Math.random().toString(36).substr(2, 9);

  /** Valor selecionado */
  @Input() value: any = null;

  /** Define se o radio está desabilitado */
  @Input() disabled: boolean = false;

  /** Tamanho do radio */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /** Variante de cor */
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';

  /** Direção do layout */
  @Input() direction: 'horizontal' | 'vertical' = 'vertical';

  /** Evento emitido quando a seleção muda */
  @Output() valueChange = new EventEmitter<any>();

  // ControlValueAccessor implementation
  private onChange = (value: any) => {};
  private onTouched = () => {};

  /** Classe dinâmica para o container */
  get containerClass(): string {
    return `gforge-radio-group gforge-radio-group--${this.direction} gforge-radio-group--${this.size}`;
  }

  /** Classe dinâmica para cada radio */
  getRadioClass(option: RadioOption): string {
    const classes = [
      'gforge-radio',
      `gforge-radio--${this.size}`,
      `gforge-radio--${this.variant}`
    ];

    if (this.isSelected(option)) {
      classes.push('gforge-radio--selected');
    }

    if (this.disabled || option.disabled) {
      classes.push('gforge-radio--disabled');
    }

    return classes.join(' ');
  }

  /** Verifica se uma opção está selecionada */
  isSelected(option: RadioOption): boolean {
    return this.value === option.value;
  }

  /** Seleciona uma opção */
  selectOption(option: RadioOption): void {
    if (!this.disabled && !option.disabled) {
      this.value = option.value;
      this.valueChange.emit(this.value);
      this.onChange(this.value);
      this.onTouched();
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** TrackBy function para melhor performance */
  trackByFn(index: number, option: RadioOption): any {
    return option.value;
  }
}