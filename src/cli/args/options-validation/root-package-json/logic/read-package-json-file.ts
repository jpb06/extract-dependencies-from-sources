import { Effect, pipe } from 'effect';

import { readJson } from '@effects/fs-extra.effects.js';
import type { PackageJson } from '@types';

export const readPackageJsonFile = (path: string) =>
  pipe(
    readJson(path),
    Effect.map((data) => ({
      data: data as PackageJson,
      path,
    })),
    Effect.withSpan('readPackageJsonFile', { attributes: { path } }),
  );
