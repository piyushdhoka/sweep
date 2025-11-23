<div align="center">
  <div>
    <h1 align="center">sweep</h1>
<img width="2816" height="1536" alt="lazycommit" <img width="1024" height="419" alt="ChatGPT Image Nov 16, 2025, 12_27_49 AM" src="https://github.com/user-attachments/assets/93910730-d7f8-455f-9f01-18afe42712be" />

</div>	 
	
<p>Fast zero-config CLI to list & clean unused JS/TS imports and detect unused code.</p>
<a href="https://www.npmjs.com/package/sweepp"><img src="https://img.shields.io/npm/v/sweepp" alt="Current version"></a>
	<a href="https://github.com/piyushdhoka/sweep"><img src="https://img.shields.io/github/stars/piyushdhoka/sweep" alt="GitHub stars"></a>
	<a href="https://github.com/piyushdhoka/sweep/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/sweepp" alt="License"></a>
</div>

  ---

  ## Setup

  > The minimum supported version of Node.js is v18. Check your Node.js version with `node --version`.

  1. Install sweepp:

    ```sh
    npm install -g sweepp
    # or
    npm install --save-dev sweepp
    ```

  ### Install via Homebrew (macOS/Linux)

  Install via Homebrew tap:

  ```sh
  brew tap piyushdhoka/sweep
  brew install sweepp
  ```

  Upgrade:

  ```sh
  brew update
  brew upgrade sweepp
  ```

  2. (Optional) Configure path aliases or monorepo settings in your `tsconfig.json`/`jsconfig.json` for best results.

  ### Upgrading

  Check the installed version with:

  ```
  sweepp --version
  ```

  If it's not the latest version, run:

  ```sh
  npm update -g sweepp
  ```

  ## Usage

  ### CLI mode

  List unused imports and code:

  ```sh
  sweepp list .
  ```

  Clean unused imports:

  ```sh
  sweepp clean
  ```

  Detect unused code:

  ```sh
  sweepp unuse
  ```

  You can use options with list/clean/unuse:

  ```sh
  sweepp list . --ext ts,tsx,js --ignore dist,build
  ```

  #### Options

  - `--ext <list>`: Comma-separated file extensions (default: `ts,tsx,js,jsx`)
  - `--ignore <list>`: Comma-separated ignore patterns (default: `node_modules`)
  - `--check-local`: Check if local imports exist in project (supports path aliases)

  #### Short commands

  You can use these aliases:

  - `swp`
  - `list`
  - `clean`
  - `unuse`
  - `version`

  ## Example Output

  ```
  Unused Imports Report

  File           Count  Unused Imports
  ─────────────────────────────────────────────
  src\math.ts    3      useState, useEffect, readFileSync
  src\App.tsx    2      Component, useRef
  ─────────────────────────────────────────────
  Summary: 2 file(s) with 5 unused import(s)
  ```

  ## How it works

  sweepp analyzes your codebase using Babel AST parsing to find unused imports and code. It supports monorepos and path aliases, and ignores system folders and `.d.ts` files for accurate results.

  ## Troubleshooting

  ### No unused imports or code detected
  - Make sure you have supported file types in your project
  - Check your ignore patterns
  - Ensure your codebase is staged and accessible

  ### Output includes system folders
  - Use the `--ignore` option to add more folders if needed

  ### Performance issues
  - sweepp is optimized for speed, but very large codebases may take longer
  - Use the `--ext` option to limit file types

  ## Maintainers
  - **Piyush Dhoka**: [@piyushdhoka](https://github.com/piyushdhoka)

  ## Contributing

  This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.


  - Zero config: run instantly
  - List unused import specifiers (TS/JS/JSX/TSX)
  - Safe clean mode removes them
  - Detect unused code (functions, classes, variables, types, interfaces) with preview
  - Fast AST parsing (Babel; SWC planned)
  - Keeps side-effect imports (`import 'polyfill';`)
  - Path alias support (`@/components`, `src/...`)
  - Optionally check if local imports exist in project
  - Monorepo support (pnpm workspaces, npm/yarn workspaces, Turborepo)
  - Ignores system folders and `.d.ts` files

  ## Install

  ### npm
  ```sh
  npm install -g sweepp
  # or
  npm install --save-dev sweepp
  ```

  ### Homebrew (macOS/Linux)
  ```sh
  brew tap piyushdhoka/sweep
  brew install sweepp
  ```

  ## Usage

  ### Short commands
  ```sh
  sweepp
  swp
  list
  clean
  unuse
  version
  ```

  You can use options with list/clean/unuse:
  ```sh
  sweepp list . --ext ts,tsx,js --ignore dist,build
  swp list . --ext ts,tsx,js --ignore dist,build
  ```

  ## Options
  - `--ext <list>`: Comma-separated file extensions (default: `ts,tsx,js,jsx`)
  - `--ignore <list>`: Comma-separated ignore patterns (default: `node_modules`)
  - `--check-local`: Check if local imports exist in project (supports path aliases from tsconfig.json/jsconfig.json)

  ## Example Output
  ```
  Unused Imports Report

  File           Count  Unused Imports
  ─────────────────────────────────────────────
  src\math.ts    3      useState, useEffect, readFileSync
  src\App.tsx    2      Component, useRef
  ─────────────────────────────────────────────
  Summary: 2 file(s) with 5 unused import(s)
  ```

  ## Path Alias & Monorepo Support
  sweepp auto-detects path aliases from tsconfig.json/jsconfig.json and monorepo setups (pnpm, npm/yarn workspaces, Turborepo).

  ## Exit Codes
  - `0`: success
  - `1`: error

  ## Programmatic Use
  ```ts
  import { analyzeAndClean } from 'sweepp/dist/analyzer';
  const result = await analyzeAndClean('src/file.ts', true);
  console.log(result.removed);
  - Dynamic usage may evade detection
  - Side-effect imports are preserved
  - Heuristic unused code detection: Next.js pages/app route exports treated as used
  - `.d.ts` files are ignored

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

## Monorepo Support

**Supported monorepo types:**
- **Turborepo** - Detected via `turbo.json` (uses underlying workspace config)

**Example pnpm-workspace.yaml:**
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
- Heuristic unused code detection: Next.js `pages/` & `app/` route exports treated as used; namespace imports mark all exports used
- Re-export chains & default export usage not fully analyzed yet; review before manual removal
- Babel parser first; SWC migration planned

## Roadmap
- SWC for performance
- Improve unused code graph (default exports, re-exports, dynamic usage)
- Config file support
- VS Code extension
- Git diff only mode
- Parallel processing
- Cache / incremental mode

## License
This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details
