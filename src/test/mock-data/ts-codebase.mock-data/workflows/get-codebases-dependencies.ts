import { onlyUnique } from './logic/filter-unique';
import { getPathDependencies } from './logic/get-path-dependencies';

export interface CodebasesDependenciesResult {
  dependencies: string[];
}

export const getCodebasesDependencies = async (
  rootPackageJsonDependencies: Record<string, string>,
  paths: string[],
): Promise<CodebasesDependenciesResult> => {
  const pathsDependencies = await Promise.all(
    paths.map((path) => getPathDependencies(path, rootPackageJsonDependencies)),
  );

  const dependencies = pathsDependencies.filter(onlyUnique).flat();

  return { dependencies };
};
