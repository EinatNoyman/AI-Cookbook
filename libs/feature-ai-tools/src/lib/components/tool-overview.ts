import { Component, inject, input } from '@angular/core';
import { AiTool, LanguageService } from '@bmad-demo/shared-data';

@Component({
  selector: 'app-tool-overview',
  standalone: true,
  template: `
    <div class="space-y-6 animate-[fade-in_0.2s_ease-out]">

      <!-- Description -->
      <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <h3 class="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{{ langService.t().tabAbout }} {{ tool().name }}</h3>
        <p class="text-slate-600 dark:text-slate-400 leading-relaxed">{{ tool().overview.description }}</p>
      </div>

      <!-- Pros / Cons -->
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h3 class="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-100">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-sm">✓</span>
            {{ langService.t().strengths }}
          </h3>
          <ul class="space-y-2">
            @for (pro of tool().overview.pros; track pro) {
              <li class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span class="mt-1 shrink-0 text-emerald-500 dark:text-emerald-400">•</span>
                <span>{{ pro }}</span>
              </li>
            }
          </ul>
        </div>

        <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h3 class="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-100">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-sm">!</span>
            {{ langService.t().limitations }}
          </h3>
          <ul class="space-y-2">
            @for (con of tool().overview.cons; track con) {
              <li class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span class="mt-1 shrink-0 text-amber-500 dark:text-amber-400">•</span>
                <span>{{ con }}</span>
              </li>
            }
          </ul>
        </div>
      </div>

      <!-- When to Use -->
      <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <h3 class="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">{{ langService.t().whenToUse }} {{ tool().name }}</h3>
        <ul class="grid gap-2 sm:grid-cols-2">
          @for (use of tool().overview.whenToUse; track use) {
            <li class="flex items-start gap-2 rounded-md bg-slate-50 dark:bg-slate-800/50 px-3 py-2 text-sm text-slate-700 dark:text-slate-300">
              <span class="mt-0.5 shrink-0 text-teal-500 dark:text-teal-400">→</span>
              <span>{{ use }}</span>
            </li>
          }
        </ul>
      </div>

      <!-- Strengths (deep-dive areas) -->
      @if (tool().overview.strengths) {
        <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h3 class="mb-5 text-base font-semibold text-slate-900 dark:text-slate-100">
            {{ tool().overview.strengths!.title }}
          </h3>
          <div class="grid gap-4 sm:grid-cols-2">
            @for (area of tool().overview.strengths!.areas; track area.title) {
              <div class="rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4">
                <h4 class="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">{{ area.title }}</h4>
                <ul class="space-y-1.5">
                  @for (detail of area.details; track detail) {
                    <li class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <span class="mt-0.5 shrink-0 text-teal-500 dark:text-teal-400">▸</span>
                      <span>{{ detail }}</span>
                    </li>
                  }
                </ul>
              </div>
            }
          </div>
        </div>
      }

      <!-- Lesser-Known Capabilities -->
      @if (tool().overview.lesserKnownCapabilities) {
        <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h3 class="mb-1 text-base font-semibold text-slate-900 dark:text-slate-100">
            {{ tool().overview.lesserKnownCapabilities!.title }}
          </h3>
          <p class="mb-5 text-xs text-slate-500 dark:text-slate-500">{{ langService.t().hiddenFeatures }}</p>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            @for (item of tool().overview.lesserKnownCapabilities!.items; track item.title) {
              <div class="rounded-lg border border-violet-100 dark:border-violet-900/30 bg-violet-50/50 dark:bg-violet-950/20 p-4">
                <h4 class="mb-2 text-sm font-semibold text-violet-800 dark:text-violet-300">{{ item.title }}</h4>
                <ul class="space-y-1.5">
                  @for (detail of item.details; track detail) {
                    <li class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <span class="mt-0.5 shrink-0 text-violet-400 dark:text-violet-500">✦</span>
                      <span>{{ detail }}</span>
                    </li>
                  }
                </ul>
              </div>
            }
          </div>
        </div>
      }

    </div>
  `,
})
export class ToolOverviewComponent {
  readonly tool = input.required<AiTool>();
  protected readonly langService = inject(LanguageService);
}
