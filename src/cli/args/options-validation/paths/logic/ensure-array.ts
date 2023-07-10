import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import * as Match from '@effect/match';

import { failAsInvalidType } from './fail-as-invalid-type';

export const ensureArray = (value: string | string[] | undefined) =>
  pipe(
    value,
    pipe(
      Match.type<string | string[] | undefined>(),
      Match.when(Array.isArray, (array) => Effect.succeed(array)),
      Match.when(Match.string, (str) => Effect.succeed([str])),
      Match.orElse(failAsInvalidType),
    ),
  );
