import { Effect, pipe } from 'effect';

import { readJsonEffect } from '@effects/fs/index.js';
import type { PackageJson } from '@types';

export const readPackageJsonFile = (path: string) =>
  pipe(
    readJsonEffect(path),
    Effect.map((data) => ({
      data: data as PackageJson,
      path,
    })),
    Effect.withSpan('readPackageJsonFile', { attributes: { path } }),
  );
