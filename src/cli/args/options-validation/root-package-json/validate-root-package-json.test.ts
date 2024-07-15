import { Effect } from 'effect';
import { describe, it, expect, vi, beforeAll } from 'vitest';

import { packageJsonMockData } from '../../../../test/mock-data/package-json.mock-data';
import { mockFsExtra } from '../../../../test/mocks/fs-extra.mock';

vi.mock('chalk', () => ({
  default: {
    bold: {
      redBright: vi.fn(),
    },
  },
}));
global.console = { info: vi.fn(), error: vi.fn() } as unknown as Console;

describe('validateRootPackageJson function', () => {
  const path = './cool';

  const { exists, readJson } = mockFsExtra();

  beforeAll(() => {
    readJson.mockResolvedValue(vi.fn().mockResolvedValue(packageJsonMockData));
  });

  it('should display an error message when package.json could not be found on provided path', async () => {
    exists.mockResolvedValue(false as never);

    const { validateRootPackageJson } = await import('./index');

    await expect(
      Effect.runPromise(validateRootPackageJson({ packagejson: path })),
    ).rejects.toThrow();
  });

  it('should read the package json file', async () => {
    exists.mockResolvedValue(true as never);

    const { validateRootPackageJson } = await import('./index');

    const { path: returnedPath } = await Effect.runPromise(
      validateRootPackageJson({
        packagejson: path,
      }),
    );

    expect(readJson).toHaveBeenCalledWith(path);
    expect(returnedPath).toBe(path);
  });
});
