import { Effect, pipe } from 'effect';

import { onlyUnique } from './only-unique/filter-unique';
import { getPathDependencies } from './path/get-path-dependencies';

export const getCodebasesDependencies = (
  rootPackageJsonDependencies: Record<string, string>,
  paths: string[],
) =>
  pipe(
    paths,
    Effect.forEach(getPathDependencies(rootPackageJsonDependencies), {
      concurrency: 4,
    }),
    Effect.map((dependencies) => dependencies.flat().filter(onlyUnique)),
    Effect.withSpan('getCodebasesDependencies', {
      attributes: { rootPackageJsonDependencies, paths },
    }),
  );
