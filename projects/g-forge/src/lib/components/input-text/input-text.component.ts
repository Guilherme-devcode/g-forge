import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'gforge-input-text',
  imports: [CommonModule, FormsModule],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements OnChanges, OnInit {
  /** Texto placeholder do input */
  @Input() placeholder: string = 'Digite algo';

  /** Valor do input */
  @Input() value: string = '';

  /** Tipo de input */
  @Input() type: 'text' | 'password' | 'email' | 'number' = 'text';

  /** Desabilita o input */
  @Input() disabled: boolean = false;

  /** Máscara do input */
  @Input() mask: 'cpf' | 'money' | 'currency' | null = null;

  /** Tipo de moeda para a máscara 'currency' */
  @Input() currencyType: 'BRL' | 'USD' = 'BRL'; // Valor padrão é 'BRL' (Real)

  /** Limitador de caracteres */
  @Input() maxLength: number | null = null;

  // Variável que controla se o campo é inválido
  @Input() isInvalid: boolean = false;

  /** Evento emitido ao digitar no input */
  @Output() valueChanged = new EventEmitter<string>();

  /** Evento emitido ao focar no input */
  @Output() focused = new EventEmitter<void>();

  /** Evento emitido ao perder o foco do input */
  @Output() blurred = new EventEmitter<void>();

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // Quando o valor de 'value' ou 'mask' for alterado, aplicar a máscara
    if (changes['value'] || changes['mask']) {
      if (this.mask && this.value) {
        this.value = this.applyMask(this.value);
      }
    }
  }

  /** Ação ao mudar o valor do input */
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Aplica a máscara conforme selecionado, mas apenas se a máscara não for null
    if (this.mask) {
      value = this.applyMask(value);
    }

    // Atualiza o valor do input manualmente para evitar loop de recursão
    this.value = value;
    this.valueChanged.emit(value);
  }


  /** Ação ao focar no input */
  onFocus(): void {
    this.focused.emit();
  }

  /** Ação ao perder o foco no input */
  onBlur(): void {
    this.blurred.emit();
  }

  /** Aplica a máscara de acordo com a seleção */
  private applyMask(value: string): string {
    switch (this.mask) {
      case 'cpf':
        return this.formatCPF(value);
      case 'money':
        return this.formatMoney(value);
      case 'currency':
        return this.formatCurrency(value);
      default:
        return value;
    }
  }

  /** Formata o valor como CPF */
  private formatCPF(value: string): string {
    value = value.replace(/\D/g, ''); // Remove tudo que não for número

    // Limita o valor a 11 caracteres
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    }
    return value;
  }

  /** Formata o valor como dinheiro (Real ou Dólar) */
  private formatMoney(value: string): string {
    value = value.replace(/\D/g, ''); // Remove tudo que não for número
    value = value.replace(/(\d)(\d{2})$/, '$1,$2'); // Adiciona a vírgula
    return value.replace(/(\d)(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4'); // Adiciona ponto a cada 3 dígitos
  }

  /** Formata o valor como moeda (Real ou Dólar) */
  private formatCurrency(value: string): string {
    value = value.replace(/\D/g, ''); // Remove tudo que não for número
    value = value.replace(/(\d)(\d{2})$/, '$1,$2'); // Adiciona a vírgula
    if (this.currencyType === 'BRL') {
      return 'R$ ' + value.replace(/(\d)(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4'); // Real
    } else {
      return '$' + value.replace(/(\d)(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4'); // Dólar
    }
  }
}
