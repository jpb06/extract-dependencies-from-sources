import { TaggedError } from 'effect/Data';

export class WriteFileStringError extends TaggedError(
  'write-file-string-error',
)<{
  cause?: unknown;
  message?: string;
}> {}
