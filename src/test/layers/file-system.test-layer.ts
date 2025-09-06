import { FileSystem } from '@effect/platform/FileSystem';
import { Effect, Layer } from 'effect';
import { TaggedError } from 'effect/Data';
import { type Mock, vi } from 'vitest';

import type {
  ReadFileStringError,
  WriteFileStringError,
} from '../errors/index.js';

const init = <TSuccess, TError>(
  input: Effect.Effect<TSuccess, TError> | Mock | undefined,
  name: keyof FileSystem,
) => {
  if (input === undefined) {
    return vi.fn().mockReturnValue(
      Effect.fail(
        new TestLayerError({
          cause: `No implementation provided for ${name}`,
        }),
      ),
    );
  }

  if (Effect.isEffect(input)) {
    return vi.fn().mockReturnValue(input);
  }

  return input;
};

export class TestLayerError extends TaggedError('test-layer-error')<{
  cause?: unknown;
  message?: string;
}> {}

type FsTestLayerInput = {
  exists?: Effect.Effect<boolean> | Effect.Effect<never, TestLayerError> | Mock;
  readFileString?: Effect.Effect<string, ReadFileStringError> | Mock;
  writeFileString?: Effect.Effect<void, WriteFileStringError> | Mock;
};

export const makeFsTestLayer = (input: FsTestLayerInput) => {
  const existsMock = init(input.exists, 'exists');
  const readFileStringMock = init(input.readFileString, 'readFileString');
  const writeFileStringMock = init(input.writeFileString, 'writeFileString');

  const make: Partial<FileSystem> = {
    exists: existsMock,
    readFileString: readFileStringMock,
    writeFileString: writeFileStringMock,
  };

  return {
    FsTestLayer: Layer.succeed(FileSystem, FileSystem.of(make as never)),
    existsMock,
    readFileStringMock,
    writeFileStringMock,
  };
};
