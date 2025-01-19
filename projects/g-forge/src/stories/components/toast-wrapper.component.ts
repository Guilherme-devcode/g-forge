import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastComponent } from '../../lib/components/toast/toast.component';
import { ToastPosition, ToastService } from '../../lib/services/toast.service';

@Component({
  selector: 'toast-wrapper',
  imports: [ToastComponent],
  template: `
    <button (click)="showToast()">Exibir Toast</button>
    <button (click)="changePosition()">Alterar Posição</button>
    <gforge-toast></gforge-toast>
  `,
})
export class ToastWrapperComponent implements OnInit, OnDestroy {
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'success';
  @Input() message: string = 'Mensagem do Toast';
  @Input() title: string = 'Título do Toast';
  @Input() duration: number = 3000;
  private positionSubscription!: Subscription;
  currentPosition!: ToastPosition;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.positionSubscription = this.toastService.position$.subscribe(
      (position) => {
        this.currentPosition = position;
      }
    );
  }

  showToast() {
    switch (this.type) {
      case 'success':
        this.toastService.success(this.message, this.title, this.duration);
        break;
      case 'error':
        this.toastService.error(this.message, this.title, this.duration);
        break;
      case 'info':
        this.toastService.info(this.message, this.title, this.duration);
        break;
      case 'warning':
        this.toastService.warning(this.message, this.title, this.duration);
        break;
    }
  }

  // Alterar a posição dos toasts
  changePosition() {
    const positions: ToastPosition[] = [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ];
    const nextPosition =
      positions[
        (positions.indexOf(this.currentPosition) + 1) % positions.length
      ];
    this.toastService.setPosition(nextPosition); // Atualiza a posição via serviço
  }

  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe(); // Limpeza da inscrição
    }
  }
}
