import chalk from 'chalk';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { validatePaths } from './options-validation/validate-paths-option';
import {
  PackageJson,
  validateRootPackageJson,
} from './options-validation/validate-root-package-json';

export type CliArguments = { packagejson: string; path: string };

export type ExtractDependenciesArguments = {
  packageJsonData: PackageJson;
  packageJsonPath: string;
  paths: Array<string>;
};

export const validateArguments =
  async (): Promise<ExtractDependenciesArguments> => {
    const argv = yargs(hideBin(process.argv))
      .scriptName('extractDeps')
      .usage(
        chalk.blueBright('$0 --packagejson ./package.json --path codebasePath'),
      )
      .epilogue('Inferring dependencies from the source code of a monorepo app')
      .example(
        '$0 --packagejson ./package.json --path ./apps/back --path ./libs/back',
        '',
      )
      .describe('packagejson', chalk.cyanBright('Root package.json path'))
      .default('packagejson', './package.json')
      .describe('path', chalk.cyanBright('Codebase path'))
      .demandOption(['path', 'packagejson']).argv as CliArguments;

    const packageJson = await validateRootPackageJson(argv);
    const paths = await validatePaths(argv);

    return {
      packageJsonData: packageJson.data,
      packageJsonPath: packageJson.path,
      paths,
    };
  };
