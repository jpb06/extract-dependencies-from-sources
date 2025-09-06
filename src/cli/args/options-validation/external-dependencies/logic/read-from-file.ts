import { FileSystem } from '@effect/platform/FileSystem';
import { Effect, pipe } from 'effect';

import { failAsFileNotFound } from './fail-as-file-not-found.js';
import { readExternalDependencies } from './read-external-dependencies.js';

export const readFromFile = (path: string) =>
  pipe(
    Effect.gen(function* () {
      const fs = yield* FileSystem;

      const configFileExists = yield* fs.exists(path);
      if (configFileExists) {
        return yield* readExternalDependencies(path);
      }

      return yield* failAsFileNotFound(path);
    }),
    Effect.withSpan('readFromFile', { attributes: { path } }),
  );
