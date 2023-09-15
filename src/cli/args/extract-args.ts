import * as Effect from '@effect/io/Effect';

import { buildYargs } from './build-yargs';
import { validateExternalDeps } from './options-validation/external-dependencies';
import { ExternalDeps } from './options-validation/external-dependencies/logic/read-external-dependencies';
import { validatePaths } from './options-validation/paths';
import { validateRootPackageJson } from './options-validation/root-package-json';
import { PackageJson } from '../../types/package-json.type';

export type ExtractDependenciesArguments = {
  packageJsonData: PackageJson;
  packageJsonPath: string;
  paths: Array<string>;
  externaldeps: ExternalDeps;
};

export const validateArguments = Effect.gen(function* (_) {
  const args = buildYargs();

  const [packageJson, paths, externaldeps] = yield* _(
    Effect.all(
      [
        validateRootPackageJson(args),
        validatePaths(args),
        validateExternalDeps(args.externaldeps),
      ],
      {
        concurrency: 'unbounded',
      },
    ),
  );

  return {
    packageJsonData: packageJson.data,
    packageJsonPath: packageJson.path,
    paths,
    externaldeps,
  };
});
