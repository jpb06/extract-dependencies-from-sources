/* eslint-disable no-console */
import * as Effect from '@effect/io/Effect';
import chalk from 'chalk';

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
