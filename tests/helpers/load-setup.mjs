// Loads the Node-safe story scripts (logic + data) into a sandbox whose only
// global is SugarCube's `setup` object, mirroring how they run in the browser.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const SCRIPTS = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'src', 'scripts');

export function loadSetup() {
  const context = vm.createContext({ setup: {} });
  for (const sub of ['logic', 'data']) {
    const dir = path.join(SCRIPTS, sub);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((n) => n.endsWith('.js')).sort()) {
      vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), context, { filename: f });
    }
  }
  return context.setup;
}
