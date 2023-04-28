import chalk from 'chalk';
import { pathExists, readFile } from 'fs-extra';
import yaml from 'yaml';

export type ExternalDeps = Array<Record<string, string>>;

type ExternalDepsFile = {
  externaldeps: ExternalDeps;
};

export const validateExternalDeps = async (
  maybePath: string | undefined,
): Promise<ExternalDeps> => {
  if (!maybePath) {
    return [];
  }

  const configFileExists = await pathExists(maybePath);
  if (!configFileExists) {
    throw new Error(
      chalk.bold.redBright(
        `\n--externaldeps\tExternal dependencies file ${maybePath} doesn't exist\n`,
      ),
    );
  }

  const configData = await readFile(maybePath, { encoding: 'utf8' });
  const config = yaml.parse(configData) as Partial<ExternalDepsFile>;

  return config.externaldeps ?? [];
};
