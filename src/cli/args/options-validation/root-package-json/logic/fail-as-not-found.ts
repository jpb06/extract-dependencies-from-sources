import * as Effect from '@effect/io/Effect';
import chalk from 'chalk';

export const failAsNotFound = (path: string) =>
  Effect.fail(
    chalk.bold.redBright(
      `Root package.json could not be found at path ${path}.\n`,
    ),
  );
