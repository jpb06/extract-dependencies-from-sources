import { Effect, pipe } from 'effect';

import type { CliArguments } from '../../types/cli-arguments.type.js';
import { ensureAllFilesExist } from './logic/ensure-all-files-exist.js';
import { ensureArray } from './logic/ensure-array.js';

export const validatePaths = (config: Partial<CliArguments>) =>
  pipe(
    Effect.sync(() => config.path),
    Effect.flatMap(ensureArray),
    Effect.flatMap(ensureAllFilesExist),
    Effect.withSpan('validatePaths', { attributes: { config } }),
  );
