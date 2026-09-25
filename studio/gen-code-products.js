/**
 * Pre-build: writes schemaTypes/codeProducts.json, the list of products that live in the
 * site's code (src/data/products/*.json), so the "New In" editor can offer them in a
 * dropdown next to the products Sam adds himself. Placeholder products are left out:
 * they never reach the live site (see src/data/productData.js).
 *
 * Re-run (it runs as part of `npm run build`) whenever code products are added or renamed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(here, '../src/data/products');

const list = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))
  .filter((p) => !p.placeholder && p.name)
  .map((p) => ({ title: p.name, value: `code-${p.id}`, newArrival: Boolean(p.newArrival) }))
  .sort((a, b) => a.title.localeCompare(b.title));

fs.writeFileSync(path.join(here, 'schemaTypes/codeProducts.json'), JSON.stringify(list, null, 2) + '\n');
console.log(`gen-code-products: ${list.length} code products (${list.filter((p) => p.newArrival).length} currently New In)`);
