export const onlyUnique = <T>(value: T, index: number, array: T[]): boolean =>
  array.indexOf(value) === index;
