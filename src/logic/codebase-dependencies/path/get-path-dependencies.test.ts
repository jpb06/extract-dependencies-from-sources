import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { tsCodebasePath } from '@tests/mock-data';

import { getPathDependencies } from './get-path-dependencies.js';

describe('getPathDependencies function', () => {
  it('should extract external dependencies from a codebase', async () => {
    const result = await Effect.runPromise(
      getPathDependencies({
        chalk: '4.1.2',
        'dotenv-flow': '^3.2.0',
        'fs-extra': '^11.1.1',
        glob: '^10.3.0',
        yaml: '^2.3.1',
        yargs: '^17.7.2',
      })(tsCodebasePath),
    );

    expect(result).toStrictEqual([
      '"fs-extra": "^11.1.1"',
      '"glob": "^10.3.0"',
    ]);
  });
});
