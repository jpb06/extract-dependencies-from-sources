import { Effect } from 'effect';
import colors from 'picocolors';

export const failAsNotFound = (path: string) =>
  Effect.fail(
    colors.bold(
      colors.redBright(
        `Root package.json could not be found at path ${path}.\n`,
      ),
    ),
  );
