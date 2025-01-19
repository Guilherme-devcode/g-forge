import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastConfig, ToastPosition, ToastService } from '../../services/toast.service';


@Component({
  selector: 'gforge-toast',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="toast-container" [ngClass]="toastPosition">
      <div
        *ngFor="let toast of toasts"
        class="toast toast-{{ toast.type }}"
        (click)="removeToast(toast)"
        [ngClass]="{ 'fade-out': toast.fadeOut }"
      >
        <strong *ngIf="toast.title">{{ toast.title }}</strong>
        <p>{{ toast.message }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: ToastConfig[] = [];
  private subscription!: Subscription;
  toastPosition: ToastPosition = 'top-right'; // Valor padrão

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toast$.subscribe(
      (toast: ToastConfig) => {
        this.toasts.push(toast);
        if (toast.duration) {
          setTimeout(() => this.removeToast(toast), toast.duration);
        }
      }
    );

    // Assina a posição do toast vindo do serviço
    this.toastService.position$.subscribe((position) => {
      this.toastPosition = position;
    });
  }

  removeToast(toast: ToastConfig): void {
    toast.fadeOut = true;
    setTimeout(() => {
      this.toasts = this.toasts.filter((t) => t !== toast);
    }, 500); // Tempo da animação de desaparecimento
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
