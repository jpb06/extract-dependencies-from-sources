import { vi } from 'vitest';

type ReadFileMockFn = () => string;

export const mockReadFile = (data: string): ReadFileMockFn =>
  vi.fn().mockReturnValue(data);
