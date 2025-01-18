import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastConfig, ToastService } from '../../services/toast.service';

@Component({
  selector: 'gforge-toast',
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div
        *ngFor="let toast of toasts"
        class="toast toast-{{ toast.type }}"
        (click)="removeToast(toast)"
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

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toast$.subscribe((toast) => {
      this.toasts.push(toast);
      if (toast.duration) {
        setTimeout(() => this.removeToast(toast), toast.duration);
      }
    });
  }

  removeToast(toast: ToastConfig): void {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
