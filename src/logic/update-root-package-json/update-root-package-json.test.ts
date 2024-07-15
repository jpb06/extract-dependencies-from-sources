import { runPromise } from 'effect-errors';
import { beforeAll, describe, expect, it } from 'vitest';

import { packageJsonMockData } from '../../test/mock-data/package-json.mock-data';
import { mockFsExtra } from '../../test/mocks/fs-extra.mock';

describe('updateRootPackageJson function', () => {
  const { writeJson } = mockFsExtra();

  beforeAll(() => {
    writeJson.mockResolvedValue(undefined);
  });

  it('should overwrite dependencies in target package json', async () => {
    const path = './cool';
    const { updateRootPackageJson } = await import(
      './update-root-package-json'
    );

    await runPromise(
      updateRootPackageJson(path, packageJsonMockData, [
        `"glob": "^10.3.0"`,
        `"yargs": "^17.7.2"`,
      ]),
    );

    expect(writeJson).toHaveBeenCalledTimes(1);
    expect(writeJson).toHaveBeenCalledWith(
      path,
      {
        ...packageJsonMockData,
        dependencies: {
          glob: '^10.3.0',
          yargs: '^17.7.2',
        },
      },
      { encoding: 'utf8', spaces: 2 },
    );
  });
});
