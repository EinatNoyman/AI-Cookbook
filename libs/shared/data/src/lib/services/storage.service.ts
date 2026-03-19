import { Injectable, signal } from '@angular/core';
import { Reaction, Comment } from '../models/cookbook-entry.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly REACTIONS_KEY = 'bmad-reactions';
  private readonly COMMENTS_KEY = 'bmad-comments';
  private readonly THEME_KEY = 'bmad-theme';
  private readonly TOOL_KEY = 'bmad-selected-tool';

  getTheme(): 'dark' | 'light' {
    const stored = localStorage.getItem(this.THEME_KEY) as 'dark' | 'light' | null;
    if (stored) return stored;
    // Detect system preference for first-time visitors
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  setTheme(theme: 'dark' | 'light'): void {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  getSelectedTool(): string {
    return localStorage.getItem(this.TOOL_KEY) ?? 'all';
  }

  setSelectedTool(tool: string): void {
    localStorage.setItem(this.TOOL_KEY, tool);
  }

  getReactions(entryId: string): Reaction[] {
    const all = this.loadJson<Record<string, Reaction[]>>(this.REACTIONS_KEY) ?? {};
    return all[entryId] ?? [];
  }

  toggleReaction(entryId: string, emoji: string): Reaction[] {
    const all = this.loadJson<Record<string, Reaction[]>>(this.REACTIONS_KEY) ?? {};
    const reactions = all[entryId] ?? [];
    const existing = reactions.find(r => r.emoji === emoji);

    if (existing) {
      existing.userReacted = !existing.userReacted;
      existing.count += existing.userReacted ? 1 : -1;
    } else {
      reactions.push({ entryId, emoji, count: 1, userReacted: true });
    }

    all[entryId] = reactions;
    this.saveJson(this.REACTIONS_KEY, all);
    return reactions;
  }

  getComments(entryId: string): Comment[] {
    const all = this.loadJson<Record<string, Comment[]>>(this.COMMENTS_KEY) ?? {};
    return (all[entryId] ?? []).sort((a, b) => b.timestamp - a.timestamp);
  }

  addComment(entryId: string, text: string): Comment[] {
    const all = this.loadJson<Record<string, Comment[]>>(this.COMMENTS_KEY) ?? {};
    const comments = all[entryId] ?? [];
    comments.push({
      id: crypto.randomUUID(),
      entryId,
      text,
      timestamp: Date.now(),
    });
    all[entryId] = comments;
    this.saveJson(this.COMMENTS_KEY, all);
    return this.getComments(entryId);
  }

  private loadJson<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try { return JSON.parse(raw); }
    catch { return null; }
  }

  private saveJson(key: string, data: unknown): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
