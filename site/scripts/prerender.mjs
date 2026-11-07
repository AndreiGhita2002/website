// Writes the server-rendered app into dist/index.html so the page has its full
// content without JavaScript, then removes the temporary SSR bundle.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const path = (relative) => fileURLToPath(new URL(relative, import.meta.url));

const { render } = await import('../dist-ssr/entry-server.js');
const template = await readFile(path('../dist/index.html'), 'utf8');

if (!template.includes('<!--app-->')) {
  throw new Error('dist/index.html has no <!--app--> marker');
}

await writeFile(path('../dist/index.html'), template.replace('<!--app-->', () => render()));
await rm(path('../dist-ssr'), { recursive: true });
