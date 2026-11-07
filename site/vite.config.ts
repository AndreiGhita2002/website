import { readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Fills the {{placeholders}} in index.html from the "site" block of the content file,
// since React only renders the page body.
function siteMeta(): Plugin {
  return {
    name: 'site-meta',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const file = new URL('./src/content/projects.json', import.meta.url);
        const { site } = JSON.parse(readFileSync(file, 'utf8')) as { site: Record<string, string> };
        return html.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
          if (!(key in site)) throw new Error(`index.html uses {{${key}}}, but "site" has no "${key}"`);
          return escapeHtml(site[key]);
        });
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), siteMeta()],
});
