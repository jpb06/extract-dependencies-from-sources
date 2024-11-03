import { Effect, pipe } from 'effect';
import { glob } from 'glob';

import type { PackageJson } from '@types';

import { onlyUnique } from '../only-unique/filter-unique.js';
import { getFileDependencies } from './file/get-file-dependencies.js';

export const getPathDependencies =
  (rootPackageJsonDeps: PackageJson['dependencies']) => (path: string) =>
    pipe(
      Effect.gen(function* () {
        const tsFiles = yield* Effect.tryPromise(() =>
          glob(`${path}/**/*.{ts,tsx}`),
        );

        const allDependencies = yield* Effect.forEach(
          tsFiles,
          getFileDependencies,
          {
            concurrency: 'unbounded',
          },
        );

        const onlyUniqueDependencies = allDependencies
          .flat()
          .filter(onlyUnique);

        return Object.entries(rootPackageJsonDeps)
          .filter(
            ([name]) =>
              onlyUniqueDependencies.includes(name) ||
              onlyUniqueDependencies.some((d) => d.startsWith(`${name}/`)),
          )
          .map(([name, version]) => `"${name}": "${version}"`);
      }),
      Effect.withSpan('getPathDependencies', {
        attributes: { rootPackageJsonDeps, path },
      }),
    );
