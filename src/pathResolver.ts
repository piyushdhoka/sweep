import path from 'path';
import fs from 'fs';
import { MonorepoConfig, findPackageForFile, resolveWorkspaceImport } from './monorepo';

interface PathAlias {
  alias: string;
  path: string;
}

/**
 * Resolve TypeScript/JavaScript path aliases from tsconfig.json or jsconfig.json
 */
export function resolvePathAliases(projectRoot: string): Map<string, string> {
  const aliasMap = new Map<string, string>();
  
  // Try to read tsconfig.json first, then jsconfig.json
  const configFiles = ['tsconfig.json', 'jsconfig.json'];
  
  for (const configFile of configFiles) {
    const configPath = path.join(projectRoot, configFile);
    if (!fs.existsSync(configPath)) {
      continue;
    }
    
    try {
      const configContent = fs.readFileSync(configPath, 'utf8');
      // Simple JSON parsing (ignoring comments for now)
      const config = JSON.parse(configContent.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*/g, ''));
      
      if (config.compilerOptions?.paths) {
        const baseUrl = config.compilerOptions.baseUrl || '.';
        const baseUrlResolved = path.resolve(projectRoot, baseUrl);
        
        for (const [alias, targets] of Object.entries(config.compilerOptions.paths)) {
          if (Array.isArray(targets) && targets.length > 0) {
            // Remove the /* suffix from alias and target
            const cleanAlias = alias.replace(/\/\*$/, '');
            const cleanTarget = (targets[0] as string).replace(/\/\*$/, '');
            const resolvedPath = path.resolve(baseUrlResolved, cleanTarget);
            aliasMap.set(cleanAlias, resolvedPath);
          }
        }
      }
      
      break; // Stop after first valid config file
    } catch (err) {
      // Continue to next config file
    }
  }
  
  return aliasMap;
}

/**
 * Resolve an import path that might contain an alias
 */
export function resolveImportPath(importPath: string, aliasMap: Map<string, string>): string {
  // Check if import starts with any alias
  for (const [alias, resolvedPath] of aliasMap.entries()) {
    if (importPath === alias || importPath.startsWith(alias + '/')) {
      const remainder = importPath.substring(alias.length);
      return resolvedPath + remainder;
    }
  }
  
  return importPath;
}

/**
 * Check if an import is a relative/absolute path (not a node_modules package)
 */
export function isLocalImport(importPath: string): boolean {
  return importPath.startsWith('.') || importPath.startsWith('/') || importPath.startsWith('@/');
}

/**
 * Resolve the full file path for an import statement
 */
export function resolveFullImportPath(
  importPath: string,
  currentFilePath: string,
  projectRoot: string,
  aliasMap: Map<string, string>,
  monorepoConfig?: MonorepoConfig
): string | null {
  // Check if it's a workspace import in a monorepo
  if (monorepoConfig && monorepoConfig.type !== 'none') {
    const currentPackage = findPackageForFile(currentFilePath, monorepoConfig);
    const workspaceResolved = resolveWorkspaceImport(importPath, currentPackage, monorepoConfig);
    if (workspaceResolved) {
      return workspaceResolved;
    }
  }
  
  // If it's a package import (not local), return null
  if (!isLocalImport(importPath) && !aliasMap.has(importPath.split('/')[0])) {
    return null;
  }
  
  // Resolve alias if present
  const resolvedImport = resolveImportPath(importPath, aliasMap);
  
  // If it's a relative import, resolve from current file
  let fullPath: string;
  if (resolvedImport.startsWith('.')) {
    const currentDir = path.dirname(currentFilePath);
    fullPath = path.resolve(currentDir, resolvedImport);
  } else if (resolvedImport.startsWith('/')) {
    fullPath = resolvedImport;
  } else {
    fullPath = path.resolve(projectRoot, resolvedImport);
  }
  
  // Try to resolve with common extensions
  const extensions = ['.ts', '.tsx', '.js', '.jsx', ''];
  for (const ext of extensions) {
    const testPath = fullPath + ext;
    if (fs.existsSync(testPath) && fs.statSync(testPath).isFile()) {
      return testPath;
    }
  }
  
  // Try index files
  for (const ext of ['.ts', '.tsx', '.js', '.jsx']) {
    const indexPath = path.join(fullPath, `index${ext}`);
    if (fs.existsSync(indexPath)) {
      return indexPath;
    }
  }
  
  return null;
}
