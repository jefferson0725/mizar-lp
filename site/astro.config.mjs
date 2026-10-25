// @ts-check
import { defineConfig } from 'astro/config';
import { readdirSync, readFileSync } from 'node:fs';

import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

/**
 * lastmod real de cada artículo en archivo (updated || pub_date), leído del frontmatter de
 * src/content/blog/*.md. Así el sitemap no cambia la fecha de los artículos en cada build.
 */
function blogLastmods() {
  const dir = new URL('./src/content/blog/', import.meta.url);
  const map = new Map();
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.md') || f === 'README.md' || f.startsWith('_')) continue;
    const fm = readFileSync(new URL(f, dir), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) continue;
    const field = (name) => {
      const line = fm[1].split(/\r?\n/).find((l) => l.startsWith(`${name}:`));
      if (line === undefined) return undefined;
      return line.slice(name.length + 1).replace(/\s+#.*$/, '').trim().replace(/^["']|["']$/g, '');
    };
    if (field('draft') === 'true') continue;
    const slug = field('slug') ?? f.replace(/\.md$/, '');
    const date = (field('updated') ?? field('pub_date'))?.match(/^\d{4}-\d{2}-\d{2}/)?.[0];
    if (date) map.set(slug, date);
  }
  return map;
}
const blogDates = blogLastmods();

// https://astro.build/config
export default defineConfig({
  site: 'https://grupomizar.com.co',
  compressHTML: true,
  // Las páginas se publican como /ruta/ (directorio): una sola variante de URL.
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['.trycloudflare.com', '.loca.lt']
    },
  },

  integrations: [
    preact(),
    sitemap({
      // Fuera del sitemap: páginas de enlaces de redes.
      // La plantilla de vista previa del blog (/vista-previa/) tampoco va.
      filter: (page) => !/\/links\/?$/.test(page) && !/\/vista-previa\//.test(page),
      // lastmod de cada artículo = su fecha real (updated || pub_date). Las demás URLs, igual que antes.
      serialize: (item) => {
        const slug = item.url.match(/\/blog\/([^/]+)\/$/)?.[1];
        const date = slug && blogDates.get(slug);
        if (date) item.lastmod = date;
        return item;
      },
    }),
  ]
});
