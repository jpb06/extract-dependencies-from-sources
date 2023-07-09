import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';

import { onlyUnique } from './only-unique/filter-unique';
import { getPathDependencies } from './path/get-path-dependencies';

export const getCodebasesDependencies = (
  rootPackageJsonDependencies: Record<string, string>,
  paths: Array<string>,
): Effect.Effect<never, unknown, Array<string>> =>
  pipe(
    paths,
    Effect.forEach(getPathDependencies(rootPackageJsonDependencies), {
      concurrency: 4,
    }),
    Effect.map((dependencies) => dependencies.flat().filter(onlyUnique)),
  );
