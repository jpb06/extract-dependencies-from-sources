import { Effect, ReadonlyArray, String, Predicate, pipe } from 'effect';
import { readFile } from 'fs-extra';

const depsRegex = new RegExp(/(from)? ['"](.*)['"](;?)$/, 'gm');

const isRelative = Predicate.or(
  String.startsWith('./'),
  String.startsWith('../'),
);

const getExternalImports = (fileContent: string) =>
  pipe(
    ReadonlyArray.fromIterable(fileContent.matchAll(depsRegex)),
    ReadonlyArray.map(ReadonlyArray.get(2)),
    ReadonlyArray.getSomes,
    ReadonlyArray.filter(Predicate.not(isRelative)),
  );

export const getFileDependencies = (path: string) =>
  pipe(
    Effect.tryPromise(() => readFile(path, 'utf8')),
    Effect.map(getExternalImports),
  );
