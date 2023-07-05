import { glob } from 'glob';

import { getFileDependencies } from './file/get-file-dependencies';
import { PackageJson } from '../../../types/package-json.type';
import { onlyUnique } from '../only-unique/filter-unique';

export const getPathDependencies = async (
  path: string,
  rootPackageJsonDeps: PackageJson['dependencies'],
): Promise<Array<string>> => {
  const tsFiles = await glob(`${path}/**/*.{ts,tsx}`);

  const dependenciesNames = (
    await Promise.all(tsFiles.map((f) => getFileDependencies(f)))
  )
    .flat()
    .filter(onlyUnique);

  return Object.entries(rootPackageJsonDeps)
    .filter(
      ([name]) =>
        dependenciesNames.includes(name) ||
        dependenciesNames.some((d) => d.startsWith(`${name}/`)),
    )
    .map(([name, version]) => `"${name}": "${version}"`);
};
