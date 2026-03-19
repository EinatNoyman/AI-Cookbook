# Story 1.1: Nx Workspace Initialization

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want the project scaffolded with Nx, Angular 21, Tailwind, and all shared libraries,
So that the foundation is ready for feature development.

## Acceptance Criteria

1. **Given** a clean environment **When** the workspace init commands are run **Then** Nx workspace is created with `apps/developer-hub` and `libs/` structure
2. **And** Tailwind CSS is configured with a shared preset in `libs/shared/styles`
3. **And** Angular Aria is installed
4. **And** All 6 Nx libraries are generated with proper scope tags
5. **And** Module boundary rules are configured in `nx.json`
6. **And** `nx serve developer-hub` builds and serves successfully
7. **And** Vitest runs with no errors

## Tasks / Subtasks

- [x] Task 1: Nx workspace creation (AC: #1)
  - [x] Workspace exists at `apps/developer-hub` with Angular 21.1.1
  - [x] Nx 22.x monorepo structure with `apps/` and `libs/`
  - [x] `project.json` configured with `@angular/build:application` builder
  - [x] Zoneless change detection enabled in `app.config.ts`
- [x] Task 2: Tailwind CSS configuration (AC: #2)
  - [x] Tailwind CSS 4.2.1 installed
  - [x] `@tailwindcss/postcss` configured via `.postcssrc.json` (Angular 21 requires JSON PostCSS config)
  - [x] `@tailwindcss/vite` plugin added to `vite.config.mts` for Vitest
  - [x] `styles.css` uses `@import "tailwindcss" source("../../../")` for workspace-wide class scanning
  - [x] Shared Tailwind preset in `libs/shared/styles` — design tokens CSS with tool accent colors, typography, animations
- [x] Task 3: Angular Aria installation (AC: #3)
  - [x] `@angular/aria@21.2.1` installed
  - [x] Architecture specifies Aria for Tabs, Listbox, Combobox, Menu, Accordion patterns (available for future stories)
- [x] Task 4: Nx library generation (AC: #4)
  - [x] `libs/feature-cookbook` (tag: `scope:feature-cookbook`)
  - [x] `libs/feature-guidelines` (tag: `scope:feature-guidelines`)
  - [x] `libs/feature-links` (tag: `scope:feature-links`)
  - [x] `libs/shared/data` (tag: `scope:shared`)
  - [x] `libs/shared/ui` (tag: `scope:shared`)
  - [x] `libs/shared/styles` (tag: `scope:shared`)
  - [x] Path aliases configured in `tsconfig.base.json`
- [x] Task 5: Module boundary rules (AC: #5)
  - [x] `@nx/enforce-module-boundaries` rule configured in `eslint.config.mjs`
  - [x] `scope:shared` can only depend on `scope:shared`
  - [x] `scope:feature-cookbook` can only depend on `scope:shared`
  - [x] `scope:feature-guidelines` can only depend on `scope:shared`
  - [x] `scope:feature-links` can only depend on `scope:shared`
- [x] Task 6: Dev server (AC: #6)
  - [x] `nx serve developer-hub` builds and serves at localhost:4200
  - [x] Tailwind CSS utility classes render correctly (PostCSS fix applied 2026-03-10)
- [x] Task 7: Vitest (AC: #7)
  - [x] Fixed broken test (removed stale nx-welcome import)
  - [x] 2 tests pass: app creation and navigation items verification

## Dev Notes

### Current State Analysis (2026-03-10)

**CRITICAL: The workspace is ALREADY substantially built.** This is not a greenfield story — most work is done. The remaining tasks are:

1. **Angular Aria** — Not installed. Architecture mandates it for accessible headless components (Tabs, Listbox, Combobox, Menu, Accordion). Currently, the cookbook `tool-selector.ts` uses custom buttons instead of Aria Tabs, and `guidelines-page.ts` uses HTML `<details>` instead of Aria Accordion.

2. **Module boundary rules** — Tags exist on libraries but no enforcement rule in ESLint config. Need `@nx/enforce-module-boundaries` with proper `depConstraints`.

3. **Shared Tailwind preset** — `libs/shared/styles` is a placeholder. Architecture calls for a shared `tailwind-preset.js` with design tokens (muted slate palette, tool-specific accent colors for Claude violet, Copilot sky, Cursor teal, Qodo emerald), typography (Inter/Geist Sans for prose, JetBrains Mono for code), and animation utilities.

4. **Vitest verification** — Unit test runner is configured but tests should be verified after the Tailwind PostCSS configuration changes.

### Architecture Compliance Notes

- **Path aliases** use `@bmad-demo/shared-data` and `@bmad-demo/shared-ui` (hyphenated) vs architecture's `@bmad-demo/shared/data` and `@bmad-demo/ui` (slash-separated). This divergence exists but is functional.
- **Component structure** correctly uses standalone components, signal-based APIs (`input()`, `inject()`), and modern control flow (`@if`, `@for`, `@else`, `@empty`).
- **Zoneless** change detection is enabled via `provideZonelessChangeDetection()`.
- **No NgModules** anywhere — fully standalone architecture as required.

### Tailwind CSS Configuration (IMPORTANT for future stories)

Angular 21's `@angular/build:application` builder only reads PostCSS config from **JSON files** (`postcss.config.json` or `.postcssrc.json`), NOT JS/MJS files. The working config is:

```json
// .postcssrc.json (workspace root)
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

The `styles.css` uses `@import "tailwindcss" source("../../../")` to scan the entire workspace for utility classes.

### Project Structure Notes

- Library structure matches architecture with 6 Nx libs
- Feature libs correctly lazy-loaded via `app.routes.ts`
- Content JSON files exist in `libs/shared/data/src/lib/content/`
- All three features (Links, Guidelines, Cookbook) have working pages with real content

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Starter Template Evaluation]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Tailwind CSS fix: PostCSS JSON config discovery (2026-03-10)
- Codebase analysis: Full workspace exploration completed

### Completion Notes List

- Workspace was substantially complete from initial commit — most AC items already satisfied
- Created `libs/shared/styles/src/lib/design-tokens.css` with Tailwind v4 @theme block: tool accent colors (Claude violet, Copilot sky, Cursor teal, Qodo emerald), Inter/JetBrains Mono typography, animation keyframes, prefers-reduced-motion support
- Imported design tokens in `apps/developer-hub/src/styles.css`
- Installed `@angular/aria@21.2.1` — available for Tabs, Accordion, etc. in future stories
- Updated `eslint.config.mjs` with proper `depConstraints` for all 3 feature scopes + shared scope (replaced stale shop/api rules)
- Fixed `app.spec.ts` — removed broken nx-welcome import, added proper tests with provideRouter
- All 7 acceptance criteria now satisfied
- Build passes, dev server works, Vitest passes (2/2 tests)

### Code Review Fixes (2026-03-10)

Review performed by Claude Opus 4.6 (adversarial code review workflow). 7 findings, all fixed:

1. **[HIGH] Module boundary — app tag missing**: Added `"tags": ["scope:app"]` to `apps/developer-hub/project.json` and corresponding `depConstraint` in `eslint.config.mjs`
2. **[HIGH] @keyframes inside @theme block**: Moved all `@keyframes` declarations outside `@theme` in `design-tokens.css` (Tailwind v4 `@theme` only accepts CSS custom property declarations)
3. **[HIGH] Design tokens file location**: Moved `design-tokens.css` from `src/lib/` to `libs/shared/styles/` (lib root) since it's a CSS-only library, not an Angular module
4. **[MEDIUM] styles.css import path**: Updated import to `../../../libs/shared/styles/design-tokens.css` after file move
5. **[MEDIUM] Shared styles index.ts**: Replaced placeholder component export with `// CSS-only library` comment; deleted unused placeholder component files
6. **[MEDIUM] Test uses bracket notation on protected member**: Rewrote `app.spec.ts` to use DOM assertions (`querySelectorAll('nav ul li a')`) instead of `app['navItems']`
7. **[LOW] Redundant RouterModule import**: Replaced `RouterModule` with targeted `RouterOutlet` in `app.ts` imports

### File List

New files:
- `libs/shared/styles/design-tokens.css` — Tailwind v4 design tokens (tool colors, typography, animations)

Modified files:
- `apps/developer-hub/src/styles.css` — Added design tokens import, fixed source() path
- `apps/developer-hub/src/app/app.spec.ts` — Fixed tests: DOM assertions, router provider
- `apps/developer-hub/src/app/app.ts` — RouterOutlet instead of RouterModule
- `apps/developer-hub/project.json` — Added `scope:app` tag
- `eslint.config.mjs` — Updated module boundary rules with app scope constraint
- `libs/shared/styles/src/index.ts` — CSS-only library comment (no component exports)
- `package.json` — Added @angular/aria dependency
- `package-lock.json` — Lock file updated

Deleted files:
- `libs/shared/styles/src/lib/design-tokens.css` — Moved to lib root
- `libs/shared/styles/src/lib/shared-styles/shared-styles.component.ts` — Unused placeholder
- `libs/shared/styles/src/lib/shared-styles/shared-styles.component.spec.ts` — Unused placeholder test
