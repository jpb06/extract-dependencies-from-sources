import chalk from 'chalk';
import { exists } from 'fs-extra';

import { CliArguments } from '../extract-dependencies-arguments';

const error = chalk.bold.redBright(
  `Invalid type for 'paths' option: expecting an array of existing paths.\n`,
);

export const validatePaths = async (
  config: Partial<CliArguments>,
): Promise<Array<string>> => {
  if (!Array.isArray(config.path)) {
    throw new Error(error);
  }

  for (const path of config.path) {
    const pathExists = await exists(path);
    if (!pathExists) {
      throw new Error(error);
    }
  }

  return config.path;
};
