import { glob } from 'glob';

import { onlyUnique } from './filter-unique';
import { getFileDependencies } from './get-file-dependencies';

export const getPathDependencies = async (
  path: string,
  rootPackageJsonDeps: unknown,
): Promise<Array<string>> => {
  const tsFiles = await glob(`${path}/**/*.{ts,tsx,js,jsx}`);

  const dependenciesNames = (
    await Promise.all(tsFiles.map((f) => getFileDependencies(f)))
  )
    .flat()
    .filter(onlyUnique);

  return Object.entries(rootPackageJsonDeps as never)
    .filter(
      ([name]) =>
        dependenciesNames.includes(name) ||
        dependenciesNames.some((d) => d.startsWith(`${name}/`)),
    )
    .map(([name, version]) => `"${name}": "${version}"`);
};
