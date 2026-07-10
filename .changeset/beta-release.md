---
"astro-freelance-persona_theme": minor
---

# Beta Release v0.1.0-beta.0

## Features
- **Font optimization**: Variable fonts (Raleway Variable, Roboto Variable) with `font-display: swap`, 18→5 font files
- **Zstd + Brotli compression**: Build-time compression via `vite-plugin-compression` for all text assets (CSS, JS, fonts, SVG, HTML)
- **LCP image optimization**: `fetchpriority="high"` preload for hero background image
- **Security headers**: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP, CORP
- **Preview server security headers for Cloudflare Pages / Netlify via `_headers` file
- Preview server middleware for development

## Performance
- Lighthouse TBT target <150ms, Max FID <100ms
- Font requests reduced from 18→5
- Compressed assets served pre-compressed (zero CPU cost at runtime)

## Build System
- UnoCSS v66.7.4 (Bootstrap fully removed)
- Variable fonts with font-display: swap
- MathJax fonts self-hosted (23 fonts)
- Dynamic font preloads from themeConfig