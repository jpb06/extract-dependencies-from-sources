import { Effect, pipe } from 'effect';
import yaml from 'yaml';

import { readFile } from '@effects/fs-extra.effects.js';

export type ExternalDeps = Record<string, string>[];

interface ExternalDepsFile {
  externaldeps: ExternalDeps;
}

export const readExternalDependencies = (path: string) =>
  pipe(
    Effect.gen(function* () {
      const data = yield* readFile(path);

      const parsed = yaml.parse(data) as Partial<ExternalDepsFile>;

      return parsed?.externaldeps ?? [];
    }),
    Effect.withSpan('readExternalDependencies', { attributes: { path } }),
  );
