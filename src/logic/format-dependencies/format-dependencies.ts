export const formatDependencies = (
  dependencies: Record<string, string>[],
): string[] =>
  dependencies.map((dep) =>
    Object.entries(dep)
      .map(([name, version]) => `"${name}": "${version}"`)
      .join(),
  );
