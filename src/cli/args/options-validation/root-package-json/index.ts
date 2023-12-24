import { Effect, pipe } from 'effect';
import { exists } from 'fs-extra';

import { failAsNotFound } from './logic/fail-as-not-found';
import { readPackageJsonFile } from './logic/read-package-json-file';
import { CliArguments } from '../../types/cli-arguments.type';

type ValidateRootPackageJsonInput = Pick<CliArguments, 'packagejson'>;

export const validateRootPackageJson = ({
  packagejson,
}: ValidateRootPackageJsonInput) =>
  pipe(
    Effect.tryPromise(() => exists(packagejson)),
    Effect.if({
      onFalse: failAsNotFound(packagejson),
      onTrue: readPackageJsonFile(packagejson),
    }),
  );
