import { Injectable, signal, effect } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storage = new StorageService();

  readonly theme = signal<'dark' | 'light'>(this.storage.getTheme());

  constructor() {
    effect(() => {
      const t = this.theme();
      this.storage.setTheme(t);
      document.documentElement.classList.toggle('dark', t === 'dark');
    });
  }

  toggle(): void {
    this.theme.update(t => t === 'dark' ? 'light' : 'dark');
  }
}
