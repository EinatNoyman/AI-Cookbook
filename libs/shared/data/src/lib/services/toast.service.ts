import { Injectable, inject, signal } from '@angular/core';
import { LanguageService } from './language.service';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly langService = inject(LanguageService);
  readonly toasts = signal<Toast[]>([]);

  showCopySuccess(): void {
    const messages = this.langService.t().copySuccessMessages;
    const message = messages[Math.floor(Math.random() * messages.length)];
    this.show(message, 'success');
  }

  showError(message: string): void {
    this.show(message, 'error');
  }

  private show(message: string, type: 'success' | 'error'): void {
    const id = crypto.randomUUID();
    this.toasts.update(t => [...t, { id, message, type }]);
    setTimeout(() => this.dismiss(id), 3000);
  }

  dismiss(id: string): void {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}
