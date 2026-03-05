<!--
SPDX-FileCopyrightText: 2026 2026 The freelance-persona_theme Project Contributors

SPDX-License-Identifier: MIT
-->

# 🤖 AGENT KNOWLEDGE BASE & OPERATIONAL RULES

> **SYSTEM INSTRUCTION:** This file is the single source of truth for recurring issues, project-specific workflows, and latent tribal knowledge. **Before starting any task, you MUST check this file.**
>
> **META-RULE:** If you encounter a recurring issue or a "gotcha" that cost you time/tokens, YOU MUST UPDATE THIS FILE with a new rule or debugging hint to prevent future agents from failing in the same way.

<!--
SPDX-FileCopyrightText: 2026 2026 The freelance-persona_theme Project Contributors

SPDX-License-Identifier: MIT
-->

# 🤖 AGENT KNOWLEDGE BASE & OPERATIONAL RULES

> **SYSTEM INSTRUCTION:** This file is the single source of truth for recurring issues, project-specific workflows, and latent tribal knowledge. **Before starting any task, you MUST check this file.**
>
> **META-RULE:** If you encounter a recurring issue or a "gotcha" that cost you time/tokens, YOU MUST UPDATE THIS FILE with a new rule or debugging hint to prevent future agents from failing in the same way.

## 🧠 DESIGN PATTERNS

### 1. 📂 Flat Blog Routing (Regression Prevention)

- **Requirement:** Users must be allowed to organize `blog_posts/` with any folder structure (e.g., `blog_posts/archive/2025/post.md`).
- **Route Generation:** `BlogPost.astro` `getStaticPaths` MUST flatten the ID: `post.id.split('/').pop()`.
- **Link Generation:** All `href` attributes linking to posts MUST also flatten: `/posts/${post.id.split('/').pop()}`.
  - **Affected components:** `FilteredPostsSection`, `BlogCategoriesSection`, `[BlogCategory]`, `BlogSidebar`.
- **Result:** URL is always `/posts/post-name` regardless of depth. Do NOT use raw `post.id` in links.

### 2. 🎨 Styling & NoScript

- **prefer native** if there  is a way to do something in a sensible modern or even bleeding edge way without javascript then drop the javascript!
- **SCSS:** Prefer `_partial.scss` over inline `<style>`.
- **NoScript Fallback:**
  - `BaseLayout.astro` contains a `<noscript>` block.
  - It forces `[data-reveal] { opacity: 1 !important }` so content is visible without JS animations.

### 3. 📋 Content Schema & Privacy

- **Attribution:** `img_credit` and `img_license` are **REQUIRED** for all content images (Hero, Blog, Avatar).
- **Date Formatting:** Strict `dd Mon yyyy` (e.g., `01 Jan 2026`) for visual consistency.
- **Privacy:** No external CDNs. Minimal JS.

### 4. User-Centric Routing

- **Rule:** Links must match user content, not internal file IDs.
  - **Bad:** Link "Blog" -> `/blog-categories`
  - **Good:** Link "Blog" -> `/blog`

### 5. 🅰️ Icon Fonts & Text Cursor

- **Problem:** Browsers may treat icon fonts (like Bootstrap Icons) as selectable text, showing a blinking caret or text selection highlight on focus.
- **Solution:** Explicitly disable text behavior on the interactive element.

  ```css
  .icon-button {
    caret-color: transparent; /* Hides blinking cursor */
    user-select: none;        /* Prevents text selection */
    -webkit-user-select: none;
    outline: none;            /* Remove default focus ring (replace with custom) */
  }
  /* Optional: Double safety for children */
  .icon-button > * { pointer-events: none; }
  ```
