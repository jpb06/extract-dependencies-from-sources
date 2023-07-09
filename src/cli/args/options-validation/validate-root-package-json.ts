import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import chalk from 'chalk';
import { readJson, exists } from 'fs-extra';

import { PackageJson } from '../../../types/package-json.type';
import { CliArguments } from '../types/cli-arguments.type';

type ValidateRootPackageJsonInput = Pick<CliArguments, 'packagejson'>;

type RootPackageJsonValidationResult = {
  data: PackageJson;
  path: string;
};

export const validateRootPackageJson = ({
  packagejson,
}: ValidateRootPackageJsonInput): Effect.Effect<
  never,
  unknown,
  RootPackageJsonValidationResult
> =>
  pipe(
    Effect.tryPromise(() => exists(packagejson)),
    Effect.if({
      onFalse: Effect.fail(
        chalk.bold.redBright(
          `Root package.json could not be found at path ${packagejson}.\n`,
        ),
      ),
      onTrue: pipe(
        Effect.tryPromise(() => readJson(packagejson)),
        Effect.map((data) => ({ data, path: packagejson })),
      ),
    }),
  );
