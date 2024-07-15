import { Effect, pipe } from 'effect';

import { CliArguments } from '../../types/cli-arguments.type';

import { ensureAllFilesExist } from './logic/ensure-all-files-exist';
import { ensureArray } from './logic/ensure-array';

export const validatePaths = (config: Partial<CliArguments>) =>
  pipe(
    Effect.sync(() => config.path),
    Effect.flatMap(ensureArray),
    Effect.flatMap(ensureAllFilesExist),
    Effect.withSpan('validatePaths', { attributes: { config } }),
  );
