import { Effect, pipe } from 'effect';

import { writeJson } from '@effects/fs-extra.effects.js';
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

      yield* writeJson(path, packageJson);
    }),
    Effect.withSpan('updateRootPackageJson', {
      attributes: { path, data, dependencies },
    }),
  );
