import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://paramountpropertyrestoration.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({ filter: (page) => !['/410-gone/', '/404/', '/404.html'].includes(new URL(page).pathname) }),
  ],
});
