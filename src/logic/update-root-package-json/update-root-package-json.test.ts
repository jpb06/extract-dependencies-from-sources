import * as Effect from '@effect/io/Effect';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { packageJsonMockData } from '../../test/mock-data/package-json.mock-data';

describe('updateRootPackageJson function', () => {
  const writeJsonMock = vi.fn().mockResolvedValue(undefined);
  beforeAll(() => {
    vi.doMock('fs-extra', () => ({
      writeJson: writeJsonMock,
    }));
  });

  it('should overwrite dependencies in target package json', async () => {
    const path = './cool';
    const { updateRootPackageJson } = await import(
      './update-root-package-json'
    );

    await Effect.runPromise(
      updateRootPackageJson(path, packageJsonMockData, [
        `"glob": "^10.3.0"`,
        `"yargs": "^17.7.2"`,
      ]),
    );

    expect(writeJsonMock).toHaveBeenCalledTimes(1);
    expect(writeJsonMock).toHaveBeenCalledWith(
      path,
      {
        ...packageJsonMockData,
        dependencies: {
          glob: '^10.3.0',
          yargs: '^17.7.2',
        },
      },
      { spaces: 2 },
    );
  });
});
