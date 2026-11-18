// Minimal Twee 3 reader for story checks. Static links only: dynamic targets
// (variables, expressions) are invisible here by design.
import fs from 'node:fs';
import path from 'node:path';

const SPECIAL_NAMES = new Set([
  'StoryTitle', 'StoryData', 'StoryInit', 'StoryInterface', 'StoryCaption',
  'StoryMenu', 'StoryBanner', 'StorySubtitle', 'StoryAuthor', 'PassageReady', 'PassageDone',
  'PassageHeader', 'PassageFooter',
]);
const SPECIAL_TAGS = ['script', 'stylesheet', 'widget'];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return walk(full);
    return e.name.endsWith('.twee') || e.name.endsWith('.tw') ? [full] : [];
  });
}

/** @returns {Map<string, {name, tags: string[], text: string, file: string, special: boolean}>} */
export function parseTwee(dir) {
  const map = new Map();
  for (const file of walk(dir).sort()) {
    const chunks = fs.readFileSync(file, 'utf8').split(/^::/m).slice(1);
    for (const chunk of chunks) {
      const nl = chunk.indexOf('\n');
      const header = (nl === -1 ? chunk : chunk.slice(0, nl)).trim();
      const text = (nl === -1 ? '' : chunk.slice(nl + 1)).replace(/<!--[\s\S]*?-->/g, '');
      const m = header.match(/^(.*?)\s*(?:\[([^\]]*)\])?\s*(?:\{.*\})?$/);
      const name = m[1].trim();
      const tags = m[2] ? m[2].trim().split(/\s+/) : [];
      if (map.has(name)) throw new Error(`Duplicate passage "${name}" in ${file}`);
      map.set(name, {
        name, tags, text, file,
        special: SPECIAL_NAMES.has(name) || tags.some((t) => SPECIAL_TAGS.includes(t)),
      });
    }
  }
  return map;
}

const Q = `(?:"([^"]+)"|'([^']+)')`;

/** Static passage targets referenced in a passage body. */
export function linksOf(text) {
  const out = [];
  for (const m of text.matchAll(/\[\[([^\]]+)\](?:\[[^\]]*\])?\]/g)) {
    const inner = m[1];
    let target = inner;
    if (inner.includes('|')) target = inner.slice(inner.lastIndexOf('|') + 1);
    else if (inner.includes('->')) target = inner.slice(inner.lastIndexOf('->') + 2);
    else if (inner.includes('<-')) target = inner.slice(0, inner.indexOf('<-'));
    out.push(target.trim());
  }
  for (const m of text.matchAll(new RegExp(`<<(?:link|button)\\s+${Q}\\s+${Q}`, 'g'))) out.push(m[3] || m[4]);
  for (const m of text.matchAll(new RegExp(`<<(?:goto|include)\\s+${Q}`, 'g'))) out.push(m[1] || m[2]);
  for (const m of text.matchAll(/data-passage="([^"]+)"/g)) out.push(m[1]);
  return out;
}

/** First quoted argument of every <<name "...">> call. */
export function macroArgs(text, name) {
  return [...text.matchAll(new RegExp(`<<${name}\\s+${Q}`, 'g'))].map((m) => m[1] || m[2]);
}
