export const tsFileMockData = `
import { readFile } from 'fs-extra';
import { Server } from 'next';
import { Cool } from "react";
import {
  getCodebasesDependencies,
  CodebasesDependenciesResult,
} from './workflows/get-codebases-dependencies';
import { updateRootPackageJson } from './workflows/logic/update-root-package-json';
      
export { getCodebasesDependencies, updateRootPackageJson };
      
export type { CodebasesDependenciesResult };      
`;
