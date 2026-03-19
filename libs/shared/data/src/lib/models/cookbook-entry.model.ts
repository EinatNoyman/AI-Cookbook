export type Platform = 'claude' | 'copilot' | 'cursor' | 'qodo';

export interface CookbookEntry {
  id: string;
  title: string;
  description: string;
  platform: Platform;
  category: string;
  copyContent: string;
  language: string;
  usage: string;
  tags: string[];
}

export interface Reaction {
  entryId: string;
  emoji: string;
  count: number;
  userReacted: boolean;
}

export interface Comment {
  id: string;
  entryId: string;
  text: string;
  timestamp: number;
}
