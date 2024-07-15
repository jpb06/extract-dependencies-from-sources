import { Effect, pipe } from 'effect';

import { exists } from '../../../../effects/fsExtra.effects';
import { CliArguments } from '../../types/cli-arguments.type';

import { failAsNotFound } from './logic/fail-as-not-found';
import { readPackageJsonFile } from './logic/read-package-json-file';

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
