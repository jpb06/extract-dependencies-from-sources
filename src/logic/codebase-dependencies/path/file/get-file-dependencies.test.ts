import * as Effect from '@effect/io/Effect';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { tsFileMockData } from '../../../../test/mock-data/ts-file.mock-data';
import { mockReadFile } from '../../../../test/mocks/mock-read-file';

describe('getFileDependencies function', () => {
  beforeAll(() => {
    vi.doMock('fs-extra', () => ({
      readFile: mockReadFile(tsFileMockData),
    }));
  });

  it('should extract non relative dependencies', async () => {
    vi.doMock('fs-extra', () => ({
      readFile: mockReadFile(tsFileMockData),
    }));
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
