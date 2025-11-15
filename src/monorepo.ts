import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

export interface WorkspacePackage {
  name: string;
  path: string;
  packageJson?: any;
}

export interface MonorepoConfig {
  type: 'pnpm' | 'npm' | 'yarn' | 'turborepo' | 'none';
  root: string;
  packages: WorkspacePackage[];
}

/**
 * Detect if the current directory is a monorepo and what type
 */
export function detectMonorepo(rootDir: string): MonorepoConfig {
  const config: MonorepoConfig = {
    type: 'none',
    root: rootDir,
    packages: []
  };

  // Check for pnpm workspace
  const pnpmWorkspacePath = path.join(rootDir, 'pnpm-workspace.yaml');
  if (fs.existsSync(pnpmWorkspacePath)) {
    config.type = 'pnpm';
    config.packages = getPnpmWorkspacePackages(rootDir, pnpmWorkspacePath);
    return config;
  }

  // Check for turbo.json (turborepo)
  const turboJsonPath = path.join(rootDir, 'turbo.json');
  if (fs.existsSync(turboJsonPath)) {
    config.type = 'turborepo';
    // Turborepo can use any package manager, check root package.json for workspaces
    config.packages = getPackageJsonWorkspaces(rootDir);
    return config;
  }

  // Check for package.json workspaces (npm/yarn)
  const packageJsonPath = path.join(rootDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (packageJson.workspaces) {
        config.type = Array.isArray(packageJson.workspaces) ? 'npm' : 'yarn';
        config.packages = getPackageJsonWorkspaces(rootDir);
        return config;
      }
    } catch (err) {
      // Not a valid package.json or no workspaces
    }
  }

  return config;
}

/**
 * Parse pnpm-workspace.yaml and find all packages
 */
function getPnpmWorkspacePackages(rootDir: string, workspacePath: string): WorkspacePackage[] {
  try {
    const content = fs.readFileSync(workspacePath, 'utf8');
    const config = yaml.parse(content);
    
    if (!config.packages || !Array.isArray(config.packages)) {
      return [];
    }

    return expandWorkspaceGlobs(rootDir, config.packages);
  } catch (err) {
    console.error('Error parsing pnpm-workspace.yaml:', err);
    return [];
  }
}

/**
 * Parse package.json workspaces (npm/yarn/turborepo)
 */
function getPackageJsonWorkspaces(rootDir: string): WorkspacePackage[] {
  const packageJsonPath = path.join(rootDir, 'package.json');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    let workspacePatterns: string[] = [];

    if (Array.isArray(packageJson.workspaces)) {
      workspacePatterns = packageJson.workspaces;
    } else if (packageJson.workspaces?.packages) {
      workspacePatterns = packageJson.workspaces.packages;
    } else {
      return [];
    }

    return expandWorkspaceGlobs(rootDir, workspacePatterns);
  } catch (err) {
    return [];
  }
}

/**
 * Expand glob patterns to actual package directories
 */
function expandWorkspaceGlobs(rootDir: string, patterns: string[]): WorkspacePackage[] {
  const packages: WorkspacePackage[] = [];
  
  for (const pattern of patterns) {
    // Handle negation patterns
    if (pattern.startsWith('!')) {
      continue;
    }

    // Simple glob expansion for common patterns like "packages/*" or "apps/*"
    if (pattern.includes('*')) {
      const parts = pattern.split('/');
      const baseDir = parts[0];
      const basePath = path.join(rootDir, baseDir);

      if (fs.existsSync(basePath) && fs.statSync(basePath).isDirectory()) {
        const entries = fs.readdirSync(basePath);
        
        for (const entry of entries) {
          const entryPath = path.join(basePath, entry);
          const packageJsonPath = path.join(entryPath, 'package.json');
          
          if (fs.existsSync(packageJsonPath) && fs.statSync(entryPath).isDirectory()) {
            try {
              const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
              packages.push({
                name: packageJson.name || entry,
                path: entryPath,
                packageJson
              });
            } catch (err) {
              // Invalid package.json, skip
            }
          }
        }
      }
    } else {
      // Direct path
      const packagePath = path.join(rootDir, pattern);
      const packageJsonPath = path.join(packagePath, 'package.json');
      
      if (fs.existsSync(packageJsonPath)) {
        try {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          packages.push({
            name: packageJson.name || pattern,
            path: packagePath,
            packageJson
          });
        } catch (err) {
          // Invalid package.json, skip
        }
      }
    }
  }

  return packages;
}

/**
 * Check if a path is within any workspace package
 */
export function findPackageForFile(filePath: string, monorepoConfig: MonorepoConfig): WorkspacePackage | null {
  const normalizedFilePath = path.normalize(filePath);
  
  for (const pkg of monorepoConfig.packages) {
    const normalizedPkgPath = path.normalize(pkg.path);
    if (normalizedFilePath.startsWith(normalizedPkgPath)) {
      return pkg;
    }
  }
  
  return null;
}

/**
 * Resolve imports within monorepo (workspace protocol)
 */
export function resolveWorkspaceImport(
  importPath: string,
  currentPackage: WorkspacePackage | null,
  monorepoConfig: MonorepoConfig
): string | null {
  // Handle workspace protocol: workspace:* or workspace:^version
  if (importPath.startsWith('workspace:')) {
    return null; // Workspace protocol references, not file paths
  }

  // Check if import is a package name that exists in the workspace
  for (const pkg of monorepoConfig.packages) {
    if (pkg.packageJson && pkg.packageJson.name === importPath) {
      // Found workspace package - resolve to its main entry or index
      const pkgMain = pkg.packageJson.main || pkg.packageJson.module || 'index.js';
      return path.join(pkg.path, pkgMain);
    }
    
    // Handle scoped imports like '@myorg/package/subpath'
    if (importPath.startsWith(pkg.packageJson?.name + '/')) {
      const subpath = importPath.substring(pkg.packageJson.name.length + 1);
      return path.join(pkg.path, subpath);
    }
  }

  return null;
}
