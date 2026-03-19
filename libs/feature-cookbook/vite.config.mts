/// <reference types='vitest' />
import { defineConfig, Plugin } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

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
  cacheDir: '../../node_modules/.vite/libs/feature-cookbook',
  plugins: [normalizeWindowsDriveLetterPlugin(), angular(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  test: {
    name: 'feature-cookbook',
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
      reportsDirectory: '../../coverage/libs/feature-cookbook',
      provider: 'v8' as const,
    },
  },
}));
