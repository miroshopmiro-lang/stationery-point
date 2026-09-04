#!/usr/bin/env node
// Starts the Vite dev server with the working directory pinned to the project.
//
// Needed because this repo is usually previewed from another folder, and
// tailwind.config.js resolves its `content` globs against process.cwd() — start
// Vite from anywhere else and Tailwind scans nothing, emits no utilities, and
// the site renders completely unstyled.
import { createServer } from 'vite';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);

const server = await createServer({
  root,
  server: { port: Number(process.env.PORT) || 5173, strictPort: true },
});
await server.listen();
server.printUrls();
