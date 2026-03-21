import { Component, computed, inject, input, output } from '@angular/core';
import { LanguageService } from '@bmad-demo/shared-data';

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div class="text-4xl mb-4">{{ emoji() }}</div>
      <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">{{ randomMessage().title }}</h3>
      <p class="text-sm text-slate-500">{{ subtitle() || randomMessage().subtitle }}</p>
      @if (actionLabel()) {
        <button
          (click)="action.emit()"
          class="mt-4 px-4 py-2 rounded-md text-sm font-medium
                 bg-teal-600 hover:bg-teal-500 text-white transition-colors
                 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
        >
          {{ actionLabel() }}
        </button>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  readonly emoji = input('🔍');
  readonly actionLabel = input('');
  readonly subtitle = input('');
  readonly action = output<void>();

  private readonly langService = inject(LanguageService);
  private readonly messageIndex = Math.floor(Math.random() * 5);

  protected readonly randomMessage = computed(() =>
    this.langService.t().emptyMessages[this.messageIndex]
  );
}
