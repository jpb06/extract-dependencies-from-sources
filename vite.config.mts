import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// biome-ignore lint/style/noDefaultExport: vite
export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: ['.'],
    }),
  ],
  test: {
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: [
        '_temp/**/*',
        'src/test/**/*',
        'src/**/*.type.ts',
        'src/**/index.ts',
        'src/types',
        'src/cli/index.ts',
        'src/node.ts',
      ],
    },
  },
});
