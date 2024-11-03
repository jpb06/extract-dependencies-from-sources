import { readFile } from 'fs-extra';

const depsRegex = new RegExp(/(from)? ['"](.*)['"].*$/, 'gm');

export const getFileDependencies = async (file: string): Promise<string[]> => {
  const input = await readFile(file, 'utf8');

  let match: RegExpExecArray | null = null;
  const result: string[] = [];
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  while (null !== (match = depsRegex.exec(input))) {
    const dep = match[2];

    const isPath = dep.startsWith('./') || dep.startsWith('../');
    if (isPath) {
      result.push(dep);
    }
  }

  return result;
};
