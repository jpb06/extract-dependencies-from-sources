/* eslint-disable no-console */
import chalk from 'chalk';
import { Effect } from 'effect';

export const displaySuccessEffect = Effect.sync(() => {
  console.info(
    `${chalk.cyanBright(
      'extract-dependencies-from-sources',
    )} ✅ - ${chalk.greenBright(
      'Dependencies shrinked - root package.json updated',
    )}`,
  );
});

export const displayException = (err: unknown): void => {
  console.error(
    `${chalk.cyanBright(
      'extract-dependencies-from-sources',
    )} ❌ - ${chalk.redBright((err as { stack: string }).stack)}`,
  );
};
