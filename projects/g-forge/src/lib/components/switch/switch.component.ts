import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gf-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ]
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() disabled: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
  @Input() variant: 'default' | 'ios' | 'material' | 'neon' | 'morphism' = 'default';
  @Input() showLabels: boolean = false;
  @Input() onLabel: string = 'ON';
  @Input() offLabel: string = 'OFF';
  @Input() loading: boolean = false;

  @Output() change = new EventEmitter<boolean>();

  checked: boolean = false;
  isAnimating: boolean = false;

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  writeValue(value: boolean): void {
    this.checked = !!value;
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

  toggle(): void {
    if (this.disabled || this.loading) return;

    this.isAnimating = true;
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.change.emit(this.checked);
    this.onTouched();

    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }
}