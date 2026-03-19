import { Component, input, output } from '@angular/core';

const EMPTY_MESSAGES = [
  { title: 'Nothing here yet...', subtitle: 'But the void has potential.' },
  { title: 'Tumbleweeds...', subtitle: 'Even the crickets took the day off.' },
  { title: 'It\'s quiet. Too quiet.', subtitle: 'Maybe try a different filter?' },
  { title: 'Zero results found', subtitle: 'The search gremlins came up empty.' },
  { title: 'Nada. Zilch. Zero.', subtitle: 'But hey, at least the UI looks nice.' },
];

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div class="text-4xl mb-4">{{ emoji() }}</div>
      <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">{{ randomMessage.title }}</h3>
      <p class="text-sm text-slate-500">{{ subtitle() || randomMessage.subtitle }}</p>
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

  protected readonly randomMessage = EMPTY_MESSAGES[Math.floor(Math.random() * EMPTY_MESSAGES.length)];
}
