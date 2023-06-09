import * as Effect from '@effect/io/Effect';

export const runCommand = async (
  validationFilePath: string,
  ...args: Array<string>
): Promise<unknown> => {
  process.argv = [
    'node', // Not used but a value is required at this index in the array
    'cli.js', // Not used but a value is required at this index in the array
    ...args,
  ];

  const { validateArguments } = await import(validationFilePath);

  return Effect.runPromise(
    validateArguments as Effect.Effect<never, never, never>,
  );
};
