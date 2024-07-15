import { Effect, pipe } from 'effect';

import { exists } from '../../../../../effects/fsExtra.effects';

import { failAsInvalidType } from './fail-as-invalid-type';

export const ensureAllFilesExist = (paths: string[]) =>
  pipe(
    Effect.forEach(
      paths,
      (path) =>
        Effect.gen(function* () {
          const fileExists = yield* exists(path);
          if (fileExists) {
            return yield* Effect.succeed(path);
          }

          return yield* failAsInvalidType();
        }),
      {
        concurrency: 'unbounded',
      },
    ),
    Effect.withSpan('ensureAllFilesExist', { attributes: { paths } }),
  );
