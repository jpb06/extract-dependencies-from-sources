import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { readJson } from 'fs-extra';

import { PackageJson } from '../../../../../types/package-json.type';

export const readPackageJsonFile = (path: string) =>
  pipe(
    Effect.tryPromise(() => readJson(path)),
    Effect.map((data) => ({
      data: data as PackageJson,
      path,
    })),
  );
