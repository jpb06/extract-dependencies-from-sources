import * as Effect from '@effect/io/Effect';
import { readFile } from 'fs-extra';
import yaml from 'yaml';

export type ExternalDeps = Array<Record<string, string>>;

type ExternalDepsFile = {
  externaldeps: ExternalDeps;
};

export const readExternalDependencies = (path: string) =>
  Effect.gen(function* (_) {
    const data = yield* _(
      Effect.tryPromise(() => readFile(path, { encoding: 'utf8' })),
    );

    const parsed = yaml.parse(data) as Partial<ExternalDepsFile>;

    return parsed?.externaldeps ?? [];
  });
