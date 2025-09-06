import { Effect, pipe } from 'effect';
import { describe, expect, it, vi } from 'vitest';
import { mockFn } from 'vitest-mock-extended';

import { makeFsTestLayer } from '@tests/layers';

import { packageJsonMockData } from '../../test/mock-data/package-json.mock-data.js';
import { buildYargs } from './build-yargs.js';
import type { CliArguments } from './types/cli-arguments.type.js';

vi.mock('./build-yargs.ts');

describe('validateArguments function', () => {
  it('should throw an error if paths option is invalid', async () => {
    const { FsTestLayer } = makeFsTestLayer({
      exists: Effect.succeed(true),
      readFileString: Effect.succeed('{}'),
    });

    const args: Partial<CliArguments> = {
      packagejson: './package.json',
    };
    vi.mocked(buildYargs).mockReturnValueOnce(args as CliArguments);

    const { validateArguments } = await import('./extract-args.js');

    const task = pipe(validateArguments, Effect.provide(FsTestLayer));

    await expect(Effect.runPromise(task)).rejects.toThrowError(
      "Invalid type for 'paths' option: expecting an array of existing paths",
    );
  });

  it('should throw an error when root package json could not be found', async () => {
    const { FsTestLayer, existsMock } = makeFsTestLayer({
      exists: vi
        .fn()
        .mockImplementation((path) =>
          Effect.succeed(path !== './package.json'),
        ),
    });

    const args: Partial<CliArguments> = {
      packagejson: './package.json',
      path: ['../cli', '../test'],
    };
    vi.mocked(buildYargs).mockReturnValueOnce(args as CliArguments);

    const { validateArguments } = await import('./extract-args.js');

    const task = pipe(validateArguments, Effect.provide(FsTestLayer));

    await expect(Effect.runPromise(task)).rejects.toThrowError(
      'Root package.json could not be found at path ./package.json',
    );

    expect(existsMock).toHaveBeenCalledWith('./package.json');
  });

  it('should return paths', async () => {
    const packageJsonContent = JSON.stringify(packageJsonMockData);

    const { FsTestLayer } = makeFsTestLayer({
      exists: Effect.succeed(true),
      readFileString: Effect.succeed(packageJsonContent),
    });

    const args: Partial<CliArguments> = {
      packagejson: './package.json',
      path: ['../cli', '../test'],
    };
    vi.mocked(buildYargs).mockReturnValueOnce(args as CliArguments);

    const { validateArguments } = await import('./extract-args.js');

    const task = pipe(validateArguments, Effect.provide(FsTestLayer));

    const { packageJsonData, ...rest } = await Effect.runPromise(task);

    expect(JSON.stringify(packageJsonData)).toStrictEqual(packageJsonContent);
    expect(rest).toStrictEqual({
      externaldeps: [],
      packageJsonPath: './package.json',
      paths: ['../cli', '../test'],
    });
  });

  it('should return one path', async () => {
    const packageJsonContent = JSON.stringify(packageJsonMockData);

    const { FsTestLayer } = makeFsTestLayer({
      exists: Effect.succeed(true),
      readFileString: Effect.succeed(packageJsonContent),
    });

    const args: Partial<CliArguments> = {
      packagejson: './package.json',
      path: ['../cli'],
    };
    vi.mocked(buildYargs).mockReturnValueOnce(args as CliArguments);

    const { validateArguments } = await import('./extract-args.js');

    const task = pipe(validateArguments, Effect.provide(FsTestLayer));

    const { packageJsonData: _, ...rest } = await Effect.runPromise(task);

    expect(rest).toStrictEqual({
      externaldeps: [],
      packageJsonPath: './package.json',
      paths: ['../cli'],
    });
  });

  it('should throw an error when some path is invalid', async () => {
    const { FsTestLayer } = makeFsTestLayer({
      exists: vi
        .fn()
        .mockReturnValueOnce(Effect.succeed(true))
        .mockReturnValueOnce(Effect.succeed(false)),
      readFileString: Effect.succeed('{}'),
    });

    const args: Partial<CliArguments> = {
      packagejson: './package.json',
      path: ['../cli'],
    };
    vi.mocked(buildYargs).mockReturnValueOnce(args as CliArguments);

    const { validateArguments } = await import('./extract-args.js');

    const task = pipe(validateArguments, Effect.provide(FsTestLayer));

    await expect(Effect.runPromise(task)).rejects.toThrowError(
      "Invalid type for 'paths' option: expecting an array of existing paths",
    );
  });

  it('should throw an error if externaldeps path is invalid', async () => {
    const externalDepsPath = '../cli/externaldeps.yaml';
    const existsMock = mockFn();
    existsMock
      .calledWith('./package.json')
      .mockReturnValueOnce(Effect.succeed(true));
    existsMock
      .calledWith(externalDepsPath)
      .mockReturnValueOnce(Effect.succeed(false));

    const { FsTestLayer } = makeFsTestLayer({
      exists: existsMock,
      readFileString: Effect.succeed('{}'),
    });

    const args: Partial<CliArguments> = {
      packagejson: './package.json',
      path: ['../cli'],
      externaldeps: externalDepsPath,
    };
    vi.mocked(buildYargs).mockReturnValueOnce(args as CliArguments);

    const { validateArguments } = await import('./extract-args.js');

    const task = pipe(validateArguments, Effect.provide(FsTestLayer));

    await expect(Effect.runPromise(task)).rejects.toThrowError(
      "External dependencies file ../cli/externaldeps.yaml doesn't exist",
    );
  });

  it('should use the externalDeps option', async () => {
    const externalDepsPath = '../cli/externaldeps.yaml';

    const readFileStringMock = mockFn();
    readFileStringMock
      .calledWith('./package.json')
      .mockReturnValueOnce(Effect.succeed('{}'));
    readFileStringMock.calledWith(externalDepsPath).mockReturnValueOnce(
      Effect.succeed(`externaldeps:
    - msw: ^1.1.0
    - eslint: ~8.36.0
`),
    );

    const { FsTestLayer } = makeFsTestLayer({
      exists: Effect.succeed(true),
      readFileString: readFileStringMock,
    });

    const args: Partial<CliArguments> = {
      packagejson: './package.json',
      path: ['../cli'],
      externaldeps: externalDepsPath,
    };
    vi.mocked(buildYargs).mockReturnValueOnce(args as CliArguments);

    const { validateArguments } = await import('./extract-args.js');

    const task = pipe(validateArguments, Effect.provide(FsTestLayer));

    const result = await Effect.runPromise(task);

    expect(result).toStrictEqual({
      externaldeps: [
        {
          msw: '^1.1.0',
        },
        {
          eslint: '~8.36.0',
        },
      ],
      packageJsonData: {},
      packageJsonPath: './package.json',
      paths: ['../cli'],
    });
  });
});
