import { Component, inject } from '@angular/core';
import { CookbookService, LanguageService, Platform, StorageService } from '@bmad-demo/shared-data';

const TOOL_COLORS: Record<string, string> = {
  all: 'border-slate-500 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
  claude: 'border-violet-500 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950',
  copilot: 'border-sky-500 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950',
  cursor: 'border-teal-500 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950',
  qodo: 'border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950',
};

const TOOL_ACTIVE: Record<string, string> = {
  all: 'bg-slate-100 dark:bg-slate-800 border-slate-400 text-slate-900 dark:text-slate-100',
  claude: 'bg-violet-100 dark:bg-violet-950 border-violet-400 text-violet-800 dark:text-violet-200',
  copilot: 'bg-sky-100 dark:bg-sky-950 border-sky-400 text-sky-800 dark:text-sky-200',
  cursor: 'bg-teal-100 dark:bg-teal-950 border-teal-400 text-teal-800 dark:text-teal-200',
  qodo: 'bg-emerald-100 dark:bg-emerald-950 border-emerald-400 text-emerald-800 dark:text-emerald-200',
};

@Component({
  selector: 'app-tool-selector',
  standalone: true,
  template: `
    <div class="flex flex-wrap gap-2" role="tablist" [attr.aria-label]="langService.t().filterByPlatform">
      @for (tool of tools; track tool) {
        <button
          role="tab"
          [attr.aria-selected]="cookbookService.selectedTool() === tool"
          (click)="selectTool(tool)"
          class="flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors
                 focus:outline-none focus:ring-2 focus:ring-teal-500
                 {{ cookbookService.selectedTool() === tool ? activeColor(tool) : color(tool) }}"
        >
          @if (tool !== 'all' && tool !== 'cursor') {
            <img [src]="'icons/' + tool + '.png'" alt="" class="h-4 w-4 object-contain" aria-hidden="true" />
          }
          {{ tool === 'all' ? langService.t().allTools : capitalize(tool) }}
        </button>
      }
    </div>
  `,
})
export class ToolSelectorComponent {
  protected readonly cookbookService = inject(CookbookService);
  protected readonly langService = inject(LanguageService);
  private readonly storage = inject(StorageService);

  protected readonly tools: Array<Platform | 'all'> = ['all', 'claude', 'copilot', 'cursor', 'qodo'];

  constructor() {
    const saved = this.storage.getSelectedTool();
    if (this.tools.includes(saved as Platform | 'all')) {
      this.cookbookService.selectedTool.set(saved as Platform | 'all');
    }
  }

  protected selectTool(tool: Platform | 'all'): void {
    this.cookbookService.selectedTool.set(tool);
    this.storage.setSelectedTool(tool);
  }

  protected color(tool: string): string {
    return TOOL_COLORS[tool] ?? TOOL_COLORS['all'];
  }

  protected activeColor(tool: string): string {
    return TOOL_ACTIVE[tool] ?? TOOL_ACTIVE['all'];
  }

  protected capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
