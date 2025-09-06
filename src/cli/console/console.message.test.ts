import { type Console, Effect } from 'effect';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { mockPicoColors } from '@tests/mocks';

describe('console messages function', () => {
  const packageName = 'extract-dependencies-from-sources';

  const mockedConsole = {
    info: vi.fn().mockReturnValue(Effect.void),
    error: vi.fn().mockReturnValue(Effect.void),
  } as unknown as Console.Console;

  const colors = mockPicoColors();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('displaySuccessEffect function', () => {
    it('should call console.info', async () => {
      const { displaySuccessEffect } = await import('./console.messages.js');

      const task = displaySuccessEffect().pipe(
        Effect.withConsole(mockedConsole),
      );

      Effect.runSync(task);

      expect(mockedConsole.info).toHaveBeenCalledTimes(1);
    });

    it('should display the package name in cyan', async () => {
      const { displaySuccessEffect } = await import('./console.messages.js');

      const task = displaySuccessEffect().pipe(
        Effect.withConsole(mockedConsole),
      );

      Effect.runSync(task);

      expect(colors.cyanBright).toHaveBeenCalledWith(packageName);
    });

    it('should display a success message in green with the number of icons added', async () => {
      const { displaySuccessEffect } = await import('./console.messages.js');

      const task = displaySuccessEffect().pipe(
        Effect.withConsole(mockedConsole),
      );

      Effect.runSync(task);

      expect(colors.greenBright).toHaveBeenCalledTimes(1);
      expect(colors.greenBright).toHaveBeenCalledWith(
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

    it('should call console.error', async () => {
      const { displayException } = await import('./console.messages.js');

      const task = displayException(error).pipe(
        Effect.withConsole(mockedConsole),
      );

      Effect.runSync(task);

      expect(mockedConsole.error).toHaveBeenCalledTimes(1);
    });

    it('should display the package name in cyan', async () => {
      const { displayException } = await import('./console.messages.js');

      const task = displayException(error).pipe(
        Effect.withConsole(mockedConsole),
      );

      Effect.runSync(task);

      expect(colors.cyanBright).toHaveBeenCalledWith(packageName);
    });

    it('should display a success message in green with the number of icons added', async () => {
      const { displayException } = await import('./console.messages.js');

      const task = displayException(error).pipe(
        Effect.withConsole(mockedConsole),
      );

      Effect.runSync(task);

      expect(colors.redBright).toHaveBeenCalledTimes(1);
      expect(colors.redBright).toHaveBeenCalledWith(error.stack);
    });
  });
});
