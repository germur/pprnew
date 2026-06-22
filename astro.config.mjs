import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://paramountpropertyrestoration.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
