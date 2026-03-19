import { Component, inject, computed } from '@angular/core';
import { LinksService } from '@bmad-demo/shared-data';
import { SkeletonComponent, EmptyStateComponent } from '@bmad-demo/shared-ui';

const LINKS_SUBTITLES = [
  'Your bookmarks bar wishes it was this organized.',
  'Curated links, zero browser tab guilt.',
  'Everything you need, one click away.',
  'Links so good, you might actually click them.',
];

@Component({
  selector: 'app-links-page',
  standalone: true,
  imports: [SkeletonComponent, EmptyStateComponent],
  template: `
    <section>
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">Developer Links</h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ linksSubtitle }}</p>
      </div>

      @if (linksService.isLoading()) {
        <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          @for (i of [1,2,3,4,5,6]; track i) {
            <ui-skeleton height="120px" />
          }
        </div>
      } @else {
        @for (group of groupedLinks(); track group.category) {
          <div class="mb-8">
            <h2 class="mb-3 text-lg font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-2">
              {{ group.category }}
            </h2>
            <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              @for (link of group.links; track link.id) {
                <a
                  [href]="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group block rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4
                         hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50
                         transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <h3 class="font-medium text-slate-800 dark:text-slate-200 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                    {{ link.title }}
                    <span class="inline-block ml-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </h3>
                  <p class="mt-1 text-sm text-slate-500 line-clamp-2">{{ link.description }}</p>
                  <div class="mt-2 flex flex-wrap gap-1">
                    @for (tag of link.tags; track tag) {
                      <span class="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs text-slate-500 dark:text-slate-400">{{ tag }}</span>
                    }
                  </div>
                </a>
              }
            </div>
          </div>
        } @empty {
          <ui-empty-state emoji="🔗" subtitle="No links match. Time to bookmark the void." />
        }
      }
    </section>
  `,
})
export class LinksPage {
  protected readonly linksService = inject(LinksService);
  protected readonly linksSubtitle = LINKS_SUBTITLES[Math.floor(Math.random() * LINKS_SUBTITLES.length)];

  protected readonly groupedLinks = computed(() => {
    const map = this.linksService.linksByCategory();
    return [...map.entries()].map(([category, links]) => ({ category, links }));
  });
}
