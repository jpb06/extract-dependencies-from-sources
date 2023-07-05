import { describe, it, expect } from 'vitest';

import { formatDependencies } from './format-dependencies';
import { dependenciesArray } from '../../test/mock-data/dependencies-array.mock-data';

describe('formatDependencies function', () => {
  it('should format entries from an array of records', () => {
    const result = formatDependencies(dependenciesArray);

    expect(result).toStrictEqual([
      '"@commitlint/cli": "^17.6.5"',
      '"@commitlint/config-conventional": "^17.6.5"',
      '"@types/dotenv-flow": "^3.2.0"',
      '"@types/fs-extra": "11.0.1"',
      '"@types/node": "^20.3.1"',
      '"@types/yargs": "^17.0.24"',
      '"@typescript-eslint/eslint-plugin": "^5.60.0"',
      '"@typescript-eslint/parser": "^5.60.0"',
      '"@vitest/coverage-v8": "^0.32.2"',
      '"copyfiles": "^2.4.1"',
      '"del-cli": "^5.0.0"',
      '"eslint": "^8.43.0"',
    ]);
  });
});
