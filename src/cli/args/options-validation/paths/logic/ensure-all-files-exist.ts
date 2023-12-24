import { Effect } from 'effect';
import { exists } from 'fs-extra';

import { failAsInvalidType } from './fail-as-invalid-type';

export const ensureAllFilesExist = (paths: string[]) =>
  Effect.forEach(
    paths,
    (path) =>
      Effect.gen(function* (_) {
        const fileExists = yield* _(Effect.tryPromise(() => exists(path)));
        if (fileExists) {
          return yield* _(Effect.succeed(path));
        }

        return yield* _(failAsInvalidType());
      }),
    {
      concurrency: 'unbounded',
    },
  );
