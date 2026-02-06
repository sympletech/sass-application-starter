---
Skill Name: Codebase Mapper
Skill Description: Analyzes the codebase and generates/updates the CODEBASE-MAP.md knowledge file
Trigger: Automatically invoked when significant structural changes are made (new files, new routes, new components)
---

# Codebase Mapper Skill

## Purpose
Maintains an accurate, up-to-date map of the codebase structure so that agents can understand the project without extensive searching.

## When to Invoke

| Trigger | Action |
|---------|--------|
| After creating new component | Add to Reusable Components table |
| After creating new page | Add to Feature → File Mapping |
| After creating new route | Add to route feature section |
| After creating new hook | Add to Custom Hooks table |
| After adding database collection | Add to Database Collections table |
| After adding utility file | Add to appropriate section |
| User requests "update the codebase map" | Perform targeted or full refresh |
| Session Bootstrapper detects staleness | Perform incremental update |
| `/map` command | Perform full scan and update |

---

## Execution Process

### Mode Detection

Determine which update mode to use:

| Mode | When | Scope |
|------|------|-------|
| **Incremental** | After creating 1-3 files | Update only affected sections |
| **Targeted** | After creating feature (4-10 files) | Update specific feature area |
| **Full Refresh** | Map is stale or `/map` command | Scan entire structure |

---

## Phase 1: Determine What Changed

### For Incremental Updates
Track what you just created during the session:

```
CREATED FILES THIS SESSION:
- [List files you created or modified]
- [Note the type: component, page, route, hook, utility]
```

### For Targeted/Full Updates
Scan the directory structure:

```
SCAN DIRECTORIES:
1. @client/src/components/     → Components
2. @client/src/pages/          → Pages
3. @client/src/hooks/          → Hooks
4. @client/src/lib/            → Client utilities
5. @client/src/layouts/        → Layouts
6. @server/routes/             → Route files
7. @server/lib/                → Server utilities
```

**Use `list_dir` tool to scan each directory** and compare against the current CODEBASE-MAP.md.

---

## Phase 2: Categorize Changes

After scanning, categorize what needs updating:

### File Categories

| Pattern | Category | Map Section |
|---------|----------|-------------|
| `@client/src/components/{name}/{name}.jsx` | Component | Reusable Components |
| `@client/src/pages/{name}/{name}.jsx` | Page | Feature → File Mapping |
| `@client/src/pages/{name}/*-section.jsx` | Page Section | Feature → File Mapping |
| `@client/src/hooks/use-{name}.js` | Hook | Custom Hooks |
| `@client/src/lib/{name}.js` | Client Utility | Custom Hooks (if exports hook) or Notes |
| `@client/src/layouts/{name}/{name}-layout.jsx` | Layout | Layouts |
| `@server/routes/{feature}/_*-routes.js` | Route Definition | Feature → File Mapping |
| `@server/routes/{feature}/{action}.js` | Route Handler | Feature → File Mapping |
| `@server/lib/{name}.js` | Server Utility | Quick Reference or Notes |

### New Feature Detection

If you find a new folder in `@server/routes/` or `@client/src/pages/` that isn't in the map, it's likely a new feature that needs a new section.

---

## Phase 3: Update CODEBASE-MAP.md

Read the current map and apply updates. **ALWAYS preserve existing content and manual annotations.**

### Section Update Templates

#### Adding a Component

Add to the **Reusable Components** table:

```markdown
| [ComponentName] | `@client/src/components/{name}/` | [Brief purpose] |
```

#### Adding a Page

If it's part of an existing feature, add to that section. If new feature, create a section:

```markdown
### [Feature Name]
| Page | Location | Sections |
|------|----------|----------|
| [Name] | `@client/src/pages/{name}/{name}.jsx` | [section-names if any] |
```

#### Adding Routes

If it's a new route group, add a section:

```markdown
### [Feature] System
| Feature | Client | Server |
|---------|--------|--------|
| [Action] | `@client/...` or - | `@server/routes/{feature}/{action}.js` |
| Route Definitions | - | `@server/routes/{feature}/_feature-routes.js` |
```

If adding to existing route group, add row to existing table.

#### Adding a Hook

Add to **Custom Hooks** table:

```markdown
| use{Name} | `@client/src/hooks/use-{name}.js` | [Purpose] |
```

#### Adding a Database Collection

Add to **Database Collections** table:

```markdown
| `{collection}` | [Purpose] | [Key fields or "TBD"] |
```

#### Adding a Layout

Add to **Layouts** table in Feature → File Mapping:

```markdown
| [Name] | `@client/src/layouts/{name}/{name}-layout.jsx` | [Purpose] |
```

### Update Metadata

Always update the header:

```markdown
> **Last Updated**: [YYYY-MM-DD HH:MM]
> **Updated By**: [Session ID or "Agent"]
```

---

## Phase 4: Verify Update

After updating CODEBASE-MAP.md:

1. **Read back the file** to verify changes were applied correctly
2. **Check for duplicates** - don't add items already listed
3. **Check for orphans** - files in map that no longer exist (during full refresh)
4. **Verify table formatting** - ensure markdown tables are valid

---

## Special Cases

### Detecting New Features

When you see a new folder pattern:
- `@client/src/pages/{new-name}/` → New page/feature
- `@server/routes/{new-name}/` → New API feature

**Action:**
1. Create a new subsection in Feature → File Mapping
2. Add all discovered files in that feature
3. Document the client-server relationship

### Detecting Deleted Files

During full refresh, if a file in the map doesn't exist:

**Action:**
1. Remove from the table
2. Add note in the Notes section: `[Date]: Removed [filename] (no longer exists)`

### Complex Features

For features with many files, group logically:

```markdown
### E-Commerce System
| Feature | Client | Server |
|---------|--------|--------|
| Product List | `@client/src/pages/products/products.jsx` | `@server/routes/products/list.js` |
| Product Detail | `@client/src/pages/product-detail/product-detail.jsx` | `@server/routes/products/get.js` |
| Shopping Cart | `@client/src/pages/cart/cart.jsx` | `@server/routes/cart/get.js`, `.../update.js` |
| Checkout | `@client/src/pages/checkout/checkout.jsx` | `@server/routes/checkout/process.js` |
| Route Definitions | - | `@server/routes/products/_product-routes.js`, `@server/routes/cart/_cart-routes.js` |
```

---

## Notes Section Management

The Notes section at the bottom of CODEBASE-MAP.md is for manual annotations.

**NEVER delete notes unless explicitly asked.**

**When to add notes:**
- Structure changed in unusual way
- Temporary files that will be removed
- Known issues with structure
- Planned refactoring

**Format:**
```markdown
## Notes

- [YYYY-MM-DD]: [Note about structure]
```

---

## Command Reference

| Command | Description |
|---------|-------------|
| `/map` | Perform full codebase scan and update |
| `/map components` | Refresh only components section |
| `/map routes` | Refresh only routes/API section |
| `/map pages` | Refresh only pages section |

---

## Integration Points

| When | Hand Off To |
|------|-------------|
| After completing task | Documentation Updater (for README if needed) |
| Found pattern while mapping | Pattern Learner |
| Session ending | Context Summarizer (include map updates in handoff) |

---

## Efficiency Guidelines

### Do NOT Full Scan When:
- You just created 1-2 files and know exactly what changed
- The only change was adding content to existing files (not new files)
- You're in the middle of a multi-file creation task (wait until done)

### DO Full Scan When:
- It's been more than 7 days since last update
- User has been working without an agent
- Map shows obvious gaps or outdated information
- User explicitly requests it

### Batch Updates
If creating multiple files in a task:
1. Track all files as you create them
2. Wait until the task is complete
3. Update the map once with all new files

---

## Output: Update Confirmation

After updating the map, briefly confirm:

```
📍 **Codebase Map Updated**

**Added:**
- [Component/Page/Route]: [Name]
- [Component/Page/Route]: [Name]

**Section(s) updated:** [List sections]

The map now reflects the current structure.
```

For full refresh:
```
📍 **Codebase Map Refreshed**

**Scan summary:**
- Components: [X] total ([Y] new)
- Pages: [X] total ([Y] new)
- Routes: [X] route groups
- Hooks: [X] total

**Changes made:**
- Added: [list]
- Removed: [list if any]
- Updated: [sections modified]

Map is current as of [timestamp].
```

---

## Checklist

Before completing a map update:

- [ ] Identified all new files created this session
- [ ] Categorized each file correctly
- [ ] Added to appropriate table/section
- [ ] Preserved all existing content
- [ ] Preserved all manual notes
- [ ] Updated "Last Updated" timestamp
- [ ] Verified table formatting is valid
- [ ] Provided update confirmation to user

---

## Anti-Patterns

❌ **DON'T** do a full scan after every small change
❌ **DON'T** delete notes or annotations without permission
❌ **DON'T** add duplicate entries (check before adding)
❌ **DON'T** add files that are in progress and might be renamed
❌ **DON'T** forget to update the timestamp
❌ **DON'T** create multiple entries for the same file in different sections

✅ **DO** batch updates when creating multiple files
✅ **DO** use incremental mode for small changes
✅ **DO** preserve the existing structure and formatting
✅ **DO** add meaningful descriptions, not just paths
✅ **DO** verify changes were applied correctly
