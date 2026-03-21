import { Component, computed, inject, input, signal } from '@angular/core';
import { LanguageService, ToastService } from '@bmad-demo/shared-data';

@Component({
  selector: 'ui-copy-button',
  standalone: true,
  template: `
    <button
      (click)="copy()"
      (keydown.c)="copy()"
      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
             bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 transition-colors
             focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
      [attr.aria-label]="copied() ? langService.t().copied : langService.t().copyToClipboard"
    >
      @if (copied()) {
        <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>{{ langService.t().copied }}</span>
      } @else {
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
        <span>{{ langService.t().copy }}</span>
      }
    </button>
  `,
})
export class CopyButtonComponent {
  readonly content = input.required<string>();
  protected readonly copied = signal(false);
  private readonly toast = inject(ToastService);
  protected readonly langService = inject(LanguageService);

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.content());
      this.copied.set(true);
      this.toast.showCopySuccess();
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      this.toast.showError(this.langService.t().copyFailed);
    }
  }
}
