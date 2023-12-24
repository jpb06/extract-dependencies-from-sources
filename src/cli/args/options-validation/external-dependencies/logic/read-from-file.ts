import { Effect, pipe } from 'effect';
import { pathExists } from 'fs-extra';

import { failAsFileNotFound } from './fail-as-file-not-found';
import { readExternalDependencies } from './read-external-dependencies';

export const readFromFile = (path: string) =>
  pipe(
    Effect.tryPromise(() => pathExists(path)),
    Effect.flatMap((configFileExists) =>
      Effect.if(configFileExists, {
        onTrue: readExternalDependencies(path),
        onFalse: failAsFileNotFound(path),
      }),
    ),
  );
