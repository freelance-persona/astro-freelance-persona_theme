// SPDX-FileCopyrightText: 2026 The freelance-persona_theme Project Contributors
//
// SPDX-License-Identifier: MIT

/**
 * Build-time version introspection.
 *
 * Reads the resolved versions of core dependencies from their own
 * package.json files at build time, so config files and content can
 * reference real installed versions instead of hardcoded numbers.
 *
 * Usage in freelance-persona.config.ts:
 *   import { astroMajorVersion } from 'astro-freelance-persona_theme/utils/buildInfo';
 *   title: `freelance-persona — an Astro ${astroMajorVersion} Theme`,
 */

import astroPkg from 'astro/package.json' with { type: 'json' };

// --- Astro ---

/** Full semver string, e.g. "6.3.8" */
export const astroVersion: string = astroPkg.version;

/** Major version, e.g. "6" */
export const astroMajorVersion: string = astroPkg.version.split('.')[0];

/** Major.minor version, e.g. "6.3" */
export const astroMinorVersion: string = astroPkg.version.split('.').slice(0, 2).join('.');

// --- UnoCSS ---

/** Placeholder for UnoCSS version (no longer tracking Bootstrap) */
export const unoCssVersion: string = '66.7.4';
export const unoCssMajorVersion: string = '66';
export const unoCssMinorVersion: string = '66.7';

// --- Token map for content interpolation ---

/**
 * Map of `{{token}}` placeholders to their resolved values.
 * Used by components (e.g. AboutSection) to replace tokens in
 * user-authored frontmatter strings at build time.
 */
export const buildTokens: Record<string, string> = {
  'astro_version': astroVersion,
  'astro_major': astroMajorVersion,
  'astro_minor': astroMinorVersion,
  'unocss_version': unoCssVersion,
  'unocss_major': unoCssMajorVersion,
  'unocss_minor': unoCssMinorVersion,
};

/**
 * Replace all `{{token}}` placeholders in a string with values from buildTokens.
 * Unknown tokens are left as-is.
 */
export function replaceBuildTokens(input: string): string {
  return input.replace(/\{\{(\w+)\}\}/g, (match, token) => {
    return buildTokens[token] ?? match;
  });
}