// Story-graph and cross-reference checks over the Twee source in src/.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { parseTwee, linksOf } from './helpers/twee.mjs';

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');
const passages = parseTwee(SRC);

// Passages reached through interface panels, $tray, or the bar rather than story links.
const INTERFACE_TAGS = ['panel', 'side', 'academic', 'stub', 'document', 'terminal', 'title'];
const TERMINAL_TAGS = ['ending', 'stub', 'panel', 'side', 'academic', 'document', 'terminal'];
const hasAny = (p, tags) => p.tags.some((t) => tags.includes(t));

test('parser handles all link forms', () => {
  const got = linksOf('[[A]] [[b|B]] [[c->C]] [[D<-d]] <<link "e" "E">> <<goto "F">> <<include "G">> data-passage="H" <<button "i" "I">>');
  assert.deepEqual([...got].sort(), ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);
});

test('every link target exists', () => {
  const missing = [];
  for (const p of passages.values()) {
    for (const target of linksOf(p.text)) {
      if (!passages.has(target)) missing.push(`${p.name} -> ${target}`);
    }
  }
  assert.deepEqual(missing, []);
});

test('every main-line passage is reachable from Start', () => {
  assert.ok(passages.has('Start'), 'Start passage exists');
  const seen = new Set(['Start']);
  const queue = ['Start'];
  while (queue.length) {
    const p = passages.get(queue.shift());
    for (const t of linksOf(p.text)) {
      if (passages.has(t) && !seen.has(t)) { seen.add(t); queue.push(t); }
    }
  }
  const unreachable = [...passages.values()]
    .filter((p) => !p.special && !seen.has(p.name) && !hasAny(p, INTERFACE_TAGS))
    .map((p) => p.name);
  assert.deepEqual(unreachable, []);
});

test('no dead ends', () => {
  const dead = [...passages.values()]
    .filter((p) => !p.special && !hasAny(p, TERMINAL_TAGS) && p.name !== 'Start' && linksOf(p.text).length === 0)
    .map((p) => p.name);
  assert.deepEqual(dead, []);
});

// ---- Content data cross-references (Task 4) ----
import { loadSetup } from './helpers/load-setup.mjs';
import { macroArgs } from './helpers/twee.mjs';
const setup = loadSetup();
const allText = [...passages.values()].map((p) => p.text).join('\n');

test('glossary has ≥25 complete entries', () => {
  const entries = Object.entries(setup.glossary || {});
  assert.ok(entries.length >= 25, `only ${entries.length} glossary entries`);
  for (const [id, g] of entries) {
    assert.ok(g.ru && g.translit && g.en, `incomplete glossary entry ${id}`);
  }
});

test('every source has a type and a Chicago citation', () => {
  const entries = Object.entries(setup.sources || {});
  assert.ok(entries.length >= 10);
  for (const [key, s] of entries) {
    assert.ok(['scholarly', 'primary'].includes(s.type), `${key} type`);
    assert.ok(s.chicago && s.chicago.length > 20, `${key} citation`);
    assert.equal(typeof s.verified, 'boolean', `${key} verified flag`);
  }
});

test('every note cites a known source or is labelled a reconstruction', () => {
  const notes = Object.entries(setup.notes || {});
  assert.ok(notes.length >= 12);
  for (const [id, n] of notes) {
    assert.ok(n.title && n.date && n.body, `incomplete note ${id}`);
    if (n.reconstruction) {
      assert.match(n.body, /reconstruction/i, `${id} must say it is a reconstruction`);
    } else {
      assert.ok(n.sources && n.sources.length, `${id} has no sources`);
      for (const s of n.sources) assert.ok(s in setup.sources, `${id} cites unknown source ${s}`);
    }
  }
});

test('every <<ru>>, <<note>>, <<clue>> id used in passages exists', () => {
  const missing = [
    ...macroArgs(allText, 'ru').filter((id) => !(id in setup.glossary)).map((id) => `ru:${id}`),
    ...macroArgs(allText, 'note').filter((id) => !(id in setup.notes)).map((id) => `note:${id}`),
    ...macroArgs(allText, 'clue').filter((id) => !(id in setup.clues)).map((id) => `clue:${id}`),
  ];
  assert.deepEqual(missing, []);
});

test('documents that have passages are tagged document', () => {
  for (const [id, d] of Object.entries(setup.documents || {})) {
    assert.ok(d.title && d.passage && d.classification, `incomplete document ${id}`);
    const p = passages.get(d.passage);
    if (p) assert.ok(p.tags.includes('document'), `${d.passage} not tagged document`);
  }
});

test('every registry docId and required clue exists', () => {
  for (const e of setup.registry) {
    if (e.docId) assert.ok(e.docId in setup.documents, `${e.id} -> unknown doc ${e.docId}`);
    for (const c of e.requiresClues || []) assert.ok(c in setup.clues, `${e.id} -> unknown clue ${c}`);
  }
});
