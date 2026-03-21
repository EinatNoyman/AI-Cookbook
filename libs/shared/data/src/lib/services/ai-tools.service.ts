import { Injectable, inject, computed } from '@angular/core';
import { AiTool } from '../models/ai-tool.model';
import { LanguageService } from './language.service';
import claudeData from '../content/ai-tools/claude.json';
import copilotData from '../content/ai-tools/copilot.json';
import qodoData from '../content/ai-tools/qodo.json';
import claudeHeData from '../content/ai-tools/claude-he.json';
import copilotHeData from '../content/ai-tools/copilot-he.json';
import qodoHeData from '../content/ai-tools/qodo-he.json';

const EN_TOOLS = [claudeData as AiTool, copilotData as AiTool, qodoData as AiTool];
const HE_TOOLS = [claudeHeData as AiTool, copilotHeData as AiTool, qodoHeData as AiTool];

@Injectable({ providedIn: 'root' })
export class AiToolsService {
  private readonly langService = inject(LanguageService);

  readonly tools = computed<AiTool[]>(() =>
    this.langService.lang() === 'he' ? HE_TOOLS : EN_TOOLS
  );

  getTool(id: string): AiTool | null {
    return this.tools().find(t => t.id === id) ?? null;
  }
}
