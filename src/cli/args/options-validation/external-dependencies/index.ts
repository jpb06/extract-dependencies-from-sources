import * as Effect from '@effect/io/Effect';

import { ExternalDeps } from './logic/read-external-dependencies';
import { readFromFile } from './logic/read-from-file';

export const validateExternalDeps = (maybePath: string | undefined) =>
  Effect.if(maybePath === undefined, {
    onTrue: Effect.succeed([] as ExternalDeps),
    onFalse: readFromFile(maybePath as string),
  });
