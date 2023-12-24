import chalk from 'chalk';
import { Effect } from 'effect';

export const failAsNotFound = (path: string) =>
  Effect.fail(
    chalk.bold.redBright(
      `Root package.json could not be found at path ${path}.\n`,
    ),
  );
