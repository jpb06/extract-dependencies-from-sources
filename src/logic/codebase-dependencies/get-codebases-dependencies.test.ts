import { NodeFileSystem } from '@effect/platform-node';
import { Effect, pipe } from 'effect';
import { runPromise } from 'effect-errors';
import { describe, expect, it } from 'vitest';

import { packageJsonMockData, tsCodebasePath } from '@tests/mock-data';

import { getCodebasesDependencies } from './get-codebases-dependencies.js';

describe('getCodebasesDependencies function', () => {
  it('should extract dependencies present in a package.json and used in a path', async () => {
    const task = pipe(
      getCodebasesDependencies(packageJsonMockData.dependencies, [
        tsCodebasePath,
      ]),
      Effect.provide(NodeFileSystem.layer),
    );

    const result = await runPromise(task);

    expect(result).toStrictEqual([
      '"fs-extra": "^11.1.1"',
      '"glob": "^10.3.0"',
    ]);
  });
});
