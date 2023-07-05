import { glob } from 'glob';

import { onlyUnique } from './filter-unique';
import { getFileDependencies } from './get-file-dependencies';
import { PackageJson } from '../../cli/extract-dependencies/args-validation/options-validation/validate-root-package-json';

export const getPathDependencies = async (
  path: string,
  rootPackageJsonDeps: PackageJson['dependencies'],
): Promise<Array<string>> => {
  const tsFiles = await glob(`${path}/**/*.{ts,tsx,js,jsx}`);

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
