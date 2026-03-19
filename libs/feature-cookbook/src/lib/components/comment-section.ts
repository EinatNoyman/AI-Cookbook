import { Component, input, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService, Comment } from '@bmad-demo/shared-data';

const EMPTY_COMMENT_MESSAGES = [
  'No comments yet. Be the first!',
  'Crickets... Someone break the silence!',
  'This space is begging for your hot take.',
];

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="space-y-4">
      <h4 class="text-sm font-semibold text-slate-700 dark:text-slate-300">Comments</h4>

      <!-- Comment Input -->
      <form (ngSubmit)="submitComment()" class="flex gap-2">
        <input
          [(ngModel)]="newComment"
          name="comment"
          type="text"
          placeholder="Share a tip or thought..."
          class="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-2
                 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-500
                 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          aria-label="Add a comment"
        />
        <button
          type="submit"
          [disabled]="!newComment.trim()"
          class="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white
                 hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed
                 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Post
        </button>
      </form>

      <!-- Comments List -->
      @for (comment of comments(); track comment.id) {
        <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-3">
          <p class="text-sm text-slate-700 dark:text-slate-300">{{ comment.text }}</p>
          <time class="mt-1 block text-xs text-slate-500 dark:text-slate-600">{{ formatTime(comment.timestamp) }}</time>
        </div>
      } @empty {
        <p class="text-sm text-slate-600 italic">{{ emptyMessage }}</p>
      }
    </div>
  `,
})
export class CommentSectionComponent implements OnInit {
  readonly entryId = input.required<string>();
  private readonly storage = inject(StorageService);
  protected readonly comments = signal<Comment[]>([]);
  protected newComment = '';
  protected readonly emptyMessage = EMPTY_COMMENT_MESSAGES[Math.floor(Math.random() * EMPTY_COMMENT_MESSAGES.length)];

  ngOnInit(): void {
    this.comments.set(this.storage.getComments(this.entryId()));
  }

  protected submitComment(): void {
    const text = this.newComment.trim();
    if (!text) return;
    const updated = this.storage.addComment(this.entryId(), text);
    this.comments.set(updated);
    this.newComment = '';
  }

  protected formatTime(ts: number): string {
    return new Date(ts).toLocaleString();
  }
}
