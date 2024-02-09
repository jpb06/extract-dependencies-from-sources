import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov'],
      all: true,
      include: ['src/**/*.ts'],
      exclude: [
        'src/test/**/*',
        'src/**/*.type.ts',
        'src/index.ts',
        'src/types',
        'src/cli/index.ts',
        'src/node.ts',
      ],
    },
  },
});
