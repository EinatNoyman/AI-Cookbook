import { Component, inject, computed } from '@angular/core';
import { GuidelinesService, LanguageService } from '@bmad-demo/shared-data';
import { SkeletonComponent, EmptyStateComponent } from '@bmad-demo/shared-ui';

@Component({
  selector: 'app-guidelines-page',
  standalone: true,
  imports: [SkeletonComponent, EmptyStateComponent],
  template: `
    <section dir="ltr">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ langService.t().guidelinesTitle }}</h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ guidelinesSubtitle() }}</p>
      </div>

      @if (guidelinesService.isLoading()) {
        <div class="space-y-4">
          @for (i of [1,2,3]; track i) {
            <ui-skeleton height="80px" />
          }
        </div>
      } @else {
        @for (group of groupedGuidelines(); track group.topic) {
          <div class="mb-6">
            <h2 class="mb-3 text-lg font-semibold text-slate-700 dark:text-slate-300">{{ group.topic }}</h2>
            <div class="space-y-2">
              @for (guideline of group.guidelines; track guideline.id) {
                <details
                  class="group rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors
                         hover:border-slate-300 dark:hover:border-slate-700 open:border-slate-300 dark:open:border-slate-700"
                >
                  <summary
                    class="flex cursor-pointer items-center justify-between p-4
                           text-sm font-medium text-slate-800 dark:text-slate-200
                           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset rounded-lg"
                  >
                    <span>{{ guideline.title }}</span>
                    <svg class="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </summary>
                  <div class="border-t border-slate-200 dark:border-slate-800 p-4">
                    <div
                      class="prose prose-sm dark:prose-invert max-w-none
                             prose-headings:text-slate-800 dark:prose-headings:text-slate-200 prose-p:text-slate-600 dark:prose-p:text-slate-400
                             prose-code:text-teal-600 dark:prose-code:text-violet-400 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded
                             prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-300 dark:prose-pre:border-slate-700
                             prose-li:text-slate-600 dark:prose-li:text-slate-400 prose-strong:text-slate-700 dark:prose-strong:text-slate-300"
                      [innerHTML]="formatContent(guideline.content)"
                    ></div>
                    <div class="mt-3 flex flex-wrap gap-1">
                      @for (tag of guideline.tags; track tag) {
                        <span class="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs text-slate-500 dark:text-slate-400">{{ tag }}</span>
                      }
                    </div>
                  </div>
                </details>
              }
            </div>
          </div>
        } @empty {
          <ui-empty-state emoji="📐" [subtitle]="langService.t().noGuidelines" />
        }
      }
    </section>
  `,
})
export class GuidelinesPage {
  protected readonly guidelinesService = inject(GuidelinesService);
  protected readonly langService = inject(LanguageService);
  private readonly subtitleIndex = Math.floor(Math.random() * 4);

  protected readonly guidelinesSubtitle = computed(() =>
    this.langService.t().guidelinesSubtitles[this.subtitleIndex]
  );

  protected readonly groupedGuidelines = computed(() => {
    const map = this.guidelinesService.guidelinesByTopic();
    return [...map.entries()].map(([topic, guidelines]) => ({ topic, guidelines }));
  });

  protected formatContent(markdown: string): string {
    // Simple markdown-to-HTML conversion for headings, code blocks, lists, bold
    return markdown
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/^- \[[ x]\] (.+)$/gm, '<li>$1</li>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[hpul])/gm, '')
      .replace(/\n/g, '<br>');
  }
}
