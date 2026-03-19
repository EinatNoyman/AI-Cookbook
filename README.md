# 🧑‍🍳 AI Cookbook

> Your team's go-to prompt library — built by the Frontend Guild, for the Frontend Guild.

One-click prompts for the three AI tools in our daily workflow:

| Tool | What it does |
|------|-------------|
| **Claude Code** | Agentic CLI coding assistant |
| **Microsoft Copilot** | In-editor AI completions & chat |
| **Qodo** | AI-powered code review & test generation |

Prompts are organized by tool and use case, supplemented by team guidelines and curated learning resources.

---

## ⚙️ Tech Stack

| | |
|---|---|
| **Framework** | Angular 21.1 |
| **Monorepo** | Nx 22.5 |
| **Build** | Vite 7 + `@analogjs/vite-plugin-angular` |
| **Styling** | Tailwind CSS 4.2 |
| **Tests** | Vitest 4 (unit) · Playwright (E2E) |
| **Language** | TypeScript 5.9 |

---

## 📁 Project Structure

```
apps/
  developer-hub/          # Main SPA (Nx project: ai-cookbook)
libs/
  feature-ai-tools/       # Cookbook feature (lazy-loaded)
  feature-guidelines/     # Guidelines feature (lazy-loaded)
  feature-links/          # Links feature (lazy-loaded)
  shared/
    data/                 # Services, models, static JSON content
    ui/                   # Shared components
    styles/               # Design tokens
```

---

## 🤖 How This Was Built

An end-to-end AI-driven workflow — planned with [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD), implemented with [Claude Code](https://code.claude.com/docs).

1. **BMAD** produced the PRD, architecture, and story breakdown → `_bmad-output/planning-artifacts/`
2. **Claude Code** executed implementation story by story, using those artifacts as context

---

## 🚀 Getting Started

```bash
npm install
npx nx serve ai-cookbook        # → http://localhost:4200
npx nx test ai-cookbook          # unit tests
npx nx run-many -t test         # test all projects
```