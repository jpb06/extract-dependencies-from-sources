import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { CliArguments } from './types/cli-arguments.type';

export const buildYargs = (): CliArguments =>
  yargs(hideBin(process.argv))
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
