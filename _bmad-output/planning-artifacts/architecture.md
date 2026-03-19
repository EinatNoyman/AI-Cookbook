---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: ['_bmad-output/planning-artifacts/prd.md', '_bmad-output/planning-artifacts/product-brief-bmad-demo-2026-02-21.md', '_bmad-output/planning-artifacts/ux-design-specification.md']
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-03-02'
project_name: 'bmad-demo'
user_name: 'Einat'
date: '2026-03-01'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
25 FRs across 8 capability areas:
- **Navigation & Hub Structure** (FR1-3): SPA shell with clear nav between Links, Guidelines, AI Cookbook. No auth for MVP.
- **Links Management** (FR4-6): Curated links organized by category, one-click open in new tab.
- **Guidelines & Standards** (FR7-9): Structured guidelines by topic, full content readable in-hub.
- **AI Cookbook** (FR10-14): Browse by platform (Claude/Copilot/Cursor/Qodo) and category. View full entry content. One-click copy to clipboard.
- **Content Interaction** (FR15-17): Scannable layouts, action feedback, keyboard navigation.
- **UX Personality** (FR18-20): Witty microcopy, playful transitions, personality-driven empty states.
- **Feedback & Reactions** (FR21-23): Reactions and comments on cookbook entries, viewable by others.
- **Content Management** (FR24-25): Update content via static JSON/config files, no backend.

**Non-Functional Requirements:**
- Performance: LCP < 2.5s, navigation < 300ms, copy < 100ms, 200+ entries
- Security: HTTPS only, no sensitive client data for MVP
- Accessibility: WCAG 2.1 AA for primary flows, keyboard-only navigation, screen reader support
- Integration: Standalone MVP, static content bundled with app, future API-ready for reactions/comments

**Scale & Complexity:**
- Primary domain: Frontend SPA (Angular)
- Complexity level: Low-Medium
- Estimated architectural components: ~10-12 Angular feature/shared libraries in Nx monorepo
- No backend, no auth, no real-time, no multi-tenancy for MVP

### Technical Constraints & Dependencies

- **Framework**: Angular (team standard) with Nx monorepo
- **Styling**: Tailwind CSS with custom design tokens
- **Content**: Static JSON files bundled at build time — no CMS or backend for MVP
- **Deployment**: Standard internal web hosting, HTTPS, same access model as other internal tools
- **Browser support**: Current Chrome, Firefox, Edge, Safari (desktop). No IE or legacy.
- **Architecture must support**: Future API integration for reactions/comments without major refactoring

### Cross-Cutting Concerns Identified

- **Content loading & filtering**: All three content areas (Links, Guidelines, Cookbook) share browse/filter/search patterns
- **Clipboard interaction**: Core interaction pattern across Cookbook entries (and potentially Guidelines code blocks)
- **Theming**: Dark/light mode via Tailwind CSS custom properties, persisted in localStorage
- **State persistence**: Tool selection, theme preference, reactions stored in localStorage for MVP
- **Accessibility**: WCAG AA compliance across all components — keyboard, screen reader, focus management, reduced motion
- **Content schema**: JSON data models must be extensible for future platforms and content types

## Starter Template Evaluation

### Primary Technology Domain

Frontend SPA (Angular 21) in Nx monorepo with Tailwind CSS — based on PRD technical constraints and UX design system decisions.

### Starter Options Considered

**Nx Angular Monorepo Preset** — The natural choice given the explicit Nx + Angular decision. Provides monorepo structure, build caching, project graph, and Angular-specific generators out of the box.

No other starters evaluated — the technology stack was already decided in PRD (Angular, team standard) and UX spec (Nx monorepo, Tailwind CSS).

### Selected Starter: Nx Angular Monorepo (Nx 22.5 + Angular 21)

**Rationale for Selection:**
- Angular is the team standard — no framework evaluation needed
- Nx monorepo was decided in UX spec for shared Tailwind config and component library
- First-party Angular support with generators, build optimization, and affected commands

**Initialization Command:**

```bash
npx create-nx-workspace@latest bmad-demo \
  --preset=angular-monorepo \
  --appName=developer-hub \
  --style=css \
  --bundler=esbuild \
  --e2eTestRunner=playwright \
  --unitTestRunner=vitest \
  --ssr=false
```

Post-init setup:
```bash
# Tailwind CSS
npm install -D tailwindcss @tailwindcss/postcss postcss
npx nx g @nx/angular:setup-tailwind developer-hub

# Angular Aria (headless accessible components)
npm install @angular/aria
```

**Angular 21 Features Leveraged:**
- **Zoneless by default** — no zone.js, better Core Web Vitals, smaller bundle, native async/await
- **Vitest** — Angular 21 default test runner (replaces Jest/Karma)
- **Signal Forms (experimental)** — type-safe reactive forms with schema-based validation
- **Angular Aria (developer preview)** — headless accessible UI patterns (Tabs, Listbox, Menu, Combobox, Accordion)
- **Arrow functions in templates** (21.2) — cleaner template expressions
- **output() function** — modern signal-based output replacing @Output() + EventEmitter
- **input() / model()** — signal-based inputs replacing @Input() decorators
- **viewChild() / contentChild()** — signal-based queries replacing @ViewChild() decorators
- **OnPush default** (upcoming 22) — already using OnPush explicitly as best practice
- **Angular MCP Server** — AI agents can use official MCP tools for implementation guidance

**Architectural Decisions Provided by Starter:**

**Language & Runtime:** TypeScript (strict mode), Angular 21

**Styling Solution:** Tailwind CSS via PostCSS (added post-init)

**Build Tooling:** esbuild for fast dev builds, Nx caching for incremental builds

**Testing Framework:** Vitest (unit tests, Angular 21 default), Playwright (e2e tests)

**Code Organization:** `apps/developer-hub` + `libs/` directory for shared libraries

**Development Experience:** Nx serve with HMR, Nx Console VS Code extension, project graph visualization

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Data architecture: Static JSON files per content area, Angular Signals + services for state
- Frontend architecture: Lazy-loaded feature routes, Nx lib structure
- Content schema: Extensible JSON models for future platforms

**Important Decisions (Shape Architecture):**
- State persistence: localStorage for MVP (theme, tool selection, reactions)
- Content filtering: Shared service pattern across all three content areas
- Clipboard: Clipboard API with fallback, toast feedback

**Deferred Decisions (Post-MVP):**
- Backend API for reactions/comments (interfaces designed now, implementation later)
- Real-time features
- Advanced search/indexing

### Data Architecture

- **Content Storage**: Separate JSON files per content area (`links.json`, `guidelines.json`, `cookbook.json`) bundled at build time
- **State Management**: Angular Signals + lightweight services — no NgRx (overkill for this scope)
- **Data Validation**: TypeScript interfaces enforce schema at build time; runtime validation not needed for static JSON
- **Caching**: Nx build cache for development; browser cache headers for production
- **MVP Persistence**: localStorage for user preferences (theme, tool selection) and reactions

### Authentication & Security

- **No auth for MVP** — internal tool, same access model as other team tools
- **HTTPS only** — enforced at hosting level
- **No sensitive data** — no user accounts, no PII, no tokens
- **Content Security**: Static content bundled at build, no injection vectors
- **Future-ready**: When reactions/comments API is added, auth decisions will be revisited

### API & Communication Patterns

- **No API for MVP** — all content is static JSON bundled at build time
- **Future API Interface**: `ContentService` abstractions designed so localStorage can be swapped for HTTP calls without refactoring feature components
- **Error Handling**: Consistent error boundaries at feature level, toast notifications for user-facing errors
- **No rate limiting, no service communication** — single SPA, no backend

### Frontend Architecture

- **Routing**: Lazy-loaded feature routes: `/links`, `/guidelines`, `/cookbook`, `/cookbook/:id`
- **Nx Library Structure**:
  - `libs/ui` — Shared UI components (CopyButton, SearchBar, FilterSidebar, Toast, ReactionBar)
  - `libs/shared/data` — Content services, JSON loaders, localStorage abstractions
  - `libs/shared/styles` — Tailwind preset, design tokens, shared CSS
  - `libs/feature-links` — Links feature module
  - `libs/feature-guidelines` — Guidelines feature module
  - `libs/feature-cookbook` — Cookbook feature module (includes detail view)
- **Component Architecture**: Standalone components, OnPush change detection, Angular Signals for reactivity
- **Performance**: Lazy loading per route, preloadAllModules strategy, tree-shaking via esbuild
- **Bundle Optimization**: Nx affected builds, esbuild code splitting

### Infrastructure & Deployment

- **Hosting**: Standard internal web hosting (same as other team tools)
- **CI/CD**: Basic build + deploy pipeline — no special infrastructure for MVP
- **Environment Config**: `environment.ts` files for dev/prod, no secrets needed
- **Monitoring**: Browser console for development; no production monitoring for MVP
- **Scaling**: Static SPA served from CDN/web server — inherently scalable

### Decision Impact Analysis

**Implementation Sequence:**
1. Nx workspace initialization with Angular + Tailwind
2. Shared libraries setup (ui, data, styles)
3. Shell/navigation with lazy routing
4. Feature modules (Links → Guidelines → Cookbook)
5. Cross-cutting: theme, clipboard, accessibility
6. Reactions/comments with localStorage

**Cross-Component Dependencies:**
- All features depend on `libs/shared/data` for content loading
- All features depend on `libs/ui` for shared components
- All features depend on `libs/shared/styles` for Tailwind preset
- Cookbook detail view depends on clipboard service from `libs/shared/data`
- Reactions depend on localStorage abstraction from `libs/shared/data`

## Implementation Patterns & Consistency Rules

### Angular 21 Feature Adoption Strategy

This project maximizes Angular 21+ features. AI agents MUST use modern APIs over legacy patterns:

| Legacy (DO NOT USE) | Modern (MUST USE) |
|---|---|
| `@Input()` decorator | `input()` / `input.required()` signal function |
| `@Output()` + EventEmitter | `output()` signal function |
| `@ViewChild()` / `@ContentChild()` | `viewChild()` / `contentChild()` signal queries |
| `ngOnChanges` + SimpleChanges | `effect()` or `computed()` on input signals |
| Reactive Forms (FormControl/Group) | Signal Forms with schema-based validation (experimental) |
| `NgModule` declarations | Standalone components with `imports` array |
| zone.js change detection | Zoneless (Angular 21 default) — signals drive change detection |
| `*ngIf`, `*ngFor`, `*ngSwitch` | `@if`, `@for`, `@switch` control flow |
| Karma/Jest | Vitest (Angular 21 default) |
| Custom accessible components | Angular Aria headless patterns where applicable (Tabs, Listbox, Menu, Combobox) |

### Critical Conflict Points Identified

8 areas where AI agents could make different choices — all resolved below.

### Naming Patterns

**File Naming (Angular CLI conventions):**
- Components: `kebab-case.component.ts` — e.g., `cookbook-card.component.ts`
- Services: `kebab-case.service.ts` — e.g., `content-loader.service.ts`
- Models/interfaces: `kebab-case.model.ts` — e.g., `cookbook-entry.model.ts`
- JSON data: `kebab-case.json` — e.g., `cookbook-entries.json`
- Pipes: `kebab-case.pipe.ts` — e.g., `highlight-search.pipe.ts`

**Code Naming:**
- Classes: `PascalCase` — `CookbookCardComponent`, `ContentLoaderService`
- Interfaces: `PascalCase`, no `I` prefix — `CookbookEntry`, `GuidelineItem`, `LinkCategory`
- Type aliases: `PascalCase` — `ToolPlatform`, `ContentCategory`
- Variables/functions: `camelCase` — `selectedTool`, `loadEntries()`
- Signals: `camelCase` noun — `entries`, `isLoading`, `selectedCategory`
- Computed signals: `camelCase` noun — `filteredEntries`, `activeToolCount`
- Constants: `UPPER_SNAKE_CASE` — `DEFAULT_TOOL`, `SUPPORTED_PLATFORMS`
- Enums: `PascalCase` with `PascalCase` members — `ToolPlatform.Claude`, `ContentCategory.Prompts`

**JSON Content Fields:**
- `camelCase` for all keys — `platformId`, `categoryName`, `copyContent`
- Consistent with TypeScript interfaces (zero transformation)

**Nx Library Scopes:**
- Import paths: `@bmad-demo/ui`, `@bmad-demo/shared/data`, `@bmad-demo/shared/styles`
- Feature libs: `@bmad-demo/feature-links`, `@bmad-demo/feature-guidelines`, `@bmad-demo/feature-cookbook`

### Structure Patterns

**Nx Library Organization:**
- Each lib has: `src/lib/` for source, `src/index.ts` for public API barrel export
- Feature libs export: route config, standalone page components
- UI lib exports: individual standalone components (selective, not barrel-all)
- Data lib exports: services, models, type definitions

**Test Placement:**
- Co-located: `*.spec.ts` next to source file
- Vitest config: workspace-level `vitest.config.ts` with per-project overrides
- E2e tests: `apps/developer-hub-e2e/` (Playwright)

**Component Organization:**
- One standalone component per file
- Inline templates for simple components (<20 lines), separate `.html` for complex
- Inline styles preferred via Tailwind classes; separate `.css` only for complex animations
- No `NgModule` files anywhere — fully standalone architecture

### Format Patterns

**JSON Content Schema:**
```typescript
interface ContentItem {
  id: string;            // kebab-case unique ID
  title: string;
  description: string;
  category: string;      // kebab-case category ID
  tags: string[];
  createdAt: string;     // ISO 8601
  updatedAt: string;     // ISO 8601
}

interface CookbookEntry extends ContentItem {
  platform: ToolPlatform;
  copyContent: string;   // The actual prompt/snippet to copy
  language?: string;     // Syntax highlighting hint
  usage: string;         // How to use this prompt
}
```

**Date Formats:** ISO 8601 strings in JSON, formatted for display via Angular pipes

### Communication Patterns

**Signal Patterns (MANDATORY — no RxJS Subjects for state):**
- `signal()` for local component state
- `input()` / `input.required()` for component inputs
- `output()` for component outputs (replaces EventEmitter)
- `computed()` for derived state — prefer over `effect()`
- `effect()` sparingly — only for side effects (localStorage sync, analytics)
- Services expose `readonly` signals via `asReadonly()`
- `model()` for two-way binding signals

**RxJS — limited to:**
- `HttpClient` calls (future API) via `toSignal()`
- Router events via `toSignal()`
- Complex async streams that truly need operators

**Event Patterns:**
- Component outputs: `camelCase` verbs — `copyClicked`, `filterChanged`, `toolSelected`
- Arrow functions in templates (Angular 21.2): `items().filter(i => i.active)` directly in `@for`

### Process Patterns

**Loading States:**
- Each feature service exposes `isLoading: Signal<boolean>`
- Skeleton loaders for content areas (NOT spinners)
- `@if (isLoading()) { <skeleton/> } @else { <content/> }` pattern
- Loading state scoped to feature, not global

**Error Handling:**
- Feature-level error boundaries with `@if (error())` blocks
- Toast notifications for user-facing errors (copy failed, content load failed)
- Console errors for dev debugging only
- No error tracking service for MVP

**Clipboard Pattern:**
```typescript
// Standard pattern for all copy operations
async copyToClipboard(content: string): Promise<boolean> {
  await navigator.clipboard.writeText(content);
  return true;
}
```

### Angular Aria Integration

Use Angular Aria headless components for these UI patterns:
- **Tabs** — Tool platform selector (Claude, Copilot, Cursor, Qodo)
- **Listbox** — Category filter sidebar
- **Combobox** — Search with suggestions
- **Menu** — Overflow/context menus
- **Accordion** — Collapsible guideline sections

Angular Aria provides WAI-ARIA compliance out of the box — no custom ARIA attributes needed for these patterns.

### Enforcement Guidelines

**All AI Agents MUST:**
1. Use Angular 21 signal-based APIs (`input()`, `output()`, `viewChild()`) — NEVER decorators
2. Use standalone components with `changeDetection: ChangeDetectionStrategy.OnPush`
3. Use `@if`/`@for`/`@switch` control flow — NEVER `*ngIf`/`*ngFor`/`*ngSwitch`
4. Use Arrow functions in templates where cleaner (Angular 21.2)
5. Import from lib barrel exports only (`@bmad-demo/ui`, `@bmad-demo/shared/data`)
6. Never import across feature library boundaries — only through shared libs
7. Use Tailwind utility classes — no custom CSS unless for animations/transitions
8. Use Angular Aria for Tabs, Listbox, Combobox, Menu, Accordion patterns
9. Use Vitest for all unit tests
10. No zone.js imports — project is zoneless by default

**Anti-Patterns (FORBIDDEN):**
- `NgModule` in any form
- `@Input()`, `@Output()`, `@ViewChild()` decorators
- `EventEmitter` class
- `*ngIf`, `*ngFor`, `*ngSwitch` structural directives
- RxJS `BehaviorSubject`/`Subject` for component state (use signals)
- Manual `ChangeDetectorRef.detectChanges()` calls
- `zone.js` polyfill imports

## Project Structure & Boundaries

### Complete Project Directory Structure

```
bmad-demo/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .vscode/
│   ├── extensions.json                        # Nx Console, Tailwind IntelliSense, Angular LS
│   └── settings.json
├── apps/
│   ├── developer-hub/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── app.component.ts           # Shell: sidebar nav + router-outlet
│   │   │   │   ├── app.component.html
│   │   │   │   ├── app.config.ts              # provideRouter, provideHttpClient
│   │   │   │   ├── app.routes.ts              # Lazy-loaded feature routes
│   │   │   │   └── layout/
│   │   │   │       ├── shell.component.ts     # Navigation shell wrapper
│   │   │   │       ├── nav-sidebar.component.ts
│   │   │   │       └── theme-toggle.component.ts
│   │   │   ├── assets/
│   │   │   │   └── icons/                     # Tool platform SVG icons
│   │   │   ├── styles.css                     # Tailwind @import, global resets
│   │   │   ├── index.html
│   │   │   └── main.ts                        # bootstrapApplication
│   │   ├── tailwind.config.js                 # Extends shared preset
│   │   ├── project.json
│   │   ├── tsconfig.app.json
│   │   └── tsconfig.spec.json
│   └── developer-hub-e2e/
│       ├── src/
│       │   ├── links.spec.ts
│       │   ├── guidelines.spec.ts
│       │   ├── cookbook.spec.ts
│       │   └── cookbook-detail.spec.ts
│       ├── playwright.config.ts
│       └── project.json
├── libs/
│   ├── ui/
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── cookbook-card/
│   │   │   │   │   ├── cookbook-card.component.ts
│   │   │   │   │   └── cookbook-card.component.spec.ts
│   │   │   │   ├── copy-button/
│   │   │   │   │   ├── copy-button.component.ts
│   │   │   │   │   └── copy-button.component.spec.ts
│   │   │   │   ├── search-bar/
│   │   │   │   │   ├── search-bar.component.ts
│   │   │   │   │   └── search-bar.component.spec.ts
│   │   │   │   ├── filter-sidebar/
│   │   │   │   │   ├── filter-sidebar.component.ts
│   │   │   │   │   └── filter-sidebar.component.spec.ts
│   │   │   │   ├── toast/
│   │   │   │   │   ├── toast.component.ts
│   │   │   │   │   └── toast.service.ts
│   │   │   │   ├── reaction-bar/
│   │   │   │   │   ├── reaction-bar.component.ts
│   │   │   │   │   └── reaction-bar.component.spec.ts
│   │   │   │   ├── tool-selector/
│   │   │   │   │   ├── tool-selector.component.ts    # Uses Angular Aria Tabs
│   │   │   │   │   └── tool-selector.component.spec.ts
│   │   │   │   └── skeleton-loader/
│   │   │   │       └── skeleton-loader.component.ts
│   │   │   └── index.ts
│   │   ├── project.json
│   │   └── tsconfig.lib.json
│   ├── shared/
│   │   ├── data/
│   │   │   ├── src/
│   │   │   │   ├── lib/
│   │   │   │   │   ├── models/
│   │   │   │   │   │   ├── link.model.ts
│   │   │   │   │   │   ├── guideline.model.ts
│   │   │   │   │   │   ├── cookbook-entry.model.ts
│   │   │   │   │   │   └── common.model.ts            # ContentItem base, ToolPlatform enum
│   │   │   │   │   ├── services/
│   │   │   │   │   │   ├── links.service.ts
│   │   │   │   │   │   ├── guidelines.service.ts
│   │   │   │   │   │   ├── cookbook.service.ts
│   │   │   │   │   │   ├── clipboard.service.ts
│   │   │   │   │   │   ├── theme.service.ts
│   │   │   │   │   │   ├── storage.service.ts          # localStorage abstraction
│   │   │   │   │   │   └── reactions.service.ts
│   │   │   │   │   └── content/
│   │   │   │   │       ├── links.json
│   │   │   │   │       ├── guidelines.json
│   │   │   │   │       └── cookbook-entries.json
│   │   │   │   └── index.ts
│   │   │   ├── project.json
│   │   │   └── tsconfig.lib.json
│   │   └── styles/
│   │       ├── src/
│   │       │   ├── lib/
│   │       │   │   ├── tailwind-preset.js             # Shared design tokens, colors, typography
│   │       │   │   └── animations.css                 # Shared transitions/keyframes
│   │       │   └── index.ts
│   │       └── project.json
│   ├── feature-links/
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── links-page.component.ts
│   │   │   │   ├── links-page.component.spec.ts
│   │   │   │   ├── link-card.component.ts
│   │   │   │   └── links.routes.ts
│   │   │   └── index.ts
│   │   └── project.json
│   ├── feature-guidelines/
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── guidelines-page.component.ts
│   │   │   │   ├── guidelines-page.component.spec.ts
│   │   │   │   ├── guideline-detail.component.ts
│   │   │   │   └── guidelines.routes.ts
│   │   │   └── index.ts
│   │   └── project.json
│   └── feature-cookbook/
│       ├── src/
│       │   ├── lib/
│       │   │   ├── cookbook-page.component.ts
│       │   │   ├── cookbook-page.component.spec.ts
│       │   │   ├── cookbook-detail.component.ts
│       │   │   ├── cookbook-detail.component.spec.ts
│       │   │   └── cookbook.routes.ts
│       │   └── index.ts
│       └── project.json
├── nx.json
├── package.json
├── tsconfig.base.json
├── vitest.config.ts                            # Workspace-level Vitest config
└── .gitignore
```

### Architectural Boundaries

**Library Dependency Rules (enforced by Nx):**

```
feature-links      → shared/data, ui, shared/styles
feature-guidelines → shared/data, ui, shared/styles
feature-cookbook    → shared/data, ui, shared/styles
ui                 → shared/styles (NO feature lib imports)
shared/data        → (standalone, no other lib imports)
shared/styles      → (standalone, no other lib imports)
developer-hub app  → all feature libs (via lazy routes only)
```

**Nx Module Boundary Enforcement (`nx.json` tags):**
- `scope:feature` — feature-links, feature-guidelines, feature-cookbook
- `scope:ui` — ui
- `scope:shared` — shared/data, shared/styles
- **Rule:** `scope:feature` cannot import `scope:feature`
- **Rule:** `scope:ui` cannot import `scope:feature`
- **Rule:** `scope:shared` cannot import `scope:feature` or `scope:ui`

### Requirements to Structure Mapping

| FR Category | Primary Location | Shared Dependencies |
|---|---|---|
| Navigation & Hub (FR1-3) | `apps/developer-hub/src/app/layout/` | `shared/styles` |
| Links Management (FR4-6) | `libs/feature-links/` | `shared/data`, `ui` |
| Guidelines (FR7-9) | `libs/feature-guidelines/` | `shared/data`, `ui` |
| AI Cookbook (FR10-14) | `libs/feature-cookbook/` | `shared/data`, `ui` |
| Content Interaction (FR15-17) | `libs/ui/` (CopyButton, SearchBar) | `shared/data` |
| UX Personality (FR18-20) | `libs/ui/` + per-feature components | `shared/styles` |
| Feedback & Reactions (FR21-23) | `libs/ui/reaction-bar/` + `shared/data/reactions.service` | `shared/data` |
| Content Management (FR24-25) | `libs/shared/data/content/*.json` | — |

### Data Flow

```
JSON files (build-time) → ContentService (signals) → Feature Components → UI Components
                                                          ↓
                                                   localStorage ← StorageService (reactions, theme, tool pref)
```

### Integration Points

**Internal Communication:**
- Feature → Shared Data: Service injection, signal consumption
- Feature → UI: Component composition via inputs/outputs (signal-based)
- Layout → Features: Angular Router with lazy loading
- Theme: `ThemeService` in shared/data, consumed by app shell and all components via Tailwind dark: variant

**Routing Configuration (`app.routes.ts`):**
```typescript
export const appRoutes: Routes = [
  { path: '', redirectTo: 'cookbook', pathMatch: 'full' },
  { path: 'links', loadChildren: () => import('@bmad-demo/feature-links').then(m => m.linksRoutes) },
  { path: 'guidelines', loadChildren: () => import('@bmad-demo/feature-guidelines').then(m => m.guidelinesRoutes) },
  { path: 'cookbook', loadChildren: () => import('@bmad-demo/feature-cookbook').then(m => m.cookbookRoutes) },
];
```

## Architecture Validation Results

### Coherence Validation

**Decision Compatibility:** All technology choices are compatible and current:
- Angular 21.2 + Nx 22.5 — first-party support confirmed
- Tailwind CSS + PostCSS — standard Angular integration via `@nx/angular:setup-tailwind`
- Vitest — Angular 21 default, native Nx support
- esbuild — Angular 21 default bundler, Nx integrated
- Playwright — Nx e2e preset, no conflicts
- Angular Aria — official Angular package, standalone component compatible
- Zoneless — Angular 21 default, no zone.js polyfill needed

**Pattern Consistency:** All patterns align with Angular 21 modern APIs:
- Signal-based reactivity throughout (inputs, outputs, queries, state)
- Standalone components only (no NgModules)
- Modern control flow (`@if`/`@for`/`@switch`)
- Naming conventions follow Angular CLI standards

**Structure Alignment:** Nx monorepo structure supports all decisions:
- Library boundaries enforced via tags and module boundary rules
- Lazy loading via standard Angular router + Nx lib structure
- Shared styles via Tailwind preset in dedicated lib

### Requirements Coverage Validation

**Functional Requirements Coverage:**

| FR Category | Coverage | Notes |
|---|---|---|
| Navigation & Hub (FR1-3) | Covered | App shell + router in `apps/developer-hub/layout/` |
| Links Management (FR4-6) | Covered | `feature-links` lib + shared UI components |
| Guidelines (FR7-9) | Covered | `feature-guidelines` lib + Angular Aria Accordion |
| AI Cookbook (FR10-14) | Covered | `feature-cookbook` lib + Angular Aria Tabs for tool selector |
| Content Interaction (FR15-17) | Covered | `ui` lib: CopyButton, SearchBar, FilterSidebar |
| UX Personality (FR18-20) | Covered | Tailwind preset + component-level microcopy |
| Feedback & Reactions (FR21-23) | Covered | ReactionBar component + ReactionsService (localStorage) |
| Content Management (FR24-25) | Covered | Static JSON in `shared/data/content/` |

**Non-Functional Requirements Coverage:**
- **Performance (LCP < 2.5s):** Lazy loading, esbuild, zoneless, tree-shaking — all addressed
- **Navigation < 300ms:** Preload strategy + signal-based rendering — addressed
- **Copy < 100ms:** Clipboard API direct call — addressed
- **200+ entries:** Signal-based filtering, no virtual scroll needed at this scale — addressed
- **WCAG 2.1 AA:** Angular Aria headless components, keyboard nav, focus management — addressed
- **HTTPS only:** Infrastructure-level — addressed

### Implementation Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**
- Clean separation of concerns via Nx library boundaries
- Maximum use of Angular 21 modern features (signals, zoneless, Aria, Vitest)
- Simple data architecture (static JSON) eliminates backend complexity
- Well-defined patterns prevent AI agent conflicts
- Every FR mapped to a specific file/directory location

**Areas for Future Enhancement (Post-MVP):**
- Backend API for reactions/comments (service abstractions already in place)
- Search indexing for large content sets
- PWA support for offline access
- Analytics integration

### Architecture Completeness Checklist

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped
- [x] Starter template selected and verified (Nx 22.5 + Angular 21)
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified (Signals)
- [x] Process patterns documented (loading, errors, clipboard)
- [x] Complete directory structure defined
- [x] Component boundaries established (Nx tags)
- [x] Integration points mapped
- [x] Requirements to structure mapping complete
- [x] Angular 21 feature adoption strategy documented
- [x] Anti-patterns explicitly forbidden

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use Angular 21 modern APIs exclusively (see Feature Adoption Strategy table)
- Respect Nx library boundaries — never import across feature libs
- Use implementation patterns consistently across all components
- Refer to this document as the single source of truth for all architectural questions

**First Implementation Steps:**
1. Run workspace initialization command (see Starter Template Evaluation section)
2. Configure Tailwind CSS with shared preset
3. Install Angular Aria
4. Generate Nx libraries with proper tags
5. Set up module boundary rules in `nx.json`
6. Create app shell with navigation layout
7. Begin feature implementation: Links → Guidelines → Cookbook
