#!/usr/bin/env node

import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';

import { validateArguments } from './args/extract-args';
import {
  displaySuccessEffect,
  displayException,
} from './console/console.messages';
import { getCodebasesDependencies } from '../logic/codebase-dependencies/get-codebases-dependencies';
import { formatDependencies } from '../logic/format-dependencies/format-dependencies';
import { updateRootPackageJson } from '../logic/update-root-package-json/update-root-package-json';

/* istanbul ignore file */

(async (): Promise<void> =>
  Effect.runPromise(
    pipe(
      validateArguments,
      Effect.flatMap(
        ({ packageJsonData, packageJsonPath, paths, externaldeps }) =>
          pipe(
            getCodebasesDependencies(packageJsonData.dependencies, paths),
            Effect.flatMap((dependencies) =>
              updateRootPackageJson(packageJsonPath, packageJsonData, [
                ...formatDependencies(externaldeps),
                ...dependencies,
              ]),
            ),
            Effect.tap(() => displaySuccessEffect),
          ),
      ),
      Effect.catchAll((err) => {
        displayException(err);

        return Effect.fail(err);
      }),
    ),
  ))();
