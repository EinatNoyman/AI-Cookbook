/// <reference types='vitest' />
import { defineConfig, Plugin } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import tailwindcss from '@tailwindcss/vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

/**
 * Workaround for Windows drive letter case mismatch between
 * nxViteTsPaths (lowercase c:) and TypeScript/Angular compiler (uppercase C:).
 * The Angular compiler's fileEmitter stores output keyed by TypeScript's
 * normalized paths (uppercase drive letter), but Vite resolves imports via
 * nxViteTsPaths which returns lowercase drive letter paths. This causes
 * the fileEmitter Map lookup to miss, returning empty code for all library files.
 */
function normalizeWindowsDriveLetterPlugin(): Plugin {
  return {
    name: 'normalize-windows-drive-letter',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (!source.startsWith('@bmad-demo/')) return null;
      const resolved = await this.resolve(source, importer, {
        ...options,
        skipSelf: true,
      });
      if (resolved && /^[a-z]:/.test(resolved.id)) {
        return {
          ...resolved,
          id: resolved.id[0].toUpperCase() + resolved.id.slice(1),
        };
      }
      return resolved;
    },
  };
}

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/AI-Cookbook',
  plugins: [
    normalizeWindowsDriveLetterPlugin(),
    angular(),
    tailwindcss(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
  ],
  test: {
    name: 'ai-cookbook',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['src/test-setup.ts'],
    reporters: ['default'],
    server: {
      deps: {
        inline: [/@bmad-demo/],
      },
    },
    coverage: {
      reportsDirectory: '../../coverage/apps/AI-Cookbook',
      provider: 'v8' as const,
    },
  },
}));
