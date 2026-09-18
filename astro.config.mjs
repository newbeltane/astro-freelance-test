import { defineConfig } from 'astro/config';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';

import react from '@astrojs/react';

export default defineConfig({
  // We removed the 'server' output and node adapter to keep Abacus running statically
  integrations: [tina(), react()],
  vite: {
    plugins: [tinaAdminDevRedirect()],
    ssr: { noExternal: ['@tinacms/astro', '@tinacms/bridge'] },
  },
});