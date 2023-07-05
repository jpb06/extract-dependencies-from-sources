import {
  getCodebasesDependencies,
  CodebasesDependenciesResult,
} from './logic/codebase-dependencies/get-codebases-dependencies';
import { updateRootPackageJson } from './logic/update-root-package-json/update-root-package-json';

export { getCodebasesDependencies, updateRootPackageJson };

export type { CodebasesDependenciesResult };
