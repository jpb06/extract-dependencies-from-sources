import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { writeJson } from 'fs-extra';

import { PackageJson } from '../../types/package-json.type';

const removeQuotes = (str: string): string => str.replaceAll('"', '');

export const updateRootPackageJson = (
  path: string,
  data: PackageJson,
  dependencies: Array<string>,
): Effect.Effect<never, unknown, undefined> =>
  pipe(
    Effect.sync(() => ({
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
    })),
    Effect.tap((packageJson) =>
      Effect.tryPromise(() => writeJson(path, packageJson, { spaces: 2 })),
    ),
    Effect.flatMap(() => Effect.succeed(undefined)),
  );
