import { Effect } from 'effect';
import { writeJson } from 'fs-extra';

import { PackageJson } from '../../types/package-json.type';

const removeQuotes = (str: string): string => str.replaceAll('"', '');

export const updateRootPackageJson = (
  path: string,
  data: PackageJson,
  dependencies: string[],
) =>
  Effect.gen(function* (_) {
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

    yield* _(
      Effect.tryPromise(() => writeJson(path, packageJson, { spaces: 2 })),
    );
  });
