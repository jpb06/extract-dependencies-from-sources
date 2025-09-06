import { Effect, pipe } from 'effect';
import { describe, expect, it } from 'vitest';

import { makeFsTestLayer } from '@tests/layers';
import { tsFileMockData } from '@tests/mock-data';

describe('getFileDependencies function', () => {
  it('should extract non relative dependencies', async () => {
    const { FsTestLayer } = makeFsTestLayer({
      readFileString: Effect.succeed(tsFileMockData),
    });

    const { getFileDependencies } = await import('./get-file-dependencies.js');

    const task = pipe(
      getFileDependencies('./cool'),
      Effect.provide(FsTestLayer),
    );

    const result = await Effect.runPromise(task);

    expect(result).toStrictEqual([
      'fs-extra',
      'next',
      'react',
      '@react-pdf/renderer',
    ]);
  });
});
