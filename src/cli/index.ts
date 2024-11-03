#!/usr/bin/env node

import { Effect, pipe } from 'effect';

import {
  formatDependencies,
  getCodebasesDependencies,
  updateRootPackageJson,
} from '@logic';

import { validateArguments } from './args/extract-args.js';
import {
  displayException,
  displaySuccessEffect,
} from './console/console.messages.js';

/* istanbul ignore file */

(async (): Promise<void> =>
  Effect.runPromise(
    pipe(
      Effect.gen(function* () {
        const { packageJsonData, packageJsonPath, paths, externaldeps } =
          yield* validateArguments;

        const dependencies = yield* getCodebasesDependencies(
          packageJsonData.dependencies,
          paths,
        );

        yield* updateRootPackageJson(packageJsonPath, packageJsonData, [
          ...formatDependencies(externaldeps),
          ...dependencies,
        ]);

        yield* displaySuccessEffect;
      }),
      Effect.catchAll((err) => {
        displayException(err);

        return Effect.fail(err);
      }),
      Effect.withSpan('extract-dependencies-from-sources cli'),
    ),
  ))();
