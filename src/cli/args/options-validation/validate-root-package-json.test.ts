import * as Effect from '@effect/io/Effect';
import { describe, it, expect, vi, beforeAll } from 'vitest';

import { packageJsonMockData } from '../../../test/mock-data/package-json.mock-data';

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
  const existsMock = vi.fn();
  const readJsonMock = vi.fn().mockResolvedValue(packageJsonMockData);

  beforeAll(() => {
    vi.doMock('fs-extra', () => ({
      exists: existsMock,
      readJson: readJsonMock,
    }));
  });

  it('should display an error message when package.json could not be found on provided path', async () => {
    existsMock.mockResolvedValue(false);

    const { validateRootPackageJson } = await import(
      './validate-root-package-json'
    );

    expect(
      Effect.runPromise(validateRootPackageJson({ packagejson: path })),
    ).rejects.toThrow();
  });

  it('should read the package json file', async () => {
    existsMock.mockResolvedValue(true);

    const { validateRootPackageJson } = await import(
      './validate-root-package-json'
    );

    const { path: returnedPath } = await Effect.runPromise(
      validateRootPackageJson({
        packagejson: path,
      }),
    );

    expect(readJsonMock).toHaveBeenCalledWith(path);
    expect(returnedPath).toBe(path);
  });
});
