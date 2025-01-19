import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface ToastConfig {
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number;
  fadeOut?: boolean;
  position?: ToastPosition;
}

export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<ToastConfig>();
  private positionSubject = new BehaviorSubject<ToastPosition>('top-right'); // Alterado para BehaviorSubject
  toast$ = this.toastSubject.asObservable();
  position$ = this.positionSubject.asObservable(); // Para monitorar a posição dos toasts

  showToast(config: ToastConfig): void {
    this.toastSubject.next(config);
  }

  setPosition(position: ToastPosition): void {
    this.positionSubject.next(position);
  }

  success(
    message: string,
    title?: string,
    duration: number = 3000,
    position?: ToastPosition
  ): void {
    this.showToast({ type: 'success', message, title, duration, position });
  }

  error(
    message: string,
    title?: string,
    duration: number = 3000,
    position?: ToastPosition
  ): void {
    this.showToast({ type: 'error', message, title, duration, position });
  }

  info(
    message: string,
    title?: string,
    duration: number = 3000,
    position?: ToastPosition
  ): void {
    this.showToast({ type: 'info', message, title, duration, position });
  }

  warning(
    message: string,
    title?: string,
    duration: number = 3000,
    position?: ToastPosition
  ): void {
    this.showToast({ type: 'warning', message, title, duration, position });
  }
}
