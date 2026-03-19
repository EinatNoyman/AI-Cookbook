---
stepsCompleted: [1, 2, 3, 4]
status: 'complete'
completedAt: '2026-03-02'
inputDocuments: ['_bmad-output/planning-artifacts/prd.md', '_bmad-output/planning-artifacts/architecture.md', '_bmad-output/planning-artifacts/ux-design-specification.md']
---

# bmad-demo - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for bmad-demo, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Developers can navigate between main content areas (Links, Guidelines, AI Cookbook) from any page
FR2: Developers can identify which section they are in at all times
FR3: Developers can access the hub without login or authentication for MVP
FR4: Developers can browse curated developer links organized by category
FR5: Developers can open any curated link in a new tab with one click
FR6: Developers can scan link categories quickly to find the right section
FR7: Developers can browse developer guidelines organized by topic
FR8: Developers can read full guideline content within the hub
FR9: Developers can identify which guidelines are most relevant to their current task
FR10: Developers can browse AI cookbook entries filtered by platform (Claude, Copilot, Cursor, Qodo)
FR11: Developers can browse AI cookbook entries filtered by category/use case (e.g., testing, refactoring, code review)
FR12: Developers can view the full content of a cookbook entry (prompt text, context, usage notes)
FR13: Developers can copy a prompt or code snippet to clipboard with one action
FR14: Developers can see which platform(s) a cookbook entry applies to
FR15: Developers can find content through scannable, well-organized layouts without requiring search for MVP
FR16: Developers can receive clear feedback when an action completes (e.g., copy confirmation)
FR17: Developers can navigate the hub using keyboard only
FR18: Developers encounter witty, contextual microcopy throughout the hub (section intros, empty states, tooltips)
FR19: Developers experience playful UI transitions and visual elements that make the hub feel distinct from generic internal tools
FR20: Developers see helpful, personality-driven messaging when content is not yet available (empty states)
FR21: Developers can react to a cookbook entry (e.g., thumbs up/down or similar quick reaction)
FR22: Developers can leave a short comment on a cookbook entry
FR23: Developers can view reactions and comments left by others on a cookbook entry
FR24: Content maintainers can update links, guidelines, and cookbook entries via static files (JSON/config) without requiring a backend
FR25: Content maintainers can add new cookbook entries for any supported platform without code changes to the application

### NonFunctional Requirements

NFR1: Page load (LCP) under 2.5 seconds on typical internal network
NFR2: Navigation between sections under 300ms
NFR3: Copy-to-clipboard under 100ms with immediate visual feedback
NFR4: Hub remains responsive with 200+ cookbook entries loaded
NFR5: Hub served over HTTPS only
NFR6: No sensitive or credential data stored in the client for MVP
NFR7: Reactions/comments API (when added) uses standard internal authentication
NFR8: WCAG 2.1 Level A compliance for all pages
NFR9: WCAG 2.1 Level AA for primary flows (navigation, browse cookbook, copy prompt)
NFR10: All interactive elements reachable and operable via keyboard
NFR11: Screen reader support for main navigation, content areas, and copy actions
NFR12: Visible focus indicators on all interactive elements
NFR13: MVP operates as standalone app with no external dependencies
NFR14: Content served from static files (JSON/config) bundled with the application
NFR15: Architecture supports future API integration for reactions/comments without major refactoring

### Additional Requirements

**From Architecture:**
- Starter template: `npx create-nx-workspace@latest bmad-demo` with Angular monorepo preset (Angular 21, Nx 22.5)
- Post-init: Tailwind CSS setup + Angular Aria installation
- 6 Nx libraries: `ui`, `shared/data`, `shared/styles`, `feature-links`, `feature-guidelines`, `feature-cookbook`
- Nx module boundary enforcement via tags (`scope:feature`, `scope:ui`, `scope:shared`)
- Angular 21 modern features: zoneless, signals (`input()`, `output()`, `viewChild()`), `@if`/`@for`/`@switch`, Signal Forms, Angular Aria
- Vitest for unit tests, Playwright for e2e tests
- esbuild bundler with Nx caching
- Static JSON content files in `libs/shared/data/content/`
- localStorage for theme, tool selection, reactions persistence

**From UX Design:**
- Responsive breakpoints: 3-col (lg) → 2-col (md) → 1-col (sm/default)
- Keyboard shortcuts: `/` for search, `c` to copy focused card, `Esc` to close, arrow keys for navigation
- URL state management: filters/search reflected in URL params (`?tool=claude&q=refactor`)
- Dark/light theme toggle with Tailwind `dark:` variant
- Toast personality: rotating witty copy messages on actions
- Component phases: Core (CookbookCard, ToolSelector, CopyButton, SearchBar, Toast) → Navigation (FilterSidebar) → Engagement (ReactionBar)
- Typography: Inter/Geist Sans for prose, JetBrains Mono for code
- Color: Muted slate palette with tool-specific accents (Claude violet, Copilot sky, Cursor teal, Qodo emerald)

### FR Coverage Map

| FR | Epic | Description |
|---|---|---|
| FR1 | Epic 1 | Navigate between sections |
| FR2 | Epic 1 | Identify current section |
| FR3 | Epic 1 | No auth required |
| FR4 | Epic 2 | Browse links by category |
| FR5 | Epic 2 | Open links in new tab |
| FR6 | Epic 2 | Scan link categories |
| FR7 | Epic 3 | Browse guidelines by topic |
| FR8 | Epic 3 | Read full guideline content |
| FR9 | Epic 3 | Identify relevant guidelines |
| FR10 | Epic 4 | Filter by platform |
| FR11 | Epic 4 | Filter by category |
| FR12 | Epic 4 | View full entry content |
| FR13 | Epic 4 | Copy to clipboard |
| FR14 | Epic 4 | See platform badges |
| FR15 | Epic 2,3,4 | Scannable layouts |
| FR16 | Epic 4 | Action feedback |
| FR17 | Epic 1 | Keyboard navigation |
| FR18 | Epic 1 | Witty microcopy |
| FR19 | Epic 1 | Playful transitions |
| FR20 | Epic 4 | Personality empty states |
| FR21 | Epic 5 | React to entries |
| FR22 | Epic 5 | Comment on entries |
| FR23 | Epic 5 | View reactions/comments |
| FR24 | Epic 6 | Update content via JSON |
| FR25 | Epic 6 | Add entries without code changes |

## Epic List

### Epic 1: Project Foundation & App Shell
Developers can access the hub and navigate between all main sections with a polished, personality-driven shell.
**FRs covered:** FR1, FR2, FR3, FR17, FR18, FR19

### Epic 2: Curated Links Hub
Developers can browse and access curated developer links organized by category with one-click navigation.
**FRs covered:** FR4, FR5, FR6, FR15

### Epic 3: Guidelines & Standards
Developers can browse and read structured developer guidelines within the hub, replacing scattered Confluence content.
**FRs covered:** FR7, FR8, FR9, FR15

### Epic 4: AI Cookbook — Browse, Filter & Copy
Developers can browse cookbook entries by platform and category, view full content, and copy prompts/snippets with one click — the core value of the hub.
**FRs covered:** FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR20

### Epic 5: Reactions & Comments
Developers can react to and comment on cookbook entries, creating social proof and community engagement around content.
**FRs covered:** FR21, FR22, FR23

### Epic 6: Content Management & Polish
Content maintainers can update all content via static JSON files, and the app meets all quality/accessibility standards.
**FRs covered:** FR24, FR25

---

## Epic 1: Project Foundation & App Shell

Developers can access the hub and navigate between all main sections with a polished, personality-driven shell.

### Story 1.1: Nx Workspace Initialization

As a developer,
I want the project scaffolded with Nx, Angular 21, Tailwind, and all shared libraries,
So that the foundation is ready for feature development.

**Acceptance Criteria:**

**Given** a clean environment
**When** the workspace init commands are run
**Then** Nx workspace is created with `apps/developer-hub` and `libs/` structure
**And** Tailwind CSS is configured with a shared preset in `libs/shared/styles`
**And** Angular Aria is installed
**And** All 6 Nx libraries are generated with proper scope tags
**And** Module boundary rules are configured in `nx.json`
**And** `nx serve developer-hub` builds and serves successfully
**And** Vitest runs with no errors

### Story 1.2: App Shell & Navigation

As a developer,
I want a navigation shell with Links, Guidelines, and AI Cookbook sections,
So that I can move between content areas from any page.

**Acceptance Criteria:**

**Given** the app is loaded
**When** a developer views any page
**Then** a top navigation bar is visible with logo, search placeholder, and tool selector placeholder
**And** a sidebar or nav shows Links, Guidelines, AI Cookbook sections
**And** the current section is visually highlighted (FR2)
**And** clicking a section navigates to it via lazy-loaded routes
**And** navigation completes in under 300ms (NFR2)
**And** no authentication is required (FR3)
**And** keyboard navigation works (Tab, Enter) for all nav elements (FR17)
**And** semantic HTML landmarks and ARIA labels are present (NFR11)

### Story 1.3: Theme Toggle & Design Tokens

As a developer,
I want a dark/light theme toggle with the "Developer Calm" aesthetic,
So that the hub matches my IDE preference and feels polished.

**Acceptance Criteria:**

**Given** the app is loaded
**When** a developer clicks the theme toggle
**Then** the theme switches between dark and light mode
**And** the preference is persisted in localStorage
**And** Tailwind `dark:` variant applies across all components
**And** colors use the muted slate palette from the design system
**And** Inter/Geist Sans is loaded for prose, JetBrains Mono for code blocks
**And** focus indicators are visible on all interactive elements (NFR12)
**And** `prefers-reduced-motion` disables animations

### Story 1.4: Witty Microcopy & Personality Foundation

As a developer,
I want witty section intros, playful transitions, and personality-driven empty states,
So that the hub feels fun and distinct from generic internal tools.

**Acceptance Criteria:**

**Given** a developer navigates to any section
**When** content is displayed
**Then** section headers include contextual, witty intro text (FR18)
**And** page transitions use subtle, playful animations (FR19)
**And** empty states show personality-driven messages with suggested actions (FR20)
**And** animations respect `prefers-reduced-motion`

## Epic 2: Curated Links Hub

Developers can browse and access curated developer links organized by category with one-click navigation.

### Story 2.1: Links Data Model & Service

As a developer,
I want links loaded from a static JSON file and served through a signal-based service,
So that the links section has content to display.

**Acceptance Criteria:**

**Given** `links.json` exists in `libs/shared/data/content/`
**When** the links service is initialized
**Then** links are loaded and exposed as a readonly signal
**And** links are organized by category with `id`, `title`, `url`, `description`, `category`, `tags`
**And** the TypeScript interface matches the JSON schema
**And** `isLoading` signal is exposed for loading state

### Story 2.2: Links Page — Browse & Open

As a developer,
I want to browse links organized by category and open any link in a new tab,
So that I can quickly find and access the developer resources I need.

**Acceptance Criteria:**

**Given** the developer navigates to `/links`
**When** the page loads
**Then** links are displayed in a scannable card layout grouped by category (FR4, FR6, FR15)
**And** each card shows title, description, and category
**And** clicking a link opens it in a new tab (FR5)
**And** skeleton loaders show during content load
**And** keyboard navigation works for all link cards (Tab, Enter)
**And** responsive grid: 3-col (lg) → 2-col (md) → 1-col (sm)

## Epic 3: Guidelines & Standards

Developers can browse and read structured developer guidelines within the hub, replacing scattered Confluence content.

### Story 3.1: Guidelines Data Model & Service

As a developer,
I want guidelines loaded from a static JSON file with topic-based organization,
So that the guidelines section has structured content.

**Acceptance Criteria:**

**Given** `guidelines.json` exists in `libs/shared/data/content/`
**When** the guidelines service is initialized
**Then** guidelines are loaded and exposed as a readonly signal
**And** each guideline has `id`, `title`, `topic`, `content` (markdown/HTML), `tags`
**And** guidelines are grouped by topic

### Story 3.2: Guidelines Page — Browse & Read

As a developer,
I want to browse guidelines by topic and read full content within the hub,
So that I can find relevant standards without leaving to Confluence.

**Acceptance Criteria:**

**Given** the developer navigates to `/guidelines`
**When** the page loads
**Then** guidelines are displayed organized by topic (FR7)
**And** Angular Aria Accordion is used for collapsible topic sections
**And** clicking a guideline expands to show full content (FR8)
**And** content renders with proper typography and code blocks
**And** topic organization helps identify relevant guidelines (FR9)
**And** scannable layout without requiring search (FR15)
**And** keyboard navigation works for accordion and content

## Epic 4: AI Cookbook — Browse, Filter & Copy

Developers can browse cookbook entries by platform and category, view full content, and copy prompts/snippets with one click — the core value of the hub.

### Story 4.1: Cookbook Data Model & Service

As a developer,
I want cookbook entries loaded from a static JSON file with platform and category metadata,
So that the cookbook has structured, filterable content.

**Acceptance Criteria:**

**Given** `cookbook-entries.json` exists in `libs/shared/data/content/`
**When** the cookbook service is initialized
**Then** entries are loaded as a readonly signal
**And** each entry has `id`, `title`, `description`, `platform`, `category`, `copyContent`, `language`, `usage`, `tags`
**And** `filteredEntries` computed signal reacts to tool and category filters
**And** `isLoading` signal is exposed

### Story 4.2: Tool Selector & Platform Filtering

As a developer,
I want to filter cookbook entries by AI platform (Claude, Copilot, Cursor, Qodo),
So that I only see prompts relevant to my current tool.

**Acceptance Criteria:**

**Given** the developer is on `/cookbook`
**When** they click a tool in the ToolSelector
**Then** only entries for that platform are displayed (FR10)
**And** the ToolSelector uses Angular Aria Tabs with tool-specific accent colors
**And** an "All" option shows entries for every platform
**And** the selected tool is persisted in localStorage
**And** the tool selection is reflected in the URL (`?tool=claude`) for shareability
**And** each entry shows a platform badge (FR14)

### Story 4.3: Category Filtering & Search

As a developer,
I want to filter cookbook entries by category and search by keyword,
So that I can narrow down to exactly the prompt I need.

**Acceptance Criteria:**

**Given** entries are displayed on `/cookbook`
**When** the developer selects a category from the FilterSidebar
**Then** entries are filtered to that category (FR11)
**And** active filters show as removable chips above the grid
**And** "Clear all" resets filters
**When** the developer types in the SearchBar
**Then** results filter in real-time with 150ms debounce
**And** search term is reflected in URL (`?q=refactor`)
**And** result count is displayed ("12 prompts for Claude")
**And** `/` keyboard shortcut focuses the search bar
**And** `Esc` clears the search

### Story 4.4: Cookbook Card & Entry Detail

As a developer,
I want to browse cookbook entries as cards and expand any entry to see full content,
So that I can quickly assess relevance and access the complete prompt.

**Acceptance Criteria:**

**Given** filtered entries are displayed
**When** the developer views the card grid
**Then** each CookbookCard shows: tool accent stripe, title, preview, tags, copy button, reaction count (FR15)
**And** hover elevates the card with subtle shadow
**When** the developer clicks a card or navigates to `/cookbook/:id`
**Then** full content is displayed: prompt text, context, usage notes, syntax-highlighted code (FR12)
**And** skeleton loaders show during any content transitions
**And** empty states show personality-driven messages (FR20)

### Story 4.5: Copy to Clipboard

As a developer,
I want to copy a prompt or snippet to my clipboard with one click,
So that I can immediately paste it into my AI tool.

**Acceptance Criteria:**

**Given** a cookbook entry is visible (card or detail view)
**When** the developer clicks the CopyButton (or presses `c` when card is focused)
**Then** the `copyContent` is written to clipboard via Clipboard API (FR13)
**And** the button animates to a checkmark state for 1.5s
**And** a toast appears with rotating witty confirmation messages (FR16)
**And** the toast auto-dismisses after 3s
**And** the toast has `role="status"` and `aria-live="polite"` for screen readers
**And** copy completes in under 100ms (NFR3)
**And** if clipboard fails, an error toast with a clear message is shown

## Epic 5: Reactions & Comments

Developers can react to and comment on cookbook entries, creating social proof and community engagement around content.

### Story 5.1: Reactions on Cookbook Entries

As a developer,
I want to react to a cookbook entry with a quick emoji,
So that I can signal which prompts are useful to the team.

**Acceptance Criteria:**

**Given** a cookbook entry is displayed
**When** the developer clicks a reaction emoji on the ReactionBar
**Then** the reaction count increments with animation (FR21)
**And** the user's reaction is highlighted
**And** reactions are persisted in localStorage via StorageService
**And** other users' reactions are visible (FR23)
**And** the ReactionBar offers 3-4 preset emoji options
**And** the interface is designed for future API swap (NFR15)

### Story 5.2: Comments on Cookbook Entries

As a developer,
I want to leave a short comment on a cookbook entry,
So that I can share tips or context with teammates.

**Acceptance Criteria:**

**Given** a cookbook entry detail view is open
**When** the developer writes a comment and submits
**Then** the comment appears immediately (FR22)
**And** existing comments from others are visible (FR23)
**And** comments are stored in localStorage for MVP
**And** no authentication is required for MVP
**And** comments show a timestamp
**And** the comment input uses accessible form patterns

## Epic 6: Content Management & Polish

Content maintainers can update all content via static JSON files, and the app meets all quality/accessibility standards.

### Story 6.1: Content Schema Documentation & Validation

As a content maintainer,
I want clear JSON schemas and documentation for all content types,
So that I can add or update content without code changes.

**Acceptance Criteria:**

**Given** a content maintainer wants to update content
**When** they edit `links.json`, `guidelines.json`, or `cookbook-entries.json`
**Then** TypeScript interfaces enforce the schema at build time (FR24)
**And** adding a new cookbook entry for any supported platform requires only a JSON addition (FR25)
**And** adding a new platform requires only adding entries with the new platform value
**And** build fails with clear error messages if JSON schema is invalid

### Story 6.2: E2E Tests & NFR Compliance

As a developer,
I want end-to-end tests and verified accessibility/performance,
So that the app meets all quality standards before release.

**Acceptance Criteria:**

**Given** the full app is deployed
**When** Playwright e2e tests run
**Then** all 3 user journeys pass (discovery→copy, returning user, react/comment)
**And** LCP is under 2.5s (NFR1)
**And** WCAG 2.1 AA compliance is verified via axe-core (NFR8, NFR9)
**And** all interactive elements have visible focus indicators (NFR12)
**And** screen reader announces navigation, content, and copy actions (NFR11)
**And** the app handles 200+ cookbook entries without performance degradation (NFR4)
