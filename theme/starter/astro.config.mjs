// SPDX-FileCopyrightText: 2026 The freelance-persona_theme Project Contributors
//
// SPDX-License-Identifier: MIT

// @ts-check
// starter/astro.config.mjs
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import unocss from '@unocss/astro';
import freelancePersona from 'astro-freelance-persona_theme';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  base: process.env.BASE_PATH ? (process.env.BASE_PATH.endsWith('/') ? process.env.BASE_PATH : process.env.BASE_PATH + '/') : undefined,
  compress: { zstd: true, brotli: true },
  integrations: [
    icon({
      include: {
        bi: ['*'],
        academicons: ['*']
      }
    }),
    sitemap({
      filter: (page) => true,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    unocss(),
    freelancePersona()
  ],
  vite: {
    plugins: [
      viteCompression({
        algorithm: 'zstd',
        ext: '.zst',
        threshold: 1024,
        deleteOriginFile: false,
        filter: /\.(js|css|html|svg|woff2?|ttf|eot|otf|json|xml|txt|ico|png|jpg|jpeg|gif|webp|avif)$/
      }),
      viteCompression({
        algorithm: 'brotli',
        ext: '.br',
        threshold: 1024,
        deleteOriginFile: false,
        filter: /\.(js|css|html|svg|woff2?|ttf|eot|otf|json|xml|txt|ico|png|jpg|jpeg|gif|webp|avif)$/
      })
    ]
  }
})