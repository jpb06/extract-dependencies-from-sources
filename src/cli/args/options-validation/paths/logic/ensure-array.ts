import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import * as Match from '@effect/match';

import { failWithInvalidType } from './invalid-type-error';

export const ensureArray = (
  value: string | string[] | undefined,
): Effect.Effect<never, unknown, string[]> =>
  pipe(
    value,
    pipe(
      Match.type<string | string[] | undefined>(),
      Match.when(Array.isArray, (array) => Effect.succeed(array)),
      Match.when(Match.string, (str) => Effect.succeed([str])),
      Match.orElse(failWithInvalidType),
    ),
  );
