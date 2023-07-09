import * as Effect from '@effect/io/Effect';
import chalk from 'chalk';

export const failFileNotFound = (
  path: string,
): Effect.Effect<never, string, never> =>
  Effect.fail(
    chalk.bold.redBright(
      `\n--externaldeps\tExternal dependencies file ${path} doesn't exist\n`,
    ),
  );
