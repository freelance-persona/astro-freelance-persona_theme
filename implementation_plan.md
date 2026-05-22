# Optimize Bootstrap CSS & Font Bundle Size

Importing the entire Bootstrap framework in `main.scss` results in a large render-blocking CSS chunk (317 kB). Because this chunk contains shared styles, Vite links it on every single page, creating a massive initial paint delay.

Previously, attempting to reduce this size by importing only the bare minimum grid and typography modules resulted in broken styles—specifically, the dark theme "turned super ugly." This occurred because the site actively relies on Bootstrap components like buttons, dropdowns (for the theme toggle), badges, forms, and helper utilities. Omitting these modules caused the elements to lose their base styles, padding, and dark mode colorings.

Additionally, importing default Fontsource CSS (`400.css` etc.) includes `@font-face` declarations for all subsets (Cyrillic, Vietnamese, etc.), which unnecessarily inflates the CSS bundle size. We will restrict this to the `latin` subset across both `BaseLayout.astro` and the starter template's `fonts.ts` file.

## Proposed Changes

### Styles

---

#### [MODIFY] [main.scss](file:///home/fabio/Documents/Programming/Website/Astro/astro_freelance-persona_theme/theme/src/freelance-persona/styles/main.scss)

Replace the full `@use "bootstrap/scss/bootstrap"` import with targeted imports. We will include the modules necessary for the layout, plus the specific components used in the theme (forms, buttons, transitions, dropdown, badge) and the helper classes required by `utilities/api` and `.text-bg-*` classes.

```scss
// 2. Vendor & Context Setup
@use "theme-context" as *;

// Selected Bootstrap modules to reduce bundle size
@import "bootstrap/scss/root";
@import "bootstrap/scss/reboot";
@import "bootstrap/scss/type";
@import "bootstrap/scss/images";
@import "bootstrap/scss/containers";
@import "bootstrap/scss/grid";
@import "bootstrap/scss/forms";
@import "bootstrap/scss/buttons";
@import "bootstrap/scss/transitions";
@import "bootstrap/scss/dropdown";
@import "bootstrap/scss/badge";
@import "bootstrap/scss/helpers";
@import "bootstrap/scss/utilities/api";
```

### Layouts

---

#### [MODIFY] [BaseLayout.astro](file:///home/fabio/Documents/Programming/Website/Astro/astro_freelance-persona_theme/theme/src/freelance-persona/layouts/BaseLayout.astro)

Change the Fontsource imports from the generic files (which include all unicode subsets) to the `latin` specific subset to reduce the `@font-face` payload.

```astro
// Font imports
import "@fontsource/raleway/latin-400.css";
import "@fontsource/raleway/latin-700.css";
```

### Fonts Config

---

#### [MODIFY] [fonts.ts](file:///home/fabio/Documents/Programming/Website/Astro/astro_freelance-persona_theme/theme/starter/src/fonts.ts)

Change all Fontsource imports to target only the `latin` subsets for Poppins, Raleway, and Roboto. This is critical because the home page (`index.astro`) imports `fonts.ts`, and importing the generic files would bypass the font optimizations.

```typescript
// --- Poppins (Headings) ---
import '@fontsource/poppins/latin-300.css';
import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-500.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/latin-700.css';

// --- Raleway (Navigation) ---
import '@fontsource/raleway/latin-300.css';
import '@fontsource/raleway/latin-400.css';
import '@fontsource/raleway/latin-500.css';
import '@fontsource/raleway/latin-600.css';
import '@fontsource/raleway/latin-700.css';

// --- Roboto (Body) ---
import '@fontsource/roboto/latin-300.css';
import '@fontsource/roboto/latin-300-italic.css';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-400-italic.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/roboto/latin-500-italic.css';
import '@fontsource/roboto/latin-700.css';
import '@fontsource/roboto/latin-700-italic.css';
```

## Verification Plan

### Automated Tests
- Run `bun run build` at the workspace root to compile the playground.
- Check the size of the compiled CSS files in `playground/dist/_astro/` using `eza -lh`. Verify that the main CSS chunk size drops significantly compared to the baseline.
- Run `bun run test --reporter=list` to verify that layout remains correct and there are no visual regressions.

### Manual Verification
- Run `bun run playground:setup && bun run dev`
- Open the preview and toggle the dark theme to ensure buttons, forms, badges, and dropdown menus maintain their expected appearance and don't break.
- Verify that text renders correctly using the specified fonts.
