import { Effect, pipe } from 'effect';

import type { PackageJson } from '@types';

import { readJsonEffect } from '../../../../../effects/fs/index.js';

export const readPackageJsonFile = (path: string) =>
  pipe(
    readJsonEffect(path),
    Effect.map((data) => ({
      data: data as PackageJson,
      path,
    })),
    Effect.withSpan('readPackageJsonFile', { attributes: { path } }),
  );
