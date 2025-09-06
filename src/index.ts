import { NodeFileSystem } from '@effect/platform-node';
import { Effect, pipe } from 'effect';

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
): Promise<CodebasesDependenciesResult> => {
  const task = pipe(
    getCodebasesDependenciesEffect(rootPackageJsonDependencies, paths),
    Effect.provide(NodeFileSystem.layer),
  );

  return Effect.runPromise(task);
};

export { getCodebasesDependencies, updateRootPackageJson };

export type { CodebasesDependenciesResult };
