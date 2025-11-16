#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import path from 'path';
import { analyzeAndClean, ImportCleanupResult } from './analyzer';
import { discoverFiles } from './fileUtils';
import { detectMonorepo, MonorepoConfig } from './monorepo';

interface ListItem { file: string; specifiers: string[]; }
interface CleanSummary { filesChanged: number; totalSpecifiersRemoved: number; }

async function listUnusedImports(target: string, extensions: string[], ignore: string[], checkLocal: boolean, monorepoConfig: MonorepoConfig): Promise<ListItem[]> {
  const files = await discoverFiles(target, { root: process.cwd(), extensions, ignore });
  const projectRoot = process.cwd();
  const items: ListItem[] = [];
  for (const file of files) {
    const result: ImportCleanupResult = await analyzeAndClean(file, true, {
      checkLocalImports: checkLocal,
      projectRoot,
      monorepoConfig
    });
    if (result.changed) {
      const flat = result.removed.flatMap(r => r.specifiers);
      items.push({ file, specifiers: flat });
    }
  }
  return items;
}

async function cleanUnusedImports(target: string, extensions: string[], ignore: string[], checkLocal: boolean, monorepoConfig: MonorepoConfig): Promise<CleanSummary> {
  const files = await discoverFiles(target, { root: process.cwd(), extensions, ignore });
  const projectRoot = process.cwd();
  let filesChanged = 0;
  let totalRemoved = 0;
  for (const file of files) {
    const result: ImportCleanupResult = await analyzeAndClean(file, false, {
      checkLocalImports: checkLocal,
      projectRoot,
      monorepoConfig
    });
    if (result.changed) {
      filesChanged++;
      const flat = result.removed.flatMap(r => r.specifiers);
      totalRemoved += flat.length;
      console.log(chalk.green(`✔ ${path.relative(process.cwd(), file)} removed: ${flat.join(', ')}`));
    }
  }
  return { filesChanged, totalSpecifiersRemoved: totalRemoved };
}

async function run() {
  const program = new Command();
  program.name('sweepp').description('List or clean unused JS/TS imports').version('1.0.0');

  const common = (cmd: Command) => cmd
    .option('--ext <list>', 'Comma separated extensions', 'ts,tsx,js,jsx')
    .option('--ignore <list>', 'Comma separated ignore globs', 'node_modules')
    .option('--check-local', 'Check if local imports exist in project (supports @/ and path aliases)', false);

  common(program.command('list [target]').description('List unused import specifiers').action(async (target = '.', opts) => {
    const extensions = opts.ext.split(',').map((s: string) => s.trim()).filter(Boolean);
    const ignore = opts.ignore.split(',').map((s: string) => s.trim()).filter(Boolean);
    const checkLocal = opts.checkLocal || false;
    
    // Detect monorepo
    const monorepoConfig = detectMonorepo(process.cwd());
    if (monorepoConfig.type !== 'none') {
      console.log(chalk.gray(`Detected ${monorepoConfig.type} monorepo with ${monorepoConfig.packages.length} package(s)\n`));
    }
    
    const items = await listUnusedImports(target, extensions, ignore, checkLocal, monorepoConfig);
    if (items.length === 0) {
      console.log(chalk.green('No unused imports found.'));
      return;
    }
    
    console.log(chalk.bold.cyan('\nUnused Imports Report\n'));
    
    // Calculate column widths
    const maxFileLength = Math.max(...items.map(it => path.relative(process.cwd(), it.file).length), 'File'.length);
    const maxCountLength = Math.max(...items.map(it => it.specifiers.length.toString().length), 'Count'.length);
    
    // Print table header
    const fileHeader = 'File'.padEnd(maxFileLength);
    const countHeader = 'Count'.padEnd(maxCountLength);
    const specsHeader = 'Unused Imports';
    console.log(chalk.bold.white(`${fileHeader}  ${countHeader}  ${specsHeader}`));
    console.log(chalk.gray('─'.repeat(maxFileLength + maxCountLength + 50)));
    
    // Print table rows
    for (const it of items) {
      const fileName = path.relative(process.cwd(), it.file).padEnd(maxFileLength);
      const count = it.specifiers.length.toString().padEnd(maxCountLength);
      const specs = it.specifiers.join(', ');
      console.log(`${chalk.yellow(fileName)}  ${chalk.cyan(count)}  ${chalk.gray(specs)}`);
    }
    
    // Print summary
    const totalSpecifiers = items.reduce((a, b) => a + b.specifiers.length, 0);
    console.log(chalk.gray('─'.repeat(maxFileLength + maxCountLength + 50)));
    console.log(chalk.bold(`\nSummary: ${chalk.yellow(items.length)} file(s) with ${chalk.cyan(totalSpecifiers)} unused import(s)\n`));
  }));

  common(program.command('clean [target]').description('Remove unused imports and show summary').action(async (target = '.', opts) => {
    const extensions = opts.ext.split(',').map((s: string) => s.trim()).filter(Boolean);
    const ignore = opts.ignore.split(',').map((s: string) => s.trim()).filter(Boolean);
    const checkLocal = opts.checkLocal || false;
    
    // Detect monorepo
    const monorepoConfig = detectMonorepo(process.cwd());
    if (monorepoConfig.type !== 'none') {
      console.log(chalk.gray(`Detected ${monorepoConfig.type} monorepo with ${monorepoConfig.packages.length} package(s)\n`));
    }
    
    const summary = await cleanUnusedImports(target, extensions, ignore, checkLocal, monorepoConfig);
    console.log('\n' + chalk.bold('Clean Summary'));
    console.log(`Files changed: ${summary.filesChanged}`);
    console.log(`Total specifiers removed: ${summary.totalSpecifiersRemoved}`);
  }));

  program.command('version').description('Show version').action(() => console.log(program.version()));

  // default to list if no subcommand or if first arg looks like a path/target
  if (process.argv.length <= 2) {
    process.argv.push('list');
  } else if (process.argv.length === 3 && !['list', 'clean', 'version'].includes(process.argv[2])) {
    // If single argument and it's not a known command, treat it as "list <target>"
    process.argv.splice(2, 0, 'list');
  }
  
  program.parseAsync(process.argv).catch(err => {
    console.error(chalk.red('Unexpected error:'), err);
    process.exit(1);
  });
}

run();
