import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { glob } from 'glob';

import { getFileDependencies } from './file/get-file-dependencies';
import { PackageJson } from '../../../types/package-json.type';
import { onlyUnique } from '../only-unique/filter-unique';

export const getPathDependencies =
  (rootPackageJsonDeps: PackageJson['dependencies']) =>
  (path: string): Effect.Effect<never, unknown, Array<string>> =>
    pipe(
      Effect.tryPromise(() => glob(`${path}/**/*.{ts,tsx}`)),
      Effect.flatMap(
        Effect.forEach(getFileDependencies, {
          concurrency: 'unbounded',
        }),
      ),
      Effect.map((dependencies) => dependencies.flat().filter(onlyUnique)),
      Effect.map((dependencies) =>
        Object.entries(rootPackageJsonDeps)
          .filter(
            ([name]) =>
              dependencies.includes(name) ||
              dependencies.some((d) => d.startsWith(`${name}/`)),
          )
          .map(([name, version]) => `"${name}": "${version}"`),
      ),
    );
