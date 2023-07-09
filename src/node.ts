import * as Effect from '@effect/io/Effect';

import { getCodebasesDependencies as getCodebasesDependenciesEffect } from './logic/codebase-dependencies/get-codebases-dependencies';
import { updateRootPackageJson } from './logic/update-root-package-json/update-root-package-json';
import { FnSuccess } from './types/effect-success.type';

type CodebasesDependenciesResult = FnSuccess<
  typeof getCodebasesDependenciesEffect
>;

const getCodebasesDependencies = (
  rootPackageJsonDependencies: Record<string, string>,
  paths: Array<string>,
): Promise<CodebasesDependenciesResult> =>
  Effect.runPromise(
    getCodebasesDependenciesEffect(rootPackageJsonDependencies, paths),
  );

export { getCodebasesDependencies, updateRootPackageJson };

export type { CodebasesDependenciesResult };
