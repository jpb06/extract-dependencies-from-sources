import { FileSystem } from '@effect/platform/FileSystem';
import { Effect, pipe } from 'effect';

import { failAsInvalidType } from './fail-as-invalid-type.js';

export const ensureAllFilesExist = (paths: string[]) =>
  pipe(
    Effect.forEach(
      paths,
      (path) =>
        Effect.gen(function* () {
          const fs = yield* FileSystem;

          const fileExists = yield* fs.exists(path);
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
