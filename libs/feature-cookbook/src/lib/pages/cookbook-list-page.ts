import { Component, inject, computed } from '@angular/core';
import { CookbookService, LanguageService } from '@bmad-demo/shared-data';
import { SkeletonComponent, EmptyStateComponent } from '@bmad-demo/shared-ui';
import { ToolSelectorComponent } from '../components/tool-selector';
import { SearchBarComponent } from '../components/search-bar';
import { FilterSidebarComponent } from '../components/filter-sidebar';
import { CookbookCardComponent } from '../components/cookbook-card';

@Component({
  selector: 'app-cookbook-list-page',
  standalone: true,
  imports: [
    SkeletonComponent, EmptyStateComponent,
    ToolSelectorComponent, SearchBarComponent,
    FilterSidebarComponent, CookbookCardComponent,
  ],
  template: `
    <section>
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ langService.t().cookbookTitle }}</h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ cookbookSubtitle() }}</p>
      </div>

      <!-- Tool Selector -->
      <div class="mb-4">
        <app-tool-selector />
      </div>

      <!-- Search -->
      <div class="mb-6">
        <app-search-bar />
      </div>

      <!-- Active Filters -->
      @if (cookbookService.selectedCategory() || cookbookService.searchQuery()) {
        <div class="mb-4 flex flex-wrap items-center gap-2">
          @if (cookbookService.selectedCategory()) {
            <span class="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-3 py-1 text-xs text-slate-700 dark:text-slate-300">
              {{ cookbookService.selectedCategory() }}
              <button (click)="cookbookService.selectedCategory.set(null)" class="ml-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" [attr.aria-label]="langService.t().removeCategoryFilter">×</button>
            </span>
          }
          @if (cookbookService.searchQuery()) {
            <span class="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-3 py-1 text-xs text-slate-700 dark:text-slate-300">
              "{{ cookbookService.searchQuery() }}"
              <button (click)="cookbookService.searchQuery.set('')" class="ml-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" [attr.aria-label]="langService.t().clearSearch">×</button>
            </span>
          }
          <button
            (click)="clearAll()"
            class="text-xs text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
          >{{ langService.t().clearAll }}</button>
        </div>
      }

      <!-- Result Count -->
      <p class="mb-4 text-sm text-slate-500">
        {{ resultLabel() }}
      </p>

      <!-- Content Grid -->
      <div class="flex gap-6">
        <!-- Sidebar -->
        <aside class="hidden lg:block w-48 shrink-0">
          <app-filter-sidebar />
        </aside>

        <!-- Cards -->
        <div class="flex-1">
          @if (cookbookService.isLoading()) {
            <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              @for (i of [1,2,3,4]; track i) {
                <ui-skeleton height="180px" />
              }
            </div>
          } @else if (cookbookService.filteredEntries().length === 0) {
            <ui-empty-state emoji="🧑‍🍳" [actionLabel]="langService.t().clearFilters" [subtitle]="langService.t().noRecipes" (action)="clearAll()" />
          } @else {
            <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              @for (entry of cookbookService.filteredEntries(); track entry.id) {
                <app-cookbook-card [entry]="entry" />
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class CookbookListPage {
  protected readonly cookbookService = inject(CookbookService);
  protected readonly langService = inject(LanguageService);
  private readonly subtitleIndex = Math.floor(Math.random() * 4);

  protected readonly cookbookSubtitle = computed(() =>
    this.langService.t().cookbookSubtitles[this.subtitleIndex]
  );

  protected readonly resultLabel = computed(() => {
    const count = this.cookbookService.filteredEntries().length;
    const tool = this.cookbookService.selectedTool();
    const t = this.langService.t();
    const word = count !== 1 ? t.resultPlural : t.resultSingular;
    const toolName = tool === 'all' ? '' : ` ${t.resultFor} ${tool.charAt(0).toUpperCase() + tool.slice(1)}`;
    return `${count} ${word}${toolName}`;
  });

  protected clearAll(): void {
    this.cookbookService.selectedCategory.set(null);
    this.cookbookService.searchQuery.set('');
  }
}
