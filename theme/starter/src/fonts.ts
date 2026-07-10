// SPDX-FileCopyrightText: 2026 The freelance-persona_theme Project Contributors
//
// SPDX-License-Identifier: MIT

// This file is used to import fonts for the website.
// You can add your own fonts here.
// 1. Install the font package: bun add @fontsource/font-name
// 2. Import the font css files here
// 3. Update the freelance-persona.config.ts to use the font family name
// 4. (Optional) Update theme/src/freelance-persona/layouts/BaseLayout.astro to preload the font files

// --- Poppins (Navigation) - No variable font available, use static ---
import '@fontsource/poppins/latin-300.css';
import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/latin-700.css';

// --- Raleway (Headings) - Static weights for preloadable font preloading ---
import '@fontsource/raleway/latin-400.css';
import '@fontsource/raleway/latin-700.css';

// --- Roboto (Body) - Static weight for preloadable font preloading ---
import '@fontsource/roboto/latin-400.css';