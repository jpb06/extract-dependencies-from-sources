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
      Effect.gen(function* (_) {
        const { packageJsonData, packageJsonPath, paths, externaldeps } =
          yield* _(validateArguments);

        const dependencies = yield* _(
          getCodebasesDependencies(packageJsonData.dependencies, paths),
        );

        yield* _(
          updateRootPackageJson(packageJsonPath, packageJsonData, [
            ...formatDependencies(externaldeps),
            ...dependencies,
          ]),
        );
        yield* _(displaySuccessEffect);
      }),
      Effect.catchAll((err) => {
        displayException(err);

        return Effect.fail(err);
      }),
    ),
  ))();
