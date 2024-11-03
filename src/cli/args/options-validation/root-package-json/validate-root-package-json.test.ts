import { Effect } from 'effect';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { packageJsonMockData } from '@tests/mock-data';
import { mockConsole, mockFsExtra, mockPicoColors } from '@tests/mocks';

describe('validateRootPackageJson function', () => {
  const path = './cool';

  const { exists, readJson } = mockFsExtra();
  mockConsole({
    error: vi.fn(),
  });
  mockPicoColors();

  beforeAll(() => {
    readJson.mockResolvedValue(vi.fn().mockResolvedValue(packageJsonMockData));
  });

  it('should display an error message when package.json could not be found on provided path', async () => {
    exists.mockResolvedValue(false as never);

    const { validateRootPackageJson } = await import('./index.js');

    await expect(
      Effect.runPromise(validateRootPackageJson({ packagejson: path })),
    ).rejects.toThrow();
  });

  it('should read the package json file', async () => {
    exists.mockResolvedValue(true as never);

    const { validateRootPackageJson } = await import('./index.js');

    const { path: returnedPath } = await Effect.runPromise(
      validateRootPackageJson({
        packagejson: path,
      }),
    );

    expect(readJson).toHaveBeenCalledWith(path);
    expect(returnedPath).toBe(path);
  });
});
