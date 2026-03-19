import { Component, computed, input, signal } from '@angular/core';
import { AiTool } from '@bmad-demo/shared-data';
import { CopyButtonComponent } from '@bmad-demo/shared-ui';

@Component({
  selector: 'app-tool-prompts',
  standalone: true,
  imports: [CopyButtonComponent],
  template: `
    <div class="space-y-4 animate-[fade-in_0.2s_ease-out]">
      <!-- Category filter -->
      @if (categories().length > 1) {
        <div class="flex flex-wrap gap-2" role="group" aria-label="Filter prompts by category">
          <button
            (click)="selectedCategory.set(null)"
            [class]="!selectedCategory()
              ? 'rounded-full border border-teal-500 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700'
              : 'rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors'"
          >
            All ({{ tool().prompts.length }})
          </button>
          @for (cat of categories(); track cat) {
            <button
              (click)="selectedCategory.set(cat)"
              [class]="selectedCategory() === cat
                ? 'rounded-full border border-teal-500 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700'
                : 'rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors'"
            >
              {{ cat }}
            </button>
          }
        </div>
      }

      <!-- Prompt cards -->
      <div class="grid gap-4 sm:grid-cols-2">
        @for (prompt of filteredPrompts(); track prompt.id) {
          <div class="group flex flex-col rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900
                      hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md hover:-translate-y-0.5
                      transition-all duration-200">
            <div class="flex-1 p-4">
              <!-- Header -->
              <div class="mb-2 flex items-start justify-between gap-2">
                <h4 class="font-medium text-slate-800 dark:text-slate-200 leading-snug">{{ prompt.title }}</h4>
                <span class="shrink-0 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {{ prompt.category }}
                </span>
              </div>

              <!-- Description -->
              <p class="mb-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{{ prompt.description }}</p>

              <!-- Prompt preview -->
              <div class="rounded-md bg-slate-950 border border-slate-800 p-3">
                <pre [class]="'text-xs text-slate-400 font-mono leading-relaxed whitespace-pre-wrap ' + (expandedPrompts().has(prompt.id) ? 'overflow-auto max-h-96' : 'line-clamp-4 overflow-hidden')">{{ prompt.content }}</pre>
                <button
                  (click)="toggleExpand(prompt.id)"
                  class="mt-2 flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors"
                >
                  @if (expandedPrompts().has(prompt.id)) {
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"/></svg>
                    Show less
                  } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
                    Show more
                  }
                </button>
              </div>

              <!-- Tags -->
              <div class="mt-3 flex flex-wrap gap-1">
                @for (tag of prompt.tags; track tag) {
                  <span class="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs text-slate-500 dark:text-slate-400">{{ tag }}</span>
                }
              </div>
            </div>

            <!-- Copy action -->
            <div class="border-t border-slate-100 dark:border-slate-800 px-4 py-2.5 flex justify-end">
              <ui-copy-button [content]="prompt.content" />
            </div>
          </div>
        }
      </div>

      @if (filteredPrompts().length === 0) {
        <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-8 text-center text-sm text-slate-500 dark:text-slate-400">
          No prompts in this category.
        </div>
      }
    </div>
  `,
})
export class ToolPromptsComponent {
  readonly tool = input.required<AiTool>();
  protected readonly selectedCategory = signal<string | null>(null);
  protected readonly expandedPrompts = signal<Set<string>>(new Set());

  protected toggleExpand(id: string): void {
    this.expandedPrompts.update(set => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  protected readonly categories = computed(() =>
    [...new Set(this.tool().prompts.map(p => p.category))].sort()
  );

  protected readonly filteredPrompts = computed(() => {
    const cat = this.selectedCategory();
    return cat
      ? this.tool().prompts.filter(p => p.category === cat)
      : this.tool().prompts;
  });
}
