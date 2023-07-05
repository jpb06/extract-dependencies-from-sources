import chalk from 'chalk';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import {
  ExternalDeps,
  validateExternalDeps,
} from './options-validation/validate-external-deps';
import { validatePaths } from './options-validation/validate-paths-option';
import { validateRootPackageJson } from './options-validation/validate-root-package-json';
import { CliArguments } from './types/cli-arguments.type';
import { PackageJson } from '../../types/package-json.type';

export type ExtractDependenciesArguments = {
  packageJsonData: PackageJson;
  packageJsonPath: string;
  paths: Array<string>;
  externaldeps: ExternalDeps;
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
      .describe(
        'externaldeps',
        chalk.cyanBright('Path to external dependencies file (optional)'),
      )
      .demandOption(['path', 'packagejson']).argv as CliArguments;

    const packageJson = await validateRootPackageJson(argv);
    const paths = await validatePaths(argv);
    const externaldeps = await validateExternalDeps(argv.externaldeps);

    return {
      packageJsonData: packageJson.data,
      packageJsonPath: packageJson.path,
      paths,
      externaldeps,
    };
  };
