import { Component, input } from '@angular/core';
import { AiTool } from '@bmad-demo/shared-data';

@Component({
  selector: 'app-tool-guidelines',
  standalone: true,
  template: `
    <div class="space-y-6 animate-[fade-in_0.2s_ease-out]">

      <!-- Installation -->
      <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <h3 class="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {{ tool().guidelines.installation.title }}
        </h3>
        <ol class="space-y-6">
          @for (step of tool().guidelines.installation.steps; track step.step) {
            <li class="flex gap-4">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/40 text-sm font-bold text-teal-700 dark:text-teal-300">
                {{ step.step }}
              </span>
              <div class="flex-1 min-w-0">
                <h4 class="mb-1 font-medium text-slate-900 dark:text-slate-100">{{ step.title }}</h4>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ step.description }}</p>
                @if (step.code) {
                  <pre class="mt-3 overflow-x-auto rounded-md bg-slate-950 dark:bg-slate-950 border border-slate-800 p-4 text-xs text-slate-300 font-mono leading-relaxed"><code>{{ step.code }}</code></pre>
                }
              </div>
            </li>
          }
        </ol>
      </div>

      <!-- Configuration -->
      <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <h3 class="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {{ tool().guidelines.configuration.title }}
        </h3>
        <div class="space-y-5">
          @for (tip of tool().guidelines.configuration.tips; track tip.title) {
            <div class="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4">
              <h4 class="mb-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">{{ tip.title }}</h4>
              <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ tip.description }}</p>
              @if (tip.code) {
                <pre class="mt-3 overflow-x-auto rounded-md bg-slate-950 border border-slate-800 p-4 text-xs text-slate-300 font-mono leading-relaxed"><code>{{ tip.code }}</code></pre>
              }
              @if (tip.exampleInstruction) {
                <div class="mt-3 rounded-md border border-blue-100 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-950/30 p-3">
                  <p class="mb-1 text-xs font-medium text-blue-700 dark:text-blue-400">Example instruction:</p>
                  <p class="text-xs text-blue-800 dark:text-blue-300 leading-relaxed italic">{{ tip.exampleInstruction }}</p>
                </div>
              }
            </div>
          }
        </div>
      </div>

      <!-- Best Practices -->
      <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <h3 class="mb-6 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {{ tool().guidelines.bestPractices.title }}
        </h3>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (tip of tool().guidelines.bestPractices.tips; track tip.title) {
            <div class="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4">
              <h4 class="mb-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">{{ tip.title }}</h4>
              <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{{ tip.description }}</p>
            </div>
          }
        </div>
      </div>

      <!-- Keyboard Shortcuts -->
      @if (tool().guidelines.keyboardShortcuts) {
        <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h3 class="mb-5 text-base font-semibold text-slate-900 dark:text-slate-100">
            {{ tool().guidelines.keyboardShortcuts!.title }}
          </h3>
          <div class="grid gap-2 sm:grid-cols-2">
            @for (s of tool().guidelines.keyboardShortcuts!.shortcuts; track s.key) {
              <div class="flex items-start gap-3 rounded-md bg-slate-50 dark:bg-slate-800/50 px-3 py-2">
                <kbd class="shrink-0 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-0.5 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap shadow-sm">
                  {{ s.key }}
                </kbd>
                <span class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{{ s.action }}</span>
              </div>
            }
          </div>
        </div>
      }

      <!-- Claude Code Context Tags -->
      @if (tool().guidelines.claudeCodeContextTags) {
        <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h3 class="mb-5 text-base font-semibold text-slate-900 dark:text-slate-100">
            {{ tool().guidelines.claudeCodeContextTags!.title }}
          </h3>
          <div class="divide-y divide-slate-100 dark:divide-slate-800">
            @for (t of tool().guidelines.claudeCodeContextTags!.tags; track t.tag) {
              <div class="flex items-start gap-3 py-2.5">
                <code class="shrink-0 rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-mono text-teal-700 dark:text-teal-400">{{ t.tag }}</code>
                <span class="text-xs text-slate-600 dark:text-slate-400">{{ t.description }}</span>
              </div>
            }
          </div>
        </div>
      }

      <!-- Copilot Chat Context Tags -->
      @if (tool().guidelines.chatContextTags) {
        <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h3 class="mb-5 text-base font-semibold text-slate-900 dark:text-slate-100">
            {{ tool().guidelines.chatContextTags!.title }}
          </h3>
          <div class="divide-y divide-slate-100 dark:divide-slate-800">
            @for (t of tool().guidelines.chatContextTags!.tags; track t.tag) {
              <div class="flex items-start gap-3 py-2.5">
                <code class="shrink-0 rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-mono text-sky-700 dark:text-sky-400">{{ t.tag }}</code>
                <span class="text-xs text-slate-600 dark:text-slate-400">{{ t.description }}</span>
              </div>
            }
          </div>
        </div>
      }

      <!-- MCP Servers -->
      @if (tool().guidelines.mcpServers) {
        <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h3 class="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
            {{ tool().guidelines.mcpServers!.title }}
          </h3>
          <p class="mb-4 text-sm text-slate-500 dark:text-slate-400">{{ tool().guidelines.mcpServers!.description }}</p>

          <div class="mb-4 rounded-md bg-slate-950 border border-slate-800 px-4 py-3 font-mono text-xs text-slate-300">
            <span class="text-slate-500 select-none">$ </span>{{ tool().guidelines.mcpServers!.setup }}
          </div>

          <p class="mb-4 text-xs text-slate-500 dark:text-slate-500">{{ tool().guidelines.mcpServers!.autoApprove }}</p>

          @if (tool().guidelines.mcpServers!.examples.length) {
            <h4 class="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Example Servers</h4>
            <div class="space-y-3">
              @for (ex of tool().guidelines.mcpServers!.examples; track ex.name) {
                <div class="rounded-lg border border-teal-100 dark:border-teal-900/30 bg-teal-50/50 dark:bg-teal-950/20 p-4">
                  <div class="mb-1 flex items-center gap-2">
                    <span class="text-sm font-semibold text-teal-800 dark:text-teal-300">{{ ex.name }}</span>
                  </div>
                  <p class="mb-2 text-xs text-slate-600 dark:text-slate-400">{{ ex.purpose }}</p>
                  <pre class="overflow-x-auto rounded bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-300 font-mono"><code>{{ ex.install }}</code></pre>
                </div>
              }
            </div>
          }
        </div>
      }

      <!-- Hooks -->
      @if (tool().guidelines.hooks) {
        <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h3 class="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
            {{ tool().guidelines.hooks!.title }}
          </h3>
          <p class="mb-5 text-sm text-slate-500 dark:text-slate-400">{{ tool().guidelines.hooks!.description }}</p>

          <!-- Hook types -->
          <div class="mb-5 grid gap-3 sm:grid-cols-2">
            @for (type of tool().guidelines.hooks!.types; track type.type) {
              <div class="rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4">
                <span class="mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold"
                  [class]="type.type === 'Pre-tool use'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'">
                  {{ type.type }}
                </span>
                <p class="mb-2 text-xs text-slate-600 dark:text-slate-400">{{ type.description }}</p>
                <ul class="space-y-1">
                  @for (uc of type.useCases; track uc) {
                    <li class="text-xs text-slate-500 dark:text-slate-500 before:mr-1.5 before:content-['·']">{{ uc }}</li>
                  }
                </ul>
              </div>
            }
          </div>

          <!-- Recommended hooks -->
          <h4 class="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Recommended Hooks</h4>
          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            @for (hook of tool().guidelines.hooks!.recommendedHooks; track hook.name) {
              <div class="rounded-lg border border-orange-100 dark:border-orange-900/20 bg-orange-50/50 dark:bg-orange-950/10 p-4">
                <div class="mb-2 flex items-start justify-between gap-2">
                  <h5 class="text-xs font-semibold text-slate-800 dark:text-slate-200">{{ hook.name }}</h5>
                  <span class="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium"
                    [class]="hook.type === 'pre-tool'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'">
                    {{ hook.type }}
                  </span>
                </div>
                <p class="mb-1.5 text-xs text-slate-600 dark:text-slate-400">{{ hook.purpose }}</p>
                <p class="text-xs text-orange-700 dark:text-orange-400 font-medium">↳ {{ hook.benefit }}</p>
              </div>
            }
          </div>
        </div>
      }

      <!-- GitHub Integration -->
      @if (tool().guidelines.githubIntegration) {
        <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h3 class="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
            {{ tool().guidelines.githubIntegration!.title }}
          </h3>
          <p class="mb-5 text-sm text-slate-500 dark:text-slate-400">{{ tool().guidelines.githubIntegration!.description }}</p>

          <div class="grid gap-4 sm:grid-cols-3">
            <div class="rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4">
              <h4 class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Setup</h4>
              <ol class="space-y-1.5 list-decimal list-inside">
                @for (step of tool().guidelines.githubIntegration!.setup; track step) {
                  <li class="text-xs text-slate-600 dark:text-slate-400">{{ step }}</li>
                }
              </ol>
            </div>
            <div class="rounded-lg border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
              <h4 class="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-500">Default Actions</h4>
              <ul class="space-y-1.5">
                @for (action of tool().guidelines.githubIntegration!.defaultActions; track action) {
                  <li class="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <span class="mt-0.5 text-emerald-500">✓</span>{{ action }}
                  </li>
                }
              </ul>
            </div>
            <div class="rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4">
              <h4 class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Customization</h4>
              <ul class="space-y-1.5">
                @for (item of tool().guidelines.githubIntegration!.customization; track item) {
                  <li class="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <span class="mt-0.5 shrink-0 text-teal-500">▸</span>{{ item }}
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      }

      <!-- GitLab Workflow -->
      @if (tool().guidelines.gitlabWorkflow) {
        <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h3 class="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
            {{ tool().guidelines.gitlabWorkflow!.title }}
          </h3>
          <p class="mb-5 text-sm text-slate-500 dark:text-slate-400">{{ tool().guidelines.gitlabWorkflow!.description }}</p>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4">
              <h4 class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">What You Can Do</h4>
              <ul class="space-y-1.5">
                @for (cap of tool().guidelines.gitlabWorkflow!.capabilities; track cap) {
                  <li class="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <span class="mt-0.5 shrink-0 text-sky-500">▸</span>{{ cap }}
                  </li>
                }
              </ul>
            </div>
            <div class="rounded-lg border border-sky-100 dark:border-sky-900/30 bg-sky-50/50 dark:bg-sky-950/20 p-4">
              <h4 class="mb-2 text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-500">Example Prompts</h4>
              <ul class="space-y-2">
                @for (prompt of tool().guidelines.gitlabWorkflow!.examplePrompts; track prompt) {
                  <li class="rounded border border-sky-100 dark:border-sky-900/40 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs font-mono text-slate-600 dark:text-slate-300">{{ prompt }}</li>
                }
              </ul>
            </div>
          </div>
        </div>
      }

    </div>
  `,
})
export class ToolGuidelinesComponent {
  readonly tool = input.required<AiTool>();
}
