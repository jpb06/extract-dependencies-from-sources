import { describe, it, expect } from 'vitest';

import { onlyUnique } from './filter-unique';
import { arrayWithDuplicates } from '../../../test/mock-data/array-with-duplicates.mock-data';

describe('onlyUnique function', () => {
  it('should only keep unique values', () => {
    const result = arrayWithDuplicates.filter(onlyUnique);

    expect(result).toStrictEqual(['cool', 'story', 'bro']);
  });
});
