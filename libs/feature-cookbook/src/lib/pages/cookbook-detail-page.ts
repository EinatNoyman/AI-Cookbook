import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CookbookService, LanguageService } from '@bmad-demo/shared-data';
import { CopyButtonComponent, EmptyStateComponent } from '@bmad-demo/shared-ui';
import { ReactionBarComponent } from '../components/reaction-bar';
import { CommentSectionComponent } from '../components/comment-section';

const PLATFORM_ACCENT: Record<string, string> = {
  claude: 'border-violet-500',
  copilot: 'border-sky-500',
  cursor: 'border-teal-500',
  qodo: 'border-emerald-500',
};

@Component({
  selector: 'app-cookbook-detail-page',
  standalone: true,
  imports: [RouterLink, CopyButtonComponent, EmptyStateComponent, ReactionBarComponent, CommentSectionComponent],
  template: `
    @if (entry(); as entry) {
      <div class="max-w-3xl">
        <!-- Back -->
        <a routerLink="/cookbook"
           class="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors
                  focus:outline-none focus:underline">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          {{ langService.t().backToCookbook }}
        </a>

        <!-- Header -->
        <div class="border-l-4 pl-4 mb-6 {{ accentClass(entry.platform) }}">
          <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ entry.title }}</h1>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ entry.description }}</p>
          <div class="mt-2 flex items-center gap-2">
            <span class="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">{{ entry.platform }}</span>
            <span class="text-xs text-slate-600">{{ entry.category }}</span>
          </div>
        </div>

        <!-- Copy Content -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ langService.t().promptSection }}</h2>
            <ui-copy-button [content]="entry.copyContent" />
          </div>
          <pre class="overflow-x-auto rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-4
                      text-sm text-slate-700 dark:text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">{{ entry.copyContent }}</pre>
        </div>

        <!-- Usage -->
        <div class="mb-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-4">
          <h2 class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{{ langService.t().howToUse }}</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ entry.usage }}</p>
        </div>

        <!-- Tags -->
        <div class="mb-6 flex flex-wrap gap-1">
          @for (tag of entry.tags; track tag) {
            <span class="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs text-slate-500 dark:text-slate-400">{{ tag }}</span>
          }
        </div>

        <!-- Reactions -->
        <div class="mb-6">
          <app-reaction-bar [entryId]="entry.id" />
        </div>

        <!-- Comments -->
        <app-comment-section [entryId]="entry.id" />
      </div>
    } @else {
      <ui-empty-state emoji="🤷" />
    }
  `,
})
export class CookbookDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly cookbookService = inject(CookbookService);
  protected readonly langService = inject(LanguageService);

  private readonly entryId = toSignal(
    this.route.paramMap.pipe(map(p => p.get('id') ?? ''))
  );

  protected readonly entry = computed(() => {
    const id = this.entryId();
    return id ? this.cookbookService.getEntry(id) : null;
  });

  protected accentClass(platform: string): string {
    return PLATFORM_ACCENT[platform] ?? 'border-slate-500';
  }
}
