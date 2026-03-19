שגג# Story 2.1: Links Data Model & Service

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want links loaded from a static JSON file and served through a signal-based service,
So that the links section has content to display.

## Acceptance Criteria

1. **Given** `links.json` exists in `libs/shared/data/content/` **When** the links service is initialized **Then** links are loaded and exposed as a readonly signal
2. **And** links are organized by category with `id`, `title`, `url`, `description`, `category`, `tags`
3. **And** the TypeScript interface matches the JSON schema
4. **And** `isLoading` signal is exposed for loading state

## Tasks / Subtasks

- [x] Task 1: Verify existing Link model and service (AC: #1, #2, #3, #4)
  - [x] Confirm `Link` interface in `libs/shared/data/src/lib/models/link.model.ts` matches all required fields (`id`, `title`, `url`, `description`, `category`, `tags`)
  - [x] Confirm `LinksService` in `libs/shared/data/src/lib/services/links.service.ts` uses signal-based patterns (`signal()`, `computed()`, `.asReadonly()`)
  - [x] Confirm `isLoading` signal is exposed as readonly
  - [x] Confirm `links.json` in `libs/shared/data/src/lib/content/links.json` has entries matching the `Link` interface
  - [x] Confirm `LinksService` and `Link` are exported from `libs/shared/data/src/index.ts`

- [x] Task 2: Fix any gaps in the existing implementation (AC: all)
  - [x] Add `readonly` modifier to `linksByCategory` computed signal (currently missing `readonly` keyword)
  - [x] Verify JSON data has sufficient variety of categories for meaningful grouping (currently has 8 categories across 10 links)

- [x] Task 3: Write comprehensive unit tests for LinksService (AC: all)
  - [x] Test that `links` signal returns all links from JSON on initialization
  - [x] Test that `isLoading` signal is exposed and initially `false`
  - [x] Test that `categories` computed signal returns sorted unique categories
  - [x] Test that `linksByCategory` computed signal groups links correctly by category
  - [x] Test that all links have required fields (`id`, `title`, `url`, `description`, `category`, `tags`)
  - [x] Test that `links` signal is readonly (cannot be modified externally)

- [x] Task 4: Build and verify (AC: all)
  - [x] Run `npx vitest run --config libs/shared/data/vite.config.mts --reporter=verbose` -- all tests pass
  - [x] Run `nx build developer-hub` -- build passes
  - [x] Verify Links page still renders correctly with the service

## Dev Notes

### Current State Analysis

**IMPORTANT: This story's core functionality is already implemented!**

The Links data model, service, and JSON content were built during Epic 1 stories (1-2 App Shell & Navigation required actual content to display). Here is what exists:

**Already implemented:**
- `Link` interface with all required fields (`id`, `title`, `url`, `description`, `category`, `tags`) in `libs/shared/data/src/lib/models/link.model.ts`
- `LinksService` with signal-based state management in `libs/shared/data/src/lib/services/links.service.ts`
- `links.json` with 10 sample links across 8 categories in `libs/shared/data/src/lib/content/links.json`
- Service is `providedIn: 'root'`, uses `signal()` + `computed()` + `.asReadonly()`
- Links are imported at build time (static JSON import, no HTTP)
- Public API exports both `Link` and `LinksService` from `@bmad-demo/shared-data`
- Links page (`libs/feature-links/src/lib/pages/links-page.ts`) consumes the service and renders correctly

**Minor gap to fix:**
- `linksByCategory` computed signal is missing the `readonly` modifier (line 18 of `links.service.ts`)

**What's needed:**
- Unit tests for `LinksService` (none exist yet)
- Verify all AC are formally satisfied

### Architecture Compliance Notes

**Path alias (known divergence from Story 1-1):**
- Actual: `@bmad-demo/shared-data`
- Architecture doc: `@bmad-demo/shared/data`
- Do NOT change -- functional and established

**Angular 21 signal patterns (MANDATORY):**
- `signal()` for mutable state, `.asReadonly()` for public access
- `computed()` for derived state
- NO `BehaviorSubject` or RxJS for state management
- `@Injectable({ providedIn: 'root' })` for singleton services

**Static JSON content pattern:**
- Direct import: `import linksData from '../content/links.json'`
- TypeScript `resolveJsonModule: true` enables this
- Content bundled at build time, no HTTP calls for MVP

### Existing Service Implementation

```typescript
// libs/shared/data/src/lib/services/links.service.ts
@Injectable({ providedIn: 'root' })
export class LinksService {
  private readonly _links = signal<Link[]>(linksData);
  private readonly _isLoading = signal(false);
  readonly links = this._links.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly categories = computed(() => [...new Set(this._links().map(l => l.category))].sort());
  linksByCategory = computed(() => { /* groups links by category into Map */ });
}
```

### Test Pattern

```typescript
// libs/shared/data/src/lib/services/links.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { LinksService } from './links.service';

describe('LinksService', () => {
  let service: LinksService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinksService);
  });
  // ... tests
});
```

### Vitest Windows Fix (CRITICAL)

Tests on Windows require the drive letter normalization plugin in `vite.config.mts`. Check that `libs/shared/data/vite.config.mts` has this plugin. If not, add it following the pattern in `apps/developer-hub/vite.config.mts`.

### Key Files

| File | Status | Action |
|---|---|---|
| `libs/shared/data/src/lib/models/link.model.ts` | EXISTS | Verify fields |
| `libs/shared/data/src/lib/services/links.service.ts` | EXISTS | Fix `readonly` on `linksByCategory` |
| `libs/shared/data/src/lib/content/links.json` | EXISTS | Verify data |
| `libs/shared/data/src/index.ts` | EXISTS | Verify exports |
| `libs/shared/data/src/lib/services/links.service.spec.ts` | MISSING | Create |
| `libs/shared/data/vite.config.mts` | EXISTS | Verify Windows plugin |

### Key Files NOT to Modify

- `libs/feature-links/src/lib/pages/links-page.ts` -- Page component, not part of this story
- `libs/shared/data/src/lib/services/toast.service.ts` -- Unrelated
- Any component files -- This story is data layer only

### Previous Story Intelligence (Story 1-4)

Key learnings from Story 1-4:
1. **Windows drive letter fix** -- The `feature-cookbook/vite.config.mts` was missing the `normalizeWindowsDriveLetterPlugin` and `server.deps.inline` config, causing test failures with `@bmad-demo/*` imports. Check shared-data config too.
2. **Test patterns** -- Use `TestBed.inject()` for root-provided services
3. **Signal testing** -- Call signal as function to get value: `service.links()`, `service.isLoading()`

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.1]
- [Source: _bmad-output/planning-artifacts/architecture.md#Data Layer]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

No debug issues encountered.

### Completion Notes List

- **Task 1:** Verified all existing implementation files. `Link` interface has all 6 required fields. `LinksService` uses Angular 21 signal patterns correctly (`signal()`, `computed()`, `.asReadonly()`). `links.json` has 10 entries across 8 categories. Public API exports are correct via barrel exports in `index.ts`.
- **Task 2:** Added `readonly` modifier to `linksByCategory` computed signal on line 18 of `links.service.ts`. Confirmed JSON data has 8 categories across 10 links — sufficient variety for meaningful grouping. Windows drive letter plugin not needed for this lib's tests (only relative imports used).
- **Task 3:** Created comprehensive unit test suite `links.service.spec.ts` with 9 tests covering: links signal initialization, required field validation, readonly enforcement (links + isLoading), categories sorting/uniqueness, and linksByCategory grouping correctness. All tests pass.
- **Task 4:** All 10 tests pass (9 new + 1 pre-existing). `nx build developer-hub` succeeds. Build artifacts generated successfully. No regressions introduced — pre-existing empty test scaffolds in other projects are unrelated.

### File List

- `libs/shared/data/src/lib/services/links.service.ts` — Modified: added `readonly` modifier to `linksByCategory`
- `libs/shared/data/src/lib/services/links.service.spec.ts` — New: comprehensive unit tests for LinksService (9 tests)

## Change Log

- 2026-03-15: Implemented Story 2.1 — verified existing Link model and LinksService, fixed `readonly` gap on `linksByCategory`, wrote 9 comprehensive unit tests. All tests pass, build succeeds.
