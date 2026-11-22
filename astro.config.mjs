// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The same source builds two sites:
//  - production: https://mkegg.com (no base path)
//  - preview:    https://davidrimoczi.github.io/mkegg-preview (base /mkegg-preview, hidden from search engines)
// The GitHub Actions workflow sets SITE_URL and BASE_PATH for each.
const site = process.env.SITE_URL || 'https://mkegg.com';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
