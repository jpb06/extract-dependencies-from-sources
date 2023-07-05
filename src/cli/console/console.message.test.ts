import chalk from 'chalk';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import {
  displayDependenciesShrinked,
  displayError,
  displayException,
} from './console.messages';

vi.mock('chalk', () => ({
  default: {
    cyanBright: vi.fn(),
    greenBright: vi.fn(),
    redBright: vi.fn(),
    whiteBright: vi.fn(),
    yellowBright: vi.fn(),
    underline: {
      cyanBright: vi.fn(),
    },
    bold: {
      redBright: vi.fn(),
    },
  },
}));
global.console = { info: vi.fn(), error: vi.fn() } as unknown as Console;

describe('console messages function', () => {
  const packageName = 'extract-dependencies-from-sources';

  beforeEach(async () => {
    // const { mockChalk } = await import('../../test/mocks/mock-chalk');
    // const { mockConsole } = await import('../../test/mocks/mock-console');

    // mockChalk(vi);
    // mockConsole();
    vi.clearAllMocks();
  });

  describe('displayDependenciesShrinked function', async () => {
    it('should call console.info', () => {
      displayDependenciesShrinked();

      // eslint-disable-next-line no-console
      expect(console.info).toHaveBeenCalledTimes(1);
    });

    it('should display the package name in cyan', () => {
      displayDependenciesShrinked();

      expect(chalk.cyanBright).toHaveBeenCalledWith(packageName);
    });

    it('should display a success message in green with the number of icons added', () => {
      displayDependenciesShrinked();

      expect(chalk.greenBright).toHaveBeenCalledTimes(1);
      expect(chalk.greenBright).toHaveBeenCalledWith(
        'Dependencies shrinked - root package.json updated',
      );
    });
  });

  describe('displayError function', () => {
    const errorMessage = 'Oh no!';

    it('should call console.error', () => {
      displayError(errorMessage);

      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('should display the package name in cyan', () => {
      displayError(errorMessage);

      expect(chalk.cyanBright).toHaveBeenCalledWith(packageName);
    });

    it('should display a success message in green with the number of icons added', () => {
      displayError(errorMessage);

      expect(chalk.redBright).toHaveBeenCalledTimes(1);
      expect(chalk.redBright).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('displayException function', () => {
    const error: Error = {
      name: 'Error',
      message: 'Oh no!',
      stack: 'error stack',
    };

    it('should call console.error', () => {
      displayException(error);

      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('should display the package name in cyan', () => {
      displayException(error);

      expect(chalk.cyanBright).toHaveBeenCalledWith(packageName);
    });

    it('should display a success message in green with the number of icons added', () => {
      displayException(error);

      expect(chalk.redBright).toHaveBeenCalledTimes(1);
      expect(chalk.redBright).toHaveBeenCalledWith(error.stack);
    });
  });
});
