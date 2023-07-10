import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { readFile } from 'fs-extra';
import yaml from 'yaml';

export type ExternalDeps = Array<Record<string, string>>;

type ExternalDepsFile = {
  externaldeps: ExternalDeps;
};

export const readExternalDependencies = (path: string) =>
  pipe(
    Effect.tryPromise(() => readFile(path, { encoding: 'utf8' })),
    Effect.flatMap((data) =>
      Effect.sync(() => yaml.parse(data) as Partial<ExternalDepsFile>),
    ),
    Effect.map(
      (data) => (data as Partial<ExternalDepsFile>)?.externaldeps ?? [],
    ),
  );
