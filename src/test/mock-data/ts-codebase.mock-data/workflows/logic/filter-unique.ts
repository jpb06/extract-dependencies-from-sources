export const onlyUnique = <T>(
  value: T,
  index: number,
  array: Array<T>,
): boolean => array.indexOf(value) === index;
