# Test Project

This folder contains test files with various unused import scenarios:

- `src/math.ts` - Has unused React hooks and fs imports
- `src/App.tsx` - Has unused React imports, path, fs
- `src/server.ts` - Has unused Express middleware imports
- `src/types.ts` - All imports are unused (type-only file)
- `src/index.ts` - Side-effect imports (should be preserved)

## Test Commands

```bash
# List unused imports
sweepp list .

# Clean unused imports
sweepp clean .
```
