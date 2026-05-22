# Advanced Performance Optimization Plan

We have successfully reduced the base theme CSS bundle size to just **7.0 kB** by modularizing the Bootstrap SCSS imports and restricting Fontsource styles to the `latin` subset. 

This plan implements **Round 2 of performance optimizations**, targeting the critical rendering path, resource leaks, font loading bottlenecks, and Largest Contentful Paint (LCP) priority to achieve perfect mobile performance scores.

## Proposed Changes

---

### 1. Dynamic KaTeX Loading & CSS Leak Prevention

#### [MODIFY] [KatexLoader.astro](file:///home/fabio/Documents/Programming/Website/Astro/astro_freelance-persona_theme/theme/src/freelance-persona/components/KatexLoader.astro)

Currently, `KatexLoader.astro` statically imports KaTeX CSS and the auto-render library:
```typescript
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';
```
Because this component is statically imported in `BaseLayout.astro`, Vite parses it during the build phase and extracts `katex.min.css` (**29.29 kB**) into the main critical layout CSS. This forces every single page (including the homepage) to download and block rendering on KaTeX styles, even when `tex` is `false` (default).

To solve this, we will load both the stylesheet and the rendering library **dynamically on the client side** using Vite's dynamic import capabilities. This will completely remove KaTeX from the critical CSS bundle and split it into a separate lazy-loaded chunk that is only fetched when `<KatexLoader />` actually renders:

```astro
<script>
  // Dynamically load KaTeX CSS and the auto-render library on the client side.
  // This prevents KaTeX from leaking into the layout's critical rendering path.
  Promise.all([
    import('katex/dist/katex.min.css'),
    import('katex/dist/contrib/auto-render')
  ]).then(([_, { default: renderMathInElement }]) => {
    const options = {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
      ],
      throwOnError : false
    };

    function init() {
      renderMathInElement(document.body, options);
    }

    // Run immediately when this component is mounted
    init();

    // Re-run on View Transitions
    document.addEventListener('astro:page-load', init);
  });
</script>
```

---

### 2. Conditional KaTeX in Blog Schema & Templates

#### [MODIFY] [content.config.ts](file:///home/fabio/Documents/Programming/Website/Astro/astro_freelance-persona_theme/theme/src/freelance-persona/content.config.ts)

We will extend the `blog` collection schema to support an optional `tex` boolean field. By default, posts do not need KaTeX, so they shouldn't trigger loading the heavy KaTeX JS and CSS.

```typescript
    tags: z.array(z.string()),
    tex: z.boolean().optional(),
```

#### [MODIFY] [BlogPostTemplate.astro](file:///home/fabio/Documents/Programming/Website/Astro/astro_freelance-persona_theme/theme/src/freelance-persona/components/templates/BlogPostTemplate.astro)

Update the layout instantiation to pass `tex={post.data.tex || false}` instead of hardcoding `tex={true}`. This ensures that the KaTeX client script is **never loaded** on pages that do not explicitly require math equations.

```astro
<BaseLayout title={post.data.title} navType="page" tex={post.data.tex || false}>
```

---

### 3. Elevate Hero Background LCP Priority

#### [MODIFY] [Hero.astro](file:///home/fabio/Documents/Programming/Website/Astro/astro_freelance-persona_theme/theme/src/freelance-persona/components/Hero.astro)

The hero background image is the primary Largest Contentful Paint (LCP) element on the homepage. We will add `fetchpriority="high"` to tell the browser to request this asset immediately, speeding up FCP/LCP metrics:

```astro
        <Image
          src={finalImage}
          alt="Background"
          class="hero-bg"
          width={1920}
          height={1080}
          format="webp"
          loading="eager"
          fetchpriority="high"
        />
```

---

### 4. Preload Critical Web Fonts

#### [MODIFY] [BaseLayout.astro](file:///home/fabio/Documents/Programming/Website/Astro/astro_freelance-persona_theme/theme/src/freelance-persona/layouts/BaseLayout.astro)

Fonts are normally discovered late in the browser's rendering cycle (only after the CSSOM is built). To eliminate FOUT/FOIT and improve text rendering speed, we will preload Poppins, Raleway, and Roboto regular weights inside the `<head>` of `BaseLayout.astro`.

We will retrieve the dynamic, build-hashed URLs of the `.woff2` font files using Vite's `?url` suffix, ensuring they remain correct through updates and caching:

```astro
---
// src/freelance-persona/layouts/BaseLayout.astro
...
// Font preloading links using Vite ?url suffix
import raleway400Url from "@fontsource/raleway/files/raleway-latin-400-normal.woff2?url";
import poppins400Url from "@fontsource/poppins/files/poppins-latin-400-normal.woff2?url";
import roboto400Url from "@fontsource/roboto/files/roboto-latin-400-normal.woff2?url";
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    
    <!-- Preload critical fonts for immediate rendering -->
    <link rel="preload" href={raleway400Url} as="font" type="font/woff2" crossorigin />
    <link rel="preload" href={poppins400Url} as="font" type="font/woff2" crossorigin />
    <link rel="preload" href={roboto400Url} as="font" type="font/woff2" crossorigin />
    ...
```

---

## Verification Plan

### Automated Tests
1. Run `bun run check` to ensure Astro/TypeScript schemas are perfectly aligned.
2. Run `bun run build` at the workspace root to compile the playground.
3. Check compiled CSS files in `playground/dist/_astro/` using `eza -lh`. Verify that:
   - `KatexLoader.css` is no longer generated as a critical render-blocking file.
   - Homepage `index.html` **does not** reference or load any KaTeX CSS or JS.
   - Standard blog posts **do not** reference or load any KaTeX CSS or JS.
4. Run the Playwright test suite using `bun run test --reporter=list` to confirm all existing end-to-end tests continue to pass perfectly without any regressions.

### Manual Verification
1. Run `bun run playground:setup && bun run dev` to start the local dev playground.
2. Verify visual appearance of the homepage and a blog post to ensure fonts render instantly.
3. Verify that any blog post with math equations successfully renders KaTeX symbols.
