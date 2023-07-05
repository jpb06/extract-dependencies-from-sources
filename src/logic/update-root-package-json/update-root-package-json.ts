import { writeJson } from 'fs-extra';

import { PackageJson } from '../../types/package-json.type';

const removeQuotes = (str: string): string => str.replaceAll('"', '');

export const updateRootPackageJson = async (
  path: string,
  data: PackageJson,
  dependencies: Array<string>,
): Promise<void> => {
  const packageJson = {
    ...data,
    dependencies: {
      ...dependencies.reduce((acc, dep) => {
        const [name, version] = dep.split(': ');

        return {
          ...acc,
          [removeQuotes(name)]: removeQuotes(version),
        };
      }, {}),
    },
  };

  await writeJson(path, packageJson, { spaces: 2 });
};
