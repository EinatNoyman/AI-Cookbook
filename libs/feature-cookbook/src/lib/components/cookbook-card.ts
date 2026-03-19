import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookbookEntry } from '@bmad-demo/shared-data';
import { CopyButtonComponent } from '@bmad-demo/shared-ui';

const PLATFORM_COLORS: Record<string, string> = {
  claude: 'bg-violet-500',
  copilot: 'bg-sky-500',
  cursor: 'bg-teal-500',
  qodo: 'bg-emerald-500',
};

const PLATFORM_BADGE: Record<string, string> = {
  claude: 'bg-violet-100 text-violet-700 border-violet-300 dark:bg-violet-900/50 dark:text-violet-300 dark:border-violet-700/50',
  copilot: 'bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-900/50 dark:text-sky-300 dark:border-sky-700/50',
  cursor: 'bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-900/50 dark:text-teal-300 dark:border-teal-700/50',
  qodo: 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-700/50',
};

@Component({
  selector: 'app-cookbook-card',
  standalone: true,
  imports: [RouterLink, CopyButtonComponent],
  template: `
    <div class="group relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900
                hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-0.5
                transition-all duration-200 motion-safe:animate-[fade-in_0.2s_ease-out]">
      <!-- Platform accent stripe -->
      <div class="h-1 {{ platformColor(entry().platform) }}"></div>

      <div class="p-4">
        <!-- Header -->
        <div class="flex items-start justify-between gap-2 mb-2">
          <a
            [routerLink]="['/cookbook', entry().id]"
            class="font-medium text-slate-800 dark:text-slate-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors
                   focus:outline-none focus:underline"
          >
            {{ entry().title }}
          </a>
          <span class="shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium {{ badgeClass(entry().platform) }}">
            {{ entry().platform }}
          </span>
        </div>

        <!-- Description -->
        <p class="text-sm text-slate-500 line-clamp-2 mb-3">{{ entry().description }}</p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-1 mb-3">
          @for (tag of entry().tags; track tag) {
            <span class="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs text-slate-500 dark:text-slate-400">{{ tag }}</span>
          }
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between">
          <span class="text-xs text-slate-600">{{ entry().category }}</span>
          <ui-copy-button [content]="entry().copyContent" />
        </div>
      </div>
    </div>
  `,
})
export class CookbookCardComponent {
  readonly entry = input.required<CookbookEntry>();

  protected platformColor(platform: string): string {
    return PLATFORM_COLORS[platform] ?? 'bg-slate-500';
  }

  protected badgeClass(platform: string): string {
    return PLATFORM_BADGE[platform] ?? 'bg-slate-800 text-slate-400 border-slate-700';
  }
}
