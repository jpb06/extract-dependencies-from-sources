#!/usr/bin/env node

import { pipe, Effect } from 'effect';

import { getCodebasesDependencies } from '../logic/codebase-dependencies/get-codebases-dependencies';
import { formatDependencies } from '../logic/format-dependencies/format-dependencies';
import { updateRootPackageJson } from '../logic/update-root-package-json/update-root-package-json';

import { validateArguments } from './args/extract-args';
import {
  displaySuccessEffect,
  displayException,
} from './console/console.messages';

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
