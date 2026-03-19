import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-skeleton',
  standalone: true,
  template: `
    <div
      class="animate-pulse rounded-lg bg-slate-300/50 dark:bg-slate-700/50"
      [class]="className()"
      [style.height]="height()"
      [style.width]="width()"
      role="status"
      aria-label="Loading..."
    ></div>
  `,
  styles: [`
    @media (prefers-reduced-motion: reduce) {
      .animate-pulse { animation: none; opacity: 0.5; }
    }
  `],
})
export class SkeletonComponent {
  readonly height = input('1rem');
  readonly width = input('100%');
  readonly className = input('');
}
