// Writes the server-rendered app into dist/index.html so the page has its full
// content without JavaScript, then removes the temporary SSR bundle.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/** @param {string} relative */
const path = (relative) => fileURLToPath(new URL(relative, import.meta.url));

// A computed path, because this bundle only exists partway through `npm run build`.
const { render } = await import(new URL('../dist-ssr/entry-server.js', import.meta.url).href);
const template = await readFile(path('../dist/index.html'), 'utf8');

if (!template.includes('<!--app-->')) {
  throw new Error('dist/index.html has no <!--app--> marker');
}

await writeFile(path('../dist/index.html'), template.replace('<!--app-->', () => render()));
await rm(path('../dist-ssr'), { recursive: true });
