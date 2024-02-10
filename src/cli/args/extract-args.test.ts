import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest';

global.console = {
  error: vi.fn(),
  info: global.console.info,
} as unknown as Console;

describe('validateArguments function', () => {
  const validateArgumentsPath = '../../cli/args/extract-args';

  const existsMock = vi.fn();
  const pathExistsMock = vi.fn();
  const readJsonMock = vi.fn();
  const readFileMock = vi.fn();

  beforeAll(() => {
    vi.spyOn(process, 'exit')
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .mockImplementation((() => {}) as (code?: number | undefined) => never);

    vi.doMock('fs-extra', () => ({
      exists: existsMock,
      pathExists: pathExistsMock,
      readJson: readJsonMock,
      readFile: readFileMock,
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should throw an error if paths option is invalid', async () => {
    existsMock.mockResolvedValue(true);
    readJsonMock.mockResolvedValue({});

    const { runCommand } = await import('../../test/util/run-command');
    await expect(runCommand(validateArgumentsPath)).rejects.toThrowError(
      "Invalid type for 'paths' option: expecting an array of existing paths",
    );
  });

  it('should throw an error when root package json could not be found', async () => {
    existsMock.mockImplementation((path) =>
      Promise.resolve(path !== './package.json'),
    );

    const { runCommand } = await import('../../test/util/run-command');

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
    existsMock.mockResolvedValue(true);

    const { runCommand } = await import('../../test/util/run-command');

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
    existsMock.mockResolvedValue(true);

    const { runCommand } = await import('../../test/util/run-command');

    const result = await runCommand(validateArgumentsPath, '--path', '../cli');

    expect(result).toStrictEqual({
      externaldeps: [],
      packageJsonData: {},
      packageJsonPath: './package.json',
      paths: ['../cli'],
    });
  });

  it('should throw an error when some path is invalid', async () => {
    existsMock.mockResolvedValueOnce(true).mockResolvedValueOnce(false);

    const { runCommand } = await import('../../test/util/run-command');

    await expect(
      runCommand(validateArgumentsPath, '--path', '../cli'),
    ).rejects.toThrowError(
      "Invalid type for 'paths' option: expecting an array of existing paths",
    );
  });

  it('should throw an error if externaldeps path is invalid', async () => {
    existsMock.mockResolvedValue(true);
    pathExistsMock.mockResolvedValue(false);

    const { runCommand } = await import('../../test/util/run-command');

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
    existsMock.mockResolvedValue(true);
    pathExistsMock.mockResolvedValue(true);
    readFileMock.mockResolvedValue(`externaldeps:
    - msw: ^1.1.0
    - eslint: ~8.36.0
  `);

    const { runCommand } = await import('../../test/util/run-command');

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
