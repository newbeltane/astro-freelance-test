import { tinaAdminDevRedirect } from '@tinacms/astro/vite';
import tina from '@tinacms/astro/integration';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, fontProviders } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import type { AstroIntegration } from 'astro';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  site: 'https://newbeltane.co.uk',
  output: 'static',
  // Only use the Cloudflare adapter during 'pnpm build', avoiding local dev crashes
  adapter: process.env.NODE_ENV === 'production' ? cloudflare() : undefined,

  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['100 900'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
  ],

  integrations: [
    react(),
    tina(),
    sitemap(),
    mdx(),
    icon({
      iconDir: 'src/assets/icons',
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    compress({
      CSS: { csso: false, lightningcss: { minify: true } },
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
  ],

  image: {
    domains: ['cdn.pixabay.com', 'images.unsplash.com'],
    responsiveStyles: true,
  },

  markdown: {
    processor: unified({
      remarkPlugins: [],
      rehypePlugins: [],
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },

  vite: {
    plugins: [tailwindcss(), tinaAdminDevRedirect()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
      dedupe: ['react', 'react-dom'],
    },
  },
});