import { Effect } from 'effect';
import colors from 'picocolors';

export const displaySuccessEffect = Effect.sync(() => {
  console.info(
    `${colors.cyanBright(
      'extract-dependencies-from-sources',
    )} ✅ - ${colors.greenBright(
      'Dependencies shrinked - root package.json updated',
    )}`,
  );
});

export const displayException = (err: unknown): void => {
  console.error(
    `${colors.cyanBright(
      'extract-dependencies-from-sources',
    )} ❌ - ${colors.redBright((err as { stack: string }).stack)}`,
  );
};
