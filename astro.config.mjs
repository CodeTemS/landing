// @ts-check
import { defineConfig } from 'astro/config';
// @ts-ignore
import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://CodeTemS.github.io/landing',
  integrations: [tailwind(), react()]
});