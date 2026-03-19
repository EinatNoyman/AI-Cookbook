export type AiToolId = 'claude' | 'copilot' | 'qodo';

export interface ToolStrengthArea {
  title: string;
  details: string[];
}

export interface LesserKnownItem {
  title: string;
  details: string[];
}

export interface AiToolOverview {
  description: string;
  pros: string[];
  cons: string[];
  whenToUse: string[];
  strengths?: {
    title: string;
    areas: ToolStrengthArea[];
  };
  lesserKnownCapabilities?: {
    title: string;
    items: LesserKnownItem[];
  };
}

export interface GuidelineStep {
  step: number;
  title: string;
  description: string;
  code: string | null;
}

export interface GuidelineTip {
  title: string;
  description: string;
  code?: string | null;
  exampleInstruction?: string;
}

export interface KeyboardShortcut {
  key: string;
  action: string;
}

export interface ContextTag {
  tag: string;
  description: string;
}

export interface McpServerExample {
  name: string;
  purpose: string;
  install: string;
}

export interface HookType {
  type: string;
  description: string;
  useCases: string[];
}

export interface RecommendedHook {
  name: string;
  type: string;
  purpose: string;
  benefit: string;
}

export interface AiToolGuidelines {
  installation: {
    title: string;
    steps: GuidelineStep[];
  };
  configuration: {
    title: string;
    tips: GuidelineTip[];
  };
  bestPractices: {
    title: string;
    tips: GuidelineTip[];
  };
  keyboardShortcuts?: {
    title: string;
    shortcuts: KeyboardShortcut[];
  };
  claudeCodeContextTags?: {
    title: string;
    tags: ContextTag[];
  };
  chatContextTags?: {
    title: string;
    tags: ContextTag[];
  };
  mcpServers?: {
    title: string;
    description: string;
    setup: string;
    autoApprove: string;
    examples: McpServerExample[];
  };
  hooks?: {
    title: string;
    description: string;
    types: HookType[];
    configuration: {
      location: string;
      structure: string;
      exitCodes: Record<string, string>;
    };
    recommendedHooks: RecommendedHook[];
  };
  githubIntegration?: {
    title: string;
    description: string;
    setup: string[];
    defaultActions: string[];
    customization: string[];
  };
  gitlabWorkflow?: {
    title: string;
    description: string;
    capabilities: string[];
    examplePrompts: string[];
  };
}

export interface AiToolPrompt {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  tags: string[];
}

export interface AiTool {
  id: AiToolId;
  name: string;
  icon: string;
  tagline: string;
  overview: AiToolOverview;
  guidelines: AiToolGuidelines;
  prompts: AiToolPrompt[];
}
