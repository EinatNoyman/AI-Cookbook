import { Component, inject, viewChild, ElementRef } from '@angular/core';
import { CookbookService } from '@bmad-demo/shared-data';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  host: {
    '(document:keydown./)': 'focusSearch($event)',
  },
  template: `
    <div class="relative">
      <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <input
        #searchInput
        type="search"
        placeholder="Search prompts... (press / to focus)"
        [value]="cookbookService.searchQuery()"
        (input)="onInput($event)"
        (keydown.escape)="clear()"
        class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 py-2 pl-10 pr-4
               text-sm text-slate-800 dark:text-slate-200 placeholder-slate-500
               focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500
               transition-colors"
        aria-label="Search cookbook entries"
      />
      @if (cookbookService.searchQuery()) {
        <button
          (click)="clear()"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300
                 focus:outline-none focus:text-slate-700 dark:focus:text-slate-300"
          aria-label="Clear search"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      }
    </div>
  `,
})
export class SearchBarComponent {
  protected readonly cookbookService = inject(CookbookService);
  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.cookbookService.searchQuery.set(value);
    }, 150);
  }

  protected clear(): void {
    this.cookbookService.searchQuery.set('');
    const input = this.searchInput();
    if (input) input.nativeElement.value = '';
  }

  protected focusSearch(event: Event): void {
    const input = this.searchInput();
    if (input && document.activeElement?.tagName !== 'INPUT') {
      event.preventDefault();
      input.nativeElement.focus();
    }
  }
}
