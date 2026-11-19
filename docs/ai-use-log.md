# AI Use Log — The Kremlin Files

**Student:** Aiden Smith · Digital Humanities, University of Tennessee
**AI tool:** Claude Code (Anthropic's command-line coding assistant), model Claude Opus 5.5
**Session dates:** 18 November 2026 (one working session, interrupted once and resumed the same evening)
**Purpose of this log:** to document how AI was used in the project, what the student decided, what the AI generated, and how the output was checked.

> This log is a summary written by the AI at the student's request, based on the session record. The verbatim conversation is the authoritative record. Export it with Claude Code's `/export` command and attach it as an appendix (see "Exporting the full transcript" below).

---

## 1. How the work was divided

| The student decided | The AI proposed or generated |
|---|---|
| Project concept, title, setting (Moscow, 1991) and goals | Clarifying questions, asked one at a time, to develop the concept |
| The argument: 1991 as a contested transition; the political science concepts to include | Concrete options with trade-offs at each decision point |
| Centering the story on the August Coup, with an August prologue and a December epilogue | The design document and the implementation plan |
| Player role: a Central Committee staffer handling classified correspondence | All code: SugarCube macros, game logic, interface, CSS, tests, build script |
| The four endings, with two changes: the Scapegoat must build up over several decisions, and all endings must be morally ambiguous | Draft prose for the Prologue, Act I and the Survivor route; document texts; historical notes; the About page |
| Approval of the five fictional characters | Names and personalities of those characters (approved by the student) |
| Scope: 15–20 minutes, four endings; a 60–70% prototype for 23 November with listed priorities | The preliminary bibliography (from sources the AI knew; marked "awaiting verification") |
| **Platform: Twine 2 / SugarCube**, overruling the AI's initial recommendation of a hand-built site | Proposed project permission settings (applied by the student) |
| Requirements: historical accuracy, no invented citations, clear fact/fiction separation, period-plausible technology | Browser testing and screenshots |
| Approvals before each phase: design → plan → permissions → implementation; no publishing without approval | |

## 2. Session timeline

1. **Brainstorming.** At the student's request, the AI used a structured brainstorming process. Questions covered the learning goals (the student wanted players to understand 1991 as a complicated transition, using concepts such as legitimacy, authoritarianism, democratization, regime change and institutional collapse), the deadline (23 November 2026), playthrough length, the player's role, and the endings.
2. **Platform decision.** The AI first recommended a hand-built HTML/CSS/JavaScript site. The student chose **Twine/SugarCube** instead, citing prior coursework with Twine. The AI rewrote the design document for Twine.
3. **Design document approved** (`docs/superpowers/specs/2026-11-18-kremlin-files-design.md`). The student asked for duplicated sections and leftover references to the earlier option to be removed, approved the characters, and added a requirement that the in-game terminal be historically plausible rather than modern-looking.
4. **Implementation plan approved** (`docs/superpowers/plans/2026-11-18-kremlin-files-prototype.md`): 12 tasks. The student chose single-session execution.
5. **Permissions.** Mid-development, the student asked for project-specific permissions so routine builds, tests and local commits would not need approval each time. The AI proposed a configuration and the student approved it. The AI's tool was blocked from writing Claude Code settings files, so the student applied the configuration with one copy command. Approval is still required for deleting files, installing software, GitHub activity, and changes outside the project.
6. **Implementation, Tasks 1–11.** The AI built the project, tested each piece, and committed after each task (see the git history). The session was interrupted during Task 11 testing.
7. **Resumed session.** The student asked the AI to review the project state, finish Task 11, complete Task 12, prepare for GitHub Pages without publishing, and produce this log.
8. **Final review.** A separate AI reviewer instance reviewed the whole project. It found no critical problems, plus one logic bug: a terminal search in the Prologue could skip ahead to an Act I document. It also flagged several historical phrasings that overstated or could not verify facts: the Union Treaty's name, how many republics the treaty covered, the publication date of the emergency committee's appeal, and times of day. All were fixed, and the logic bug is covered by new tests.

9. **Publication (with the student's explicit approval).** The prototype branch was merged into `main` (a fast-forward, preserving every commit). A public repository was created at https://github.com/AidenS05342/the-kremlin-files and GitHub Pages enabled from `main`. The AI then played through the live site at https://aidens05342.github.io/the-kremlin-files/ from the title screen to *The Survivor* with no errors.

## 3. Software installed or downloaded

- **Tweego 2.1.1** (a Twine compiler), downloaded into the project's `tools/` folder with the student's explicit approval. Nothing else was installed.

## 4. How AI output was verified

- **Automated tests (30)**, run with `node --test tests/`. They check that every story link leads to an existing passage, that there are no dead ends, and that every Russian word, historical note, clue and document referenced in the story exists. They check that every historical note cites a source in the bibliography, and they test the game rules: trust limits, clue recording, terminal search and ending selection.
- **Browser playthroughs** on a local preview server, including:
  - the full route from the title screen to *The Survivor*;
  - two Prologue runs (first choice and last choice everywhere), with all scores checked against the plan;
  - three Act I paths: the terminal route, the archivist route, and the journalist call that only rings when the reformist colleague trusts Volkov;
  - the Scapegoat threshold;
  - save/Continue, phone-width layout, reduced-motion mode and text contrast.
- **Bugs found and fixed during testing** included:
  - CSS class names clashing with SugarCube's page tags;
  - two script files sharing a name;
  - an incorrect expression syntax that broke the Back links on the academic pages (a regression test now guards against it);
  - documents overflowing on phone screens.

## 5. Historical accuracy: limits and cautions

- The AI wrote the historical notes and bibliography from its own training knowledge, **without consulting library sources during the session**. To respect the student's rule against invented citations:
  - every source is marked **"awaiting verification"** on the in-game Bibliography page;
  - every historical note says **"page-level citations pending verification"**;
  - details the AI was not confident of were removed, such as a journal page range and the exact minute the Soviet flag was lowered.
- The in-game registry terminal is labelled in-game as a **reconstruction**. Soviet ES-1841 computers existed, but their use in this specific office is not documented.
- **Bibliography verification (19 November 2026).** At the student's request, the AI checked every bibliography entry by web search against library catalogue records, publisher listings and the National Security Archive's own pages. The check covered author, title, publisher or venue, and year.
  - All 14 entries were confirmed and marked `verified: true`.
  - Corrections and additions: the page range and DOI for Kryshtanovskaya & White (711–33); series names for Solnick and Beissinger; the specific National Security Archive briefing book (No. 357, ed. Savranskaya, 2011); the samizdat reprint of Yeltsin's appeal; and the removal of an unconfirmed claim about where the emergency committee's appeal was printed.
- **Still open:** the *page-level* support for each historical note (`pagesChecked` in `notes.js`) has not been checked against the books themselves. The student should confirm these at the library before treating the notes as fully cited.
- All characters, documents and conversations are fictional and are labelled as such in the game.

## 6. Decisions the AI made on the student's behalf

During implementation the AI recorded each judgement call. Examples:
- replacing a planned "Party Programme circular" with a fictional procedural circular, to avoid an unverified historical claim;
- adding small transition scenes so that phone calls ring before they are answered;
- adding an option to phone the journalist at the final decision when the player has that contact;
- exporting a ready-to-import Twine file on every build so the student can keep editing in Twine 2.

Each was reported to the student at the end of development.

## 7. Exporting the full transcript

The verbatim conversation (every prompt and response, including the student's own wording) is stored by Claude Code on this computer. To include it with the assignment:

1. In Claude Code, run **`/export`** and choose to save the conversation to a file. Save it to `docs/ai-session-transcript.txt`, or attach it separately.
2. Claude Code's raw session files are also stored under `~/.claude/projects/` in a folder named after this project. They are JSON Lines files, best treated as backup.
3. The git history (`git log`) is a timestamped record of each development step. Every AI-authored commit is marked `Co-Authored-By: Claude`.
