export const onlyUnique = (
  value: unknown,
  index: number,
  array: Array<unknown>,
): boolean => array.indexOf(value) === index;
