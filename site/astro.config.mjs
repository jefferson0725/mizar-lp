// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

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
      filter: (page) => !/\/links\/?$/.test(page),
    }),
  ]
});
