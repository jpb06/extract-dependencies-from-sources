import { Effect, pipe } from 'effect';

import { readJson } from '../../../../../effects/fsExtra.effects';
import { PackageJson } from '../../../../../types/package-json.type';

export const readPackageJsonFile = (path: string) =>
  pipe(
    readJson(path),
    Effect.map((data) => ({
      data: data as PackageJson,
      path,
    })),
    Effect.withSpan('readPackageJsonFile', { attributes: { path } }),
  );
