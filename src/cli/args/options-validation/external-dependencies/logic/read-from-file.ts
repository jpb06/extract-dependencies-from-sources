import { Effect, pipe } from 'effect';

import { pathExists } from '../../../../../effects/fsExtra.effects';

import { failAsFileNotFound } from './fail-as-file-not-found';
import { readExternalDependencies } from './read-external-dependencies';

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
