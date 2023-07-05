import { onlyUnique } from './only-unique/filter-unique';
import { getPathDependencies } from './path/get-path-dependencies';

export type CodebasesDependenciesResult = {
  dependencies: Array<string>;
};

export const getCodebasesDependencies = async (
  rootPackageJsonDependencies: Record<string, string>,
  paths: Array<string>,
): Promise<CodebasesDependenciesResult> => {
  const pathsDependencies = await Promise.all(
    paths.map((path) => getPathDependencies(path, rootPackageJsonDependencies)),
  );

  const dependencies = pathsDependencies.filter(onlyUnique).flat();

  return { dependencies };
};
