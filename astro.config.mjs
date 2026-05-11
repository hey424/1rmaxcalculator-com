import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://1rmaxcalculator.com',
  output: 'static',
  integrations: [
    sitemap(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
