#!/usr/bin/env node

import { validateArguments } from './args/extract-args';
import {
  displayDependenciesShrinked,
  displayException,
} from './console/console.messages';
import { getCodebasesDependencies } from '../logic/codebase-dependencies/get-codebases-dependencies';
import { formatDependencies } from '../logic/format-dependencies/format-dependencies';
import { updateRootPackageJson } from '../logic/update-root-package-json/update-root-package-json';

/* istanbul ignore file */

(async (): Promise<void> => {
  try {
    const { packageJsonData, packageJsonPath, paths, externaldeps } =
      await validateArguments();
    const { dependencies } = await getCodebasesDependencies(
      packageJsonData.dependencies,
      paths,
    );

    await updateRootPackageJson(packageJsonPath, packageJsonData, [
      ...formatDependencies(externaldeps),
      ...dependencies,
    ]);

    displayDependenciesShrinked();
    process.exit(0);
  } catch (err) {
    displayException(err);
    process.exit(1);
  }
})();
