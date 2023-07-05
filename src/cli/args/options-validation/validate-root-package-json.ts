import chalk from 'chalk';
import { readJson, exists } from 'fs-extra';

import { PackageJson } from '../../../types/package-json.type';
import { CliArguments } from '../types/cli-arguments.type';

type ValidateRootPackageJsonInput = Pick<CliArguments, 'packagejson'>;

type RootPackageJsonValidationResult = {
  data: PackageJson;
  path: string;
};

export const validateRootPackageJson = async ({
  packagejson,
}: ValidateRootPackageJsonInput): Promise<RootPackageJsonValidationResult> => {
  const packageJsonExists = await exists(packagejson);
  if (!packageJsonExists) {
    throw new Error(
      chalk.bold.redBright(
        `Root package.json could not be found at path ${packagejson}.\n`,
      ),
    );
  }

  const data = await readJson(packagejson);

  return {
    data,
    path: packagejson,
  };
};
