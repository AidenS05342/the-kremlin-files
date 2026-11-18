# The Kremlin Files — Design Document

**Date:** 2026-11-18
**Author:** Aiden Smith (Digital Humanities, University of Tennessee), with Claude
**Prototype milestone:** Monday, 23 November 2026 (substantial progress, ~60–70% of the finished game)
**Platform:** Twine 2 · SugarCube 2
**Status:** Approved 2026-11-18

---

## 1. Intent

*The Kremlin Files* is a browser-based historical political mystery set inside the Central Committee of the Communist Party of the Soviet Union (CPSU) during the August Coup of 1991.

The game's argument: **the Soviet collapse was not one event but a contested political transition** — competing interests, institutional instability, and radical uncertainty. The player experiences that from the inside, as a mid-level Party official whose own institution loses authority around them, torn between **loyalty** (to the Party and state), **reform** (Gorbachev's/Yeltsin's camps, democratization), and **survival** (self, family, career).

Political science concepts — **regime change, political legitimacy, authoritarianism, democratization, institutional collapse** — are embodied in events and endings, then named explicitly in the academic layer.

It must work as a genuine mystery (suspense, classified files, investigation, consequences), not an educational simulation with a story bolted on.

## 2. Goals, non-goals, anti-goals

**Goals (finished game)**
- 15–20 minute playthrough; four distinct, morally ambiguous endings.
- A historically inspired Soviet government office interface built on Twine/SugarCube with custom CSS and JavaScript.
- Interactive classified documents, correspondence, intercepts, and telephone calls.
- Branching dialogue; a system tracking relationships and the loyalty / reform / survival pulls.
- Beginner Russian woven into documents, dialogue, and environment, always optional to understand.
- Clear separation of historical fact from fiction, with in-game historical notes.
- About This Project section and a bibliography of scholarly and primary sources.
- Published on GitHub Pages from a public GitHub repository.

**Non-goals**
- The player cannot change major historical events. The coup fails on 21 August; the CPSU is suspended; the USSR dissolves in December. Choices shape only the protagonist's fate, relationships, and what happens to the documents.
- Not a language-learning app (no quizzes, no Russian required to progress).
- No voice acting, no 3D, no accounts or server.

**Anti-goals (failure even if it "works")**
- Looks like default Twine — a plain page of text with blue links.
- Real people shown saying or doing things they did not do, presented as fact.
- Endings that moralize ("you chose correctly") instead of showing trade-offs.
- Russian that blocks or confuses non-speakers.
- A prototype that's broad but shallow — many stubbed passages, nothing polished.

## 3. Constraints

- **Twine 2 with the SugarCube 2 story format** is the foundation (author's choice; prior course experience).
- **Static hosting** (GitHub Pages): one compiled HTML file plus an `assets/` folder; SugarCube's built-in save system in the browser.
- **All files inside this project directory.** Do not touch other projects.
- **Ask before** installing anything (including Tweego, see §11), creating the GitHub repository, pushing, or enabling Pages.
- **Images:** original CSS/SVG artwork, or public-domain/openly licensed images with attribution recorded in the credits. No copyrighted photos.
- **Fonts must support Cyrillic** (loaded from Google Fonts by `@import`/`<link>` in the stylesheet — no installation).
- **Timeline:** five days to the prototype milestone.

## 4. Approaches considered

**Platform: Twine 2 + SugarCube 2, with custom CSS and JavaScript.** Chosen by the author: proven branching, variables, and saves out of the box; familiar from the author's DH coursework; compatible with the Twine 2 visual editor. The trade-off accepted: the distinctive desk interface requires overriding SugarCube's default layout (via its `StoryInterface` passage) and writing custom macros.

(A custom-built web engine and a React app were also considered and set aside in favor of Twine.)

## 5. Setting and history

**Where:** CPSU Central Committee headquarters, Staraya Ploshchad (Old Square), Moscow.
**When:** early August – 23 August 1991, with a December 1991 epilogue.

**Historical spine (fixed, cannot be altered by the player):**
- Early Aug: New Union Treaty scheduled for signing on 20 August; hardliners oppose it.
- 18 Aug: Gorbachev isolated at his dacha at Foros, Crimea.
- 19 Aug: State Committee on the State of Emergency (GKChP / ГКЧП) announces it has taken power; tanks in Moscow; *Swan Lake* on state television; Yeltsin speaks from a tank outside the Russian White House.
- 20–21 Aug: Crowds defend the White House; three civilians killed on the night of 20–21 Aug; coup collapses 21 Aug; Gorbachev returns to Moscow.
- 23 Aug: Yeltsin suspends CPSU activity in the RSFSR; the Old Square complex is sealed and staff leave the building.
- 24 Aug: Gorbachev resigns as General Secretary and calls on the Central Committee to dissolve itself.
- 8 Dec: Belovezha Accords; 25 Dec: Gorbachev resigns as Soviet president; the Soviet flag is lowered over the Kremlin.

Every historical claim in the game must be checked against at least one source in the bibliography. Real figures (Gorbachev, Yeltsin, Yanayev, Kryuchkov, Yazov, Pugo, Pavlov, etc.) appear only through documented public actions, broadcasts, and historically attested documents — never in invented private scenes or dialogue.

**Fiction:** the protagonist, colleagues, the specific "emergency measures" file trail, and all conversations are fictional, written to be plausible within documented history. The game says so on the title screen and in the About section.

## 6. Characters (all fictional)

- **Protagonist — Andrei Nikolaevich Volkov (Андрей Николаевич Волков), 38.** Senior referent (*референт*) in the Central Committee's General Department (*Общий отдел*), the section that registers and routes classified Party correspondence. Married, one daughter; a Party careerist who has never questioned the paperwork. Fixed name and background; written in second person ("You…").
- **Gennady Ivanovich Rudin — deputy head of sector (Loyalty).** Hardline, paternal, genuinely believes order must be saved. Gives access to sensitive files — at a price.
- **Irina Sergeyevna Belova — instructor, reform-minded peer (Reform).** Quietly sympathetic to the democratic movement; knows people outside the building.
- **Pyotr Fomich Zaitsev — veteran archivist, 61 (Survival).** Has outlasted every leadership since Khrushchev. Knows where everything is filed and how to stay unnoticed.
- **Lena Markova — journalist contact (outside the building).** Works for *Moscow News* (*Московские новости*), a real paper suspended during the coup; she herself is fictional. Reached by phone and in one meeting.

## 7. Story structure (finished game)

| Act | Date | Purpose | Approx. time |
|---|---|---|---|
| Prologue | ~12 Aug 1991 | Routine work; learn the desk; first anomaly (a document routed outside normal channels) | 3 min |
| Act I | 19 Aug | Coup announced; the building reacts; the player connects the anomaly to the GKChP | 5 min |
| Act II | 20–21 Aug | Pressure from all sides; intercepts and calls; key trust decisions; coup collapses | 5 min |
| Act III | 23 Aug | Building sealed; final decision about the documents | 3 min |
| Epilogue | Dec 1991 | Ending revealed; historical outcome stated | 2 min |

**The mystery thread:** documents show that people at the senior level prepared "emergency measures" before 19 August — draft decrees, unusual routing instructions, lists. The player pieces this together. (Historically, sources describe KGB-led preparation in the weeks before the coup, and on 19 August the CC Secretariat sent coded telegrams to regional Party committees concerning the emergency measures. The game's specific file trail is fictional and labeled as such; real documents are cited in historical notes.)

## 8. Endings (finished game)

Each ending is determined by what happens to the documents, combined with relationships and accumulated exposure. Each is morally ambiguous and tied to a political science concept that the About section explains.

1. **The Witness (Свидетель)** — The player gives the files to investigators or the press. *Democratization; legitimacy transferring to new institutions.* The right thing, with a cost: career ended, old colleagues treat Volkov as a traitor, and the files change less than he hoped.
2. **The Loyalist (Верный)** — The player destroys the files as ordered and stays to the end. *Institutional collapse from inside.* Sincerely believes he protected the country from chaos; left holding nothing when the doors are sealed.
3. **The Survivor (Уцелевший)** — The player keeps the files as leverage and moves into a post in the new Russian government. *Regime change without elite turnover; the old Party elite (nomenklatura) converting into a new one.* Secure and comfortable; principles traded away.
4. **The Scapegoat (Козёл отпущения)** — The player is named in the investigation of the plotters. *What happens to individuals when authoritarian structures collapse.* **Builds up over several decisions** — misplaced trust, compromised relationships, questionable actions — never triggered by a single choice. Relatively innocent intentions, real consequences.

**Ending resolution:** at the end of Act III, if `$exposure` ≥ threshold → Scapegoat (overrides). Otherwise the ending follows the player's final decision about the documents, which is only offered if the relevant relationship and document conditions are met (e.g., Witness requires a contact who will take the files; Survivor requires holding enough key documents to be worth something).

## 9. Game systems (in SugarCube)

**Story variables** (initialized in `StoryInit`, saved automatically by SugarCube):
- `$trust` — object per character (`rudin`, `belova`, `zaitsev`, `markova`), integer −3…+3.
- `$loyalty`, `$reform`, `$survival` — tallies of the three pulls; shape dialogue options, epilogue text, and which final choices feel available. Not shown as numbers; reflected in a subtle "state of mind" line in the notebook.
- `$exposure` — raised by risky actions (careless phone calls, signing for documents, confiding in the wrong person).
- `$flags` — named story facts (e.g., `copiedRoutingSlip`).
- `$docs` — per document: seen / held / copied / handed over / destroyed.
- `$clues` — key phrases the player has marked.
- `$glossary` — Russian terms encountered.
- `$act` — current act; drives date, clock, and atmosphere.

**Static data** in Story JavaScript (`setup.*`, not saved): character profiles, glossary entries, historical notes with citations, terminal search index.

**Investigation loop:**
1. Document passages contain **key phrases** written with a custom `<<clue>>` macro. Clicking one marks it, records it in `$clues`, and adds it to the notebook.
2. The **registry terminal** passage offers the player's clues as search terms. The right term (or pair of terms) reveals a new document passage, a routing history, or "record restricted" (needs a colleague's help).
3. Some files are obtainable only through characters with enough trust (`<<if $trust.zaitsev gte 2>>`).
4. Key documents end with a decision — file normally, keep, copy, show someone, destroy — which sets `$docs` and the pull/exposure variables.

**Dialogue and phone:** conversation passages with choice links that `<<set>>` trust, pulls, flags, and exposure. Phone calls: when a call is pending, the phone in the side panel rings (CSS animation); clicking it goes to the call passage. Ignoring certain calls has consequences.

**Act progression:** when an act's required beats are done, a transition passage shows a dated teletype/radio bulletin and advances `$act`.

**Saving:** SugarCube's built-in save slots and autosave, restyled to match the interface.

## 10. Interface and visual design

The default SugarCube layout (left sidebar, plain text page) is replaced entirely using a **`StoryInterface` passage** that defines a desk layout. Passages render into the central area; side panels are kept up to date by SugarCube's `data-passage` regions, which refresh on each navigation.

```
┌──────────────────────────────────────────────────────────────────┐
│ [Calendar: 19 АВГ 1991]       ЦК КПСС · Общий отдел     [Clock] │
├───────────────┬──────────────────────────────────┬───────────────┤
│  IN-TRAY      │                                  │   ROTARY      │
│  ВХОДЯЩИЕ     │      CURRENT PASSAGE             │   PHONE       │
│  (documents   │   (document / conversation /     │   (rings)     │
│   available)  │    terminal / scene)             │               │
│               │                                  │  TERMINAL     │
│  KEPT FILES   │                                  │  (registry)   │
├───────────────┴──────────────────────────────────┴───────────────┤
│ NOTEBOOK (clues) · DICTIONARY (Словарь) · NOTES · SAVE · ABOUT   │
└──────────────────────────────────────────────────────────────────┘
```

- **Passage tags drive styling.** A passage tagged `document` renders as a typed sheet of paper; `conversation` as a character card with index-card choices; `terminal` as a green-phosphor screen; `phone` as a call transcript; `bulletin` as a full-screen act transition. SugarCube exposes tags as CSS classes, so styling is per tag.
- **Documents:** off-white paper texture, typewriter font, Cyrillic headers (*СЕКРЕТНО*, *СОВ. СЕКРЕТНО*, *ЦК КПСС*), red and violet stamps, routing slips, handwritten margin notes. English body text with Russian headers, stamps, and terms.
- **Rotary phone and terminal:** CSS/SVG objects in the right panel; phone shakes when a call is pending.
- **Period plausibility of objects (required).** Nothing should resemble modern technology. The registry terminal is styled after a Soviet IBM-compatible office computer of the late 1980s (e.g., the ЕС-1841 / ES-1841 class): monochrome green screen, blocky Cyrillic system font, command-line prompts, slow typed output, an all-caps document-control program (registration numbers, routing, access level). No windows, icons, mice, or search-engine behavior; failed searches return terse errors (*ЗАПИСЬ НЕ НАЙДЕНА — record not found*; *ДОСТУП ОГРАНИЧЕН — access restricted*). The terminal sits alongside the paper card index (*картотека*), which remains the authoritative record — computers supplemented, not replaced, paper. Other desk objects: rotary *вертушка* government phone, carbon copies, typewritten pages, ink stamps, wall calendar, desk lamp. A historical note explains the level of office computerization in the late Soviet apparatus, with a citation; if research doesn't support a computer in this specific office, it is reframed as a terminal in the department's registry room.
- **Palette:** institutional greens and browns, aged paper; Soviet red reserved for stamps and danger. Tension shown through the environment (more pending calls, bulletin overlays, the clock moving toward night).
- **Responsiveness:** laptop/desktop first; tablets supported; on phones the panels stack below the passage (functional, not primary).
- **Accessibility:** keyboard-navigable links, visible focus, adequate contrast, `prefers-reduced-motion` respected, no information conveyed by color alone.

**Russian integration:** a `<<ru>>` widget/macro renders a term with a dotted underline; hover/tap shows Cyrillic, transliteration, and English (e.g., *секретно · sekretno · secret*), and adds it to the **Dictionary** (*Словарь*). Finished game target: 40–60 beginner terms. Nothing in the plot depends on understanding Russian.

**Fact vs. fiction:** real events, people, and documents carry a red **"ИСТОРИЧЕСКАЯ СПРАВКА / Historical note"** stamp via a `<<note>>` macro, which opens a SugarCube dialog with a short explanation and a citation. Everything without that stamp is fiction; the title screen and About section say so.

## 11. Authoring workflow and project layout

**Workflow (approved):** the story is written as **Twee source files** (Twine's plain-text format) in the repository and compiled to `index.html` with **Tweego**, the standard Twee compiler, which bundles SugarCube.
- Every passage, stylesheet, and script is a readable text file, so the GitHub history shows real, reviewable progress.
- Claude can build and test the game directly.
- You can still open the story in the **Twine 2 app** at any time: Twine 2.6+ imports Twee files (Library → Import), giving you the visual story map. Edits you make in Twine can be exported back to Twee.
- Tweego is a single small program, downloaded into a `tools/` folder inside this project (not installed system-wide; excluded from git). Approved by the author. No other software or dependencies are installed without asking.
- Source files stay compatible with the Twine 2 editor: standard Twee 3 syntax, a `StoryData` passage with the SugarCube 2 format, and no Tweego-only features.

**Layout (builder may refine):**

```
src/
  story/        StoryData, StoryInit, StoryInterface, special passages
  prologue/     prologue passages (.twee)
  act1/ act2/ act3/ epilogue/
  documents/    document passages
  academic/     About, Bibliography, Historical Notes index, Credits
  styles/       *.css (base, desk, documents, terminal, phone, dialogue)
  scripts/      *.js (macros: clue, ru, note; setup data; helpers)
assets/         svg, images, textures
index.html      compiled game (what GitHub Pages serves)
docs/           this design, the plan, development log
tools/          Tweego (if approved; not committed)
README.md
```

**About and bibliography** are passages inside the game, reachable from the title screen and the desk's bottom bar, so they share the visual design. The README links to the published game and summarizes the academic purpose for anyone reviewing the repository.

**Testing:** play through in a browser after each build, including automated browser checks of the main path and the branching choices (using the browser automation already available in this environment — nothing to install). Twine's story map and Tweego's warnings catch broken passage links.

## 12. Scope: Monday prototype vs. later

### Before Monday, 23 November 2026 (prototype)

1. **Custom desk interface** replacing the default SugarCube layout: in-tray, kept files, phone, terminal, notebook, dictionary, notes, calendar/clock, styled passage types (document, conversation, terminal, phone, bulletin), title screen with fact/fiction notice, restyled save dialog.
2. **Systems:** story variables (trust, loyalty/reform/survival, exposure, flags, docs, clues, glossary); `<<clue>>`, `<<ru>>`, and `<<note>>` macros; terminal search unlocking documents; trust-gated content; act transitions.
3. **Playable content:** **Prologue and Act I complete and branching**, with every choice tracked. Plus **one complete route through Acts II–III to one ending — The Survivor** (the ending the author singled out). Other branches in Acts II–III end at a clearly marked "This branch is in development" card, never a dead end.
4. **Russian:** ~25 glossary terms with tooltips and the Dictionary.
5. **Historical notes:** 6–8 cited notes attached to real events in the playable content.
6. **About This Project** passage, complete in substance.
7. **Preliminary bibliography** (10–15 entries), each checked against a library catalog or publisher record before submission.
8. **GitHub repository** with a meaningful commit history and a README (project description, how to play, roadmap of future development). Published to GitHub Pages **only after your explicit permission**.

### Reserved for later development

- Remaining branches of Acts II–III and the endings **The Witness, The Loyalist, The Scapegoat** (with exposure tuning).
- December epilogue variants for all four endings.
- Expanded glossary (40–60 terms) and more historical notes.
- Ambient sound (typewriter, phone ring, radio) with a mute toggle.
- Additional documents and intercepts; optional side files.
- Endings-discovered gallery on the title screen.
- Playtesting and timing tuning to hit 15–20 minutes.
- Full bibliography and a short design reflection for the About section.

**If time runs short before Monday,** cut in this order: Survivor route length (shorten Acts II–III to essential beats) → number of historical notes → glossary size. The interface polish, the Prologue/Act I, the About section, and the bibliography are protected.

## 13. Preliminary sources (to be verified before citing)

**Scholarly**
- Plokhy, Serhii. *The Last Empire: The Final Days of the Soviet Union.* New York: Basic Books, 2014.
- Kotkin, Stephen. *Armageddon Averted: The Soviet Collapse, 1970–2000.* Oxford: Oxford University Press, 2001.
- Brown, Archie. *The Gorbachev Factor.* Oxford: Oxford University Press, 1996.
- Dunlop, John B. *The Rise of Russia and the Fall of the Soviet Empire.* Princeton: Princeton University Press, 1993.
- Solnick, Steven L. *Stealing the State: Control and Collapse in Soviet Institutions.* Cambridge, MA: Harvard University Press, 1998.
- Beissinger, Mark R. *Nationalist Mobilization and the Collapse of the Soviet State.* Cambridge: Cambridge University Press, 2002.
- Linz, Juan J., and Alfred Stepan. *Problems of Democratic Transition and Consolidation.* Baltimore: Johns Hopkins University Press, 1996.
- Kryshtanovskaya, Olga, and Stephen White. "From Soviet *Nomenklatura* to Russian Elite." *Europe-Asia Studies* 48, no. 5 (1996).
- Remnick, David. *Lenin's Tomb: The Last Days of the Soviet Empire.* New York: Random House, 1993. (journalistic, widely cited)

**Primary**
- GKChP, "Appeal to the Soviet People" and accompanying decrees, 18–19 August 1991.
- Yeltsin, Boris, et al. "To the Citizens of Russia," 19 August 1991.
- Agreement on the Establishment of the Commonwealth of Independent States (Belovezha Accords), 8 December 1991.
- Gorbachev, Mikhail. Televised resignation address, 25 December 1991.
- Document collections on the August coup at the Wilson Center Digital Archive and the National Security Archive (George Washington University) — specific items to be selected.

## 14. Left to the builder

- Exact passage names, file split, and macro implementation details.
- Specific fonts (Cyrillic-capable, e.g., PT Mono / PT Serif), textures, and animation details, within the visual direction above.
- Scene-by-scene writing of the Prologue, Act I, and the Survivor route; document text; trust/exposure values — within the characters, mystery, and history above, subject to the author's review.
- Exposure threshold and ending-condition tuning.
- The exact set of glossary terms and historical notes.

## 15. Decisions recorded

- Twine 2 / SugarCube 2 platform — approved.
- Tweego downloaded into `tools/` — approved; nothing else installed without asking.
- Characters in §6 — approved; motivations must stay complex and historically plausible.
- Interactive objects must be period-plausible (§10); documented history and fiction stay clearly distinguished (§5, §10).

**Still to confirm later:** the GitHub account/repository name, and permission to push and enable GitHub Pages.
