import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnDestroy, OnChanges, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'gforge-modal',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnDestroy, OnChanges {
  /** Define se o modal está visível */
  @Input() isOpen: boolean = false;

  /** Título do modal */
  @Input() title: string | null = null;

  /** Tamanho do modal */
  @Input() size: 'small' | 'medium' | 'large' | 'fullscreen' = 'medium';

  /** Define se o modal pode ser fechado clicando no overlay */
  @Input() closeOnOverlayClick: boolean = true;

  /** Define se o modal pode ser fechado com a tecla ESC */
  @Input() closeOnEscape: boolean = true;

  /** Define se deve mostrar o botão de fechar no cabeçalho */
  @Input() showCloseButton: boolean = true;

  /** Define se deve mostrar os botões de ação no rodapé */
  @Input() showActionButtons: boolean = false;

  /** Texto do botão de confirmação */
  @Input() confirmButtonText: string = 'Confirmar';

  /** Texto do botão de cancelar */
  @Input() cancelButtonText: string = 'Cancelar';

  /** Variante do botão de confirmação */
  @Input() confirmButtonVariant: 'primary' | 'secondary' | 'danger' = 'primary';

  /** Evento emitido quando o modal é fechado */
  @Output() closed = new EventEmitter<void>();

  /** Evento emitido quando o botão de confirmação é clicado */
  @Output() confirmed = new EventEmitter<void>();

  /** Evento emitido quando o botão de cancelar é clicado */
  @Output() cancelled = new EventEmitter<void>();

  /** Classe dinâmica para personalização do modal */
  get modalClass(): string {
    return `gforge-modal gforge-modal--${this.size}`;
  }

  /** Fecha o modal */
  closeModal(): void {
    this.isOpen = false;
    this.closed.emit();
  }

  /** Ação ao clicar no overlay */
  onOverlayClick(event: Event): void {
    if (this.closeOnOverlayClick && event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  /** Ação ao clicar no botão de confirmação */
  onConfirm(): void {
    this.confirmed.emit();
  }

  /** Ação ao clicar no botão de cancelar */
  onCancel(): void {
    this.cancelled.emit();
  }

  /** Escuta a tecla ESC para fechar o modal */
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.closeOnEscape && this.isOpen) {
      this.closeModal();
    }
  }

  /** Previne o scroll do body quando o modal está aberto */
  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }

  /** Controla o scroll do body baseado no estado do modal */
  ngOnChanges(): void {
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  /** Verifica se há ações customizadas no slot */
  hasCustomActions(): boolean {
    return false; // Implementação simplificada - pode ser melhorada com ViewChild
  }
}