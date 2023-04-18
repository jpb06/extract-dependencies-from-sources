import { readFile } from 'fs-extra';

const depsRegex = new RegExp(/^.*from ['"](.*)['"]$/, 'gm');

export const getFileDependencies = async (
  file: string,
): Promise<Array<string>> => {
  const input = await readFile(file, 'utf8');

  let match = null;
  const result = [];
  while (null !== (match = depsRegex.exec(input))) {
    const dep = match[1];
    if (!dep.startsWith('./') && !dep.startsWith('../')) {
      result.push(dep);
    }
  }

  return result;
};
