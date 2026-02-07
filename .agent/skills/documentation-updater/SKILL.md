---
Skill Name: Documentation Updater
Skill Description: Keeps documentation in sync with code changes
Trigger: Invoked after completing tasks that change documented behavior
---

# Documentation Updater Skill

## Purpose
Ensures documentation stays accurate by automatically identifying and updating relevant docs when code changes affect documented behavior, APIs, configuration, or structure.

## When to Invoke

| Trigger | Description |
|---------|-------------|
| After completing a feature | Check if new functionality needs documentation |
| After adding/changing API endpoints | Update route docs, CODEBASE-MAP, README |
| After modifying component props | Update component docs and PATTERNS if affected |
| After changing environment variables | Update README and any deployment docs |
| After adding database collections | Update CODEBASE-MAP and schema docs |
| After fixing bugs that reveal gaps | Document the gotcha in GOTCHAS.md |
| After changing configuration | Update relevant config documentation |
| User requests `/update-docs` | Manually trigger documentation review |

---

## Execution Process

### Phase 1: Identify What Changed

Review the work completed in the current task/session:

```
CATEGORIZE CHANGES:
1. List all files created/modified
2. Categorize each change:
   - API changes (new endpoints, changed params, changed responses)
   - Component changes (new components, changed props, changed behavior)
   - Configuration changes (env vars, config files, build settings)
   - Database changes (new collections, schema changes)
   - Feature changes (new capabilities, changed workflows)
   - Infrastructure changes (deployment, tooling, scripts)
```

### Phase 2: Map Changes to Documentation

For each change category, identify affected documentation:

#### Change-to-Documentation Matrix

| Change Type | Documentation to Check |
|-------------|------------------------|
| **New API endpoint** | CODEBASE-MAP.md, INSTRUCTIONS.md (if pattern), README.md (if user-facing) |
| **Changed API endpoint** | CODEBASE-MAP.md, any API docs, PATTERNS.md (if example uses it) |
| **New component** | CODEBASE-MAP.md, PATTERNS.md (if reusable pattern) |
| **Changed component props** | Component JSDoc, PATTERNS.md (if documented pattern) |
| **New hook** | CODEBASE-MAP.md, PATTERNS.md (if hook pattern) |
| **New page** | CODEBASE-MAP.md, main.jsx routes comment |
| **New env variable** | README.md, INSTRUCTIONS.md |
| **New database collection** | CODEBASE-MAP.md, mongo-client.js comments |
| **Build/config change** | README.md, INSTRUCTIONS.md |
| **Bug fix** | GOTCHAS.md (document the pitfall) |
| **Architecture decision** | DECISIONS.md |
| **New pattern discovered** | PATTERNS.md (via Pattern Learner) |

### Phase 3: Documentation Priority Assessment

Not all documentation updates are equal. Prioritize:

| Priority | Type | Action |
|----------|------|--------|
| **Critical** | Breaking changes to APIs or configs | Update immediately |
| **High** | New features/endpoints | Update in same task |
| **Medium** | Enhanced existing functionality | Update if time permits |
| **Low** | Minor improvements, cosmetic | Batch with other updates |

### Phase 4: Update Each Documentation Type

#### Knowledge Files

**CRITICAL**: All knowledge files are located in `.agent/knowledge/` directory.

**Creating New Knowledge Files:**

When creating NEW knowledge documentation (not updating existing files), always create them in `.agent/knowledge/`:

```
✅ Correct:   .agent/knowledge/ADMIN_MANAGEMENT.md
✅ Correct:   .agent/knowledge/STRIPE_INTEGRATION.md
❌ Wrong:     ADMIN_MANAGEMENT.md (root directory)
❌ Wrong:     docs/ADMIN_MANAGEMENT.md
```

**File naming conventions:**
- Use `SCREAMING_SNAKE_CASE.md` for knowledge files
- Be descriptive but concise
- Match the domain or feature name

##### CODEBASE-MAP.md
**Location:** `.agent/knowledge/CODEBASE-MAP.md`  
**Update when:** Files created, routes added, structure changed

**How to update:**
1. Add new files to appropriate section/table
2. Update route listings if APIs changed
3. Add notes for significant changes

##### PATTERNS.md
**Location:** `.agent/knowledge/PATTERNS.md`  
**Update when:** Pattern evolved, new pattern created, pattern deprecated

**How to update:**
1. Modify existing pattern if approach changed
2. Mark deprecated patterns with warning
3. Add "Updated: [date]" note to changed patterns

##### GOTCHAS.md
**Location:** `.agent/knowledge/GOTCHAS.md`  
**Update when:** Bug fixed, edge case discovered, pitfall identified

**How to update:**
```markdown
### [Descriptive Title]

**Discovered**: [YYYY-MM-DD]
**Context**: [Where/when this occurs]

**Problem**: 
[Clear description of what goes wrong]

**Solution**:
[How to avoid or fix]

**Example**:
```code
// Wrong way
...
// Right way
...
```
```

##### DECISIONS.md
**Location:** `.agent/knowledge/DECISIONS.md`  
**Update when:** Architectural choice made, technology selected, approach decided

**How to update:**
```markdown
### [DECISION-XXX] [Short Title]

**Date**: [YYYY-MM-DD]
**Status**: [Accepted | Superseded | Deprecated]
**Context**: [What prompted this decision]
**Decision**: [What was decided]
**Rationale**: [Why this choice]
**Consequences**: [What this means going forward]
```

##### USER-PREFERENCES.md
**Location:** `.agent/knowledge/USER-PREFERENCES.md`  
**Update when:** User feedback received, working style observed

**How to update:**
```markdown
### [Preference Category]
**Observed**: [Date]
[What the user prefers and why]
```

##### Feature-Specific Documentation
**Location:** `.agent/knowledge/{FEATURE_NAME}.md`  
**Create when:** Building a significant feature that needs standalone documentation

**Examples:**
- `.agent/knowledge/ADMIN_MANAGEMENT.md` - Admin user management system
- `.agent/knowledge/STRIPE_INTEGRATION.md` - Payment processing details
- `.agent/knowledge/AUTH_SYSTEM.md` - Authentication flow and OAuth

**What to include:**
- Feature overview and purpose
- API endpoints and their usage
- Configuration and setup instructions
- Common workflows and examples
- Troubleshooting guide
- Security considerations

#### Project Documentation

##### README.md
**Update when:**
- New user-facing features
- Changed installation/setup steps
- New environment variables
- Changed commands or workflows

**Sections to check:**
- Features list
- Installation instructions
- Environment variables
- Usage examples
- Configuration options

##### INSTRUCTIONS.md (Agent Instructions)
**Update when:**
- New coding patterns required
- Changed development workflow
- New commands or scripts
- Changed environment setup

**Sections to check:**
- Coding Standards
- File Organization
- Common Commands
- Quick Reference sections

#### Code Documentation

##### JSDoc Comments
**Update when:** Function behavior, parameters, or return values change

**Format:**
```javascript
/**
 * Brief description of what this function does.
 * 
 * @param {string} param1 - Description of param1
 * @param {Object} options - Configuration options
 * @param {boolean} options.flag - Description of flag
 * @returns {Promise<Object>} Description of return value
 * @throws {Error} When [condition]
 * 
 * @example
 * const result = await myFunction('value', { flag: true });
 */
```

##### PropTypes Documentation
**Update when:** Component props change

**Format:**
```jsx
ComponentName.propTypes = {
    /** Description of what this prop does */
    propName: PropTypes.string.isRequired,
    
    /** Description of optional prop */
    optionalProp: PropTypes.bool,
};
```

##### Inline Comments
**Update when:** Complex logic changes

**Guidelines:**
- Explain "why" not "what"
- Update when logic changes
- Remove outdated comments
- Keep comments near the code they describe

---

## Phase 5: Verify Documentation Accuracy

After updating, verify:

| Check | Action |
|-------|--------|
| Code examples still work | Test or verify syntax |
| File paths are correct | Confirm files exist at documented paths |
| Commands still work | Verify command syntax |
| Environment vars complete | Compare to actual .env.example |
| No contradictions | Check related docs don't conflict |
| Timestamps updated | Update "Last Updated" fields |

---

## Documentation Update Templates

### Adding to CODEBASE-MAP.md

For new component:
```markdown
| [ComponentName] | `@client/src/components/{name}/` | [Brief purpose] |
```

For new route:
```markdown
| [Action] | `@client/src/pages/{name}/` or - | `@server/routes/{feature}/{action}.js` |
```

### Adding to README.md

For new environment variable:
```markdown
| `VARIABLE_NAME` | Description of what it does | `default_value` |
```

For new feature:
```markdown
### [Feature Name]
[Brief description of the feature and how to use it]
```

---

## Integration Points

| After Documentation Updater | Consider Invoking |
|-----------------------------|-------------------|
| Updated CODEBASE-MAP.md | Verify with Codebase Mapper if needed |
| Found new pattern | Pattern Learner to document it |
| Session ending | Context Summarizer will verify docs are current |

| Before Documentation Updater | Check |
|------------------------------|-------|
| Task is complete | Don't document work-in-progress |
| Changes are verified | Ensure code works before documenting |

---

## Output: Documentation Update Confirmation

After updating documentation:

```
📝 **Documentation Updated**

**Changes analyzed:** [Brief summary of what changed]

**Documentation updated:**
- [CODEBASE-MAP.md](path) → Added [component/route/etc.]
- [GOTCHAS.md](path) → Added [issue title]
- [README.md](path) → Updated [section]

**No updates needed for:**
- [File] - [reason: no relevant changes]

**Suggested future updates:**
- [Any documentation that could be improved later]

Documentation is current as of [timestamp].
```

If no updates needed:
```
📝 **Documentation Review Complete**

Analyzed changes from this task.
All documentation is current - no updates required.
```

---

## Command Reference

| Command | Description |
|---------|-------------|
| `/update-docs` | Manually invoke documentation review for recent work |
| `/check-docs` | Verify documentation accuracy without making changes |
| `/doc-status` | Show which docs were last updated and when |

---

## Anti-Patterns (What NOT to Do)

❌ **DON'T** do these:

| Anti-Pattern | Why |
|--------------|-----|
| Document work-in-progress | Code may change before completion |
| Over-document trivial changes | Creates noise, not value |
| Copy code without context | Examples need explanation |
| Update docs without verifying | Inaccurate docs are worse than none |
| Forget to update examples | Outdated examples mislead |
| Document implementation details | Focus on usage, not internals |
| Remove docs without replacement | Leave gaps in knowledge |

✅ **DO** these:

| Best Practice | Why |
|---------------|-----|
| Document user-facing changes first | Highest impact |
| Keep examples runnable | Developers copy-paste examples |
| Update timestamps | Shows freshness |
| Link related docs | Helps navigation |
| Match documentation style | Consistency matters |
| Test commands before documenting | Accuracy is critical |

---

## Examples

### Example 1: New API Endpoint

**Change:** Added `POST /api/products/create` endpoint

**Documentation Updates:**
1. CODEBASE-MAP.md → Add to Products route table
2. README.md → Add to API endpoints section (if public)
3. INSTRUCTIONS.md → No update needed (follows existing patterns)

### Example 2: Bug Fix with Gotcha

**Change:** Fixed issue where OAuth redirect fails if PORT not set

**Documentation Updates:**
1. GOTCHAS.md → Add "OAuth Redirect Requires PORT" entry
2. README.md → Update environment variables section
3. CODEBASE-MAP.md → No update needed

### Example 3: New Component

**Change:** Created `@client/src/components/data-table/data-table.jsx`

**Documentation Updates:**
1. CODEBASE-MAP.md → Add to Reusable Components table
2. Component JSDoc → Already added during creation
3. PATTERNS.md → If novel pattern, document it

---

## Efficiency Guidelines

### Batch Updates
When completing a multi-file task:
1. Wait until task is fully complete
2. Review all changes together
3. Update each doc once with all changes

### Skip Documentation When
- Change is purely internal refactoring
- No behavior or API changed
- Documentation doesn't cover this area anyway

### Prioritize Documentation When
- API or interface changed (breaking change)
- New capability added
- User reported confusion about existing docs

---

## Checklist

Before completing documentation update:

- [ ] Identified all code changes in the task
- [ ] Mapped changes to affected documentation
- [ ] Updated CODEBASE-MAP.md for new files
- [ ] Updated GOTCHAS.md for any bugs fixed
- [ ] Updated README.md for user-facing changes
- [ ] Updated code comments if logic changed
- [ ] Verified code examples still work
- [ ] Updated "Last Updated" timestamps
- [ ] Checked for documentation contradictions
- [ ] Provided confirmation output
