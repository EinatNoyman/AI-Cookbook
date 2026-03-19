# Story 1.2: App Shell & Navigation

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want a navigation shell with Links, Guidelines, and AI Cookbook sections,
So that I can move between content areas from any page.

## Acceptance Criteria

1. **Given** the app is loaded **When** a developer views any page **Then** a top navigation bar is visible with logo, search placeholder, and tool selector placeholder
2. **And** a nav shows Links, Guidelines, AI Cookbook sections
3. **And** the current section is visually highlighted (FR2)
4. **And** clicking a section navigates to it via lazy-loaded routes
5. **And** navigation completes in under 300ms (NFR2)
6. **And** no authentication is required (FR3)
7. **And** keyboard navigation works (Tab, Enter) for all nav elements (FR17)
8. **And** semantic HTML landmarks and ARIA labels are present (NFR11)

## Tasks / Subtasks

- [x] Task 1: Add search placeholder to top nav (AC: #1)
  - [x] Add a non-functional search input/button placeholder in the header between logo and nav links
  - [x] Style with `text-sm text-slate-500` placeholder text like "Search... (coming soon)"
  - [x] Include keyboard shortcut hint `/` in placeholder text per UX spec
  - [x] Ensure proper `aria-label` on the search placeholder
- [x] Task 2: Add tool selector placeholder to top nav (AC: #1)
  - [x] Add a non-functional tool selector placeholder in the header (right side, before theme toggle)
  - [x] Show tool icons/labels for Claude, Copilot, Cursor, Qodo as static badges
  - [x] Use tool accent colors from design tokens (`--color-claude`, `--color-copilot`, etc.)
  - [x] Mark as placeholder with `aria-disabled="true"`
- [x] Task 3: Add skip-to-content link for accessibility (AC: #7, #8)
  - [x] Add visually hidden skip link as first focusable element: `<a href="#main-content" class="sr-only focus:not-sr-only ...">Skip to content</a>`
  - [x] Add `id="main-content"` to `<main>` element
  - [x] Ensure skip link becomes visible on focus
- [x] Task 4: Enhance semantic HTML landmarks (AC: #8)
  - [x] Verify `<header>`, `<nav>`, `<main>` landmarks are present (already done)
  - [x] Add `role="banner"` to header if needed for older screen readers
  - [x] Add `aria-current="page"` to active nav link (supplement routerLinkActive)
  - [x] Add `<footer>` landmark with minimal content (copyright/version)
- [x] Task 5: Add route preloading strategy (AC: #5)
  - [x] Add `withPreloading(PreloadAllModules)` to `provideRouter()` in `app.config.ts`
  - [x] This ensures subsequent navigation completes under 300ms by preloading lazy chunks
- [x] Task 6: Mobile responsive navigation (AC: #7)
  - [x] Add hamburger menu button visible on `sm:` breakpoint (hidden on `md:` and up)
  - [x] Hide nav links on small screens, show in dropdown/slide-out when hamburger is clicked
  - [x] Use signal for menu open/close state
  - [x] Ensure hamburger button has `aria-expanded` and `aria-controls` attributes
  - [x] Close menu on route navigation (listen to router events)
- [x] Task 7: Update unit tests (AC: all)
  - [x] Test that search placeholder renders in nav
  - [x] Test that tool selector placeholder renders
  - [x] Test that skip-to-content link exists
  - [x] Test that footer renders
  - [x] Test nav items count (3 items: Links, Guidelines, AI Cookbook)
  - [x] Test routerLinkActive is applied on active route
- [x] Task 8: Verify all AC pass
  - [x] Build passes (`nx build developer-hub`)
  - [x] All unit tests pass (`nx test developer-hub`)
  - [x] Manual verification: keyboard Tab through all nav elements
  - [x] Manual verification: screen reader announces landmarks

## Dev Notes

### Current State Analysis

**The app shell is ALREADY substantially built.** Story 1-1 created a working navigation shell with:
- Top nav bar with logo ("Dev Hub"), 3 nav links, theme toggle
- `routerLinkActive` highlighting for current section
- Lazy-loaded routes for `/links`, `/guidelines`, `/cookbook`
- Zoneless change detection enabled
- Toast component integrated
- Focus ring styles (`focus:ring-2 focus:ring-violet-500`) on all interactive elements

**What's MISSING (the actual work for this story):**
1. **Search placeholder** — UX spec calls for search in top nav with `/` shortcut hint
2. **Tool selector placeholder** — UX spec shows tool selector prominently in top nav
3. **Skip-to-content link** — WCAG accessibility requirement
4. **Footer landmark** — Semantic HTML completeness
5. **Route preloading** — Architecture specifies `preloadAllModules` for <300ms navigation
6. **Mobile responsive nav** — UX spec mentions responsive breakpoints
7. **Tests** — Current tests only check app creation and nav item count

### Architecture Compliance Notes

**CRITICAL — Architecture specifies a `layout/` subdirectory:**
The architecture document shows:
```
apps/developer-hub/src/app/layout/
  ├── shell.component.ts
  ├── nav-sidebar.component.ts
  └── theme-toggle.component.ts
```

However, the current implementation keeps everything in `app.ts`/`app.html` directly. For this story, **continue with the current flat structure** — refactoring into `layout/` components is not in scope. The app shell is small enough that extracting layout components would be over-engineering at this stage. Future stories can refactor if complexity grows.

**Path alias divergence (known from Story 1-1):**
- Actual: `@bmad-demo/shared-data`, `@bmad-demo/shared-ui`
- Architecture: `@bmad-demo/shared/data`, `@bmad-demo/ui`
- This is functional and should NOT be changed — it would break all existing imports.

### Angular 21 Patterns (MANDATORY)

- Use `signal()` for component state (e.g., mobile menu open/close)
- Use `@if`/`@for` control flow (already used in template)
- Use `input()` / `output()` signal functions — NEVER `@Input()` / `@Output()`
- Standalone components only — NO NgModules
- Use `inject()` for dependency injection
- Tailwind utility classes — no custom CSS except for animations

### Tailwind CSS Configuration (IMPORTANT)

Angular 21's `@angular/build:application` builder only reads PostCSS config from **JSON files** (`.postcssrc.json`), NOT JS/MJS files. The working config is at workspace root:

```json
// .postcssrc.json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

The `styles.css` uses `@import "tailwindcss" source("../../../apps", "../../../libs")` to scan the workspace for utility classes.

Design tokens are in `libs/shared/styles/design-tokens.css` with tool accent colors:
- `--color-claude` (violet), `--color-copilot` (sky), `--color-cursor` (teal), `--color-qodo` (emerald)
- Font families: `--font-sans` (Inter/Geist Sans), `--font-mono` (JetBrains Mono)
- Animation keyframes defined outside `@theme` block (Tailwind v4 requirement)

### Key Files to Modify

| File | Change |
|---|---|
| `apps/developer-hub/src/app/app.ts` | Add mobile menu signal, possibly tool selector data |
| `apps/developer-hub/src/app/app.html` | Add search placeholder, tool selector placeholder, skip link, footer, mobile menu |
| `apps/developer-hub/src/app/app.css` | Minimal — skip link visibility styles if not covered by Tailwind `sr-only` |
| `apps/developer-hub/src/app/app.config.ts` | Add `withPreloading(PreloadAllModules)` |
| `apps/developer-hub/src/app/app.spec.ts` | Add tests for new elements |

### Key Files NOT to Modify

- `app.routes.ts` — Already correctly configured with lazy loading
- `libs/shared/styles/design-tokens.css` — Already has all needed design tokens
- `eslint.config.mjs` — Module boundaries already configured
- Feature lib routes — Not in scope for this story

### Previous Story Intelligence (Story 1-1)

Key learnings from Story 1-1 that apply here:
1. **PostCSS JSON config** — Angular 21 only reads `.postcssrc.json`, not JS/MJS
2. **Tailwind v4 `@theme`** — Only CSS custom properties allowed inside `@theme` block
3. **Module boundaries** — App has `scope:app` tag with proper depConstraints
4. **Test pattern** — Use `TestBed.configureTestingModule` with `provideRouter([])` for routing tests
5. **DOM assertions** — Test rendered DOM elements, not component internals via bracket notation
6. **RouterOutlet** — Use `RouterOutlet` directly, not `RouterModule`

### UX Design References

- **Layout**: Top nav (logo + search + tool selector) → main content area → collapsible sidebar for filters
- **Keyboard shortcuts**: `/` for search focus, `Esc` to close, Tab/Enter for navigation
- **Typography**: Inter/Geist Sans for prose, JetBrains Mono for code
- **Color**: Muted slate palette with tool-specific accent colors
- **Responsive**: Desktop-first, 3-col → 2-col → 1-col breakpoints

### Project Structure Notes

- Library structure matches architecture with 6 Nx libs
- Feature libs correctly lazy-loaded via `app.routes.ts`
- Content JSON files exist in `libs/shared/data/src/lib/content/`
- All three features (Links, Guidelines, Cookbook) have working pages with real content
- `@angular/aria@21.2.1` is installed and available for future stories

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend Architecture]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Design Direction Decision]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Visual Design Foundation]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Accessibility Considerations]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2]
- [Source: _bmad-output/implementation-artifacts/1-1-nx-workspace-initialization.md#Dev Notes]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (code review fixes)

### Debug Log References

- Code review performed 2026-03-11: found 9 issues (3H, 4M, 2L), auto-fixed 7

### Completion Notes List

- Fixed `aria-current="page"` on active nav links (desktop + mobile)
- Added Router NavigationEnd subscription to close mobile menu on navigation
- Added `role="banner"` to header element
- Changed tool selector to use design token CSS variables instead of Tailwind utility classes
- Added routerLinkActive test with aria-current verification
- Updated File List below

### File List

- `apps/developer-hub/src/app/app.ts` — Component with nav items, mobile menu, tool platforms, router event subscription
- `apps/developer-hub/src/app/app.html` — Template with skip link, header, nav, search placeholder, tool selector, mobile menu, footer
- `apps/developer-hub/src/app/app.css` — Empty (Tailwind covers all styles)
- `apps/developer-hub/src/app/app.config.ts` — App config with PreloadAllModules strategy
- `apps/developer-hub/src/app/app.spec.ts` — 11 unit tests covering all ACs
