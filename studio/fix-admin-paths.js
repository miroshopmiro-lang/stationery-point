/**
 * Post-build fixup, copied from Augzet V2's studio (same bug, fixed there 8 Aug 2026).
 *
 * `sanity build` can write public/admin/index.html with root-absolute asset paths
 * ("/static/sanity-*.js"). The studio is served from /admin/, so those resolve to /static/...,
 * which does not exist. Cloudflare Pages then answers with the site's index.html, the module
 * script gets text/html instead of JavaScript, and the studio is a blank page.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(here, '../public/admin/index.html');

if (!fs.existsSync(indexPath)) {
  console.error('[fix-admin-paths] public/admin/index.html not found. Did `sanity build` run?');
  process.exit(1);
}

const original = fs.readFileSync(indexPath, 'utf8');
const rewritten = (original.match(/"\/static\//g) || []).length;

if (rewritten > 0) {
  fs.writeFileSync(indexPath, original.split('"/static/').join('"/admin/static/'), 'utf8');
  console.log(`[fix-admin-paths] rewrote ${rewritten} asset paths: /static/ -> /admin/static/`);
} else {
  const ok = (original.match(/"\/admin\/static\//g) || []).length;
  console.log(ok > 0
    ? `[fix-admin-paths] already correct: ${ok} asset paths point at /admin/static/`
    : '[fix-admin-paths] WARNING: no /static/ or /admin/static/ paths found. Open the build output.');
}

console.log(
  '[fix-admin-paths] reminder: every origin that serves the studio or the site must be a CORS\n' +
  '                  origin (Allow credentials ON) at sanity.io/manage -> API -> CORS origins.'
);
