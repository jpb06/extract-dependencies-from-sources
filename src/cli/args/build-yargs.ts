import colors from 'picocolors';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import type { CliArguments } from './types/cli-arguments.type.js';

export const buildYargs = (): CliArguments =>
  yargs(hideBin(process.argv))
    .scriptName('extractDeps')
    .usage(
      colors.blueBright('$0 --packagejson ./package.json --path codebasePath'),
    )
    .epilogue('Inferring dependencies from the source code of a monorepo app')
    .example(
      '$0 --packagejson ./package.json --path ./apps/back --path ./libs/back',
      '',
    )
    .describe('packagejson', colors.cyanBright('Root package.json path'))
    .default('packagejson', './package.json')
    .describe('path', colors.cyanBright('Codebase path'))
    .describe(
      'externaldeps',
      colors.cyanBright('Path to external dependencies file (optional)'),
    )
    .demandOption(['path', 'packagejson']).argv as CliArguments;
