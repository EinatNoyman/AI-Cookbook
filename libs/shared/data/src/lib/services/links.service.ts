import { Injectable, signal, computed } from '@angular/core';
import { Link } from '../models/link.model';
import linksData from '../content/links.json';

@Injectable({ providedIn: 'root' })
export class LinksService {
  private readonly _links = signal<Link[]>(linksData);
  private readonly _isLoading = signal(false);

  readonly links = this._links.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  readonly categories = computed(() => {
    const cats = new Set(this._links().map(l => l.category));
    return [...cats].sort();
  });

  readonly linksByCategory = computed(() => {
    const grouped = new Map<string, Link[]>();
    for (const link of this._links()) {
      const list = grouped.get(link.category) ?? [];
      list.push(link);
      grouped.set(link.category, list);
    }
    return grouped;
  });
}
