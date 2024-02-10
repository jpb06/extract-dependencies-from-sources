export const packageJsonMockData = {
  name: 'extract-dependencies-from-sources',
  description: 'Inferring dependencies from the source code of a monorepo app',
  version: '1.0.5',
  main: 'index.js',
  repository: 'https://github.com/jpb06/extract-dependencies-from-sources.git',
  author: 'jpb06 <jp.bois.06@outlook.fr>',
  bin: {
    extractDeps: './cli/extract-dependencies/extract-dependencies.cli.js',
  },
  keywords: [],
  license: 'MIT',
  dependencies: {
    chalk: '4.1.2',
    'dotenv-flow': '^3.2.0',
    'fs-extra': '^11.1.1',
    glob: '^10.3.0',
    yaml: '^2.3.1',
    yargs: '^17.7.2',
  },
  devDependencies: {
    '@commitlint/cli': '^17.6.5',
    '@commitlint/config-conventional': '^17.6.5',
    '@types/dotenv-flow': '^3.2.0',
    '@types/fs-extra': '11.0.1',
    '@types/node': '^20.3.1',
    '@types/yargs': '^17.0.24',
    '@typescript-eslint/eslint-plugin': '^5.60.0',
    '@typescript-eslint/parser': '^5.60.0',
    '@vitest/coverage-v8': '^0.32.2',
    copyfiles: '^2.4.1',
    'del-cli': '^5.0.0',
    eslint: '^8.43.0',
    'eslint-config-prettier': '^8.8.0',
    'eslint-plugin-import': '^2.27.5',
    'eslint-plugin-jest': '^27.2.2',
    'eslint-plugin-prettier': '^4.2.1',
    prettier: '^2.8.8',
    'readme-package-icons': '^1.1.8',
    typescript: '^5.1.3',
    vitest: '^0.32.2',
  },
  scripts: {
    'copy-package': 'copyfiles package.json ./dist/',
    'copy-readme': 'copyfiles README.md ./dist/',
    build: 'del-cli ./dist && tsc --project tsconfig.prod.json',
    postbuild: 'pnpm copy-package && pnpm copy-readme',
    lint: 'eslint ./src',
    'type-check': 'tsc -p tsconfig.prod.json --noEmit',
    precli: 'pnpm build',
    cli: 'node ./dist/cli/extract-dependencies/extract-dependencies.cli.js --packagejson ./_temp/package.json --path _temp/front --path _temp/ng-back --externaldeps _temp/external-deps.yml',
    'sync-icons': 'pnpm generateReadmeIcons -h 50',
    test: 'vitest',
    'test-dev': 'vitest --coverage',
    'test-coverage': 'vitest run --coverage',
  },
};