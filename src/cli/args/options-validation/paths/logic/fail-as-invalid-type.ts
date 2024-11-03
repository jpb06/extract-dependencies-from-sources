import { Effect } from 'effect';
import colors from 'picocolors';

export const failAsInvalidType = () =>
  Effect.fail(
    colors.bold(
      colors.redBright(
        `Invalid type for 'paths' option: expecting an array of existing paths.\n`,
      ),
    ),
  );
