import { Effect, pipe } from 'effect';
import { TaggedError } from 'effect/Data';
import {
  exists as fsExists,
  pathExists as fsPathExists,
  readFile as fsReadFile,
  readJson as fsReadJson,
  writeJson as fsWriteJson,
} from 'fs-extra';

export class FsError extends TaggedError('fs-error')<{
  cause?: unknown;
  message?: string;
}> {}

export const exists = (path: string) =>
  pipe(
    Effect.tryPromise({
      try: () => fsExists(path),
      catch: (e) => new FsError({ cause: e }),
    }),
    Effect.withSpan('exists', { attributes: { path } }),
  );

export const pathExists = (path: string) =>
  pipe(
    Effect.tryPromise({
      try: () => fsPathExists(path),
      catch: (e) => new FsError({ cause: e }),
    }),
    Effect.withSpan('pathExists', { attributes: { path } }),
  );

export const readFile = (path: string) =>
  pipe(
    Effect.tryPromise({
      try: () => fsReadFile(path, { encoding: 'utf8' }),
      catch: (e) => new FsError({ cause: e }),
    }),
    Effect.withSpan('readFile', { attributes: { path } }),
  );

export const readJson = <TResult>(path: string) =>
  pipe(
    Effect.tryPromise({
      try: () => fsReadJson(path) as Promise<TResult>,
      catch: (e) => new FsError({ cause: e }),
    }),
    Effect.withSpan('readJson', { attributes: { path } }),
  );

export const writeJson = (path: string, data: unknown) =>
  pipe(
    Effect.tryPromise({
      try: () => fsWriteJson(path, data, { encoding: 'utf8', spaces: 2 }),
      catch: (e) => new FsError({ cause: e }),
    }),
    Effect.withSpan('writeJson', { attributes: { path, data } }),
  );
