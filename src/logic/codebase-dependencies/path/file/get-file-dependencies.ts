import { pipe } from '@effect/data/Function';
import * as Option from '@effect/data/Option';
import * as Predicate from '@effect/data/Predicate';
import * as Array from '@effect/data/ReadonlyArray';
import * as Str from '@effect/data/String';
import * as Effect from '@effect/io/Effect';
import { readFile } from 'fs-extra';

const depsRegex = new RegExp(/^import.*(from)? ['"](.*)['"].*$/, 'gm');

const isRelative = Predicate.or(Str.startsWith('./'), Str.startsWith('../'));

const getExternalImports = (fileContent: string) =>
  pipe(
    Effect.loop(Option.fromNullable(depsRegex.exec(fileContent)), {
      while: Option.isSome,
      body: (match) =>
        Effect.sync(() =>
          match.pipe(
            Option.flatMap(Array.get(2)),
            Option.filter(Predicate.not(isRelative)),
          ),
        ),
      step: () => Option.fromNullable(depsRegex.exec(fileContent)),
    }),
    Effect.map(Array.compact),
  );

export const getFileDependencies = (path: string) =>
  pipe(
    Effect.tryPromise(() => readFile(path, 'utf8')),
    Effect.flatMap(getExternalImports),
  );
