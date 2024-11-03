import { Effect, pipe } from 'effect';

import type { PackageJson } from '@types';

import { buildYargs } from './build-yargs.js';
import {
  type ExternalDeps,
  validateExternalDeps,
  validatePaths,
  validateRootPackageJson,
} from './options-validation/index.js';

export interface ExtractDependenciesArguments {
  packageJsonData: PackageJson;
  packageJsonPath: string;
  paths: string[];
  externaldeps: ExternalDeps;
}

export const validateArguments = pipe(
  Effect.gen(function* () {
    const args = buildYargs();

    const [packageJson, paths, externaldeps] = yield* Effect.all(
      [
        validateRootPackageJson(args),
        validatePaths(args),
        validateExternalDeps(args.externaldeps),
      ],
      {
        concurrency: 'unbounded',
      },
    );

    return {
      packageJsonData: packageJson.data,
      packageJsonPath: packageJson.path,
      paths,
      externaldeps,
    };
  }),
  Effect.withSpan('validateArguments'),
);
