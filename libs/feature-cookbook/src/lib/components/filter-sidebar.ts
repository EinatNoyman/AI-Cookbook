import { Component, inject } from '@angular/core';
import { CookbookService, LanguageService } from '@bmad-demo/shared-data';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  template: `
    <div class="space-y-2">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-500">{{ langService.t().categoriesHeading }}</h3>
      <button
        (click)="cookbookService.selectedCategory.set(null)"
        class="block w-full text-left rounded-md px-3 py-1.5 text-sm transition-colors
               focus:outline-none focus:ring-2 focus:ring-teal-500
               {{ !cookbookService.selectedCategory() ? 'bg-slate-200 text-teal-600 font-medium dark:bg-slate-800 dark:text-teal-400' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200' }}"
      >
        {{ langService.t().allCategories }}
      </button>
      @for (cat of cookbookService.categories(); track cat) {
        <button
          (click)="cookbookService.selectedCategory.set(cat)"
          class="block w-full text-left rounded-md px-3 py-1.5 text-sm transition-colors
                 focus:outline-none focus:ring-2 focus:ring-teal-500
                 {{ cookbookService.selectedCategory() === cat ? 'bg-slate-200 text-teal-600 font-medium dark:bg-slate-800 dark:text-teal-400' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200' }}"
        >
          {{ cat }}
        </button>
      }
    </div>
  `,
})
export class FilterSidebarComponent {
  protected readonly cookbookService = inject(CookbookService);
  protected readonly langService = inject(LanguageService);
}
