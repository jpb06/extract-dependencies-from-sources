import { describe, it, expect } from 'vitest';

import { arrayWithDuplicates } from '../../../test/mock-data/array-with-duplicates.mock-data';

import { onlyUnique } from './filter-unique';

describe('onlyUnique function', () => {
  it('should only keep unique values', () => {
    const result = arrayWithDuplicates.filter(onlyUnique);

    expect(result).toStrictEqual(['cool', 'story', 'bro']);
  });
});
