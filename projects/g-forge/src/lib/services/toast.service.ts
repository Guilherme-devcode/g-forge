import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastConfig {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  title?: string;
  duration?: number; // Tempo de exibição em ms
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<ToastConfig>();
  toast$ = this.toastSubject.asObservable();

  showToast(config: ToastConfig): void {
    this.toastSubject.next(config);
  }

  success(message: string, title?: string, duration: number = 3000): void {
    this.showToast({ type: 'success', message, title, duration });
  }

  error(message: string, title?: string, duration: number = 3000): void {
    this.showToast({ type: 'error', message, title, duration });
  }

  info(message: string, title?: string, duration: number = 3000): void {
    this.showToast({ type: 'info', message, title, duration });
  }

  warning(message: string, title?: string, duration: number = 3000): void {
    this.showToast({ type: 'warning', message, title, duration });
  }
}
