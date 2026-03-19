import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

const WITTY_COPY_MESSAGES = [
  'Copied! Your clipboard is now smarter.',
  'Snagged it! Go paste something brilliant.',
  'Ctrl+V is ready for action.',
  'Copied — your AI tool is going to love this.',
  'Got it! That prompt is locked and loaded.',
  'Clipboard updated. You\'re welcome.',
  'Yoinked! Time to paste and prosper.',
  'Copy that! (pun absolutely intended)',
];

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);

  showCopySuccess(): void {
    const message = WITTY_COPY_MESSAGES[Math.floor(Math.random() * WITTY_COPY_MESSAGES.length)];
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
