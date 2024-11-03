import { Effect, pipe } from 'effect';

import { pathExists } from '@effects/fs-extra.effects.js';

import { failAsFileNotFound } from './fail-as-file-not-found.js';
import { readExternalDependencies } from './read-external-dependencies.js';

export const readFromFile = (path: string) =>
  pipe(
    Effect.gen(function* () {
      const configFileExists = yield* pathExists(path);
      if (configFileExists) {
        return yield* readExternalDependencies(path);
      }

      return yield* failAsFileNotFound(path);
    }),
    Effect.withSpan('readFromFile', { attributes: { path } }),
  );
