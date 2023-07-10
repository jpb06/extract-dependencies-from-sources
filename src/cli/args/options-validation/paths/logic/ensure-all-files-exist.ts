import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { exists } from 'fs-extra';

import { failAsInvalidType } from './fail-as-invalid-type';

export const ensureAllFilesExist = (paths: string[]) =>
  Effect.forEach(
    paths,
    (path) =>
      pipe(
        Effect.tryPromise(() => exists(path)),
        Effect.flatMap((fileExists) =>
          Effect.if(fileExists, {
            onTrue: Effect.succeed(path),
            onFalse: failAsInvalidType(),
          }),
        ),
      ),
    {
      concurrency: 'unbounded',
    },
  );
