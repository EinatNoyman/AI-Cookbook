import { Component, input, inject, signal, OnInit } from '@angular/core';
import { StorageService, Reaction } from '@bmad-demo/shared-data';

const EMOJIS = ['👍', '🔥', '💡', '❤️'];

@Component({
  selector: 'app-reaction-bar',
  standalone: true,
  template: `
    <div class="flex items-center gap-2">
      @for (emoji of emojis; track emoji) {
        <button
          (click)="toggleReaction(emoji)"
          class="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-sm transition-colors
                 active:scale-95 motion-safe:transition-transform
                 focus:outline-none focus:ring-2 focus:ring-teal-500
                 {{ isReacted(emoji) ? 'border-teal-600 bg-teal-100 dark:bg-teal-950/50' : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800' }}"
          [attr.aria-label]="emoji + ' reaction, ' + getCount(emoji) + ' reactions'"
        >
          <span>{{ emoji }}</span>
          @if (getCount(emoji) > 0) {
            <span class="text-xs text-slate-500 dark:text-slate-400">{{ getCount(emoji) }}</span>
          }
        </button>
      }
    </div>
  `,
})
export class ReactionBarComponent implements OnInit {
  readonly entryId = input.required<string>();
  private readonly storage = inject(StorageService);
  protected readonly emojis = EMOJIS;
  protected readonly reactions = signal<Reaction[]>([]);

  ngOnInit(): void {
    this.reactions.set(this.storage.getReactions(this.entryId()));
  }

  protected toggleReaction(emoji: string): void {
    const updated = this.storage.toggleReaction(this.entryId(), emoji);
    this.reactions.set(updated);
  }

  protected getCount(emoji: string): number {
    return this.reactions().find(r => r.emoji === emoji)?.count ?? 0;
  }

  protected isReacted(emoji: string): boolean {
    return this.reactions().find(r => r.emoji === emoji)?.userReacted ?? false;
  }
}
