import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { resolvePathAliases, resolveFullImportPath, isLocalImport } from './pathResolver';
import { MonorepoConfig } from './monorepo';

export interface RemovedImportInfo {
  source: string;
  specifiers: string[]; // names removed
}

export interface ImportCleanupResult {
  filePath: string;
  removed: RemovedImportInfo[];
  originalImportDecls: number; // number of import declarations before
  finalImportDecls: number;    // number of import declarations after
  changed: boolean;
  totalRemovedSpecifiers: number;
  newCode?: string;
}

export interface AnalyzeOptions {
  checkLocalImports?: boolean; // Check if local imports exist in project
  projectRoot?: string; // Root directory for resolving paths
  monorepoConfig?: MonorepoConfig; // Monorepo configuration
}

function isTypeOnlySpecifier(spec: t.ImportSpecifier): boolean {
  // Babel marks type-only specifiers via importKind on declaration or spec.importKind
  return spec.importKind === 'type';
}

function collectUsedIdentifiers(ast: t.File): Set<string> {
  const used = new Set<string>();
  
  // Collect used identifiers, skipping import declarations entirely
  traverse(ast, {
    Identifier(path) {
      // Skip if we're inside an ImportDeclaration
      if (path.findParent(p => p.isImportDeclaration())) {
        return;
      }
      
      // Skip if this identifier is the left-hand side of a variable declaration
      // (i.e., the variable being declared, not being used)
      const parent = path.parent;
      if (t.isVariableDeclarator(parent) && parent.id === path.node) {
        return;
      }
      
      // Skip function parameter names, but allow usage within function bodies
      if (t.isFunctionDeclaration(parent) || t.isFunctionExpression(parent) || t.isArrowFunctionExpression(parent)) {
        if (parent.params.includes(path.node as any)) {
          return;
        }
      }
      
      used.add(path.node.name);
    },
    TSTypeReference(path) {
      if (t.isIdentifier(path.node.typeName)) {
        used.add(path.node.typeName.name);
      }
    }
  });
  return used;
}

export async function analyzeAndClean(
  filePath: string, 
  dryRun: boolean, 
  options: AnalyzeOptions = {}
): Promise<ImportCleanupResult> {
  const code = await fs.readFile(filePath, 'utf8');
  let ast: t.File;
  try {
    ast = parse(code, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx']
    });
  } catch (err) {
    return {
      filePath,
      removed: [],
      originalImportDecls: 0,
      finalImportDecls: 0,
      changed: false,
      totalRemovedSpecifiers: 0
    };
  }

  const used = collectUsedIdentifiers(ast);
  const removed: RemovedImportInfo[] = [];
  let originalImportDecls = 0;
  
  // Resolve path aliases if checking local imports
  const aliasMap = options.checkLocalImports && options.projectRoot 
    ? resolvePathAliases(options.projectRoot)
    : new Map<string, string>();

  traverse(ast, {
    ImportDeclaration(path) {
      originalImportDecls++;
      const decl = path.node;
      const importSource = decl.source.value;
      
      // Check if local import exists in project
      if (options.checkLocalImports && options.projectRoot) {
        const isLocal = isLocalImport(importSource) || aliasMap.has(importSource.split('/')[0]);
        if (isLocal) {
          const resolvedPath = resolveFullImportPath(importSource, filePath, options.projectRoot, aliasMap, options.monorepoConfig);
          if (!resolvedPath || !fsSync.existsSync(resolvedPath)) {
            // The imported file doesn't exist, mark all specifiers as removable
            if (decl.specifiers.length > 0) {
              const allSpecifierNames = decl.specifiers.map(spec => spec.local.name);
              removed.push({ source: importSource, specifiers: allSpecifierNames });
              path.remove();
              return;
            }
          }
        }
      }
      
      if (decl.specifiers.length === 0) {
        // Side-effect import like import 'foo'; keep it.
        return;
      }

      const remaining: Array<t.ImportSpecifier | t.ImportDefaultSpecifier | t.ImportNamespaceSpecifier> = [];
      const removedNames: string[] = [];

      decl.specifiers.forEach((spec: t.ImportSpecifier | t.ImportDefaultSpecifier | t.ImportNamespaceSpecifier) => {
        if (t.isImportSpecifier(spec)) {
          const localName = spec.local.name;
          const isTypeOnly = isTypeOnlySpecifier(spec);
          const isUsed = used.has(localName);
          if (!isUsed) {
            removedNames.push(localName);
          } else {
            remaining.push(spec);
          }
        } else if (t.isImportDefaultSpecifier(spec)) {
          const localName = spec.local.name;
          if (!used.has(localName)) {
            removedNames.push(localName);
          } else {
            remaining.push(spec);
          }
        } else if (t.isImportNamespaceSpecifier(spec)) {
          const localName = spec.local.name;
          if (!used.has(localName)) {
            removedNames.push(localName);
          } else {
            remaining.push(spec);
          }
        }
      });

      if (removedNames.length > 0) {
        removed.push({ source: decl.source.value, specifiers: removedNames });
      }

      if (remaining.length === 0) {
        // Remove entire declaration
        if (removedNames.length === decl.specifiers.length) {
          path.remove();
        } else {
          // Rare edge case fallback
          decl.specifiers = [] as any;
        }
      } else {
        // Filter specifiers
        decl.specifiers = remaining as any;
      }
    }
  });

  // Re-count remaining import declarations for accuracy
  let finalImportDecls = 0;
  traverse(ast, {
    ImportDeclaration() { finalImportDecls++; }
  });
  const changed = removed.some(r => r.specifiers.length > 0);
  let newCode: string | undefined;
  if (changed) {
    newCode = generate(ast, { retainLines: true, comments: true }).code;
    if (!dryRun && newCode !== undefined) {
      await fs.writeFile(filePath, newCode, 'utf8');
    }
  }

  const totalRemovedSpecifiers = removed.reduce((a, r) => a + r.specifiers.length, 0);
  return { filePath, removed, originalImportDecls, finalImportDecls, changed, totalRemovedSpecifiers, newCode };
}
