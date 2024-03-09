import { readFile } from 'fs-extra';

const depsRegex = new RegExp(/(from)? ['"](.*)['"].*$/, 'gm');

export const getFileDependencies = async (file: string): Promise<string[]> => {
  const input = await readFile(file, 'utf8');

  let match: RegExpExecArray | null = null;
  const result: string[] = [];
  while (null !== (match = depsRegex.exec(input))) {
    const dep = match[2];

    if (!dep.startsWith('./') && !dep.startsWith('../')) {
      result.push(dep);
    }
  }

  return result;
};
