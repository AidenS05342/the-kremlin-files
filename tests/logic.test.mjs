// Unit tests for game rules in src/scripts/logic/.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSetup } from './helpers/load-setup.mjs';

const setup = loadSetup();
// vm objects come from another realm; normalize before deep-equal.
const plain = (x) => JSON.parse(JSON.stringify(x));

test('newGame returns independent objects', () => {
  const a = setup.newGame();
  const b = setup.newGame();
  a.trust.rudin = 2;
  assert.equal(b.trust.rudin, 0);
  assert.deepEqual(plain(b.trust), { rudin: 0, belova: 0, zaitsev: 0, markova: 0 });
  assert.deepEqual(plain(b.pulls), { loyalty: 0, reform: 0, survival: 0 });
  assert.equal(b.exposure, 0);
  assert.deepEqual(plain(b.notesSeen), []);
  assert.equal(b.returnTo, 'Start');
});

test('adjustTrust clamps to -3..3 and rejects unknown characters', () => {
  const v = setup.newGame();
  assert.equal(setup.adjustTrust(v, 'belova', 5), 3);
  assert.equal(setup.adjustTrust(v, 'belova', -10), -3);
  assert.equal(v.trust.belova, -3);
  assert.throws(() => setup.adjustTrust(v, 'boris', 1));
});

test('addPull and addExposure accumulate', () => {
  const v = setup.newGame();
  setup.addPull(v, 'survival', 2);
  setup.addPull(v, 'survival', 1);
  assert.equal(v.pulls.survival, 3);
  assert.throws(() => setup.addPull(v, 'greed', 1));
  assert.equal(setup.addExposure(v, 2), 2);
});

test('markClue is idempotent', () => {
  const v = setup.newGame();
  assert.equal(setup.markClue(v, 'packet-7s'), true);
  assert.equal(setup.markClue(v, 'packet-7s'), false);
  assert.equal(v.clues.length, 1);
});

test('setDoc initializes the record', () => {
  const v = setup.newGame();
  setup.setDoc(v, 'd4', 'copied');
  assert.deepEqual(plain(v.docs.d4), { seen: false, held: false, copied: true, destroyed: false, handed: false });
  setup.setDoc(v, 'd4', 'copied', false);
  assert.equal(v.docs.d4.copied, false);
});

test('resolveEnding', () => {
  const v = setup.newGame();
  v.flags.finalDecision = 'kept';
  v.exposure = 5;
  assert.equal(setup.resolveEnding(v), 'scapegoat');
  v.exposure = 4;
  assert.equal(setup.resolveEnding(v), 'survivor');
  v.flags.finalDecision = 'handed';
  assert.equal(setup.resolveEnding(v), 'witness');
  v.flags.finalDecision = 'destroyed';
  assert.equal(setup.resolveEnding(v), 'loyalist');
  delete v.flags.finalDecision;
  assert.equal(setup.resolveEnding(v), 'loyalist');
});

// ---- Registry search (Task 3) ----
function withRegistry(entries, fn) {
  const saved = setup.registry;
  setup.registry = entries;
  try { fn(); } finally { setup.registry = saved; }
}
const R7S = { id: 'r-7s', keys: ['7/с'], requiresClues: ['packet-7s', 'reg-date-14'], docId: 'd4',
  foundLines: ['НАЙДЕНО'], restrictedLines: ['ДОСТУП ОГРАНИЧЕН', 'ACCESS RESTRICTED'] };
const RZ = { id: 'r-z', keys: ['архив'], unlockTrust: { who: 'zaitsev', min: 1 }, requiresClues: ['nope'],
  foundLines: ['OK'], restrictedLines: ['ДОСТУП ОГРАНИЧЕН'] };

test('normalizeQuery maps look-alikes only in Cyrillic or numeric tokens', () => {
  assert.equal(setup.normalizeQuery('  ПАКЕТ  7/c '), 'пакет 7/с');
  assert.equal(setup.normalizeQuery('Union Treaty'), 'union treaty');
});

test('search finds with clues (Latin look-alike query)', () => {
  withRegistry([R7S, RZ], () => {
    const v = setup.newGame();
    v.clues = ['packet-7s', 'reg-date-14'];
    const r = setup.searchRegistry('7/c', v);
    assert.equal(r.status, 'found');
    assert.equal(r.docId, 'd4');
  });
});

test('search restricted without all clues', () => {
  withRegistry([R7S, RZ], () => {
    const v = setup.newGame();
    v.clues = ['packet-7s'];
    const r = setup.searchRegistry('7/С', v);
    assert.equal(r.status, 'restricted');
    assert.ok(r.lines.includes('ДОСТУП ОГРАНИЧЕН'));
    assert.equal(r.docId, undefined);
  });
});

test('trust unlock grants access', () => {
  withRegistry([R7S, RZ], () => {
    const v = setup.newGame();
    v.trust.zaitsev = 1;
    assert.equal(setup.searchRegistry('Архив', v).status, 'found');
  });
});

test('unknown query is notfound', () => {
  withRegistry([R7S, RZ], () => {
    const r = setup.searchRegistry('kremlin', setup.newGame());
    assert.equal(r.status, 'notfound');
    assert.ok(r.lines.includes('ЗАПИСЬ НЕ НАЙДЕНА'));
  });
});

// ---- Interface helpers (Task 6) ----
test('stateOfMind follows the strongest pull', () => {
  const v = setup.newGame();
  assert.match(setup.stateOfMind(v), /head down/);
  v.pulls.survival = 2; v.pulls.reform = 1;
  assert.match(setup.stateOfMind(v), /family/);
  v.pulls.loyalty = 3;
  assert.match(setup.stateOfMind(v), /Party will hold/);
  v.pulls.reform = 5;
  assert.match(setup.stateOfMind(v), /people outside/);
});

test('sortedGlossary sorts encountered words by Russian form', () => {
  const v = setup.newGame();
  v.glossary = ['tank', 'arkhiv', 'da'];
  assert.deepEqual([...setup.sortedGlossary(v)], ['arkhiv', 'da', 'tank']);
});

test('plainTitle strips markup from note titles', () => {
  assert.equal(setup.plainTitle('swan-lake'), 'Swan Lake on television');
});

// ---- Bibliography (Task 12) ----
test('sourcesByType groups and sorts sources alphabetically by citation', () => {
  const scholarly = [...setup.sourcesByType('scholarly')];
  const primary = [...setup.sourcesByType('primary')];
  assert.ok(scholarly.length >= 9 && primary.length >= 4);
  assert.ok(scholarly.every((k) => setup.sources[k].type === 'scholarly'));
  const texts = scholarly.map((k) => setup.sources[k].chicago.replace(/<[^>]+>/g, ''));
  assert.deepEqual(texts, [...texts].sort((a, b) => a.localeCompare(b)));
});

// ---- Final review fixes ----
test('records registered later in the story do not exist yet in the Prologue', () => {
  const v = setup.newGame();
  v.act = 'prologue';
  assert.equal(setup.searchRegistry('telegram', v).status, 'notfound');
  assert.equal(setup.searchRegistry('шифротелеграмма', v).status, 'notfound');
  v.act = 'act1';
  assert.equal(setup.searchRegistry('telegram', v).status, 'found');
});

test('in the Prologue, Packet 7/С is restricted and the date clue cannot be found', () => {
  const v = setup.newGame();
  v.clues = ['packet-7s', 'by-hand'];
  assert.equal(setup.searchRegistry('7/С', v).status, 'restricted');
  assert.equal(setup.searchRegistry('telegram', v).status, 'notfound');
});
