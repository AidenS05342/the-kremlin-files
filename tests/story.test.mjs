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
