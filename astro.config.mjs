import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/config/site';

export default defineConfig({
  site: siteConfig.siteUrl,
  output: 'static',
  integrations: [sitemap()],
  compressHTML: true,
  build: {
    format: 'directory'
  }
});
