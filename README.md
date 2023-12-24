# extract-dependencies-from-sources

Inferring dependencies from the source code of a monorepo app

<!-- readme-package-icons start -->

<p align="left"><a href="https://docs.github.com/en/actions" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/GithubActions-Dark.svg" /></a>&nbsp;<a href="https://www.typescriptlang.org/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/TypeScript.svg" /></a>&nbsp;<a href="https://nodejs.org/en/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/NodeJS-Dark.svg" /></a>&nbsp;<a href="https://pnpm.io/motivation" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Pnpm-Dark.svg" /></a>&nbsp;<a href="https://github.com/conventional-changelog" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/CommitLint.Dark.svg" /></a>&nbsp;<a href="https://github.com/motdotla/dotenv#readme" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Dotenv-Dark.svg" /></a>&nbsp;<a href="https://eslint.org/docs/latest/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Eslint-Dark.svg" /></a>&nbsp;<a href="https://prettier.io/docs/en/index.html" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Prettier-Dark.svg" /></a>&nbsp;<a href="https://vitest.dev/guide/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Vitest-Dark.svg" /></a>&nbsp;<a href="https://www.effect.website/docs/quickstart" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Effect-Dark.svg" /></a></p>

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

You can also use the function directly in your code:

```ts
import { getCodebasesDependencies } from 'extract-dependencies-from-sources';
import { readJson } from 'fs-extra';

(async () => {
  const data = await readJson('./package.json');
  const deps = await getCodebasesDependencies(data.dependencies, [
    'apps/front/auth',
    'lib/front/components',
  ]);
})();
```

#### 🧿 Including external dependencies

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
