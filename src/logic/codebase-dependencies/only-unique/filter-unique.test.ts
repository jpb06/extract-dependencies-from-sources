import { describe, expect, it } from 'vitest';

import { arrayWithDuplicates } from '@tests/mock-data';

import { onlyUnique } from './filter-unique.js';

describe('onlyUnique function', () => {
  it('should only keep unique values', () => {
    const result = arrayWithDuplicates.filter(onlyUnique);

    expect(result).toStrictEqual(['cool', 'story', 'bro']);
  });
});
