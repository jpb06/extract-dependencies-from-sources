import { FileSystem } from '@effect/platform/FileSystem';
import {
  Effect,
  Array as EffectArray,
  String as EffectString,
  Predicate,
  pipe,
} from 'effect';

const depsRegex = new RegExp(/(from)? ['"](.*)['"](;?)$/, 'gm');

const isRelative = Predicate.or(
  EffectString.startsWith('./'),
  EffectString.startsWith('../'),
);

const getExternalImports = (fileContent: string) =>
  pipe(
    EffectArray.fromIterable(fileContent.matchAll(depsRegex)),
    EffectArray.map(EffectArray.get(2)),
    EffectArray.getSomes,
    EffectArray.filter(Predicate.not(isRelative)),
  );

export const getFileDependencies = (path: string) =>
  pipe(
    FileSystem,
    Effect.flatMap((fs) => fs.readFileString(path)),
    Effect.map(getExternalImports),
    Effect.withSpan('getFileDependencies', { attributes: { path } }),
  );
