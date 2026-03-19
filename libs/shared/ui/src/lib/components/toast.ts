import { Component, inject } from '@angular/core';
import { ToastService } from '@bmad-demo/shared-data';

@Component({
  selector: 'ui-toast',
  standalone: true,
  template: `
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2" aria-live="polite" role="status">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-slide-in
                 {{ toast.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/90 dark:text-emerald-100 dark:border-emerald-700/50'
                    : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/90 dark:text-red-100 dark:border-red-700/50' }}"
        >
          {{ toast.message }}
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slide-in {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .animate-slide-in {
      animation: slide-in 0.3s ease-out;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-slide-in { animation: none; }
    }
  `],
})
export class ToastComponent {
  protected readonly toastService = inject(ToastService);
}
