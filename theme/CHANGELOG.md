# astro-freelance-persona_theme

## 0.1.0

### Minor Changes

- 97fef08: Implement dynamic build-time version introspection and token replacement in the footer, qualifications, and features.
- fddbe1f: Bump to Astro7 and small UI fixes
- 9b86482: Initial alpha release
- f96b79a: Fix UI clipping issue, and made favicon theme aware.

### Patch Changes

- 551266f: fix(deps): resolve KaTeX version mismatch dynamically via Rehype wrapper
- 9490730: Preload above-the-fold hero background and blog post thumbnail images in HTML head, reduce preloader fadeout transition from 600ms to 250ms, and adjust scroll animations duration from 800ms to 500ms for snappier mobile performance.
- ecac332: Optimize mobile PageSpeed score by preloading critical fonts, speeding up the preloader fadeout, and initializing scroll animations synchronously.

## 0.1.0-alpha.9

### Minor Changes

- # Beta Release v0.1.0-beta.0

  ## Features

  - **Font optimization**: Variable fonts (Raleway Variable, Roboto Variable) with `font-display: swap`, 18→5 font files
  - **Zstd + Brotli compression**: Build-time compression via `vite-plugin-compression` for all text assets (CSS, JS, fonts, SVG, HTML)
  - **LCP image optimization**: `fetchpriority="high"` preload for hero background image
  - **Security headers**: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP, CORP
  - \*\*Preview server security headers for Cloudflare Pages / Netlify via `_headers` file
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

# 0.1.0-alpha.7

### Minor Changes

- Bump to Astro7 and small UI fixes

### Minor Changes

- Bump to Astro7 and small UI fixes

## 0.1.0-alpha.6

### Minor Changes

- Fix UI clipping issue, and made favicon theme aware.

## 0.1.0-alpha.5

### Minor Changes

- Implement dynamic build-time version introspection and token replacement in the footer, qualifications, and features.

## 0.1.0-alpha.2

### Patch Changes

- fix(deps): resolve KaTeX version mismatch dynamically via Rehype wrapper

## 0.1.0-alpha.1

### Patch Changes

- e84ec2e: Preload above-the-fold hero background and blog post thumbnail images in HTML head, reduce preloader fadeout transition from 600ms to 250ms, and adjust scroll animations duration from 800ms to 500ms for snappier mobile performance.
- e825a8e: Optimize mobile PageSpeed score by preloading critical fonts, speeding up the preloader fadeout, and initializing scroll animations synchronously.

## 0.1.0-alpha.0

### Minor Changes

- Initial alpha release
