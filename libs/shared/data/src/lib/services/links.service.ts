import { Injectable, inject, computed } from '@angular/core';
import { Link } from '../models/link.model';
import { LanguageService } from './language.service';
import linksData from '../content/links.json';
import linksHeData from '../content/links-he.json';

@Injectable({ providedIn: 'root' })
export class LinksService {
  private readonly langService = inject(LanguageService);
  private readonly _isLoading = computed(() => false);

  readonly links = computed<Link[]>(() =>
    this.langService.lang() === 'he' ? linksHeData : linksData
  );
  readonly isLoading = this._isLoading;

  readonly categories = computed(() => {
    const cats = new Set(this.links().map(l => l.category));
    return [...cats].sort();
  });

  readonly linksByCategory = computed(() => {
    const grouped = new Map<string, Link[]>();
    for (const link of this.links()) {
      const list = grouped.get(link.category) ?? [];
      list.push(link);
      grouped.set(link.category, list);
    }
    return grouped;
  });
}
