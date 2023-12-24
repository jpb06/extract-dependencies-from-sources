import { Effect, pipe } from 'effect';

import { ensureAllFilesExist } from './logic/ensure-all-files-exist';
import { ensureArray } from './logic/ensure-array';
import { CliArguments } from '../../types/cli-arguments.type';

export const validatePaths = (config: Partial<CliArguments>) =>
  pipe(
    Effect.sync(() => config.path),
    Effect.flatMap(ensureArray),
    Effect.flatMap(ensureAllFilesExist),
  );
