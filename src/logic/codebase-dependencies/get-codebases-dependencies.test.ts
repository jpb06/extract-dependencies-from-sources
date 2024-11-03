import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { packageJsonMockData, tsCodebasePath } from '@tests/mock-data';

import { getCodebasesDependencies } from './get-codebases-dependencies.js';

describe('getCodebasesDependencies function', () => {
  it('should extract dependencies present in a package.json and used in a path', async () => {
    const result = await Effect.runPromise(
      getCodebasesDependencies(packageJsonMockData.dependencies, [
        tsCodebasePath,
      ]),
    );

    expect(result).toStrictEqual([
      '"fs-extra": "^11.1.1"',
      '"glob": "^10.3.0"',
    ]);
  });
});
