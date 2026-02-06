---
Skill Name: Third Party Module Finder
Skill Description: Evaluates and recommends third-party libraries when custom implementation would be inefficient or error-prone
Trigger: Invoked when a task requires functionality that could be solved with an external library
---

# Third Party Module Finder Skill

## Purpose
Ensures the project uses well-maintained, appropriate third-party libraries rather than reinventing the wheel, while avoiding dependency bloat and abandoned packages.

## When to Invoke
- **Before implementing complex functionality** - Check if a library exists
- **When user mentions a capability** - "I need date formatting", "add drag and drop"
- **During code review** - When custom code duplicates library functionality
- **When fixing recurring bugs** - A library might handle edge cases better
- **On explicit request** - User asks for library recommendations

---

## Execution Process

### Phase 1: Identify the Need

Determine what functionality is required:

| Question | Why It Matters |
|----------|----------------|
| What specific problem needs solving? | Defines search criteria |
| Is this a one-time use or recurring pattern? | Justifies dependency vs. custom code |
| What's the complexity of a custom solution? | Trade-off analysis |
| Are there security implications? | Auth, crypto libraries are critical |
| Does it need to integrate with existing stack? | React, Express compatibility |

### Phase 2: Check Existing Dependencies

Before adding new packages, check if existing dependencies already solve the problem:

**Current Project Dependencies:**

| Package | Use For |
|---------|---------|
| `antd` | UI components (buttons, forms, modals, tables, etc.) |
| `react-router-dom` | Routing and navigation |
| `axios` | HTTP requests (but we use custom `useApiGet`/`postData`) |
| `swr` | Data fetching with caching (used via `useApiGet`) |
| `classnames` | Conditional CSS class composition |
| `prop-types` | React prop validation |
| `bcryptjs` | Password hashing |
| `stripe` / `@stripe/*` | Payment processing |
| `passport` / `passport-*` | OAuth authentication |
| `mongodb` | Database access |
| `express` / `express-session` | Server framework |

**Check Ant Design First:**
Ant Design (`antd`) includes many features beyond basic components:
- Date pickers and time pickers
- Form validation
- Notifications and messages
- Modals and drawers
- Tables with sorting, filtering, pagination
- Upload components
- Icons via `@ant-design/icons`

### Phase 3: Evaluate Candidates

When a new library is needed, evaluate against these criteria:

#### Must-Have Criteria
| Criteria | Threshold | How to Check |
|----------|-----------|--------------|
| **Maintained** | Updated within 6 months | npm/GitHub last publish date |
| **Weekly Downloads** | >10,000/week for niche, >100,000 for common | npm stats |
| **License** | MIT, Apache 2.0, ISC, BSD | package.json license field |
| **Size** | Reasonable for functionality | bundlephobia.com |
| **Dependencies** | Minimal, no problematic transitive deps | npm dependencies |
| **Security** | No known vulnerabilities | `npm audit`, Snyk |

#### Nice-to-Have Criteria
| Criteria | Why |
|----------|-----|
| TypeScript types | Better IDE support (works with JSDoc too) |
| Tree-shakeable | Smaller bundle size |
| Good documentation | Faster implementation |
| Active community | Help available, issues addressed |
| ESM support | Modern module system we use |

#### Red Flags
| Warning Sign | Risk |
|--------------|------|
| No updates in 1+ year | Abandoned, security risk |
| <1,000 weekly downloads | Limited community support |
| Many open security issues | Immediate risk |
| Single maintainer, no org | Bus factor |
| Pulls in 50+ dependencies | Bloat, supply chain risk |
| No license or GPL | Legal issues |

### Phase 4: Present Recommendation

Format the recommendation clearly:

```
📦 **Library Recommendation**

**Need:** [What functionality is required]

**Recommended:** `{package-name}` 
- **Weekly downloads:** [number]
- **Last updated:** [date]
- **Bundle size:** [size from bundlephobia]
- **License:** [license]

**Why this one:**
- [Reason 1]
- [Reason 2]

**Installation:**
```bash
npm install {package-name}
```

**Basic Usage:**
```javascript
// Example code
```

**Alternatives Considered:**
- `{alt-package}` - [why not chosen]

Shall I install this and implement?
```

### Phase 5: Install and Integrate

If approved:

1. **Install the package**
   ```bash
   npm install {package-name}
   ```

2. **Add usage example** in appropriate location

3. **Document the decision** in DECISIONS.md if significant

4. **Update GOTCHAS.md** if there are usage pitfalls

---

## Common Needs Quick Reference

### Date/Time Handling
| Need | Recommendation | Notes |
|------|----------------|-------|
| Date formatting | `date-fns` | Tree-shakeable, immutable |
| Date picker UI | `antd` DatePicker | Already installed |
| Relative time ("2 hours ago") | `date-fns` | `formatDistance` |
| Timezone handling | `date-fns-tz` | Works with date-fns |

### Form Handling
| Need | Recommendation | Notes |
|------|----------------|-------|
| Form state/validation | `antd` Form | Already installed |
| Complex form logic | `react-hook-form` | If antd Form insufficient |
| Schema validation | `zod` or `yup` | Server-side validation |

### State Management
| Need | Recommendation | Notes |
|------|----------------|-------|
| Server data caching | `swr` | Already installed |
| Global client state | React Context | Built-in, no library needed |
| Complex state machines | `zustand` | Lightweight alternative to Redux |

### Data Display
| Need | Recommendation | Notes |
|------|----------------|-------|
| Tables | `antd` Table | Already installed |
| Charts | `recharts` | React-friendly, composable |
| Virtualized lists | `react-window` | For very long lists |
| Markdown rendering | `react-markdown` | Lightweight, customizable |

### File Handling
| Need | Recommendation | Notes |
|------|----------------|-------|
| File upload UI | `antd` Upload | Already installed |
| File type detection | `file-type` | Server-side |
| Image processing | `sharp` | Server-side |
| CSV parsing | `papaparse` | Fast, handles edge cases |
| PDF generation | `pdfkit` | Server-side |

### Utilities
| Need | Recommendation | Notes |
|------|----------------|-------|
| Deep cloning | Native `structuredClone` | No library needed |
| Debounce/throttle | `lodash.debounce` | Individual functions |
| UUID generation | `uuid` or `crypto.randomUUID()` | Native available |
| Slugify | `slugify` | URL-safe strings |
| Query string | `qs` | Complex nested objects |

### Animation
| Need | Recommendation | Notes |
|------|----------------|-------|
| Simple transitions | CSS/Tailwind | No library needed |
| Complex animations | `framer-motion` | React-first, declarative |
| Scroll animations | `framer-motion` | InView animations |

### Authentication
| Need | Recommendation | Notes |
|------|----------------|-------|
| Password hashing | `bcryptjs` | Already installed |
| JWT tokens | `jsonwebtoken` | If needed |
| OAuth | `passport-*` | Already installed |

### Testing (if added)
| Need | Recommendation | Notes |
|------|----------------|-------|
| Test runner | `vitest` | Vite-native, fast |
| React testing | `@testing-library/react` | Standard |
| E2E testing | `playwright` | Modern, reliable |

---

## Evaluation Process Examples

### Example 1: Date Formatting Needed

**Need:** Format dates in user-friendly way

**Check existing:** Ant Design doesn't include general date formatting
**Custom effort:** Moderate, but edge cases in i18n

**Evaluate candidates:**

| Package | Downloads | Size | Updated | Verdict |
|---------|-----------|------|---------|---------|
| `date-fns` | 20M/week | 13KB (format) | This month | ✅ Recommended |
| `moment` | 15M/week | 290KB | Deprecated | ❌ Don't use |
| `dayjs` | 10M/week | 7KB | This month | ✅ Good alternative |

**Recommendation:** `date-fns` - Tree-shakeable, widely used, well-maintained

### Example 2: Drag and Drop Needed

**Need:** Reorderable list items

**Check existing:** Ant Design has basic drag-drop in Tree/Table
**Custom effort:** High, complex interaction handling

**Evaluate candidates:**

| Package | Downloads | Size | Updated | Verdict |
|---------|-----------|------|---------|---------|
| `@dnd-kit/core` | 1.5M/week | 15KB | This month | ✅ Recommended |
| `react-beautiful-dnd` | 1M/week | 44KB | Stale (Atlassian deprecated) | ❌ Avoid |
| `react-dnd` | 1.5M/week | 30KB | This month | ✅ Alternative |

**Recommendation:** `@dnd-kit/core` - Modern, accessible, actively maintained

### Example 3: Markdown Editor Needed

**Need:** User input with markdown

**Check existing:** Ant Design Input.TextArea + preview component
**Custom effort:** Very high for full editor

**Evaluate candidates:**

| Package | Downloads | Size | Updated | Verdict |
|---------|-----------|------|---------|---------|
| `@uiw/react-md-editor` | 100K/week | 180KB | This month | ✅ Full featured |
| `react-markdown` | 2M/week | 10KB | This month | ✅ Display only |
| Custom with textarea | - | 0KB | - | ✅ If display-only |

**Recommendation:** Depends on need:
- Display only: `react-markdown`
- Full editor: `@uiw/react-md-editor`
- Simple input + preview: Custom with `react-markdown`

---

## Anti-Patterns

### ❌ Adding Library for One Function
```javascript
// BAD: Installing lodash for one function
import _ from 'lodash';
_.debounce(fn, 300);

// GOOD: Install just what you need
import debounce from 'lodash.debounce';
debounce(fn, 300);

// BETTER: Check if native solution works
// (in this case, custom debounce is simple enough)
```

### ❌ Not Checking Existing Dependencies
```javascript
// BAD: Adding another form library when antd has forms
import { useForm } from 'react-hook-form';

// GOOD: Use what's already installed
import { Form } from 'antd';
```

### ❌ Choosing by Stars Alone
GitHub stars don't indicate:
- Active maintenance
- Bundle size
- Security status
- Actual usage

Always check npm weekly downloads and recent update dates.

### ❌ Ignoring Bundle Size
```javascript
// BAD: Adding 500KB for a simple feature
import { everything } from 'massive-library';

// GOOD: Check bundlephobia.com first
// Look for tree-shakeable alternatives
```

### ❌ Using Deprecated Packages
Packages to avoid even though still popular:
- `moment` → Use `date-fns` or `dayjs`
- `react-beautiful-dnd` → Use `@dnd-kit`
- `enzyme` → Use `@testing-library/react`
- `request` → Use `axios` or native `fetch`

---

## Commands

| Command | Action |
|---------|--------|
| `/find-library` | Start library search workflow |
| `/find-library {need}` | Search for library solving specific need |
| `/check-deps` | Review current dependencies for issues |
| `/audit-deps` | Run npm audit and report vulnerabilities |

---

## Integration Points

| After Finding Library | Next Step |
|----------------------|-----------|
| Library approved | Install with npm install |
| Significant addition | Document in DECISIONS.md |
| Has usage gotchas | Document in GOTCHAS.md |
| Adds new pattern | Document in PATTERNS.md |
| Changes project config | Update relevant docs |

---

## Resources

- **npm**: https://www.npmjs.com - Search packages
- **Bundlephobia**: https://bundlephobia.com - Check bundle size
- **Snyk**: https://snyk.io/advisor - Security and maintenance scores
- **npm trends**: https://npmtrends.com - Compare packages
- **Socket.dev**: https://socket.dev - Supply chain security

---

## Checklist: Before Recommending

- [ ] Verified existing dependencies don't solve the problem
- [ ] Checked Ant Design for built-in solution
- [ ] Evaluated multiple candidates
- [ ] Confirmed active maintenance (updated within 6 months)
- [ ] Checked weekly downloads (reasonable for category)
- [ ] Verified license is compatible (MIT/Apache/ISC/BSD)
- [ ] Reviewed bundle size impact
- [ ] Checked for security vulnerabilities
- [ ] Prepared example usage code

## Checklist: After Installation

- [ ] Package installed successfully
- [ ] Example usage implemented
- [ ] No new vulnerabilities introduced (`npm audit`)
- [ ] DECISIONS.md updated if significant choice
- [ ] GOTCHAS.md updated if usage pitfalls found
