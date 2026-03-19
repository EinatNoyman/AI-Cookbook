---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-01b-continue', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
inputDocuments: ['_bmad-output/planning-artifacts/product-brief-bmad-demo-2026-02-21.md']
documentCounts:
  briefCount: 1
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 0
classification:
  projectType: web_app
  domain: general
  complexity: medium
  projectContext: greenfield
workflowType: 'prd'
---

# Product Requirements Document - bmad-demo

**Author:** Einat
**Date:** 2026-02-21

## Executive Summary

**Developer Hub** is a centralized Angular SPA for the engineering team — a single source of truth for links, guidelines, and a living AI Cookbook of curated prompts and code snippets for Claude, Copilot, Cursor, and Qodo.

**Problem:** Developer knowledge is scattered across Confluence, chat, and tribal memory. Finding the right link, guideline, or standard is slow. AI tool adoption is low because there are no structured workflows, prompts, or standards in one place. Result: cognitive load, duplicated effort, and persistent "black work."

**Solution:** A developer-first hub with three pillars — curated Links, structured Guidelines, and an AI Cookbook — wrapped in a chatty, playful UX that makes developers want to explore and return. Utility drives retention; personality drives discovery.

**Key Differentiators:**
- Developer- and AI-first (not a generic wiki)
- Single source of truth for links, guidelines, and AI prompts
- Witty, engaging UX designed for adoption — not just reference
- Tailored to the team's stack and AI tooling (Claude, Copilot, Cursor, Qodo)

**Target Users:** All developers — one audience, one flow, no role-based separation.

**Project Context:** Greenfield web app. Angular SPA. Medium complexity. Internal use only.

## Success Criteria

### User Success

- Developers find what they need quickly (links, guidelines, prompts) without hunting across Confluence or chat
- Developers use the AI Cookbook in real work — copying or applying prompts/snippets
- Developers say the hub was "worth it": low friction, high usefulness, no extra training required
- Success behaviors: regular visits (e.g. weekly), use during onboarding, reduced "where's that link?" questions

### Business Success

- Hub becomes the default "first place to look" for links and guidelines; measurable reduction in Confluence searches for developer-facing content
- Higher adoption of AI-assisted workflows; fewer duplicate or conflicting guidelines
- Short term (3 months): Hub is the go-to place; AI Cookbook has meaningful, discoverable content
- Medium term (12 months): Sustained AI tool usage supported by hub standards and prompts; qualitative signal that "black work" is decreasing

### Technical Success

- Angular SPA is fast, accessible, and works in supported browsers
- Content is easy to update (links, guidelines, cookbook entries) via static files
- No hard dependency on backend for MVP; static or simple data source that can evolve

### Measurable Outcomes

- **Engagement:** X% of developers use the hub at least weekly; Y visits/actions per active user per month
- **AI Cookbook usage:** Z cookbook prompts/snippets copied per month
- **Adoption:** New joiners use the hub in first week; reduction in Confluence searches for developer-facing content
- **Outcome:** Qualitative signal that "black work" is decreasing and AI-augmented workflow is becoming normal (team surveys, feedback)

## User Journeys

**User type in scope:** Developers only (all developers, same flow).

### Journey 1: Developer – Success Path (Core Experience)

**Opening scene:** A developer needs the deployment runbook link or a Cursor prompt for writing tests. They used to dig through Confluence or Slack; now they open the Developer Hub.

**Rising action:** They land on a clear home with playful nav (Links | Guidelines | AI Cookbook). They go to Links and find the right section, or go to AI Cookbook, pick a platform and category (e.g. Cursor – testing), and skim prompts. They copy the one they need with one click.

**Climax:** They get what they came for in under a minute. The "aha" moment: "This is the one place to look first."

**Resolution:** They finish their task and mentally bookmark the hub for next time. They might mention it to a teammate.

### Journey 2: Developer – Edge Case (First Time / Can't Find Something)

**Opening scene:** A developer is new to the team or hasn't used the hub before. They need a guideline on code review or an AI snippet. They're not sure where it lives.

**Rising action:** They open the hub (from onboarding, a link, or a teammate). They see a simple layout: Links, Guidelines, AI Cookbook. They try the most likely section. No login or complex navigation.

**Climax:** They either find it and copy it, or they don't — but they see what *is* there and how it's organized. No dead end: the structure itself is clear.

**Resolution:** If found, they use it and add the hub to their habits. If not, they know where to look next time or who to ask; the hub still feels like the right "home" for this kind of content.

### Journey Requirements Summary

| Journey | Capabilities Revealed |
|---------|----------------------|
| Success Path | Hub shell with clear nav; curated Links and Guidelines; AI Cookbook with platform/category filtering and copy-to-clipboard; fast, scannable layout |
| Edge Case | Same entry and nav for everyone; predictable structure; no mandatory login for MVP; content organized so gaps are obvious |

*No separate admin, support, or API user journeys in scope.*

## Domain-Specific Requirements

**Domain:** General (internal developer tooling). **Complexity:** Medium. No industry-specific regulations apply.

### Compliance & Regulatory

- None beyond standard internal tooling. Align with internal infosec or data policies if the hub later holds sensitive content.

### Technical Constraints

- Internal use only for MVP; same baseline as other internal apps (access, HTTPS)
- No hard real-time or multi-tenant requirements for MVP

### Integration Requirements

- MVP is standalone. Future: optional SSO, deep links to Confluence, usage analytics.

## Innovation & Novel Patterns

### Detected Innovation Areas

- **Living AI Cookbook:** Curated prompts and code snippets for Claude, Copilot, Cursor, and Qodo in one internal hub — different from generic wikis or scattered docs
- **Combined experience:** Centralized links + guidelines + AI-first content in a single developer experience, designed to pull developers toward AI tools
- **Adoption-focused UX:** Witty microcopy and playful UI elements to encourage exploration, not just reference

### Market Context

- Confluence and similar tools are document-centric and not developer- or AI-first. The hub differentiates by being a structured, engaging, AI Cookbook tailored to the team's stack.

### Validation Approach

- **Usage:** Hub visits and cookbook copy/use per month
- **Adoption:** Increased AI-assisted workflows; qualitative "worth it" and reduced "black work" feedback
- **Behavior:** New joiners use the hub in the first week; developers treat it as the default first place to look

## Web App Specific Requirements

### Project-Type Overview

Angular SPA for internal use: links, guidelines, and AI Cookbook. Browser-delivered; no native or CLI requirements.

### Technical Architecture

- **SPA:** Client-side routing and lazy-loaded areas (Links, Guidelines, AI Cookbook) for fast navigation
- **Data:** Static data source (JSON files) for MVP; content updatable via code deploy

### Browser Matrix

- **Target:** Current versions of Chrome, Firefox, Edge, Safari (desktop). No legacy or IE support.
- **Testing:** Validate on at least two major browsers for MVP.

### Responsive Design

- **Primary:** Desktop/laptop. Layout works well on typical office screens.
- **Secondary:** Usable on tablets; mobile not required for MVP but layout should not break on small viewports.

### SEO Strategy

- Not a priority for MVP (internal hub). Revisit if content is ever exposed publicly.

### Implementation Considerations

- **Stack:** Angular; align with team standards (version, state approach, styling)
- **Deploy:** Standard internal web hosting; HTTPS; same access model as other internal tools
- **Content updates:** Edit JSON/config files and deploy; no CMS for MVP

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP — deliver real utility (links, guidelines, AI Cookbook) wrapped in a fun, chatty UX that makes developers want to explore and return. Personality drives discovery; practical content drives retention.

**Resource Requirements:** Small team (1-2 developers); content authored separately. Static/JSON-based content for MVP — no backend or CMS required.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Developer finds a link, guideline, or AI prompt quickly (Success Path)
- New developer discovers the hub and understands its structure immediately (Edge Case)

**Must-Have Capabilities:**
- Angular SPA shell with clear, playful navigation (Links | Guidelines | AI Cookbook)
- Curated links section — organized, scannable, one-click access
- Developer guidelines — structured, replaces scattered Confluence content
- AI Cookbook for **Claude, Copilot, Cursor, Qodo** — browse by platform/category, copy-to-clipboard
- Reactions and comments on cookbook entries (stored locally for MVP, API-backed later)
- Witty microcopy and playful UI elements throughout (section intros, empty states, tooltips, transitions)
- Static/JSON-based content — easy to update via code deploy, no CMS for MVP
- Desktop-first responsive layout; usable on tablets

### Post-MVP Features

**Phase 2 (Growth):**
- Additional AI platforms (Bolt, others as adopted by team)
- Search and filtering across all content
- Favorites or bookmarks for frequently used prompts/links
- Usage hints or ratings on cookbook entries
- Basic analytics (visits, most-copied prompts)
- Onboarding integration — hub promoted to new joiners explicitly

**Phase 3 (Expansion):**
- Contribution path — developers can suggest or submit cookbook entries (governed)
- Richer guidelines with workflows, diagrams, or step-by-step flows
- Analytics dashboard — adoption signals, content gaps, usage trends
- Deeper integration with AI platforms or internal tools where valuable
- Optional CMS or admin for non-developer content updates

### Risk Mitigation Strategy

**Technical Risks:** Low for MVP — standard Angular SPA with static content. Mitigate by aligning with team Angular standards and keeping dependencies minimal.

**Adoption Risks (primary):** Developers don't find it useful or practical. Mitigate by: (1) launching with genuinely useful, curated content; (2) fun UX that rewards exploration; (3) explicit promotion via onboarding and team channels; (4) fast feedback loop — watch what gets used, cut what doesn't.

**Content Risks:** Stale or low-quality content kills trust. Mitigate by: clear ownership of each content area; low-friction update process (edit JSON/config, deploy); start with fewer high-quality entries rather than many weak ones.

**Resource Risks:** Small team, limited bandwidth. Mitigate by: static content approach (no backend to maintain); phased roadmap so MVP stays lean; content authoring in parallel with development.

## Functional Requirements

### Navigation & Hub Structure

- FR1: Developers can navigate between main content areas (Links, Guidelines, AI Cookbook) from any page
- FR2: Developers can identify which section they are in at all times
- FR3: Developers can access the hub without login or authentication for MVP

### Links Management

- FR4: Developers can browse curated developer links organized by category
- FR5: Developers can open any curated link in a new tab with one click
- FR6: Developers can scan link categories quickly to find the right section

### Guidelines & Standards

- FR7: Developers can browse developer guidelines organized by topic
- FR8: Developers can read full guideline content within the hub
- FR9: Developers can identify which guidelines are most relevant to their current task

### AI Cookbook

- FR10: Developers can browse AI cookbook entries filtered by platform (Claude, Copilot, Cursor, Qodo)
- FR11: Developers can browse AI cookbook entries filtered by category/use case (e.g., testing, refactoring, code review)
- FR12: Developers can view the full content of a cookbook entry (prompt text, context, usage notes)
- FR13: Developers can copy a prompt or code snippet to clipboard with one action
- FR14: Developers can see which platform(s) a cookbook entry applies to

### Content Interaction

- FR15: Developers can find content through scannable, well-organized layouts without requiring search for MVP
- FR16: Developers can receive clear feedback when an action completes (e.g., copy confirmation)
- FR17: Developers can navigate the hub using keyboard only

### UX Personality & Engagement

- FR18: Developers encounter witty, contextual microcopy throughout the hub (section intros, empty states, tooltips)
- FR19: Developers experience playful UI transitions and visual elements that make the hub feel distinct from generic internal tools
- FR20: Developers see helpful, personality-driven messaging when content is not yet available (empty states)

### Feedback & Reactions

- FR21: Developers can react to a cookbook entry (e.g., thumbs up/down or similar quick reaction)
- FR22: Developers can leave a short comment on a cookbook entry
- FR23: Developers can view reactions and comments left by others on a cookbook entry

### Content Management (Internal)

- FR24: Content maintainers can update links, guidelines, and cookbook entries via static files (JSON/config) without requiring a backend
- FR25: Content maintainers can add new cookbook entries for any supported platform without code changes to the application

## Non-Functional Requirements

### Performance

- Page load (LCP) under 2.5 seconds on typical internal network
- Navigation between sections under 300ms
- Copy-to-clipboard under 100ms with immediate visual feedback
- Hub remains responsive with 200+ cookbook entries loaded

### Security

- Hub served over HTTPS only
- No sensitive or credential data stored in the client for MVP
- Reactions/comments API (when added) uses standard internal authentication

### Accessibility

- WCAG 2.1 Level A compliance for all pages
- WCAG 2.1 Level AA for primary flows (navigation, browse cookbook, copy prompt)
- All interactive elements reachable and operable via keyboard
- Screen reader support for main navigation, content areas, and copy actions
- Visible focus indicators on all interactive elements

### Integration

- MVP operates as standalone app with no external dependencies
- Content served from static files (JSON/config) bundled with the application
- Architecture supports future API integration for reactions/comments without major refactoring
