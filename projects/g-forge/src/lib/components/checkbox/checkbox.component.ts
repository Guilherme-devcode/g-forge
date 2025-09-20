import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'gforge-checkbox',
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  /** Label do checkbox */
  @Input() label: string | null = null;

  /** Define se o checkbox está marcado */
  @Input() checked: boolean = false;

  /** Define se o checkbox está desabilitado */
  @Input() disabled: boolean = false;

  /** Define se o checkbox está em estado indeterminado */
  @Input() indeterminate: boolean = false;

  /** Tamanho do checkbox */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /** Variante de cor */
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';

  /** Evento emitido quando o estado muda */
  @Output() checkedChange = new EventEmitter<boolean>();

  // ControlValueAccessor implementation
  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  /** Classe dinâmica para personalização */
  get checkboxClass(): string {
    const classes = [
      'gforge-checkbox',
      `gforge-checkbox--${this.size}`,
      `gforge-checkbox--${this.variant}`
    ];

    if (this.checked) {
      classes.push('gforge-checkbox--checked');
    }

    if (this.indeterminate) {
      classes.push('gforge-checkbox--indeterminate');
    }

    if (this.disabled) {
      classes.push('gforge-checkbox--disabled');
    }

    return classes.join(' ');
  }

  /** Alterna o estado do checkbox */
  toggle(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.indeterminate = false;
      this.checkedChange.emit(this.checked);
      this.onChange(this.checked);
      this.onTouched();
    }
  }

  // ControlValueAccessor methods
  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}