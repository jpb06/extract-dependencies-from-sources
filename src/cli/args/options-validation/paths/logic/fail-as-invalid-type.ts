import chalk from 'chalk';
import { Effect } from 'effect';

export const failAsInvalidType = () =>
  Effect.fail(
    chalk.bold.redBright(
      `Invalid type for 'paths' option: expecting an array of existing paths.\n`,
    ),
  );
