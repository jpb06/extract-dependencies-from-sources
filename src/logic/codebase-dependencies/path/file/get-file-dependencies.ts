import { Effect, String, Predicate, pipe, Array } from 'effect';

import { readFile } from '../../../../effects/fsExtra.effects';

const depsRegex = new RegExp(/(from)? ['"](.*)['"](;?)$/, 'gm');

const isRelative = Predicate.or(
  String.startsWith('./'),
  String.startsWith('../'),
);

const getExternalImports = (fileContent: string) =>
  pipe(
    Array.fromIterable(fileContent.matchAll(depsRegex)),
    Array.map(Array.get(2)),
    Array.getSomes,
    Array.filter(Predicate.not(isRelative)),
  );

export const getFileDependencies = (path: string) =>
  pipe(
    readFile(path),
    Effect.map(getExternalImports),
    Effect.withSpan('getFileDependencies', { attributes: { path } }),
  );
