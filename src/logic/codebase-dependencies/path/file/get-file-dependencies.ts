import { pipe } from '@effect/data/Function';
import * as Predicate from '@effect/data/Predicate';
import * as Array from '@effect/data/ReadonlyArray';
import * as Str from '@effect/data/String';
import * as Effect from '@effect/io/Effect';
import { readFile } from 'fs-extra';

const depsRegex = new RegExp(/(from)? ['"](.*)['"](;?)$/, 'gm');

const isRelative = Predicate.or(Str.startsWith('./'), Str.startsWith('../'));

const getExternalImports = (fileContent: string) =>
  pipe(
    Array.fromIterable(fileContent.matchAll(depsRegex)),
    Array.map(Array.get(2)),
    Array.compact,
    Array.filter(Predicate.not(isRelative)),
  );

export const getFileDependencies = (path: string) =>
  pipe(
    Effect.tryPromise(() => readFile(path, 'utf8')),
    Effect.map(getExternalImports),
  );
