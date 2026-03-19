import { Injectable, signal, computed } from '@angular/core';
import { Guideline } from '../models/guideline.model';
import guidelinesData from '../content/guidelines.json';

@Injectable({ providedIn: 'root' })
export class GuidelinesService {
  private readonly _guidelines = signal<Guideline[]>(guidelinesData);
  private readonly _isLoading = signal(false);

  readonly guidelines = this._guidelines.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  readonly topics = computed(() => {
    const topics = new Set(this._guidelines().map(g => g.topic));
    return [...topics].sort();
  });

  readonly guidelinesByTopic = computed(() => {
    const grouped = new Map<string, Guideline[]>();
    for (const g of this._guidelines()) {
      const list = grouped.get(g.topic) ?? [];
      list.push(g);
      grouped.set(g.topic, list);
    }
    return grouped;
  });
}
