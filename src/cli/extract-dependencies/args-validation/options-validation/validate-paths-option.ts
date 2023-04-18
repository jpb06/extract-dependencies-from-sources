import chalk from 'chalk';
import { exists } from 'fs-extra';

import { CliArguments } from '../extract-dependencies-arguments';

const error = chalk.bold.redBright(
  `Invalid type for 'paths' option: expecting an array of existing paths.\n`,
);

export const validatePaths = async (
  config: Partial<CliArguments>,
): Promise<Array<string>> => {
  let paths = config.path as unknown as Array<string>;
  if (typeof config.path === 'string') {
    paths = [config.path];
  }

  if (!Array.isArray(paths)) {
    throw new Error(error);
  }

  for (const path of paths) {
    const pathExists = await exists(path);
    if (!pathExists) {
      throw new Error(error);
    }
  }

  return paths;
};
