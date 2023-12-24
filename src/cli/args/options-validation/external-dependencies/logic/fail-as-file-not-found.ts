import chalk from 'chalk';
import { Effect } from 'effect';

export const failAsFileNotFound = (path: string) =>
  Effect.fail(
    chalk.bold.redBright(
      `\n--externaldeps\tExternal dependencies file ${path} doesn't exist\n`,
    ),
  );
