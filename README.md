# extract-dependencies-from-sources

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://github.dev/jpb06/extract-dependencies-from-sources)
![npm bundle size](https://img.shields.io/bundlephobia/min/extract-dependencies-from-sources)
![Github workflow](https://img.shields.io/github/actions/workflow/status/jpb06/extract-dependencies-from-sources/tests-scan.yml?branch=main&logo=github-actions&label=last%20workflow)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jpb06_extract-dependencies-from-sources&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jpb06_extract-dependencies-from-sources)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_extract-dependencies-from-sources&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=jpb06_extract-dependencies-from-sources)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_extract-dependencies-from-sources&metric=security_rating)](https://sonarcloud.io/dashboard?id=jpb06_extract-dependencies-from-sources)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_extract-dependencies-from-sources&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=jpb06_extract-dependencies-from-sources)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jpb06_extract-dependencies-from-sources&metric=coverage)](https://sonarcloud.io/dashboard?id=jpb06_extract-dependencies-from-sources)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jpb06_extract-dependencies-from-sources&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jpb06_extract-dependencies-from-sources)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jpb06_extract-dependencies-from-sources&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jpb06_extract-dependencies-from-sources)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jpb06_extract-dependencies-from-sources&metric=code_smells)](https://sonarcloud.io/dashboard?id=jpb06_extract-dependencies-from-sources)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=jpb06_extract-dependencies-from-sources&metric=bugs)](https://sonarcloud.io/summary/new_code?id=jpb06_extract-dependencies-from-sources)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jpb06_extract-dependencies-from-sources&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jpb06_extract-dependencies-from-sources)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jpb06_extract-dependencies-from-sources&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=jpb06_extract-dependencies-from-sources)
![Last commit](https://img.shields.io/github/last-commit/jpb06/extract-dependencies-from-sources?logo=git)

Inferring dependencies from the source code of a monorepo app

<!-- readme-package-icons start -->

<p align="left"><a href="https://docs.github.com/en/actions" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/GithubActions-Dark.svg" /></a>&nbsp;<a href="https://www.typescriptlang.org/docs/" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/TypeScript.svg" /></a>&nbsp;<a href="https://nodejs.org/en/docs/" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/NodeJS-Dark.svg" /></a>&nbsp;<a href="https://bun.sh/docs" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Bun-Dark.svg" /></a>&nbsp;<a href="https://biomejs.dev/guides/getting-started/" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Biome-Dark.svg" /></a>&nbsp;<a href="https://github.com/conventional-changelog" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/CommitLint.Dark.svg" /></a>&nbsp;<a href="https://github.com/motdotla/dotenv#readme" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Dotenv-Dark.svg" /></a>&nbsp;<a href="https://vitest.dev/guide/" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Vitest-Dark.svg" /></a>&nbsp;<a href="https://www.effect.website/docs/quickstart" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Effect-Dark.svg" /></a></p>

<!-- readme-package-icons end -->

## ⚡ Quickstart

### 🔶 Install

```bash
yarn add -D extract-dependencies-from-sources
```

```bash
pnpm i -D extract-dependencies-from-sources
```

### 🔶 Usage

#### 🧿 cjs

```bash
extractDeps --packagejson ./package.json --path codebasePath

Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --packagejson   Root package.json path  [required] [default: "./package.json"]
  --path          Codebase path                                       [required]
  --externaldeps  Path to external dependencies file (optional)

Examples:
  extractDeps --packagejson ./package.json --path ./apps/back --path
  ./libs/back

Inferring dependencies from the source code of a monorepo app
```

For example, running the following command will replace the `dependencies` property of the root `package.json` with the dependencies found in the codebases located in `apps/back` and `libs/back/database`.

```bash
yarn extractDeps --path apps/back --path libs/back/database
```

#### 🧿 esm

```bash
extractDepsEsm --packagejson ./package.json --path codebasePath

Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --packagejson   Root package.json path  [required] [default: "./package.json"]
  --path          Codebase path                                       [required]
  --externaldeps  Path to external dependencies file (optional)

Examples:
  extractDeps --packagejson ./package.json --path ./apps/back --path
  ./libs/back

Inferring dependencies from the source code of a monorepo app
```

#### 🧿 node

You can also use the function directly in your code:

```ts
import { getCodebasesDependencies } from 'extract-dependencies-from-sources';
import { readJson } from 'fs-extra';

const data = await readJson('./package.json');
const deps = await getCodebasesDependencies(data.dependencies, [
  'apps/front/auth',
  'lib/front/components',
]);
```

### 🔶 Including external dependencies

You can also specify external dependencies to include in the output by providing a path to a yaml file containing a map of dependencies:

> external-deps.yml

```yaml
externaldeps:
  - msw: ^1.1.0
  - eslint: ~8.36.0
```

You can then use the `--externaldeps` option to include them:

```bash
yarn extractDeps --path apps/front --externaldeps ./external-deps.yml
```
