#!/usr/bin/env node

import { validateArguments } from './args-validation/extract-dependencies-arguments';
import { getCodebasesDependencies } from '../../workflows/get-codebases-dependencies';
import { formatDependencies } from '../../workflows/logic/formatDependencies';
import { updateRootPackageJson } from '../../workflows/logic/update-root-package-json';
import {
  displayDependenciesShrinked,
  displayException,
} from '../console/console.messages';

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
