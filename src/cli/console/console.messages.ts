import { Console } from 'effect';
import colors from 'picocolors';

const packageName = 'extract-dependencies-from-sources';

export const displaySuccessEffect = () =>
  Console.info(
    `${colors.cyanBright(packageName)} ✅ - ${colors.greenBright(
      'Dependencies shrinked - root package.json updated',
    )}`,
  );

export const displayException = (err: unknown) =>
  Console.error(
    `${colors.cyanBright(
      packageName,
    )} ❌ - ${colors.redBright((err as { stack: string }).stack)}`,
  );
