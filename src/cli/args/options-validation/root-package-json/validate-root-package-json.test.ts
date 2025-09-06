import { Effect, pipe } from 'effect';
import { describe, expect, it } from 'vitest';

import { makeFsTestLayer } from '@tests/layers';
import { packageJsonMockData } from '@tests/mock-data';
import { mockPicoColors } from '@tests/mocks';

describe('validateRootPackageJson function', () => {
  const path = './cool';

  mockPicoColors();

  it('should display an error message when package.json could not be found on provided path', async () => {
    const { FsTestLayer } = makeFsTestLayer({
      exists: Effect.succeed(false),
    });

    const { validateRootPackageJson } = await import('./index.js');

    const task = pipe(
      validateRootPackageJson({ packagejson: path }),
      Effect.provide(FsTestLayer),
    );

    await expect(Effect.runPromise(task)).rejects.toThrow();
  });

  it('should read the package json file', async () => {
    const { FsTestLayer, readFileStringMock } = makeFsTestLayer({
      exists: Effect.succeed(true),
      readFileString: Effect.succeed(JSON.stringify(packageJsonMockData)),
    });

    const { validateRootPackageJson } = await import('./index.js');

    const task = pipe(
      validateRootPackageJson({ packagejson: path }),
      Effect.provide(FsTestLayer),
    );

    const { path: returnedPath } = await Effect.runPromise(task);

    expect(readFileStringMock).toHaveBeenCalledWith(path, 'utf8');
    expect(returnedPath).toBe(path);
  });
});
