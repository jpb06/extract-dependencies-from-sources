import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { mockConsole, mockFsExtra } from '@tests/mocks';

describe('validateArguments function', () => {
  const validateArgumentsPath = '../../cli/args/extract-args';

  const { exists, pathExists, readFile, readJson } = mockFsExtra();

  mockConsole({
    error: vi.fn(),
  });

  beforeAll(() => {
    // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
    vi.spyOn(process, 'exit').mockImplementation((() => {}) as (
      this: never,
      code?: string | number | null | undefined,
    ) => never);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should throw an error if paths option is invalid', async () => {
    exists.mockResolvedValue(true as never);
    readJson.mockResolvedValue({});

    const { runCommand } = await import('../../test/util/run-command.js');
    await expect(runCommand(validateArgumentsPath)).rejects.toThrowError(
      "Invalid type for 'paths' option: expecting an array of existing paths",
    );
  });

  it('should throw an error when root package json could not be found', async () => {
    exists.mockImplementation((path) =>
      Promise.resolve(path !== './package.json'),
    );

    const { runCommand } = await import('../../test/util/run-command.js');

    await expect(
      runCommand(
        validateArgumentsPath,
        '--path',
        '../cli',
        '--path',
        '../test',
      ),
    ).rejects.toThrowError(
      'Root package.json could not be found at path ./package.json',
    );
  });

  it('should return paths', async () => {
    exists.mockResolvedValue(true as never);

    const { runCommand } = await import('../../test/util/run-command.js');

    const result = await runCommand(
      validateArgumentsPath,
      '--path',
      '../cli',
      '--path',
      '../test',
    );

    expect(result).toStrictEqual({
      externaldeps: [],
      packageJsonData: {},
      packageJsonPath: './package.json',
      paths: ['../cli', '../test'],
    });
  });

  it('should return one path', async () => {
    exists.mockResolvedValue(true as never);

    const { runCommand } = await import('../../test/util/run-command.js');

    const result = await runCommand(validateArgumentsPath, '--path', '../cli');

    expect(result).toStrictEqual({
      externaldeps: [],
      packageJsonData: {},
      packageJsonPath: './package.json',
      paths: ['../cli'],
    });
  });

  it('should throw an error when some path is invalid', async () => {
    exists
      .mockResolvedValueOnce(true as never)
      .mockResolvedValueOnce(false as never);
    readJson.mockResolvedValueOnce({});

    const { runCommand } = await import('../../test/util/run-command.js');

    await expect(
      runCommand(validateArgumentsPath, '--path', '../cli'),
    ).rejects.toThrowError(
      "Invalid type for 'paths' option: expecting an array of existing paths",
    );
  });

  it('should throw an error if externaldeps path is invalid', async () => {
    exists.mockResolvedValue(true as never);
    readJson.mockResolvedValueOnce({});
    pathExists.mockResolvedValue(false as never);

    const { runCommand } = await import('../../test/util/run-command.js');

    await expect(
      runCommand(
        validateArgumentsPath,
        '--path',
        '../cli',
        '--externaldeps',
        '../cli/externaldeps.yaml',
      ),
    ).rejects.toThrowError(
      "External dependencies file ../cli/externaldeps.yaml doesn't exist",
    );
  });

  it('should use the externalDeps option', async () => {
    exists.mockResolvedValue(true as never);
    pathExists.mockResolvedValue(true as never);
    readFile.mockResolvedValue(
      `externaldeps:
    - msw: ^1.1.0
    - eslint: ~8.36.0
  ` as never,
    );

    const { runCommand } = await import('../../test/util/run-command.js');

    const result = await runCommand(
      validateArgumentsPath,
      '--path',
      '../cli',
      '--externaldeps',
      '../cli/externaldeps.yaml',
    );

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
