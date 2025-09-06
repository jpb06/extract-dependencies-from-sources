import { TaggedError } from 'effect/Data';

export class ReadFileStringError extends TaggedError('read-file-string-error')<{
  cause?: unknown;
  message?: string;
}> {}
