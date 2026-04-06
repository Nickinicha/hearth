# HEARTH Implementation Plan (Phase 1/2/3)

## 1) Architecture Target

## Frontend modules
- `js/gameEngine.js`: scoring/state core
- `js/scenes.js`: Phase 1 scene content
- `js/phase2.js`: scenario generators and turn choices
- `js/data/*.json`: content and system configs (chapters/perks/scoring constants)
- `js/main.js`: UI orchestration and view state machine

## Data contracts
- `worldMap10.json`: chapter definitions and hidden questions
- `systems.v3.json`: attachment/archetype/scoring/perk contract

## Persistence
- Local storage key: `hearth_phase2_progression_v1`
- Saved fields:
  - `day`, `secureProgress`, `difficultyTier`
  - `insightPoints`, `unlockedPerks`, `activePerk`
  - `showPerkDetails`

## 2) Phase-by-Phase Delivery

## Phase 1 (Self Discovery)

### Build goals
- 3 narrative scenes
- Implicit scoring for attachment + archetype
- Summary output with 3 core dimensions

### Work items
1. Add chapter mapping for Scene 1-3 from `worldMap10`
2. Add scoring multipliers by hidden question focus
3. Add summary card:
   - dominant attachment
   - dominant archetype
   - love/fear orientation
   - dimension trend

### Done criteria
- Player can complete 3 scenes in one session
- Summary is deterministic from choices

## Phase 2 (The Sim)

### Build goals
- 5 turns/day loop
- Adaptive scenario weighting by style + difficulty
- Meta economy with active daily perk

### Work items
1. Chapter-driven loop progression:
   - map daily loop to chapter context
   - inject chapter-specific question focus
2. Adaptive difficulty:
   - update tier by style pressure and secure progress
3. Perk strategy layer:
   - offer 3 perks from rarity-weighted pool
   - reroll cost scaling with Insight
   - one active perk/day
4. Explainability:
   - telemetry EV panel
   - compact/expanded mode
   - persisted UI preference

### Done criteria
- Player can run multiple days continuously
- Day summary reflects chapter context and progress
- Perk decision has measurable effect on outcomes

## Phase 3 (Real Connection) - pre-production scaffold

### Build goals
- Prepare data and integration contracts for online matching

### Work items
1. Profile export payload spec:
   - attachment trend vector
   - archetype affinity vector
   - values/goals compatibility fields
2. Matching contract draft (Gale-Shapley service):
   - input schema
   - output schema
   - stable pair explanation object
3. Placeholder UI route:
   - "Real Connection Preview"
   - mock matched profiles with compatibility reasons

### Done criteria
- Contracts documented and mock data runs end-to-end

## 3) Data Model Integration Tasks (Immediate)

1. Load `js/data/worldMap10.json` into `main.js`
2. Track `chapterIndex` in session
3. Render chapter title/pattern in Phase 2 headers
4. Add chapter-specific scoring coefficients:
   - self-worth chapters weight `selfWorth` higher
   - motivation chapters weight `motivation` higher
   - pattern chapters weight `pattern` higher
5. Store chapter history for recap screen

## 4) Testing Strategy

## Unit-level
- scoring updates for each choice path
- adaptive tier boundaries (1..4)
- perk effect calculations
- reroll cost progression

## Integration-level
- full loop: Phase1 -> Summary -> Perk select -> Day loop -> Day summary
- persistence reload consistency
- chapter transitions and no-repeat scenarios

## Content QA
- each chapter has hidden question and narrative intent
- no contradictory perk descriptions/effects

## 5) Suggested File Work Order

1. `js/data/worldMap10.json` (content source of truth)
2. `js/data/systems.v3.json` (tuning constants)
3. `js/main.js` (load/integrate models and chapter flow)
4. `js/phase2.js` (scenario weighting using chapter tags)
5. `docs/` updates and test checklist

## 6) Next Coding Ticket Set (ready to implement)

- Ticket 01: Integrate chapter model into active game flow
- Ticket 02: Add chapter-aware scoring multipliers
- Ticket 03: Build chapter recap card at day end
- Ticket 04: Add profile export JSON and download action
- Ticket 05: Add Phase 3 mock contract files and preview screen
