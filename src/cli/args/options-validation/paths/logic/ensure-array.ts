import { Effect, Match, pipe } from 'effect';

import { failAsInvalidType } from './fail-as-invalid-type.js';

export const ensureArray = (value: string | string[] | undefined) =>
  pipe(
    value,
    pipe(
      Match.type<string | string[] | undefined>(),
      Match.when(Array.isArray, (array) => Effect.succeed(array)),
      Match.when(Match.string, (str) => Effect.succeed([str])),
      Match.orElse(failAsInvalidType),
    ),
    Effect.withSpan('ensureArray', { attributes: { value } }),
  );
