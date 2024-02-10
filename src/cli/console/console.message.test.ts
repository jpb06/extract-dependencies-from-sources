import chalk from 'chalk';
import { Effect } from 'effect';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { displaySuccessEffect, displayException } from './console.messages';

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
    vi.clearAllMocks();
  });

  describe('displaySuccessEffect function', () => {
    it('should call console.info', () => {
      Effect.runSync(displaySuccessEffect);

      // eslint-disable-next-line no-console
      expect(console.info).toHaveBeenCalledTimes(1);
    });

    it('should display the package name in cyan', () => {
      Effect.runSync(displaySuccessEffect);

      expect(chalk.cyanBright).toHaveBeenCalledWith(packageName);
    });

    it('should display a success message in green with the number of icons added', () => {
      Effect.runSync(displaySuccessEffect);

      expect(chalk.greenBright).toHaveBeenCalledTimes(1);
      expect(chalk.greenBright).toHaveBeenCalledWith(
        'Dependencies shrinked - root package.json updated',
      );
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
