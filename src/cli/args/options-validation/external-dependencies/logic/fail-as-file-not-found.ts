import * as Effect from '@effect/io/Effect';
import chalk from 'chalk';

export const failAsFileNotFound = (path: string) =>
  Effect.fail(
    chalk.bold.redBright(
      `\n--externaldeps\tExternal dependencies file ${path} doesn't exist\n`,
    ),
  );
