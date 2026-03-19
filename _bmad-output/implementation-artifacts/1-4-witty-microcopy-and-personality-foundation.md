# Story 1.4: Witty Microcopy & Personality Foundation

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want witty section intros, playful transitions, and personality-driven empty states,
So that the hub feels fun and distinct from generic internal tools.

## Acceptance Criteria

1. **Given** a developer navigates to any section **When** content is displayed **Then** section headers include contextual, witty intro text (FR18)
2. **And** page transitions use subtle, playful animations (FR19)
3. **And** empty states show personality-driven messages with suggested actions (FR20)
4. **And** animations respect `prefers-reduced-motion`

## Tasks / Subtasks

- [x] Task 1: Add route transition animations (AC: #2, #4)
  - [x] Install `@angular/animations` if not already present
  - [x] Add `provideAnimations()` to `app.config.ts` (or `provideNoopAnimations()` for SSR if needed)
  - [x] Create a route animation trigger in a new file `apps/developer-hub/src/app/route-animations.ts`
  - [x] Define `fadeSlide` animation: entering page fades in + slides up slightly (opacity 0→1, translateY 8px→0) over 200ms ease-out
  - [x] Wrap `<router-outlet>` in the animation trigger using `@routeAnimation` and `ChildrenOutletContexts`
  - [x] Ensure animation is wrapped in `@media (prefers-reduced-motion: no-preference)` — use `query(':enter', ...)` with `optional: true`
  - [x] Verify navigation between Links→Guidelines→Cookbook triggers the transition smoothly

- [x] Task 2: Enhance empty states with contextual actions (AC: #3)
  - [x] Update `EmptyStateComponent` to accept an `(action)` output event so the action button does something
  - [x] In `CookbookListPage`, connect the "Clear filters" empty state button to actually call `clearAll()`
  - [x] Add section-specific empty state messages per page (not just generic random ones):
    - Links: emoji `🔗`, custom subtitle like "No links match. Time to bookmark the void."
    - Guidelines: emoji `📐`, custom subtitle like "No guidelines here. Anarchy reigns."
    - Cookbook (no results): emoji `🧑‍🍳`, custom subtitle like "No recipes for that combo. Try a different ingredient."
  - [x] Ensure empty state action buttons have proper focus styles and dark: variants (already done from 1-3)

- [x] Task 3: Add rotating section subtitles (AC: #1)
  - [x] Create a shared utility function or pipe: `randomSubtitle(subtitles: string[]): string` that picks a random subtitle each page visit
  - [x] Links page — add 3-4 rotating subtitles:
    - "Your bookmarks bar wishes it was this organized."
    - "Curated links, zero browser tab guilt."
    - "Everything you need, one click away."
  - [x] Guidelines page — add 3-4 rotating subtitles:
    - "The rules we all agreed on. Yes, even you."
    - "Standards that even linters would approve of."
    - "Read these. Your PR reviewers will thank you."
  - [x] Cookbook page — add 3-4 rotating subtitles:
    - "Copy-paste prompts that actually work. You're welcome."
    - "AI whispering, made easy."
    - "Prompts tested in production. By brave developers."

- [x] Task 4: Enhance micro-interactions (AC: #2, #4)
  - [x] Add subtle entrance animation to cookbook cards when they first render: `animate-fade-in` (already defined in design-tokens.css)
  - [x] Add scale bounce on reaction button click: `active:scale-95 motion-safe:transition-transform` (Tailwind only, no custom CSS)
  - [x] Add "No comments yet" microcopy enhancement in `CommentSectionComponent`: replace "No comments yet. Be the first!" with rotating messages:
    - "No comments yet. Be the first!"
    - "Crickets... Someone break the silence!"
    - "This space is begging for your hot take."
  - [x] Ensure all new animations use `motion-safe:` prefix or CSS reduced-motion check

- [x] Task 5: Write unit tests (AC: all)
  - [x] Test that route animations are defined and trigger on navigation
  - [x] Test that empty state action button emits the (action) event when clicked
  - [x] Test that section subtitles render (at least one subtitle appears)
  - [x] Test that reaction buttons have `active:scale-95` class for micro-interaction
  - [x] Verify all new animations are motion-safe guarded

- [x] Task 6: Build and verify (AC: all)
  - [x] Run `nx build developer-hub` — must pass
  - [x] Run tests: `npx vitest run --config apps/developer-hub/vite.config.mts --reporter=verbose` — all pass
  - [x] Visual verification: navigate between pages — smooth fade/slide transition
  - [x] Visual verification: check empty states have action buttons that work
  - [x] Visual verification: confirm animations disabled with `prefers-reduced-motion: reduce`

## Dev Notes

### Current State Analysis

**Personality features are already ~70% built** from Stories 1-1 through 1-3:

**ALREADY DONE — DO NOT RECREATE:**
- Section intro subtitles exist on all 3 pages (Links, Guidelines, Cookbook) — but they are static, not rotating
- Empty state component exists in `libs/shared/ui/src/lib/components/empty-state.ts` with 5 random witty messages
- Toast copy messages: 8 rotating witty messages in `libs/shared/data/src/lib/services/toast.service.ts`
- Card hover transitions (shadow lift, color change, translate-y)
- Accordion chevron rotation animation
- Theme toggle with `motion-safe:transition-colors`
- `@keyframes fade-in`, `card-lift`, `toast-slide-in/out` defined in design-tokens.css
- `prefers-reduced-motion` global disable in design-tokens.css
- Toast slide-in animation with reduced-motion fallback

**WHAT'S MISSING (the actual work):**
1. **Route transition animations** — No `@angular/animations` configured. RouterOutlet has no animation trigger.
2. **Empty state action events** — `EmptyStateComponent` has an `actionLabel` input but the button has no `(click)` handler or output event.
3. **Rotating subtitles** — Current subtitles are hardcoded single strings in each page component.
4. **Micro-interactions** — No scale/bounce on reaction clicks, no card entrance animations.

### Architecture Compliance Notes

**Path alias divergence (known from Story 1-1):**
- Actual: `@bmad-demo/shared-data`, `@bmad-demo/shared-ui`, `@bmad-demo/shared-styles`
- Architecture: `@bmad-demo/shared/data`, `@bmad-demo/ui`
- Do NOT change — this is functional and would break all imports.

**Angular animations module:**
- Angular 21 requires `provideAnimations()` in the app config for route animations
- This is a new provider — add to `apps/developer-hub/src/app/app.config.ts`
- For Vitest, the test setup may need `provideNoopAnimations()` to avoid animation issues in tests

### Angular 21 Patterns (MANDATORY)

- Use `signal()` for component state
- Use `@if`/`@for` control flow (already used in templates)
- Use `input()` / `output()` signal functions — NEVER `@Input()` / `@Output()`
- Standalone components only — NO NgModules
- Use `inject()` for dependency injection
- Tailwind utility classes — no custom CSS except for animations

### Route Animation Pattern

```typescript
// apps/developer-hub/src/app/route-animations.ts
import { trigger, transition, style, animate, query } from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(8px)' }),
      animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
    ], { optional: true }),
  ]),
]);
```

Then in `app.ts`:
```typescript
import { routeAnimation } from './route-animations';

@Component({
  // ...
  animations: [routeAnimation],
})
```

And in `app.html`:
```html
<main id="main-content" class="mx-auto max-w-7xl px-4 py-6" [@routeAnimation]="outlet.activatedRouteData">
  <router-outlet #outlet="outlet" />
</main>
```

**IMPORTANT:** This animation will NOT respect `prefers-reduced-motion` by default. You must either:
1. Use Angular's `AnimationOptions` with `params` to conditionally disable, OR
2. Use the `@media (prefers-reduced-motion: reduce)` rule in design-tokens.css (already kills all transitions/animations globally — this should work)

### EmptyState Enhancement Pattern

```typescript
// Add output event to EmptyStateComponent
readonly action = output<void>();

// In template, add click handler:
<button (click)="action.emit()" ...>{{ actionLabel() }}</button>
```

### Tailwind CSS v4 Configuration (IMPORTANT)

**PostCSS config (`.postcssrc.json`):**
```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

**Dark mode:** Uses class-based strategy via `@custom-variant dark (&:where(.dark, .dark *));` in design-tokens.css.

**`styles.css` import order:**
```css
@import "@fontsource-variable/inter";
@import "@fontsource-variable/jetbrains-mono";
@import "tailwindcss" source("../../..");
@import "../../../libs/shared/styles/design-tokens.css";
```

### Existing Animation Keyframes (DO NOT DUPLICATE)

From `libs/shared/styles/design-tokens.css`:
- `toast-slide-in` — translateX(100%) → 0, opacity 0→1
- `toast-slide-out` — reverse of slide-in
- `fade-in` — opacity 0→1 over 0.2s
- `card-lift` — translateY(0) → -2px

From Toast component inline styles:
- `slide-in` — same as toast-slide-in (redundant but functional)

### Key Files to Modify

| File | Change |
|---|---|
| `apps/developer-hub/src/app/app.config.ts` | Add `provideAnimations()` |
| `apps/developer-hub/src/app/app.ts` | Import route animation, add `animations: [routeAnimation]` |
| `apps/developer-hub/src/app/app.html` | Add `[@routeAnimation]` to `<main>` |
| `apps/developer-hub/src/app/route-animations.ts` | NEW — route animation trigger |
| `libs/shared/ui/src/lib/components/empty-state.ts` | Add `output()` for action event |
| `libs/feature-links/src/lib/pages/links-page.ts` | Add rotating subtitles |
| `libs/feature-guidelines/src/lib/pages/guidelines-page.ts` | Add rotating subtitles |
| `libs/feature-cookbook/src/lib/pages/cookbook-list-page.ts` | Add rotating subtitles, connect empty state action |
| `libs/feature-cookbook/src/lib/components/reaction-bar.ts` | Add `active:scale-95 motion-safe:transition-transform` |
| `libs/feature-cookbook/src/lib/components/comment-section.ts` | Add rotating "no comments" messages |
| `apps/developer-hub/src/app/app.spec.ts` | Add route animation tests |

### Key Files NOT to Modify

- `libs/shared/data/src/lib/services/toast.service.ts` — Already has 8 witty messages, don't change
- `libs/shared/styles/design-tokens.css` — Keyframes already defined, don't duplicate
- `libs/shared/data/src/lib/services/theme.service.ts` — Not related to this story
- `app.routes.ts` — Route structure stays the same (lazy loading works)

### Previous Story Intelligence (Story 1-3)

Key learnings from Story 1-3:
1. **Tailwind v4 dark mode** — Uses `@custom-variant dark` in design-tokens.css for class-based strategy
2. **motion-safe: prefix** — Use for Tailwind transitions to respect reduced motion
3. **Brand accent = teal** — UI accent was rebranded from violet to teal; use `teal-500/600` for focus/active states
4. **Test pattern** — Run vitest directly: `npx vitest run --config apps/developer-hub/vite.config.mts --reporter=verbose`
5. **Test setup** — MockThemeService and DummyComponent patterns established in app.spec.ts
6. **provideNoopAnimations()** — May be needed in test setup to prevent animation errors

### Vitest Windows Fix (CRITICAL)

Tests on Windows require the drive letter normalization plugin in `vite.config.mts`. This is already configured — do NOT remove it. If tests fail with path resolution errors, check that the plugin is present.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.4]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Emotional Design]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Feedback Patterns]
- [Source: _bmad-output/planning-artifacts/architecture.md#UX Personality]
- [Source: _bmad-output/implementation-artifacts/1-3-theme-toggle-and-design-tokens.md#Dev Notes]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

None

### Completion Notes List

- Installed `@angular/animations@21.1.1` and configured `provideAnimations()` in app config
- Created `route-animations.ts` with fadeSlide animation (opacity 0->1, translateY 8px->0, 200ms ease-out)
- Integrated route animation into `App` component using `ChildrenOutletContexts` and `[@routeAnimation]` binding on `<main>`
- Added `output()` event and `subtitle` input to `EmptyStateComponent`; connected cookbook empty state action to `clearAll()`
- Added section-specific empty state subtitles for Links, Guidelines, and Cookbook pages
- Implemented rotating subtitles (4 options each) for all 3 section pages using random selection at component instantiation
- Added `motion-safe:animate-[fade-in_0.2s_ease-out]` entrance animation to cookbook cards
- Added `active:scale-95 motion-safe:transition-transform` to reaction bar buttons
- Added rotating "no comments" messages (3 options) in CommentSectionComponent
- All animations respect `prefers-reduced-motion` via existing global CSS rule in design-tokens.css and `motion-safe:` Tailwind prefixes
- Added `provideNoopAnimations()` to app test setup to prevent animation issues in tests
- Added Windows drive letter normalization plugin to `libs/feature-cookbook/vite.config.mts` (was missing, causing test failures)
- 26 tests pass across 3 test suites (16 app, 6 shared-ui, 4 feature-cookbook), zero regressions
- Build passes successfully

### Change Log

- 2026-03-15: Story 1.4 implemented - witty microcopy, route animations, empty state actions, rotating subtitles, micro-interactions

### File List

- `apps/developer-hub/src/app/route-animations.ts` (NEW)
- `apps/developer-hub/src/app/app.config.ts` (MODIFIED)
- `apps/developer-hub/src/app/app.ts` (MODIFIED)
- `apps/developer-hub/src/app/app.html` (MODIFIED)
- `apps/developer-hub/src/app/app.spec.ts` (MODIFIED)
- `libs/shared/ui/src/lib/components/empty-state.ts` (MODIFIED)
- `libs/shared/ui/src/lib/components/empty-state.spec.ts` (NEW)
- `libs/feature-links/src/lib/pages/links-page.ts` (MODIFIED)
- `libs/feature-guidelines/src/lib/pages/guidelines-page.ts` (MODIFIED)
- `libs/feature-cookbook/src/lib/pages/cookbook-list-page.ts` (MODIFIED)
- `libs/feature-cookbook/src/lib/components/cookbook-card.ts` (MODIFIED)
- `libs/feature-cookbook/src/lib/components/reaction-bar.ts` (MODIFIED)
- `libs/feature-cookbook/src/lib/components/reaction-bar.spec.ts` (NEW)
- `libs/feature-cookbook/src/lib/components/comment-section.ts` (MODIFIED)
- `libs/feature-cookbook/vite.config.mts` (MODIFIED)
- `package.json` (MODIFIED - added @angular/animations)
- `package-lock.json` (MODIFIED)
