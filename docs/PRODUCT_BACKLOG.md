# HEARTH Product Backlog (V3.0 to Build)

## Scope and Priority

- P0: Must ship for playable research prototype
- P1: Should ship for MVP quality
- P2: Can ship after MVP

## Epic A: Core Game Loop

### A1. Phase 1 Self-Discovery (3 scenes)
- Priority: P0
- Goal: Infer initial attachment style and archetype without explicit labeling
- User stories:
  - As a player, I complete 3 scenarios and see meaningful profile feedback
  - As a system, I score `selfWorth`, `motivation`, `pattern`, attachment, and archetype
- Acceptance criteria:
  - 3 scenes, each with 4 choices minimum
  - Scene progression and end summary work
  - Scores persist across scenes in one run

### A2. Phase 2 Daily Sim Loop
- Priority: P0
- Goal: 5 turns/day with visible behavior consequences
- User stories:
  - As a player, I interact with one archetype character for 5 turns
  - As a player, I receive turn feedback and day-end summary
- Acceptance criteria:
  - 5 turns/day
  - Scenario adaptation by archetype and player style
  - Secure progress updates every turn

### A3. Phase 3 Real Connection (pre-MVP shell)
- Priority: P2
- Goal: Prepare architecture for future online matching
- User stories:
  - As a team, we have interface contracts for matchmaking and profile export
- Acceptance criteria:
  - API contract draft for stable matching
  - Placeholder UI route and data schema

## Epic B: Meta Progression and Economy

### B1. Cross-day progression
- Priority: P0
- Goal: Continue day-to-day progress from local persistence
- Acceptance criteria:
  - `day`, `secureProgress`, `difficultyTier`, `insightPoints` persist in local storage
  - Start next day from saved state

### B2. Perk economy
- Priority: P1
- Goal: Strategic layer with unlocks and daily active perk selection
- Acceptance criteria:
  - Perk unlock thresholds
  - Rarity-weighted perk offers
  - Reroll with Insight cost scaling
  - One active perk/day

### B3. Explainability and telemetry
- Priority: P1
- Goal: Show why a perk is recommended
- Acceptance criteria:
  - EV score, secure EV, insight EV shown
  - Tooltip reason per perk
  - Compact/expanded detail mode and saved UI preference

## Epic C: Content System (10 Chapters)

### C1. World map data model
- Priority: P0
- Goal: Data-driven chapter config for scenes and hidden questions
- Acceptance criteria:
  - All 10 chapters represented in JSON
  - Each chapter maps to hidden question focus (`selfWorth`/`motivation`/`pattern`)
  - Ready for renderer integration

### C2. Narrative scenario packs
- Priority: P1
- Goal: Scenario bundles keyed by archetype and difficulty
- Acceptance criteria:
  - Weighted scenario tags
  - No-repeat behavior per day loop
  - Fallback scenarios available

## Epic D: Systems and Safety

### D1. Responsible design messaging
- Priority: P0
- Goal: Avoid therapeutic over-claim and provide escalation guidance
- Acceptance criteria:
  - In-app disclaimer copy
  - Risk pattern threshold with professional help recommendation

### D2. Analytics for research group
- Priority: P1
- Goal: Collect non-identifying behavior metrics for pilot study
- Acceptance criteria:
  - Event schema for choices, turn outcomes, day summaries
  - Export JSON session report

## Epic E: UX and Platform

### E1. Navigation and game states
- Priority: P0
- Acceptance criteria:
  - Deterministic state machine for all views
  - Restart Run and Reset UI Preferences separated

### E2. PWA shell
- Priority: P2
- Acceptance criteria:
  - Basic manifest/service worker
  - Offline for local prototype content

---

## Sprint-ready Task Breakdown

### Sprint 1 (P0 baseline)
- [ ] Integrate `worldMap10` chapter config into Phase 1/2 flow
- [ ] Add chapter progression state (`chapterIndex`, `chapterHistory`)
- [ ] Connect hidden question focus to scoring multipliers
- [ ] Add responsible-design message component
- [ ] Add session export JSON button

### Sprint 2 (P1 productization)
- [ ] Add perk balancing table and tuning constants file
- [ ] Add explainability formulas to isolated utility module
- [ ] Add analytics event collector with schema validation
- [ ] Add chapter-end recap cards and trend chart

### Sprint 3 (P2 foundations)
- [ ] Add Phase 3 contracts and mock matching endpoint
- [ ] Add PWA support and offline content caching
- [ ] Add test fixtures for stable matching inputs
