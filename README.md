<div align="center">
  <div>
    <h1 align="center">sweep</h1>
<img width="2816" height="1536" alt="lazycommit" <img width="1024" height="419" alt="ChatGPT Image Nov 16, 2025, 12_27_49 AM" src="https://github.com/user-attachments/assets/93910730-d7f8-455f-9f01-18afe42712be" />

</div>	 
	
<p>Fast zero-config CLI to list and clean unused JS/TS imports.</p>	
<a href="https://www.npmjs.com/package/sweepp"><img src="https://img.shields.io/npm/v/sweepp" alt="Current version"></a>
	<a href="https://github.com/piyushdhoka/sweep"><img src="https://img.shields.io/github/stars/piyushdhoka/sweep" alt="GitHub stars"></a>
	<a href="https://github.com/piyushdhoka/sweep/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/sweepp" alt="License"></a>
</div>


## Why?
Large JavaScript/TypeScript codebases accumulate **dead imports** after refactors:
- Reduce readability
- Add bundle bloat
- Slow IDE features
- Cause noisy warnings

**sweepp** gives you a single lightweight command instead of heavy lint setups.

## Features (minimal)
- Zero config – run instantly
- List unused import specifiers (TS/JS/JSX/TSX)
- Safe clean mode removes them
- Structured table output for easy viewing
- Fast AST parsing (Babel; SWC planned)
- Keeps side-effect imports (`import 'polyfill';`)
- Support for path aliases (`@/components`, `src/...`)
- Optionally check if local imports exist in project
- **Monorepo support** (pnpm workspaces, npm/yarn workspaces, Turborepo)

## Install
```bash
npm install -g sweepp
# or
npm install --save-dev sweepp
```

## Usage
Global commands: `sweepp` or `swp` (shorthand)
```bash
# List unused imports (default)
sweepp .
# or use the shorthand
swp .

# Explicit list subcommand (same as default)
sweepp list .
swp list .

# List with local import checking (removes imports from non-existent files)
sweepp list . --check-local
swp list . --check-local

# Clean unused imports (modifies files)
sweepp clean .
swp clean .

# Clean with local import checking
sweepp clean . --check-local
swp clean . --check-local

# Set extensions / ignores
sweepp list . --ext ts,tsx,js --ignore dist,build
swp list . --ext ts,tsx,js --ignore dist,build

# Show version
sweepp version
swp version
```

## Options
- `--ext <list>` - Comma-separated file extensions (default: `ts,tsx,js,jsx`)
- `--ignore <list>` - Comma-separated ignore patterns (default: `node_modules`)
- `--check-local` - Check if local imports exist in project (supports `@/` and path aliases from tsconfig.json/jsconfig.json)

## Example Output (list)
```
Unused Imports Report

File           Count  Unused Imports
────────────────────────────────────────────────────────────────────
src\math.ts    3      useState, useEffect, readFileSync
src\App.tsx    2      Component, useRef
────────────────────────────────────────────────────────────────────

Summary: 2 file(s) with 5 unused import(s)
```

## Example Output (clean)
```
✔ src/utils/math.ts removed: unusedAdd, unusedSub
✔ src/components/App.tsx removed: UnusedComponent

Clean Summary
Files changed: 2
Total specifiers removed: 3
```

## Path Alias Support
sweepp automatically reads `tsconfig.json` or `jsconfig.json` to resolve path aliases when using `--check-local`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

With this config, imports like `import { Button } from '@/components/Button'` will be correctly resolved and checked for existence.

## Monorepo Support
sweepp automatically detects monorepo configurations and resolves workspace imports:

**Supported monorepo types:**
- **pnpm workspaces** - Detected via `pnpm-workspace.yaml`
- **npm/yarn workspaces** - Detected via `workspaces` field in `package.json`
- **Turborepo** - Detected via `turbo.json` (uses underlying workspace config)

**Example pnpm-workspace.yaml:**
```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

**Example package.json workspaces:**
```json
{
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
}
```

When sweepp runs in a monorepo, it will:
- Automatically detect all workspace packages
- Resolve workspace imports like `@myorg/utils` to actual file paths
- Support `workspace:*` protocol in dependencies
- Show monorepo info in output (e.g., "Detected pnpm monorepo with 5 package(s)")

**Example output:**
```
Detected pnpm monorepo with 3 package(s)

Unused Imports Report
...
```

## Exit Codes
- `0` – success
- `1` – unexpected internal error

## Programmatic Use
```ts
import { analyzeAndClean } from 'sweepp/dist/analyzer';
// Dry-run (true) lists removals without writing.
const result = await analyzeAndClean('src/file.ts', true);
console.log(result.removed);
```

## Notes & Limitations
- Dynamic access patterns may evade detection
- Type-only imports counted if referenced
- Side-effect imports preserved
- Babel parser first; SWC migration planned

## Roadmap
- SWC for performance
- Remove unused exports / variables
- Config file support
- VS Code extension
- Git diff only mode
- Parallel processing
- Cache / incremental mode

## License
This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details
