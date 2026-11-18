# The Kremlin Files — Monday Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 23 November 2026 prototype of *The Kremlin Files*: a Twine 2 / SugarCube 2 game with a custom Soviet-office desk interface, a fully playable Prologue, a branching Act I, one complete route to The Survivor ending, and in-game About and Bibliography sections.

**Architecture:** Twee 3 source files in `src/` are compiled by Tweego into a single `index.html` served by GitHub Pages. A `StoryInterface` passage replaces SugarCube's default UI with a desk layout whose side panels are `data-passage` regions. Game rules live in pure JavaScript (`src/scripts/logic/`) and static content (glossary, historical notes, sources, documents, registry) in data files (`src/scripts/data/`), so both can be unit-tested in Node with no dependencies; browser-only code (macros, UI wiring) lives in `src/scripts/ui/`.

**Tech Stack:** Twine 2-compatible Twee 3, SugarCube 2 (the version bundled with Tweego 2.1.1), Tweego 2.1.1 (macOS x64 via Rosetta, in `tools/`), plain CSS, ES5-compatible JavaScript in story scripts, Node's built-in test runner (`node --test`, Node v26 already installed), Playwright MCP browser tools for in-browser verification.

**Spec:** `docs/superpowers/specs/2026-11-18-kremlin-files-design.md`

## Global Constraints

- Platform is Twine 2 + SugarCube 2; source must stay importable into the Twine 2 editor (standard Twee 3, `StoryData` passage, no Tweego-only features).
- Tweego is the only download, into `tools/tweego/` (git-ignored). Install nothing else; no npm packages. Ask the user before any other download.
- All files stay inside `/Users/aidensmith/Documents/dh_class/the-kremlin-files`. Never delete existing files.
- Do not create the GitHub remote, push, or enable Pages without the user's explicit permission.
- Fonts must support Cyrillic; load from Google Fonts by `@import` only (PT Serif, PT Mono, PT Sans Narrow).
- No copyrighted images: CSS/SVG artwork only, or public-domain/openly licensed with credit in the Credits passage.
- Real historical figures appear only through documented public actions, broadcasts, and attested documents — never in invented private scenes or dialogue.
- Every real event, person, or document shown in play carries a `<<note>>` stamp whose note cites a key in `setup.sources`.
- Nothing in the plot requires understanding Russian; every Russian term goes through `<<ru>>` (tooltip: Cyrillic · transliteration · English).
- Interactive objects must be period-plausible for 1991 — no modern UI metaphors (no windows, icons, search-engine behavior) in the terminal or desk.
- The player never changes historical outcomes; choices affect only Volkov's fate, relationships, and the documents.
- Trust per character is an integer clamped to −3…+3. Scapegoat threshold: `$exposure >= 5`.
- Characters (approved, fictional): Andrei Nikolaevich Volkov (protagonist, 38, senior referent, CC General Department); Gennady Ivanovich Rudin (deputy head of sector, loyalty); Irina Sergeyevna Belova (instructor, reform); Pyotr Fomich Zaitsev (archivist, 61, survival); Lena Markova (fictional journalist at the real *Moscow News*).
- Respect `prefers-reduced-motion`; all interactive elements keyboard-reachable with a visible focus style; no information by color alone.
- Commit messages end with: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`

## Review Focus

1. **Registry searches typed with Latin look-alikes, odd case, or extra spaces** (`7/c`, `  ПАКЕТ  7/С `) — a reasonable player expects them to match the same record as the Cyrillic form. → test in Task 3.
2. **Revisiting a document or re-clicking a clue** — expected to record the clue once and never re-apply trust/pull/exposure effects. → tests in Task 2 (`markClue` idempotent) and Task 8 (browser: open a document twice, variables unchanged).
3. **Browser back button / SugarCube history undo** — expected not to let the player undo a decision and re-take it with stacked effects. → Task 5 sets `Config.history.maxStates = 1`; browser check in Task 5.
4. **Reloading the page mid-act or using Continue on the title screen** — expected to resume at the same passage with the same variables, with panels (tray, phone) consistent. → browser check in Task 5 and Task 12.
5. **Phone-width screens (390 px)** — expected to remain playable with panels stacked and no horizontal scrolling. → browser check in Task 6.

---

## File Structure

```
.gitignore                      tools/, .DS_Store
README.md                       project summary, how to play/build, roadmap
index.html                      compiled game (committed; served by Pages)
scripts/build.sh                runs Tweego → index.html
tools/tweego/                   Tweego binary + bundled story formats (ignored)
src/story/StoryData.twee        StoryTitle, StoryData (IFID, format)
src/story/StoryInit.twee        initial variables via setup.newGame()
src/story/StoryInterface.twee   desk layout markup
src/story/panels.twee           PanelCalendar, PanelTray, PanelPhone, PanelBar (tag: panel)
src/story/title.twee            Start (title screen)
src/story/side.twee             Notebook, Dictionary, NotesIndex (tag: side)
src/story/stubs.twee            "branch in development" cards (tag: stub)
src/prologue/*.twee             Prologue scenes
src/act1/*.twee                 Act I scenes
src/act2/survivor.twee          Act II Survivor route
src/act3/survivor.twee          Act III Survivor route
src/epilogue/survivor.twee      Survivor ending
src/documents/*.twee            document passages (tag: document)
src/academic/*.twee             About, Bibliography, Credits (tag: academic)
src/scripts/logic/state.js      newGame, adjustTrust, addPull, addExposure, markClue, setDoc, resolveEnding
src/scripts/logic/registry.js   normalizeQuery, searchRegistry
src/scripts/data/glossary.js    setup.glossary
src/scripts/data/notes.js       setup.notes
src/scripts/data/sources.js     setup.sources
src/scripts/data/documents.js   setup.documents
src/scripts/data/clues.js       setup.clues
src/scripts/data/registry.js    setup.registry
src/scripts/ui/config.js        SugarCube Config, return-passage tracking
src/scripts/ui/macros.js        <<ru>>, <<note>>, <<clue>>
src/scripts/ui/terminal.js      terminal rendering/typing effect
src/styles/*.css                base, desk, document, dialogue, phone, terminal, bulletin, academic, responsive
tests/helpers/load-setup.mjs    runs logic+data files in a vm with { setup: {} }
tests/helpers/twee.mjs          parses src/**/*.twee into passages, tags, links, macro calls
tests/logic.test.mjs            state + registry unit tests
tests/story.test.mjs            story-graph and cross-reference checks
docs/devlog.md                  dated development log (evidence of progress)
```

**Rule:** files in `src/scripts/logic/` and `src/scripts/data/` may reference only the global `setup` at load time (no `State`, `Macro`, `$`, `window`), so Node can load them. Each file is wrapped as `(function () { ... })();` and assigns to `setup.*`.

**Passage tags (used by tests and CSS):** `scene` (main-line passage; sets the return point), `document`, `conversation`, `phone`, `terminal`, `bulletin`, `side`, `panel`, `academic`, `stub`, `ending`, `title`.

---

### Task 1: Project scaffold, Tweego, and story-graph test harness

**Files:**
- Create: `.gitignore`, `scripts/build.sh`, `src/story/StoryData.twee`, `src/story/title.twee`, `tests/helpers/twee.mjs`, `tests/story.test.mjs`, `docs/devlog.md`, `README.md` (skeleton)
- Download: `tools/tweego/`

**Interfaces:**
- Produces: `npm`-free commands `scripts/build.sh` (exit 0, writes `index.html`) and `node --test tests/`.
- Produces: `parseTwee(dir: string) -> Map<name, {name, tags: string[], text: string, file: string}>`, `linksOf(text) -> string[]` (targets from `[[t]]`, `[[t|x]]`, `[[t->x]]`, `[[x<-t]]`, `<<link "t" "x">>`, `<<goto "x">>`, `<<include "x">>`, `data-passage="x"`, `<<button "t" "x">>`), `macroArgs(text, name) -> string[]` (first quoted argument of each `<<name "...">>`) in `tests/helpers/twee.mjs`.

- [ ] **Step 1:** `git init` the project directory, create `.gitignore` (`tools/`, `.DS_Store`).
- [ ] **Step 2:** Download Tweego 2.1.1 (approved): `curl -L -o "$TMPDIR/tweego.zip" https://github.com/tmedwards/tweego/releases/download/v2.1.1/tweego-2.1.1-macos-x64.zip && unzip -o "$TMPDIR/tweego.zip" -d tools/tweego` (allowed domains: `github.com`, `objects.githubusercontent.com`, `release-assets.githubusercontent.com`). Run `tools/tweego/tweego --list-formats` and record the bundled SugarCube version.
- [ ] **Step 3:** Write `src/story/StoryData.twee` (`:: StoryTitle` → `The Kremlin Files`; `:: StoryData` JSON with a fresh uppercase IFID from `uuidgen`, `"format": "SugarCube"`, `"format-version"`: the version from Step 2, `"start": "Start"`) and a placeholder `:: Start` in `title.twee`. Write `scripts/build.sh`: `tools/tweego/tweego -o index.html src`, `set -euo pipefail`, executable.
- [ ] **Step 4:** Write failing tests in `tests/story.test.mjs`:
  - `every link target exists` — for every passage, each `linksOf` target is a passage name.
  - `every main-line passage is reachable from Start` — BFS from `Start`; passages tagged `panel`, `side`, `academic`, `stub`, `document`, `terminal`, `title` are exempt (reached through the interface panels or `$tray`), all others must be reached.
  - `no dead ends` — every passage not tagged `ending`, `stub`, `panel`, `side`, `academic`, `document`, `terminal` has ≥1 outgoing link.
  - `parser handles all link forms` — `linksOf('[[A]] [[b|B]] [[c->C]] [[D<-d]] <<link "e" "E">> <<goto "F">> <<include "G">> data-passage="H" <<button "i" "I">>')` deep-equals `['A','B','C','D','E','F','G','H','I']` (order-insensitive).
- [ ] **Step 5:** Run `node --test tests/` → FAIL (`twee.mjs` missing).
- [ ] **Step 6:** Implement `tests/helpers/twee.mjs` (Twee 3 header: `:: Name [tags] {metadata}`; ignore `StoryTitle`/`StoryData`/script/stylesheet-tagged passages for graph checks; strip `<!-- -->` comments).
- [ ] **Step 7:** Run `node --test tests/` → PASS. Run `scripts/build.sh` → `index.html` exists; open it with Playwright (`file://` path; if blocked, `python3 -m http.server 8000` and use `http://localhost:8000`) → title "The Kremlin Files" shows.
- [ ] **Step 8:** README skeleton (title, one-paragraph description, "Build: `scripts/build.sh` (requires Tweego in `tools/tweego/`)", "Test: `node --test tests/`"); `docs/devlog.md` first entry dated 2026-11-18. Commit `chore: scaffold Twine/SugarCube project with Tweego build and story-graph tests`.

### Task 2: Game state rules

**Files:**
- Create: `src/scripts/logic/state.js`, `tests/helpers/load-setup.mjs`, `tests/logic.test.mjs`, `src/story/StoryInit.twee`

**Interfaces:**
- Consumes: `setup.clues` (Task 4) only for `markClue` validation — tolerate its absence in unit tests by passing a clue id list.
- Produces (all on `setup`, all take the SugarCube variables object `v` and mutate it):
  - `setup.TRUST_MIN = -3`, `setup.TRUST_MAX = 3`, `setup.EXPOSURE_THRESHOLD = 5`
  - `newGame() -> object` returning `{ trust: {rudin:0, belova:0, zaitsev:0, markova:0}, pulls: {loyalty:0, reform:0, survival:0}, exposure: 0, flags: {}, docs: {}, clues: [], glossary: [], tray: [], kept: [], phone: null, act: 'prologue', date: '12 АВГ 1991', time: '09:00', notesSeen: [], returnTo: 'Start' }`
  - `adjustTrust(v, who: string, delta: number) -> number` (new clamped value; throws on unknown `who`)
  - `addPull(v, which: 'loyalty'|'reform'|'survival', n: number) -> void`
  - `addExposure(v, n: number) -> number`
  - `markClue(v, id: string) -> boolean` (true if newly added; idempotent)
  - `setDoc(v, id: string, field: 'seen'|'held'|'copied'|'destroyed'|'handed', value = true) -> void` (creates `v.docs[id]` as `{seen:false, held:false, copied:false, destroyed:false, handed:false}` first)
  - `resolveEnding(v) -> 'witness'|'loyalist'|'survivor'|'scapegoat'`
- `tests/helpers/load-setup.mjs`: `loadSetup() -> setup` runs every file in `src/scripts/logic/` and `src/scripts/data/` (sorted) in one `vm` context `{ setup: {} }`.

- [ ] **Step 1:** Write failing tests in `tests/logic.test.mjs`:
  - `newGame returns independent objects` — two calls; mutating one's `trust.rudin` leaves the other at 0.
  - `adjustTrust clamps` — `adjustTrust(v,'belova',5)` → 3; then `-10` → −3; unknown `'boris'` throws.
  - `markClue is idempotent` — first call true, second false, `v.clues` length 1.
  - `setDoc initializes record` — `setDoc(v,'d4','copied')` → `v.docs.d4` deep-equals `{seen:false,held:false,copied:true,destroyed:false,handed:false}`.
  - `resolveEnding` — exposure 5 with `flags.finalDecision='kept'` → `'scapegoat'`; exposure 4 + `'kept'` → `'survivor'`; `'handed'` → `'witness'`; `'destroyed'` → `'loyalist'`; missing decision → `'loyalist'` (a player who never acts on the files is carried along by the institution).
- [ ] **Step 2:** `node --test tests/` → FAIL.
- [ ] **Step 3:** Implement `load-setup.mjs` and `state.js` per the interfaces.
- [ ] **Step 4:** `node --test tests/` → PASS.
- [ ] **Step 5:** `StoryInit.twee`: `<<run Object.assign(State.variables, setup.newGame())>>`. Build; in browser `SugarCube.State.variables.trust` equals the four zeros. Commit `feat: game state rules (trust, pulls, exposure, clues, endings)`.

### Task 3: Registry search logic

**Files:**
- Create: `src/scripts/logic/registry.js`, `src/scripts/data/registry.js`
- Test: `tests/logic.test.mjs`

**Interfaces:**
- Produces: `setup.normalizeQuery(q: string) -> string` — trim, collapse whitespace, lowercase, and map Latin look-alikes to Cyrillic (`a→а c→с e→е o→о p→р x→х k→к m→м t→т b→в h→н y→у`) **only when the token contains a digit or any Cyrillic letter** (so plain English words still match English keys).
- Produces: `setup.searchRegistry(query: string, v) -> { status: 'found'|'restricted'|'notfound', docId?: string, lines: string[] }`.
- Produces data schema `setup.registry = [{ id, keys: string[], requiresClues?: string[], unlockTrust?: {who, min}, docId?, foundLines: string[], restrictedLines: string[] }]`. A query matches an entry if its normalized form equals any normalized key. Matching entry → `found` if all `requiresClues` are in `v.clues` or `unlockTrust` is satisfied; otherwise `restricted`. No match → `notfound` with `['ЗАПИСЬ НЕ НАЙДЕНА', 'RECORD NOT FOUND']`.

- [ ] **Step 1:** Failing tests (use a two-entry fixture registry set on `setup.registry` inside the test):
  - `normalizeQuery maps look-alikes` — `normalizeQuery('  ПАКЕТ  7/c ')` === `'пакет 7/с'` (Cyrillic с); `normalizeQuery('Union Treaty')` === `'union treaty'`.
  - `search finds with clues` — entry `{keys:['7/с'], requiresClues:['packet-7s','reg-date-14'], docId:'d4'}`, `v.clues=['packet-7s','reg-date-14']`, query `'7/c'` → `{status:'found', docId:'d4'}`.
  - `search restricted without clues` — same, `v.clues=['packet-7s']` → `status:'restricted'`, lines include `'ДОСТУП ОГРАНИЧЕН'`.
  - `trust unlock` — `unlockTrust:{who:'zaitsev',min:1}`, `v.trust.zaitsev=1`, no clues → `found`.
  - `notfound` — `'kremlin'` → `status:'notfound'`.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement. **Step 4:** Run → PASS.
- [ ] **Step 5:** Write the real `setup.registry` entries (content per Task 9–10 beats): `r-7s` (keys `7/с`, `пакет 7/с`; requires `packet-7s` + `reg-date-14`; no `unlockTrust` — Zaitsev's help is a separate path in Act I, and `reg-date-14` is only obtainable in Act I, so the Prologue search is always restricted; docId `d4`), `r-telegram` (keys `шифротелеграмма`, `cipher telegram`; found; docId `d3`, no requirements), `r-union` (keys `союзный договор`, `union treaty`; found; lines only, no doc). Commit `feat: registry search with look-alike normalization`.

### Task 4: Content data — glossary, sources, historical notes, documents, clues

**Files:**
- Create: `src/scripts/data/glossary.js`, `sources.js`, `notes.js`, `documents.js`, `clues.js`
- Test: `tests/story.test.mjs`

**Interfaces:**
- Produces:
  - `setup.glossary[id] = { ru, translit, en, hint? }` — ≥ 25 entries, including at least: `sekretno`, `sov-sekretno`, `tsk-kpss`, `obshchy-otdel`, `tovarishch`, `referent`, `arkhiv`, `kartoteka`, `dokument`, `papka`, `vertushka`, `gazeta`, `srochno`, `vkhodyashchie`, `da`, `net`, `spasibo`, `zdravstvuyte`, `do-svidaniya`, `avgust`, `ponedelnik`, `chp` (чрезвычайное положение), `dostup-ogranichen`, `zapis-ne-naidena`, `putch`, `bely-dom`, `tank`, `prikaz`.
  - `setup.sources[key] = { type: 'scholarly'|'primary', chicago: string, verified: boolean }` — the 14 entries in spec §13 (`verified: false` until the author checks a catalog record); keys like `plokhy2014`.
  - `setup.notes[id] = { title, date, body, source: string /* sources key */, page?: string }` — at least: `union-treaty`, `gorbachev-foros`, `gkchp-announcement`, `swan-lake`, `yeltsin-tank`, `press-suspended`, `secretariat-telegram`, `white-house-defense`, `three-deaths`, `coup-collapse`, `cpsu-suspended`, `old-square-sealed`, `gorbachev-resignation`, `office-computers`, `nomenklatura`.
  - `setup.documents[id] = { title, ru, classification: 'routine'|'secret'|'top-secret', passage, date }` — `d1` routine circular, `d2` routing slip for Packet 7/С, `d3` draft cipher telegram, `d4` list of measures (pre-dated), `d5` Act II intercept transcript.
  - `setup.clues[id] = { label, registryKey }` — `packet-7s` (`7/с`), `by-hand` (`нарочным`), `reg-date-14` (`14.08`), `cipher-telegram` (`шифротелеграмма`), `ruslan-number` (Act II phone number).
- [ ] **Step 1:** Failing tests in `story.test.mjs`:
  - `glossary has ≥25 complete entries` — each has non-empty `ru`, `translit`, `en`.
  - `every note cites a known source` — `note.source in setup.sources`.
  - `every <<ru>>, <<note>>, <<clue>> id used in passages exists` — via `macroArgs`.
  - `every document's passage exists and is tagged document`.
  - `every registry docId and requiresClues id exists`.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Write the data. Historical note bodies: 2–4 sentences, factual, written from the sources in spec §13; the `office-computers` note states plainly that the in-game terminal is a plausible reconstruction (Soviet ES-1841-class PCs existed in late-1980s state offices) and should be reworded if research contradicts it. **Step 4:** Run → PASS. Commit `feat: glossary, sources, historical notes, documents, clues data`.

### Task 5: SugarCube configuration and macros

**Files:**
- Create: `src/scripts/ui/config.js`, `src/scripts/ui/macros.js`

**Interfaces:**
- Consumes: Task 2 functions, Task 4 data.
- Produces:
  - `Config.history.maxStates = 1`; `Config.history.controls = false`; `Config.saves.autosave = true` (every passage); `Config.passages.nobr = false`.
  - On `:passagestart`, if the incoming passage has tag `scene`, set `State.variables.returnTo` to its name; if it has tag `document`, find the `setup.documents` entry whose `passage` matches and call `setup.setDoc(State.variables, id, 'seen')`.
  - `<<ru "id" ["display"]>>` → `<span class="ru" tabindex="0" role="button" data-tip="ru · translit · en">display or ru</span>`; on first render pushes `id` into `$glossary` (no duplicates). Tooltip shows on hover and on focus/tap.
  - `<<note "id">>` → `<button class="note-stamp">ИСТОРИЧЕСКАЯ СПРАВКА</button>`; click opens `Dialog` with title, date, body, and the source's `chicago` text, and pushes `id` into `$notesSeen` (no duplicates).
  - `<<clue "id">>text<</clue>>` → `<button class="clue">text</button>`; click calls `setup.markClue(State.variables, id)`, adds class `marked`, and shows a brief "Recorded in notebook / Записано" toast; already-marked clues render pre-marked.
  - `<<returnlink>>` → link back to `$returnTo` labelled "Return to desk".
- [ ] **Step 1:** Add a temporary passage `MacroTest` (tag `side`) using each macro; build.
- [ ] **Step 2:** Browser verification with Playwright: hovering/focusing `.ru` shows the tip text; `SugarCube.State.variables.glossary` contains the id; clicking `.note-stamp` opens `#ui-dialog` containing the source text; clicking `.clue` twice leaves `State.variables.clues.length === 1`; pressing browser Back after navigating does not change `State.variables` (history disabled); reloading resumes at the same passage with the same variables (Review Focus 3, 4).
- [ ] **Step 3:** Delete `MacroTest`. `node --test tests/` → PASS. Commit `feat: SugarCube config and ru/note/clue macros`.

### Task 6: Desk interface layout and panels

**Files:**
- Create: `src/story/StoryInterface.twee`, `src/story/panels.twee`, `src/story/side.twee`, `src/styles/base.css`, `src/styles/desk.css`, `src/styles/responsive.css`

**Interfaces:**
- Consumes: variables from Task 2, data from Task 4.
- Produces DOM ids used by later tasks/CSS: `#desk`, `#desk-header` (`data-passage="PanelCalendar"`), `#tray` (`data-passage="PanelTray"`), `#passages` (SugarCube's required element), `#instruments` (`data-passage="PanelPhone"`), `#desk-bar` (`data-passage="PanelBar"`).
- Panel behavior: `PanelCalendar` shows `$date`, `$time`, and `ЦК КПСС · Общий отдел`. `PanelTray` lists `$tray` documents (title, classification stamp, link to the document passage) and `$kept` under "Kept files". `PanelPhone` shows the rotary phone; when `$phone` is `{passage, from}` it gets class `ringing` and a link "Answer"; it also holds the "Registry terminal" link to `Terminal`. `PanelBar` links: Notebook, Dictionary, Historical notes, Save/Load (`UI.saves()`), About, Bibliography.
- `side.twee`: `Notebook` (clues from `$clues` with labels; a "state of mind" line derived from the highest of `$pulls`: loyalty "You keep telling yourself the Party will hold.", reform "You keep thinking about the people outside.", survival "You keep thinking about your family."), `Dictionary` (every `$glossary` id, sorted, Cyrillic · translit · English), `NotesIndex` (notes in `$notesSeen`). Each ends with `<<returnlink>>`.
- Panels are hidden (`body[data-tags~="title"]`, `[data-tags~="bulletin"]`, `[data-tags~="academic"]`) so title, bulletins, and academic pages use the full screen.
- [ ] **Step 1:** Build all of the above. Visual direction from spec §10: dark wood desk background (CSS gradients), institutional green header, aged-paper center panel, Soviet red only for stamps/danger, PT Serif body / PT Sans Narrow headings / PT Mono typed text.
- [ ] **Step 2:** Browser verification at 1440×900 and 390×844: screenshot both; at 390 px `document.documentElement.scrollWidth <= 390` and panels stack below the passage (Review Focus 5); every bar link is reachable by Tab with a visible focus outline; setting `SugarCube.State.variables.phone = {passage:'Start', from:'Rudin'}` and re-rendering shows the ringing phone; with `prefers-reduced-motion: reduce` emulated, the ringing animation is off.
- [ ] **Step 3:** `node --test tests/` → PASS. Commit `feat: desk interface layout, panels, notebook, dictionary`.

### Task 7: Passage-type styling and title screen

**Files:**
- Create: `src/styles/document.css`, `dialogue.css`, `phone.css`, `bulletin.css`, `academic.css`; Modify: `src/story/title.twee`

**Interfaces:**
- Consumes: tags from File Structure.
- Produces CSS classes for content authors: `.doc` sheet wrapper, `.doc-header` (Cyrillic letterhead), `.stamp` + `.stamp--red` / `.stamp--violet` (rotated, ink-textured), `.routing-slip`, `.margin-note` (handwriting style, PT Serif italic), `.speaker` card (`data-who="rudin|belova|zaitsev|markova|volkov"` with a CSS/SVG silhouette), `.choices` list of index-card links, `.call-transcript`, `.bulletin` (teletype full-screen with typed reveal; instant under reduced motion), `.fiction-notice`.
- Title screen (`Start`, tag `title`): game title in Russian and English (`Кремлёвские досье / The Kremlin Files`), subtitle "Moscow · August 1991", buttons New game (→ `Prologue_Bulletin`), Continue (only if `Save.autosave.ok() && Save.autosave.has()`), About, Bibliography; the fiction notice: "Volkov, his colleagues, and the files he investigates are fictional. The events of August 1991 are real; passages marked ИСТОРИЧЕСКАЯ СПРАВКА link to historical notes and sources."
- [ ] **Step 1:** Create a temporary `StyleTest` passage (tag `side`) showing each component; build.
- [ ] **Step 2:** Browser screenshots at 1440 and 390; check text contrast of `.doc`, `.margin-note`, `.bulletin` against background ≥ 4.5:1 (compute in `browser_evaluate` from computed colors). Continue button hidden on a fresh profile (`localStorage.clear()` then reload).
- [ ] **Step 3:** Remove `StyleTest`. Tests pass. Commit `feat: document, dialogue, phone, bulletin styling and title screen`.

### Task 8: Registry terminal

**Files:**
- Create: `src/story/terminal.twee` (`:: Terminal [terminal side]`), `src/scripts/ui/terminal.js`, `src/styles/terminal.css`

**Interfaces:**
- Consumes: `setup.searchRegistry`, `setup.clues`, `setup.documents`.
- Produces: `setup.terminal.run(query: string)` (browser-only) — appends `> ПОИСК <query>` then the result lines to `#term-output` with a per-character typing effect (instant under reduced motion); on `found`, pushes `docId` into `$tray` (no duplicates) and appends a link "ОТКРЫТЬ / open" to the document passage.
- Screen: boot header `ЕС-1841 · АСУ «ДЕЛОПРОИЗВОДСТВО» · ЦК КПСС` (styled as in-world program name), help line `ПОИСК <номер|ключ>  (SEARCH <number|key>)`, a text input with blinking block cursor, and the player's clues as "card index" chips beneath that type their `registryKey` into the input when clicked. Green phosphor on near-black, scanline overlay, PT Mono.
- [ ] **Step 1:** Build; browser verification: with `clues=['packet-7s']` searching `7/c` prints `ДОСТУП ОГРАНИЧЕН`; after adding `reg-date-14`, the same search prints the found lines, `$tray` includes `d4` once even after searching twice; `kremlin` prints `ЗАПИСЬ НЕ НАЙДЕНА`; Enter key submits; clue chips are keyboard-operable. Open `d4`, return, open again → `State.variables.trust`, `pulls`, `exposure` unchanged (Review Focus 2).
- [ ] **Step 2:** Tests pass. Commit `feat: period registry terminal`.

### Task 9: Prologue (12 August 1991)

**Files:**
- Create: `src/prologue/prologue.twee`, `src/documents/d1-circular.twee`, `src/documents/d2-routing-slip.twee`

**Interfaces:**
- Consumes: macros (Task 5), styles (Task 7), Task 2 helpers — write effects as `<<run setup.adjustTrust(State.variables, 'zaitsev', 1)>>`, `<<run setup.addPull(State.variables, 'survival', 1)>>`, etc.
- Every choice link applies its effects inside the link body before `<<goto>>`, so effects apply exactly once. Choices that lead to a `stub` carry no effects, so returning from the stub and choosing again is safe.
- A phone scene is announced in the preceding passage ("The phone rings.") by setting `$phone = {passage, from}` and offering an Answer link both in the text and in `PanelPhone`; the phone passage clears `$phone` on entry.

Beats (passage names fixed; prose is the builder's, ~120–250 words per scene, second person, present tense):

| Passage (tags) | Content | Choices → effects |
|---|---|---|
| `Prologue_Bulletin` (bulletin) | Moscow, Monday 12 Aug 1991. Context: Gorbachev's Union Treaty to be signed 20 Aug; Gorbachev departing for vacation in Crimea. `<<note "union-treaty">>` | Continue → `P_Desk` |
| `P_Desk` (scene) | Volkov's office, 09:00. Tutorial voice in-world (an orientation memo). Sets `$tray = ['d1','d2']`. Objective: register today's correspondence. | Open documents from tray; when `d2` seen → link `P_Archive` |
| `D1_Circular` (document) | Routine circular on discussion of the draft Party Programme (July 1991 Plenum); teaches stamps and `<<ru>>`. | `<<returnlink>>` |
| `D2_RoutingSlip` (document) | Routing slip for **Пакет 7/С**: marked to bypass the registry, delivered *нарочным* (by courier), signed for by G. I. Rudin. Clues: `<<clue "packet-7s">>`, `<<clue "by-hand">>`. | `<<returnlink>>` |
| `P_Archive` (scene, conversation) | Zaitsev in the archive; he notices the packet number with unease. | Ask tactfully → zaitsev +1, survival +1 · Press him → zaitsev −1, reform +1 · Drop it → survival +1 |
| `P_Terminal_Hint` (scene) | Zaitsev mentions the registry terminal; player searches `7/С` → restricted (teaches terminal). Continues when player returns. | Continue → `P_Corridor` |
| `P_Corridor` (scene, conversation) | Belova at the canteen, talking about the Union Treaty and the republics. | Agree → belova +1, reform +1 · Deflect → survival +1 · Warn her to be careful → loyalty +1, belova −1 |
| `P_Call_Rudin` (scene, phone) | 18:40, `$phone` rings: Rudin asks whether Packet 7/С passed through the registry. | Say no, never saw it → exposure +1, flag `liedToRudin` · Admit you saw the slip → rudin +1, loyalty +1, flag `toldRudin` · Ask him what it is → rudin −1, reform +1, exposure +1 |
| `P_Evening` (scene) | Volkov goes home; television, family, quiet. Sets `$act='act1'`, `$date='19 АВГ 1991'`, `$time='06:00'`. | Continue → `Act1_Bulletin` |

- [ ] **Step 1:** Write passages and documents. **Step 2:** `node --test tests/` → PASS (graph, ids). **Step 3:** Build; Playwright playthrough taking the first choice everywhere, then a second playthrough taking the last choice everywhere; assert final variables match the table sums (e.g., run 1: zaitsev 1, belova 1, rudin 0, exposure 1, survival 1, reform 1, loyalty 0). **Step 4:** Read-through for historical claims: every real-event mention has a `<<note>>`. Commit `feat: playable Prologue`. Add a devlog entry.

### Task 10: Act I (19 August 1991)

**Files:**
- Create: `src/act1/act1.twee`, `src/documents/d3-telegram.twee`, `src/documents/d4-list.twee`

| Passage (tags) | Content | Choices → effects |
|---|---|---|
| `Act1_Bulletin` (bulletin) | 06:00 radio: GKChP announcement; Gorbachev said to be unable to perform duties "for health reasons"; *Swan Lake* on television. `<<note "gkchp-announcement">>` `<<note "swan-lake">>` `<<note "gorbachev-foros">>` | Continue → `A1_Briefing` |
| `A1_Briefing` (scene, conversation) | Rudin briefs the sector: process outgoing cipher telegrams to regional Party committees. Adds `d3` to tray. | Comply eagerly → rudin +1, loyalty +2 · Comply quietly → survival +1 · Ask on what legal basis → rudin −1, reform +1, exposure +1 |
| `D3_Telegram` (document) | Draft cipher telegram (fictional text, styled after the real Secretariat telegram — `<<note "secretariat-telegram">>`); its registration stamp is dated **14.08.91**, five days before the coup. Clues `<<clue "reg-date-14">>`, `<<clue "cipher-telegram">>`. | `<<returnlink>>` |
| `A1_Desk` (scene) | Midday: tanks reported on the streets; objective: find out what Packet 7/С contains. Terminal search with both clues, **or** if `$trust.zaitsev >= 1`, link "Ask Zaitsev to pull the card" → `A1_Zaitsev`. Either path adds `d4`. | → `A1_Call_Belova` once `d4` seen |
| `A1_Zaitsev` (scene, conversation) | Zaitsev fetches the physical file: "I didn't give you this." | Thank him → zaitsev +1 · Promise to keep him out of it → zaitsev +1, survival +1 |
| `D4_List` (document) | "List of measures" (fictional): pre-drafted orders and lists of personnel and newspapers, dated before 19 Aug. `<<note "press-suspended">>` | `<<returnlink>>` |
| `A1_Call_Belova` (scene, phone) | Belova calls from outside the White House; Yeltsin has spoken from a tank. `<<note "yeltsin-tank">>` | Tell her about the dated draft → belova +2, reform +2, exposure +1, flag `toldBelova` · Say nothing → survival +1 · Report the call to Rudin → rudin +1, loyalty +1, belova −2, flag `reportedBelova` |
| `A1_Call_Markova` (scene, phone) | Only if `$trust.belova >= 1`: Lena Markova calls; *Moscow News* has been shut. Otherwise skip to `A1_Evening`. | Agree to meet later → markova +1, exposure +1, flag `markovaContact` · Refuse → survival +1 |
| `A1_Evening` (scene) | The key Act I decision about `d3`/`d4`. | File normally → loyalty +1, `setDoc d4 held=false` · Keep in your drawer → survival +1, `setDoc d4 held`, push `d4` to `$kept` · Make a carbon copy → reform +1, survival +1, exposure +1, `setDoc d4 copied`, push to `$kept`. Sets `$act='act2'`, `$date='20 АВГ 1991'` → `Act2_Bulletin` |

- [ ] **Step 1:** Write passages. **Step 2:** Tests PASS. **Step 3:** Playwright: (a) terminal path to `d4` with Zaitsev trust 0; (b) Zaitsev path with trust ≥1; (c) Markova call appears only when belova ≥ 1; assert each choice's deltas. **Step 4:** Historical read-through. Commit `feat: branching Act I`. Devlog entry.

### Task 11: Survivor route (Acts II–III), Survivor epilogue, and branch stubs

**Files:**
- Create: `src/act2/survivor.twee`, `src/act3/survivor.twee`, `src/epilogue/survivor.twee`, `src/story/stubs.twee`, `src/documents/d5-intercept.twee`

| Passage (tags) | Content | Choices → effects |
|---|---|---|
| `Act2_Bulletin` (bulletin) | 20 Aug: crowds and barricades at the White House; curfew declared. `<<note "white-house-defense">>` | → `A2_Archive` |
| `A2_Archive` (scene, conversation) | Zaitsev on surviving 1953 and 1964: "Keep your papers dry." | If `$kept` includes `d4`: Keep the file as insurance → survival +2, flag `insurance` → `A2_Intercept`; otherwise: Retrieve the file from the cabinet and keep it → survival +2, exposure +1, flag `insurance`, push `d4` to `$kept` → `A2_Intercept` · Give it to the press → `Stub_Witness` · Give it to Rudin → `Stub_Loyalist` |
| `A2_Intercept` (scene) | `d5`: an intercepted call transcript passed by Zaitsev (fictional) mentioning a Russian-government aide who is "collecting people who know where the files are". Clue `ruslan-number`. | → `A2_Call_Aide` |
| `A2_Call_Aide` (scene, phone) | Night of 20–21 Aug; news of three deaths in the tunnel on the Garden Ring `<<note "three-deaths">>`. A fictional aide offers a future in the new administration. | Listen and agree to meet → survival +1, flag `aideContact` · Hang up → `Stub_Witness` |
| `A2_Collapse` (bulletin) | 21 Aug: coup collapses; Gorbachev returns to Moscow. `<<note "coup-collapse">>` Sets `$act='act3'`, `$date='23 АВГ 1991'`. | → `A3_Order` |
| `A3_Order` (scene, conversation) | 23 Aug: Yeltsin's decree suspends CPSU activity in Russia `<<note "cpsu-suspended">>`; Rudin orders all special correspondence shredded. | Hide `d4` in your briefcase → exposure +1, flag `finalDecision='kept'` → `A3_Exit` · Shred it → `Stub_Loyalist` |
| `A3_Exit` (scene) | Leaving through the crowd as the building is sealed `<<note "old-square-sealed">>`. `<<if setup.resolveEnding(State.variables) === 'scapegoat'>>` → `Stub_Scapegoat` `<<else>>` → `Epilogue_Survivor`. | |
| `Epilogue_Survivor` (ending) | December 1991: Volkov in a ministry office of the Russian Federation; the file in his safe. The Soviet flag lowered on 25 Dec `<<note "gorbachev-resignation">>`. One line varies by `$trust.belova` (≥1: she no longer returns his calls; else: he hasn't thought of her in weeks) and one by `$trust.rudin` (≥1: Rudin asks him for a favor). Closing panel "What this ending shows": nomenklatura converting into a new elite `<<note "nomenklatura">>`, link to About. | New game · About |
| `Stub_Witness`, `Stub_Loyalist`, `Stub_Scapegoat` (stub) | Styled card: ending name in Russian/English, its concept in one sentence, "This branch is in development for the final version", links: Return to the last decision (`$returnTo`), Title screen. | |

- [ ] **Step 1:** Write passages. **Step 2:** Tests PASS. **Step 3:** Playwright: a playthrough reaching `Epilogue_Survivor` from title in one run; a run with exposure forced to 5 before `A3_Exit` reaches `Stub_Scapegoat`; each stub's "Return to the last decision" lands on the passage that offered it. **Step 4:** Historical read-through. Commit `feat: Survivor route through Acts II-III and ending`. Devlog entry.

### Task 12: About, Bibliography, Credits, README, and full verification

**Files:**
- Create: `src/academic/about.twee`, `src/academic/bibliography.twee`, `src/academic/credits.twee`; Modify: `README.md`, `docs/devlog.md`

**Interfaces:**
- Consumes: `setup.sources`, `setup.notes`.
- `About` (academic): historical background (≈300 words); the five concepts — regime change, political legitimacy, authoritarianism, democratization, institutional collapse — each with a definition (1–2 sentences), the in-game moment that embodies it, and the ending tied to it; educational objectives; fact vs. fiction statement; how Russian is used; development status (prototype, what's in progress). Ends with links Back (to `$returnTo` if a game is running, else Start) and Bibliography.
- `Bibliography` (academic): renders `setup.sources` grouped Scholarly / Primary, sorted by `chicago`, with a visible "awaiting verification" mark on entries where `verified === false`.
- `Credits` (academic): fonts (PT families, ParaType, SIL OFL), Tweego and SugarCube (licenses), any images.
- README: description, academic purpose, play link placeholder (`<GitHub Pages URL — added on publish>`), how to build/test, project structure, roadmap (spec §12 "Reserved for later development"), fact/fiction statement, credits.

- [ ] **Step 1:** Write passages and README. **Step 2:** `node --test tests/` → PASS. **Step 3:** Full verification with Playwright: fresh profile → title → New game → Survivor ending without console errors (`browser_console_messages` empty of errors); reload mid-Act I → Continue resumes at the same passage with identical `State.variables` (Review Focus 4); About and Bibliography reachable from the title screen and from the desk bar; 390 px check repeated on the title, a document, the terminal, and About. **Step 4:** Time a full Survivor playthrough reading at normal pace; record minutes in the devlog. **Step 5:** Commit `feat: About, Bibliography, Credits; README`. **Step 6:** Stop and ask the user for the GitHub repository name and permission to push and enable Pages.
