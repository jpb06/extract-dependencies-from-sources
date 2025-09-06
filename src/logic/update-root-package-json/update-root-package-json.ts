import { FileSystem } from '@effect/platform/FileSystem';
import { Effect, pipe } from 'effect';

import type { PackageJson } from '@types';

const removeQuotes = (str: string): string => str.replaceAll('"', '');

export const updateRootPackageJson = (
  path: string,
  data: PackageJson,
  dependencies: string[],
) =>
  pipe(
    Effect.gen(function* () {
      const packageJson = {
        ...data,
        dependencies: {
          ...dependencies.reduce((acc, dep) => {
            const [name, version] = dep.split(': ');

            return {
              ...acc,
              [removeQuotes(name)]: removeQuotes(version),
            };
          }, {}),
        },
      };

      const fs = yield* FileSystem;

      yield* fs.writeFileString(path, JSON.stringify(packageJson, null, 2));
    }),
    Effect.withSpan('updateRootPackageJson', {
      attributes: { path, data, dependencies },
    }),
  );
