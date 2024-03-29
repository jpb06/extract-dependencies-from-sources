import { Effect } from 'effect';
import { readFile } from 'fs-extra';
import yaml from 'yaml';

export type ExternalDeps = Record<string, string>[];

interface ExternalDepsFile {
  externaldeps: ExternalDeps;
}

export const readExternalDependencies = (path: string) =>
  Effect.gen(function* (_) {
    const data = yield* _(
      Effect.tryPromise(() => readFile(path, { encoding: 'utf8' })),
    );

    const parsed = yaml.parse(data) as Partial<ExternalDepsFile>;

    return parsed?.externaldeps ?? [];
  });
