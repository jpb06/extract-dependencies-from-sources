import { Effect } from 'effect';

import {
  getCodebasesDependencies as getCodebasesDependenciesEffect,
  updateRootPackageJson,
} from '@logic';
import type { FnSuccess } from '@types';

type CodebasesDependenciesResult = FnSuccess<
  typeof getCodebasesDependenciesEffect
>;

const getCodebasesDependencies = (
  rootPackageJsonDependencies: Record<string, string>,
  paths: string[],
): Promise<CodebasesDependenciesResult> =>
  Effect.runPromise(
    getCodebasesDependenciesEffect(rootPackageJsonDependencies, paths),
  );

export { getCodebasesDependencies, updateRootPackageJson };

export type { CodebasesDependenciesResult };
