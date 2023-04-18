import chalk from 'chalk';
import { readJson, exists } from 'fs-extra';

import { CliArguments } from '../extract-dependencies-arguments';

export type PackageJson = {
  dependencies: Record<string, string>;
};

type RootPackageJsonValidationResult = {
  data: PackageJson;
  path: string;
};

export const validateRootPackageJson = async ({
  packagejson,
}: CliArguments): Promise<RootPackageJsonValidationResult> => {
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
