# The Kremlin Files · Кремлёвские досье

An interactive historical political mystery set inside the Central Committee of the Communist Party of the Soviet Union during the August Coup of 1991. You play Andrei Volkov, a mid-level Party official who finds evidence that "emergency measures" were prepared before the coup, and who has to decide what to do with it as his own institution collapses around him.

> **🚧 Work-in-progress prototype (November 2026).** The Prologue, Act I and one complete route to the ending *The Survivor* are playable. **Three additional endings, *The Witness*, *The Loyalist* and *The Scapegoat*, are planned for future development.** In the game they currently appear as clearly marked "in development" cards.

Final project for an undergraduate **Digital Humanities** course at the **University of Tennessee**. Built with **Twine 2 / SugarCube 2**.

**Play:** _GitHub Pages URL to be added on publication_

## Academic purpose

The game argues that the Soviet collapse was not a single event but a contested political transition. Its choices pull between **loyalty** (to the Party and state), **reform** and **survival**. Its four endings each illustrate a political science concept: **political legitimacy**, **authoritarianism**, **democratization**, **regime change** and **institutional collapse**. The in-game *About This Project* page explains each concept and where it appears.

**Fact and fiction.** Volkov, his colleagues and every document in the game are fictional. The events of August 1991 are real. Anything stamped **ИСТОРИЧЕСКАЯ СПРАВКА** ("historical note") opens a note with its sources. Real historical figures appear only through their documented public actions.

**Russian.** Beginner Russian vocabulary appears throughout. Hover over or tap a dotted word for its translation. Nothing in the story requires knowing Russian.

## Prototype status (November 2026)

| Done | In development |
|---|---|
| Soviet-office desk interface: in-tray, desk drawer, rotary phone, ES-1841-style registry terminal, notebook, dictionary | Remaining branches of Acts II–III |
| Prologue (12 Aug) and Act I (19 Aug), fully playable and branching | Endings: *The Witness*, *The Loyalist*, *The Scapegoat* (currently clearly marked "in development" cards) |
| Investigation: mark clues in documents → search the registry terminal → unlock files | More documents, intercepts and vocabulary (target 40–60 words) |
| Relationships (trust with four characters), loyalty/reform/survival tracking, cumulative exposure | Ambient sound |
| One complete route through 23 August to the ending ***The Survivor*** (~15–20 min) | Page-level verification of every citation; expanded bibliography |
| 15 historical notes, 36-word dictionary, About, Bibliography, Credits | Playtesting and timing |

## How to play locally

Open `index.html` in any modern browser. It is a single self-contained file; fonts load from Google Fonts when online.

## How to build

Requires [Tweego](https://www.motoslave.net/tweego/) 2.1.1, unpacked into `tools/tweego/` (not committed):

    scripts/build.sh        # compiles src/ → index.html

## How to test

    node --test tests/      # story-graph, cross-reference and game-logic tests (Node 18+, no packages)

The tests check that every link leads to a real passage, that no passage is a dead end, that every Russian word, historical note, clue and document referenced in the story exists, that every note cites a known source, and the game rules (trust limits, clue recording, registry search and ending resolution).

## Editing in the Twine 2 visual editor

The story source is standard Twee 3. To open it in Twine 2.6 or later:

1. Use the ready-made file **`twine/the-kremlin-files.twee`**. `scripts/build.sh` regenerates it from `src/` on every build.
2. In Twine: **Library → Import**, and choose that file.
3. Edit visually. To bring changes back, use **Build → Export as Twee** and copy the passages into the matching files under `src/`.

## Project structure

```
src/story/       StoryData, StoryInit, StoryInterface (desk layout), panels, title, side pages, stubs
src/prologue/    Prologue passages          src/act1/  Act I
src/act2/        Act II (Survivor route)    src/act3/  Act III
src/epilogue/    Survivor ending            src/documents/  in-game documents
src/academic/    About, Bibliography, Credits
src/scripts/     logic/ (game rules), data/ (glossary, notes, sources, documents, clues, registry), ui/ (macros, terminal)
src/styles/      CSS
tests/           automated tests
docs/            design document, implementation plan, development log, AI use log
```

## Credits

Concept and design: Aiden Smith. Developed with the assistance of Claude (Anthropic) in Claude Code; see `docs/ai-use-log.md`. SugarCube and Tweego by Thomas Michael Edwards (BSD 2-Clause). Fonts: PT Serif, PT Sans Narrow, PT Mono (ParaType) and Marck Script (Denis Masharov), all under the SIL Open Font License. All visuals are original CSS/SVG.
