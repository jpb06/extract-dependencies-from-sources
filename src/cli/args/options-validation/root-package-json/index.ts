import { Effect, pipe } from 'effect';

import { exists } from '@effects/fs-extra.effects.js';

import type { CliArguments } from '../../types/cli-arguments.type.js';
import { failAsNotFound } from './logic/fail-as-not-found.js';
import { readPackageJsonFile } from './logic/read-package-json-file.js';

type ValidateRootPackageJsonInput = Pick<CliArguments, 'packagejson'>;

export const validateRootPackageJson = ({
  packagejson,
}: ValidateRootPackageJsonInput) =>
  pipe(
    Effect.gen(function* () {
      const packageFileExists = yield* exists(packagejson);
      if (packageFileExists) {
        return yield* readPackageJsonFile(packagejson);
      }

      return yield* failAsNotFound(packagejson);
    }),
    Effect.withSpan('validateRootPackageJson', {
      attributes: {
        packagejson,
      },
    }),
  );
