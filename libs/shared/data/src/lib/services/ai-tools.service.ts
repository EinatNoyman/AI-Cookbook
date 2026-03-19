import { Injectable, signal } from '@angular/core';
import { AiTool } from '../models/ai-tool.model';
import claudeData from '../content/ai-tools/claude.json';
import copilotData from '../content/ai-tools/copilot.json';
import qodoData from '../content/ai-tools/qodo.json';

@Injectable({ providedIn: 'root' })
export class AiToolsService {
  private readonly _tools = signal<AiTool[]>([
    claudeData as AiTool,
    copilotData as AiTool,
    qodoData as AiTool,
  ]);

  readonly tools = this._tools.asReadonly();

  getTool(id: string): AiTool | null {
    return this._tools().find(t => t.id === id) ?? null;
  }
}
