// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://mizar.com.co',
  adapter: node({ mode: 'standalone' }),
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['.trycloudflare.com', '.loca.lt']
    },
    optimizeDeps: {
      exclude: ['react/jsx-dev-runtime'],
    },
  },

  integrations: [react(), sitemap()]
});