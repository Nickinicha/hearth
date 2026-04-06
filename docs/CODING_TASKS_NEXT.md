# Coding Tasks Next (Execution Checklist)

## Immediate tickets (code now)

## T1: Chapter model integration
- Files: `js/main.js`, `js/data/worldMap10.json`
- Steps:
  - Load chapter list at app init
  - Add `chapterIndex` to runtime session
  - Render chapter title and hidden question hint in Phase 2 header

## T2: Chapter-aware scoring
- Files: `js/gameEngine.js`, `js/main.js`, `js/data/systems.v3.json`
- Steps:
  - Add focus dimension to current turn context
  - Multiply dimension deltas by focus weight map
  - Validate score changes in day summary

## T3: Chapter progression across days
- Files: `js/main.js`
- Steps:
  - On day complete, advance `chapterIndex`
  - Persist chapter history in local storage
  - Wrap or lock progression after chapter 10 per design decision

## T4: Chapter recap UI
- Files: `index.html`, `css/style.css`, `js/main.js`
- Steps:
  - Add compact recap card on day summary
  - Show chapter pattern + hidden question + player trend delta

## T5: Profile export for research
- Files: `js/main.js`
- Steps:
  - Build export payload object
  - Add "Export Session JSON" button
  - Download file with timestamped name

## Definition of done per ticket
- No lint errors
- Flow remains playable from Phase 1 to Phase 2 day summary
- Persistence still works after browser refresh
