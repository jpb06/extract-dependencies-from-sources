/* eslint-disable no-console */
import chalk from 'chalk';

export const displayDependenciesShrinked = (): void => {
  console.info(
    `${chalk.cyanBright(
      'extract-dependencies-from-sources',
    )} ✅ - ${chalk.greenBright(
      'Dependencies shrinked - root package.json updated',
    )}`,
  );
};

export const displayError = (message: string): void => {
  console.error(
    `${chalk.cyanBright(
      'extract-dependencies-from-sources',
    )} ❌ - ${chalk.redBright(message)}`,
  );
};

export const displayException = (err: unknown): void => {
  console.error(
    `${chalk.cyanBright(
      'extract-dependencies-from-sources',
    )} ❌ - ${chalk.redBright((err as { stack: string }).stack)}`,
  );
};
