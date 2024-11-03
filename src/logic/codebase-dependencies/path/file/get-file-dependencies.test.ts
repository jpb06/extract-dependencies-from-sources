import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { tsFileMockData } from '@tests/mock-data';
import { mockFsExtra } from '@tests/mocks';

describe('getFileDependencies function', () => {
  const { readFile } = mockFsExtra();

  it('should extract non relative dependencies', async () => {
    readFile.mockResolvedValueOnce(tsFileMockData as never);

    const { getFileDependencies } = await import('./get-file-dependencies.js');

    const result = await Effect.runPromise(getFileDependencies('./cool'));

    expect(result).toStrictEqual([
      'fs-extra',
      'next',
      'react',
      '@react-pdf/renderer',
    ]);
  });
});
