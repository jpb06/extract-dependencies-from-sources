export const formatDependencies = (
  dependencies: Array<Record<string, string>>,
): Array<string> =>
  dependencies.map((dep) =>
    Object.entries(dep)
      .map(([name, version]) => `"${name}": "${version}"`)
      .join(),
  );
