import * as Effect from '@effect/io/Effect';
import chalk from 'chalk';

export const failAsInvalidType = () =>
  Effect.fail(
    chalk.bold.redBright(
      `Invalid type for 'paths' option: expecting an array of existing paths.\n`,
    ),
  );
