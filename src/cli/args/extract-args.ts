import { Effect, pipe } from 'effect';

import { PackageJson } from '../../types/package-json.type';

import { buildYargs } from './build-yargs';
import { validateExternalDeps } from './options-validation/external-dependencies';
import { ExternalDeps } from './options-validation/external-dependencies/logic/read-external-dependencies';
import { validatePaths } from './options-validation/paths';
import { validateRootPackageJson } from './options-validation/root-package-json';

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
