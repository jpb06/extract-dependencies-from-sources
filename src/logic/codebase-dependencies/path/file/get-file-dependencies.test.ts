import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { tsFileMockData } from '../../../../test/mock-data/ts-file.mock-data';
import { mockFsExtra } from '../../../../test/mocks/fs-extra.mock';

describe('getFileDependencies function', () => {
  const { readFile } = mockFsExtra();

  it('should extract non relative dependencies', async () => {
    readFile.mockResolvedValueOnce(tsFileMockData as never);

    const { getFileDependencies } = await import('./get-file-dependencies');

    const result = await Effect.runPromise(getFileDependencies('./cool'));

    expect(result).toStrictEqual([
      'fs-extra',
      'next',
      'react',
      '@react-pdf/renderer',
    ]);
  });
});
