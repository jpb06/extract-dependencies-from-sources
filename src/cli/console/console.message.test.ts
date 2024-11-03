import { Effect } from 'effect';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { mockConsole, mockPicoColors } from '@tests/mocks';

// vi.mock('picocolors', () => ({
//   default: {
//     cyanBright: vi.fn(),
//     greenBright: vi.fn(),
//     redBright: vi.fn(),
//     whiteBright: vi.fn(),
//     yellowBright: vi.fn(),
//     underline: {
//       cyanBright: vi.fn(),
//     },
//     bold: {
//       redBright: vi.fn(),
//     },
//   },
// }));
//global.console = { info: vi.fn(), error: vi.fn() } as unknown as Console;

describe('console messages function', async () => {
  const packageName = 'extract-dependencies-from-sources';

  await mockConsole({
    info: vi.fn(),
    error: vi.fn(),
  });
  const colors = mockPicoColors();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('displaySuccessEffect function', () => {
    it('should call console.info', async () => {
      const { displaySuccessEffect } = await import('./console.messages.js');

      Effect.runSync(displaySuccessEffect);

      expect(console.info).toHaveBeenCalledTimes(1);
    });

    it('should display the package name in cyan', async () => {
      const { displaySuccessEffect } = await import('./console.messages.js');

      Effect.runSync(displaySuccessEffect);

      expect(colors.cyanBright).toHaveBeenCalledWith(packageName);
    });

    it('should display a success message in green with the number of icons added', async () => {
      const { displaySuccessEffect } = await import('./console.messages.js');

      Effect.runSync(displaySuccessEffect);

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

      displayException(error);

      expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('should display the package name in cyan', async () => {
      const { displayException } = await import('./console.messages.js');

      displayException(error);

      expect(colors.cyanBright).toHaveBeenCalledWith(packageName);
    });

    it('should display a success message in green with the number of icons added', async () => {
      const { displayException } = await import('./console.messages.js');

      displayException(error);

      expect(colors.redBright).toHaveBeenCalledTimes(1);
      expect(colors.redBright).toHaveBeenCalledWith(error.stack);
    });
  });
});
