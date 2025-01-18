import { Component, Input } from '@angular/core';
import { ToastComponent } from '../../lib/components/toast/toast.component';
import { ToastService } from '../../lib/services/toast.service';

@Component({
  selector: 'toast-wrapper',
  imports: [ToastComponent],
  template: `
    <button (click)="showToast()">Exibir Toast</button>
    <gforge-toast></gforge-toast>
  `,
})
export class ToastWrapperComponent {
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'success';
  @Input() message: string = 'Mensagem do Toast';
  @Input() title: string = 'Título do Toast';
  @Input() duration: number = 3000;

  constructor(private toastService: ToastService) {}

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
}
