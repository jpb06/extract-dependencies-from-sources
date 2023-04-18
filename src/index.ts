import {
  getCodebasesDependencies,
  CodebasesDependenciesResult,
} from './workflows/get-codebases-dependencies';
import { updateRootPackageJson } from './workflows/logic/update-root-package-json';

export { getCodebasesDependencies, updateRootPackageJson };

export type { CodebasesDependenciesResult };
