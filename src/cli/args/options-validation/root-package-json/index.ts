import { Effect, pipe } from 'effect';
import { exists } from 'fs-extra';

import { CliArguments } from '../../types/cli-arguments.type';

import { failAsNotFound } from './logic/fail-as-not-found';
import { readPackageJsonFile } from './logic/read-package-json-file';

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
