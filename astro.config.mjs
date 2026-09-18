// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Replace with your production domain before deploying to Cloudflare Pages.
export default defineConfig({
  site: 'https://webcraft.example.com',
  output: 'static',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
