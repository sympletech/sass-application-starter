# Agent Instructions

> Your primary guide. Execute **Session Bootstrapper** before any work.

---

## 1. SESSION START — MANDATORY

**Execute Session Bootstrapper skill FIRST:** `.agent/skills/session-bootstrapper/SKILL.md`

Do NOT start any work until bootstrap is complete.

---

## 2. WORK MODES

### Framework Work
**When:** Editing `.agent/`, skills, documentation, core framework files  
**Action:** Skip project plan. Focus on the framework task. Update knowledge files.

### Product Work  
**When:** Building features, fixing product bugs, implementing user stories  
**Action:** Follow project plan workflow. Use CURRENT-TASK.md. Update project files when done.

---

## 3. PROJECT OVERVIEW

| Component | Technology | Port |
|-----------|------------|------|
| Frontend | React 19 + Ant Design + Tailwind | :3001 |
| Backend | Node.js + Express | :3000 |
| Database | MongoDB | MONGO_URI |
| Payments | Stripe | API keys |

---

## 4. CORE RULES

### Code Quality
- Clean, readable code over concise code
- DRY — reuse code, don't repeat
- Prefer third-party libraries over custom implementations

### Task Execution
- **Clarify before coding** — invoke Task Clarifier for ambiguous requirements
- **Verify before complete** — every change needs proof (screenshot, curl, build output)
- **Document as you go** — update knowledge files with discoveries

### Verification Required

| Change Type | Proof Required |
|-------------|----------------|
| UI changes | Browser screenshot |
| API changes | Terminal curl output |
| Build changes | Successful build output |
| Config changes | Command proving effect |

**Never mark complete based on "looks correct" or "should work".**

---

## 5. KNOWLEDGE FILES

| File | Purpose |
|------|---------|
| `knowledge/CODEBASE-MAP.md` | Structure & file locations |
| `knowledge/PATTERNS.md` | Code patterns to follow |
| `knowledge/GOTCHAS.md` | Pitfalls to avoid |
| `knowledge/DECISIONS.md` | Architecture decisions |
| `knowledge/USER-PREFERENCES.md` | User working style |
| `JOURNAL.md` | Session logs |

Update after completing tasks or fixing bugs.

---

## 6. SKILLS — Quick Reference

Each skill has detailed instructions. Read the skill file for full behavior.

### Entry Point
| Skill | Command | When |
|-------|---------|------|
| Session Bootstrapper | *auto* | Session start |

### Core Skills
| Skill | Command | When |
|-------|---------|------|
| Context Summarizer | `/handoff` | 50% context, session end |
| Codebase Mapper | `/map` | After creating files |
| Pattern Learner | `/learn-patterns` | After creating code |
| Documentation Updater | `/update-docs` | After completing tasks |
| High Level Project Manager | *auto* | Incomplete project plan |

### Task Skills
| Skill | Command | When |
|-------|---------|------|
| Task Clarifier | `/clarify` | Before implementing ambiguous tasks |
| Bug Fixer | `/fix` | When debugging |

### Development Skills
| Skill | Command | When |
|-------|---------|------|
| Component Generator | `/component` | Creating React components |
| API Designer | `/api` | Creating API routes |
| Refactoring Assistant | `/refactor` | DRY violations, code duplication |

### Utility Skills
| Skill | Command | When |
|-------|---------|------|
| Note Taker | `/note` | Capturing learnings |
| Third Party Module Finder | `/find-library` | Need external library |

**Full skill documentation:** `.agent/skills/{skill-name}/SKILL.md`

---

## 7. COMMANDS — Quick Reference

| Command | Purpose |
|---------|---------|
| `/handoff` | Prepare session handoff |
| `/map` | Refresh CODEBASE-MAP.md |
| `/learn-patterns` | Document new patterns |
| `/update-docs` | Update documentation |
| `/clarify` | Gather requirements before implementing |
| `/fix` | Start bug fix workflow |
| `/component` | Generate component |
| `/page [name]` | Generate page |
| `/api` | Design API route |
| `/refactor` | Scan for DRY violations |
| `/note` | Capture learning |
| `/find-library` | Search for third-party library |

---

## 8. CODING STANDARDS

### Language
- **ES6 JavaScript only** (NOT TypeScript)
- `import` syntax (NOT `require`)
- Arrow functions only
- NO classes — functional programming
- `kebab-case` for files/folders

### File Locations
```
@client/src/components/{name}/{name}.jsx
@client/src/pages/{name}/{name}.jsx
@client/src/hooks/use-{name}.js
@client/src/lib/{name}.js
@server/routes/{feature}/_*-routes.js
@server/routes/{feature}/{action}.js
@server/lib/{name}.js
```

### Import Aliases
| Alias | Path |
|-------|------|
| `@client/` | `./client/` |
| `@server/` | `./server/` |

---

## 9. SERVER PATTERNS

### MongoDB Usage
```javascript
import { db } from '@server/lib/mongo-client.js';

// Use collections via db.collections
const accounts = await db.collections.accounts.find({}).toArray();
```

### Route Handler Pattern
```javascript
// Public route
export default async ({ param1 }) => {
    return { result: param1 };
};

// Secured route (has user context)
export default async (_params, { user }) => {
    return { userId: user._id };
};
```

### Error Handling
```javascript
const err = new Error('Message');
err.status = 400;  // HTTP status
err.redirect = '/path';  // Optional redirect
throw err;
```

**Full server patterns:** `.agent/skills/api-designer/SKILL.md`

---

## 10. CLIENT PATTERNS

### Component Rules
- One file = one component
- No inline styles — use Tailwind or CSS files
- No `defaultProps` — use default parameter values
- Arrow functions only

### Data Fetching (SWR Style — Preferred)
```javascript
import { useApiGet } from '@client/lib/use-api.js';

const [data, error, isLoading] = useApiGet('/api/endpoint', {
    params: { key: value },
    defaultValue: null,
});
```

### Data Fetching (Async Style — For Actions)
```javascript
import { postData } from '@client/lib/use-api.js';

const handleSubmit = async () => {
    const result = await postData('/api/endpoint', { data });
};
```

**Full component patterns:** `.agent/skills/component-generator/SKILL.md`

---

## 11. COMMON COMMANDS

```bash
npm start          # Start dev servers
npm run build      # Build client
curl http://localhost:3000/api/auth/me  # Test API
```

---

## 12. QUICK REFERENCE

### Add API Route
1. Create `@server/routes/{feature}/{action}.js`
2. Register in `@server/routes/{feature}/_*-routes.js`
3. Run `/map`

### Add Component
1. Create `@client/src/components/{name}/{name}.jsx`
2. Optional: Add `{name}.css`
3. Run `/map`

### Add Page
1. Create `@client/src/pages/{name}/{name}.jsx`
2. Add route in `@client/src/main.jsx`
3. Run `/map`

### Add Collection
1. Add to `db.collections` in `@server/lib/mongo-client.js`
2. Run `/map`

---

## 13. REMEMBER

1. **Bootstrap first** — Session Bootstrapper before any work
2. **Clarify before code** — Use Task Clarifier for ambiguous tasks
3. **Verify before complete** — Every change needs proof
4. **Document discoveries** — Update knowledge files
5. **Handoff at 50%** — Use `/handoff` before context is full
