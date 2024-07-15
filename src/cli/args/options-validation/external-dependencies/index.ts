import { Effect, pipe } from 'effect';

import { ExternalDeps } from './logic/read-external-dependencies';
import { readFromFile } from './logic/read-from-file';

export const validateExternalDeps = (maybePath: string | undefined) =>
  pipe(
    Effect.if(maybePath === undefined, {
      onTrue: () => Effect.succeed([] as ExternalDeps),
      onFalse: () => readFromFile(maybePath as string),
    }),
    Effect.withSpan('validateExternalDeps', { attributes: { maybePath } }),
  );
