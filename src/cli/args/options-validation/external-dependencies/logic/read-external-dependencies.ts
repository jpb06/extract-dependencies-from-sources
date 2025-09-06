import { FileSystem } from '@effect/platform/FileSystem';
import { Effect, pipe } from 'effect';
import yaml from 'yaml';

export type ExternalDeps = Record<string, string>[];

interface ExternalDepsFile {
  externaldeps: ExternalDeps;
}

export const readExternalDependencies = (path: string) =>
  pipe(
    FileSystem,
    Effect.flatMap((fs) => fs.readFileString(path)),
    Effect.map((data) => yaml.parse(data) as Partial<ExternalDepsFile>),
    Effect.map((parsed) => parsed?.externaldeps ?? []),
    Effect.withSpan('readExternalDependencies', { attributes: { path } }),
  );
