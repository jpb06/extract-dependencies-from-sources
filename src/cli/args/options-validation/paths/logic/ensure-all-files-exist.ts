import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { exists } from 'fs-extra';

import { failWithInvalidType } from './invalid-type-error';

export const ensureAllFilesExist = (
  paths: string[],
): Effect.Effect<never, unknown, string[]> =>
  Effect.forEach(
    paths,
    (path) =>
      pipe(
        Effect.tryPromise(() => exists(path)),
        Effect.flatMap((fileExists) =>
          Effect.if(fileExists, {
            onTrue: Effect.succeed(path),
            onFalse: failWithInvalidType(),
          }),
        ),
      ),
    {
      concurrency: 'unbounded',
    },
  );
