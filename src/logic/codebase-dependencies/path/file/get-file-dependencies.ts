import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { readFile } from 'fs-extra';

const depsRegex = new RegExp(/^import.*(from)? ['"](.*)['"].*$/, 'gm');

const getExternalImports = (
  fileContent: string,
): Effect.Effect<never, unknown, string[]> =>
  pipe(
    Effect.sync(() => depsRegex.exec(fileContent)),
    Effect.flatMap((firstMatch) =>
      Effect.loop(firstMatch, {
        step: () => depsRegex.exec(fileContent),
        while: (newMatch) => newMatch !== null,
        body: (match) => {
          if (!match) {
            return Effect.succeed(null);
          }

          const dep = match[2];
          if (!dep.startsWith('./') && !dep.startsWith('../')) {
            return Effect.succeed(dep);
          }

          return Effect.succeed(null);
        },
      }),
    ),
    Effect.map((imports) => imports.filter((i) => i !== null) as string[]),
  );

export const getFileDependencies = (
  path: string,
): Effect.Effect<never, unknown, string[]> =>
  pipe(
    Effect.tryPromise(() => readFile(path, 'utf8')),
    Effect.flatMap(getExternalImports),
  );
