import * as Effect from '@effect/io/Effect';
import { describe, expect, it } from 'vitest';

import { getCodebasesDependencies } from './get-codebases-dependencies';
import { packageJsonMockData } from '../../test/mock-data/package-json.mock-data';
import { tsCodebasePath } from '../../test/mock-data/ts-codebase-path';

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
