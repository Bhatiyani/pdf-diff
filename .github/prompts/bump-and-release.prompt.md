---
agent: agent
---

# Version Bump and Release Workflow for PDF Diff

## Task
When the user requests a version bump (e.g., "bump to 1.0.5", "release version 1.1.0"), execute the complete version bump and release process for the pdf-diff project.

## Critical Requirements

### 1. Update Version in TWO Locations (MANDATORY)
Both files MUST be updated simultaneously:
- `package.json` → `"version": "X.Y.Z"`
- `src/cli/index.ts` → `const VERSION = 'X.Y.Z';`

**Use multi_replace_string_in_file for efficiency**

### 2. Build and Verify CLI
```bash
npm run build:cli
node dist-cli/cli.mjs --version  # Must show correct version
```

### 3. Commit, Tag, and Push (Single Command)
```bash
git add -A && \
git commit -m "Bump to vX.Y.Z - [brief description]" && \
git tag vX.Y.Z && \
git push origin main && \
git push origin vX.Y.Z
```

## Success Criteria
- [ ] Both package.json and src/cli/index.ts have matching version numbers
- [ ] CLI builds successfully without errors
- [ ] `node dist-cli/cli.mjs --version` outputs correct version
- [ ] Git commit, tag, and push complete successfully
- [ ] Remind user to check GitHub Actions workflow
- [ ] Remind user that npm propagation takes 2-5 minutes

## Constraints and Errors to Avoid

### ❌ NEVER Do These:
1. Tag before updating package.json version
2. Forget to update CLI version constant in src/cli/index.ts
3. Skip building the CLI before committing
4. Try to test with npx immediately (package not published yet)
5. Update only one version location

### Version Number Guidelines:
- **Patch (1.0.X)**: Bug fixes, minor changes, no new features
- **Minor (1.X.0)**: New features, backward compatible
- **Major (X.0.0)**: Breaking changes

## Workflow Steps (Execute in Order)

1. **Update versions** in both files using multi_replace_string_in_file
2. **Build**: `npm run build:cli`
3. **Verify**: `node dist-cli/cli.mjs --version`
4. **Commit & Push**: Single command with add, commit, tag, push main, push tag
5. **Inform user**: GitHub Actions will publish to npm in ~2-5 minutes
6. **After workflow**: Verify with `npm view @jamesmontemagno/pdf-diff versions`

## Example Execution

When user says: "bump to 1.0.5"

1. Update package.json version to "1.0.5"
2. Update src/cli/index.ts VERSION to '1.0.5'
3. Run `npm run build:cli`
4. Verify with `node dist-cli/cli.mjs --version`
5. Execute: `git add -A && git commit -m "Bump to v1.0.5 - [description]" && git tag v1.0.5 && git push origin main && git push origin v1.0.5`
6. Inform user to check: https://github.com/jamesmontemagno/pdf-diff/actions

## Post-Release Verification

After GitHub Actions completes:
```bash
npm view @jamesmontemagno/pdf-diff versions  # Should include new version
npx @jamesmontemagno/pdf-diff@latest --version  # Should show new version
```

## Notes
- This is a dual-target project: web app + CLI npm package
- GitHub Actions workflow handles npm publishing automatically
- CLI version MUST match package.json version for consistency
- Users may need to clear npm cache: `npm cache clean --force`