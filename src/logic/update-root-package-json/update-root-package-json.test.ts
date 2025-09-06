import { Effect, pipe } from 'effect';
import { runPromise } from 'effect-errors';
import { describe, expect, it } from 'vitest';

import { makeFsTestLayer } from '@tests/layers';
import { packageJsonMockData } from '@tests/mock-data';

describe('updateRootPackageJson function', () => {
  it('should overwrite dependencies in target package json', async () => {
    const path = './cool';

    const { FsTestLayer, writeFileStringMock } = makeFsTestLayer({
      writeFileString: Effect.void,
    });

    const { updateRootPackageJson } = await import(
      './update-root-package-json.js'
    );

    const task = pipe(
      updateRootPackageJson(path, packageJsonMockData, [
        `"glob": "^10.3.0"`,
        `"yargs": "^17.7.2"`,
      ]),
      Effect.provide(FsTestLayer),
    );

    await runPromise(task);

    expect(writeFileStringMock).toHaveBeenCalledTimes(1);
    expect(writeFileStringMock).toHaveBeenCalledWith(
      path,
      JSON.stringify(
        {
          ...packageJsonMockData,
          dependencies: {
            glob: '^10.3.0',
            yargs: '^17.7.2',
          },
        },
        null,
        2,
      ),
    );
  });
});
