import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { pathExists } from 'fs-extra';

import { failFileNotFound } from './logic/fail-file-not-found';
import {
  ExternalDeps,
  readExternalDependencies,
} from './logic/read-external-dependencies';

export const validateExternalDeps = (
  maybePath: string | undefined,
): Effect.Effect<never, unknown, ExternalDeps> =>
  pipe(
    Effect.if(maybePath === undefined, {
      onTrue: Effect.succeed([] as ExternalDeps),
      onFalse: pipe(
        Effect.tryPromise(() => pathExists(maybePath as string)),
        Effect.flatMap((configFileExists) =>
          Effect.if(configFileExists, {
            onTrue: readExternalDependencies(maybePath as string),
            onFalse: failFileNotFound(maybePath as string),
          }),
        ),
      ),
    }),
  );
