# Publishing sweepp to npm

This guide will help you publish the `sweepp` package to npm, making it globally available to everyone.

## Prerequisites

1. **Create an npm account** (if you don't have one):
   - Go to https://www.npmjs.com/signup
   - Create your account

2. **Verify your email** on npm

## Publishing Steps

### 1. Login to npm
```bash
npm login
```
You'll be prompted for:
- Username
- Password
- Email
- One-time password (if you have 2FA enabled)

### 2. Verify you're logged in
```bash
npm whoami
```
This should display your npm username.

### 3. Check package name availability
```bash
npm search sweepp
```
If the name is taken, you may need to:
- Choose a different name (e.g., `@yourusername/sweepp`)
- Or update the `name` field in `package.json`

### 4. Test the package locally (Optional but recommended)
```bash
# Build the package
npm run build

# Test it works
npm link
cd test-project
sweepp list .
```

### 5. Check what will be published
```bash
npm pack --dry-run
```
This shows you what files will be included in the package.

### 6. Publish to npm
```bash
npm publish
```

For scoped packages (if using @username/sweepp):
```bash
npm publish --access public
```

### 7. Verify publication
After publishing, check:
- https://www.npmjs.com/package/sweepp
- Try installing: `npm install -g sweepp`

## Publishing Updates

When you want to release a new version:

1. **Update version**:
   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   # or
   npm version minor  # 1.0.0 -> 1.1.0
   # or
   npm version major  # 1.0.0 -> 2.0.0
   ```

2. **Publish**:
   ```bash
   npm publish
   ```

3. **Push to git** (if using git):
   ```bash
   git push --follow-tags
   ```

## Important Notes

### Before Publishing Checklist
- ✅ Package is built (`npm run build`)
- ✅ README.md is complete and accurate
- ✅ LICENSE file exists
- ✅ Repository URL is correct in package.json
- ✅ Author field is filled
- ✅ Version number is correct
- ✅ All tests pass (if any)

### Update package.json
Before publishing, update these fields in `package.json`:
- `repository.url` - Replace with your actual GitHub repo URL
- `homepage` - Replace with your actual homepage
- `bugs.url` - Replace with your actual issues URL
- `author` - Add your full name/email if desired

### Package Name
The current package name is `sweepp`. If this name is already taken, you have options:
1. Use a scoped package: `@yourusername/sweepp`
2. Choose a different name: `sweep-imports`, `import-sweeper`, etc.

## After Publishing

Once published, users can install globally:
```bash
npm install -g sweepp
```

Or use locally in their project:
```bash
npm install --save-dev sweepp
```

## Common Issues

### "Package name already exists"
- Check if the name is taken: https://www.npmjs.com/package/sweepp
- Use a scoped package: update `name` to `@yourusername/sweepp`
- Choose a different name

### "You must be logged in"
- Run `npm login` first
- Verify with `npm whoami`

### "You do not have permission"
- Make sure you're logged in with the correct account
- Check if the package name conflicts with an existing package

### "Missing required field"
- Ensure all required fields in package.json are filled
- Run `npm pack --dry-run` to check

## Unpublishing (Use with caution)

If you need to unpublish within 72 hours:
```bash
npm unpublish sweepp@1.0.0
```

**Note**: Unpublishing is permanent and discouraged. Consider deprecating instead:
```bash
npm deprecate sweepp@1.0.0 "This version has been deprecated"
```
