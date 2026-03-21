import { Component, computed, inject, signal } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
import { AiTool, AiToolId, AiToolsService, LanguageService } from '@bmad-demo/shared-data';
import { ToolOverviewComponent } from '../components/tool-overview';
import { ToolGuidelinesComponent } from '../components/tool-guidelines';
import { ToolPromptsComponent } from '../components/tool-prompts';

type Section = 'prompts' | 'about' | 'setup';

// ── Animation ──────────────────────────────────────────────────────────────

const panelFade = trigger('panelFade', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(10px)' }),
    animate('220ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

const sectionFade = trigger('sectionFade', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(6px)' }),
    animate('180ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

// ── Color maps ──────────────────────────────────────────────────────────────

const TOOL_PILL_ACTIVE: Record<AiToolId, string> = {
  claude:  'bg-orange-500 text-white shadow-sm shadow-orange-200 dark:shadow-orange-900/40',
  copilot: 'bg-blue-500   text-white shadow-sm shadow-blue-200   dark:shadow-blue-900/40',
  qodo:    'bg-purple-500 text-white shadow-sm shadow-purple-200 dark:shadow-purple-900/40',
};

const TOOL_PILL_INACTIVE =
  'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/8';

const SECTION_PILL_ACTIVE: Record<AiToolId, string> = {
  claude:  'bg-orange-100 text-orange-700 dark:bg-orange-900/35 dark:text-orange-300',
  copilot: 'bg-blue-100   text-blue-700   dark:bg-blue-900/35   dark:text-blue-300',
  qodo:    'bg-purple-100 text-purple-700 dark:bg-purple-900/35 dark:text-purple-300',
};

const SECTION_PILL_INACTIVE =
  'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5';

const TOOL_HEADER_ACCENT: Record<AiToolId, string> = {
  claude:  'border-l-4 border-l-orange-500',
  copilot: 'border-l-4 border-l-blue-500',
  qodo:    'border-l-4 border-l-purple-500',
};

const TOOL_TAGLINE: Record<AiToolId, string> = {
  claude:  'text-orange-600  dark:text-orange-400',
  copilot: 'text-blue-600    dark:text-blue-400',
  qodo:    'text-purple-600  dark:text-purple-400',
};

const TOOL_ICON_RING: Record<AiToolId, string> = {
  claude:  'ring-2 ring-orange-300 dark:ring-orange-700',
  copilot: 'ring-2 ring-blue-300   dark:ring-blue-700',
  qodo:    'ring-2 ring-purple-300 dark:ring-purple-700',
};


@Component({
  selector: 'app-ai-tools-page',
  standalone: true,
  imports: [ToolOverviewComponent, ToolGuidelinesComponent, ToolPromptsComponent],
  animations: [panelFade, sectionFade],
  template: `
    <section>
      <!-- Page header -->
      <div class="mb-5">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ langService.t().cookbookTitle }}</h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {{ langService.t().aiToolsSubtitle }}
        </p>
      </div>

      <!-- Tool tabs (pill style) -->
      <div class="mb-0 flex items-center gap-2 rounded-t-xl border border-b-0 border-slate-200 dark:border-slate-800
                  bg-slate-100/70 dark:bg-slate-900/60 px-4 py-3"
           role="tablist" aria-label="Select AI tool">
        @for (tool of aiToolsService.tools(); track tool.id) {
          <button
            role="tab"
            [attr.aria-selected]="activeTool() === tool.id"
            [attr.aria-controls]="'panel-' + tool.id"
            (click)="selectTool(tool.id)"
            class="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium
                   transition-all duration-200 ease-out
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            [class]="activeTool() === tool.id ? toolPillActive(tool.id) : toolPillInactive"
          >
            <!-- Tool icon -->
            <span
              class="flex h-5 w-5 items-center justify-center rounded-full
                     transition-all duration-200"
              [class]="activeTool() === tool.id
                ? 'bg-white/20'
                : 'bg-slate-200 dark:bg-slate-700'"
            >
              <img [src]="'icons/' + tool.id + '.png'" [alt]="tool.name" class="h-4 w-4 object-contain" />
            </span>
            <span>{{ tool.name }}</span>
          </button>
        }
      </div>

      <!-- Tool panel -->
      @for (tool of aiToolsService.tools(); track tool.id) {
        @if (tool.id === activeTool()) {
          <div
            @panelFade
            [id]="'panel-' + tool.id"
            role="tabpanel"
            [attr.aria-label]="tool.name"
            class="rounded-b-xl rounded-tr-xl border border-slate-200 dark:border-slate-800
                   bg-slate-50 dark:bg-slate-950"
          >
            <!-- Tool header -->
            <div
              class="flex items-center justify-between gap-4 rounded-tr-xl border-b
                     border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4
                     {{ toolHeaderAccent(tool.id) }}"
            >
              <div class="flex items-center gap-3">
                <!-- Large icon bubble -->
                <span
                  class="flex h-10 w-10 items-center justify-center rounded-xl
                         {{ toolPillActive(tool.id) }} {{ toolIconRing(tool.id) }}"
                >
                  <img [src]="'icons/' + tool.id + '.png'" [alt]="tool.name" class="h-7 w-7 object-contain" />
                </span>
                <div>
                  <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100">{{ tool.name }}</h2>
                  <p class="text-xs {{ toolTagline(tool.id) }}">{{ tool.tagline }}</p>
                </div>
              </div>
              <!-- Prompt count badge -->
              <span class="hidden sm:inline rounded-full border border-slate-200 dark:border-slate-700
                           bg-slate-50 dark:bg-slate-800 px-3 py-0.5 text-xs text-slate-500 dark:text-slate-400">
                {{ tool.prompts.length }} {{ langService.t().promptCount }}
              </span>
            </div>

            <!-- Section tabs (pill style) -->
            <div
              class="flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800
                     bg-white dark:bg-slate-900 px-5 py-2.5"
              role="tablist"
              [attr.aria-label]="tool.name + ' sections'"
            >
              <button
                role="tab"
                [attr.aria-selected]="activeSection() === 'prompts'"
                (click)="activeSection.set('prompts')"
                class="rounded-full px-3 py-1 text-xs font-medium
                       transition-all duration-200 ease-out
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                [class]="activeSection() === 'prompts' ? sectionPillActive(tool.id) : sectionPillInactive"
              >{{ langService.t().tabPrompts }}</button>
              <button
                role="tab"
                [attr.aria-selected]="activeSection() === 'about'"
                (click)="activeSection.set('about')"
                class="rounded-full px-3 py-1 text-xs font-medium
                       transition-all duration-200 ease-out
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                [class]="activeSection() === 'about' ? sectionPillActive(tool.id) : sectionPillInactive"
              >{{ langService.t().tabAbout }}</button>
              <button
                role="tab"
                [attr.aria-selected]="activeSection() === 'setup'"
                (click)="activeSection.set('setup')"
                class="rounded-full px-3 py-1 text-xs font-medium
                       transition-all duration-200 ease-out
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                [class]="activeSection() === 'setup' ? sectionPillActive(tool.id) : sectionPillInactive"
              >{{ langService.t().tabSetup }}</button>
            </div>

            <!-- Section content -->
            <div class="p-6">
              @if (activeSection() === 'prompts') {
                <div @sectionFade>
                  <app-tool-prompts [tool]="tool" />
                </div>
              }
              @if (activeSection() === 'about') {
                <div @sectionFade>
                  <app-tool-overview [tool]="tool" />
                </div>
              }
              @if (activeSection() === 'setup') {
                <div @sectionFade>
                  <app-tool-guidelines [tool]="tool" />
                </div>
              }
            </div>
          </div>
        }
      }
    </section>
  `,
})
export class AiToolsPage {
  protected readonly aiToolsService = inject(AiToolsService);
  protected readonly langService = inject(LanguageService);
  protected readonly activeTool = signal<AiToolId>('claude');
  protected readonly activeSection = signal<Section>('prompts');
  protected readonly toolPillInactive = TOOL_PILL_INACTIVE;
  protected readonly sectionPillInactive = SECTION_PILL_INACTIVE;

  protected readonly currentTool = computed<AiTool | null>(() =>
    this.aiToolsService.getTool(this.activeTool())
  );

  protected toolPillActive(id: AiToolId): string { return TOOL_PILL_ACTIVE[id]; }
  protected sectionPillActive(id: AiToolId): string { return SECTION_PILL_ACTIVE[id]; }
  protected toolHeaderAccent(id: AiToolId): string { return TOOL_HEADER_ACCENT[id]; }
  protected toolTagline(id: AiToolId): string { return TOOL_TAGLINE[id]; }
  protected toolIconRing(id: AiToolId): string { return TOOL_ICON_RING[id]; }
  protected selectTool(id: AiToolId): void {
    this.activeTool.set(id);
    this.activeSection.set('prompts');
  }
}
