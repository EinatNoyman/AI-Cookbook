import { Injectable, signal, computed } from '@angular/core';
import { CookbookEntry, Platform } from '../models/cookbook-entry.model';
import entriesData from '../content/cookbook-entries.json';

@Injectable({ providedIn: 'root' })
export class CookbookService {
  private readonly _entries = signal<CookbookEntry[]>(entriesData as CookbookEntry[]);
  private readonly _isLoading = signal(false);

  readonly selectedTool = signal<Platform | 'all'>('all');
  readonly selectedCategory = signal<string | null>(null);
  readonly searchQuery = signal('');

  readonly entries = this._entries.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  readonly platforms = computed(() => {
    const p = new Set(this._entries().map(e => e.platform));
    return [...p].sort();
  });

  readonly categories = computed(() => {
    const cats = new Set(this._entries().map(e => e.category));
    return [...cats].sort();
  });

  readonly filteredEntries = computed(() => {
    let result = this._entries();

    const tool = this.selectedTool();
    if (tool !== 'all') {
      result = result.filter(e => e.platform === tool);
    }

    const cat = this.selectedCategory();
    if (cat) {
      result = result.filter(e => e.category === cat);
    }

    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return result;
  });

  getEntry(id: string) {
    return this._entries().find(e => e.id === id) ?? null;
  }
}
