import { Effect } from 'effect';
import colors from 'picocolors';

export const failAsFileNotFound = (path: string) =>
  Effect.fail(
    colors.bold(
      colors.redBright(
        `\n--externaldeps\tExternal dependencies file ${path} doesn't exist\n`,
      ),
    ),
  );
