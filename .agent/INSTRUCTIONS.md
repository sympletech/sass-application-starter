# Agent Instructions

> Your primary guide. Execute **Session Bootstrapper** before any work.

---

## 1. SESSION START — MANDATORY

**Execute Session Bootstrapper skill FIRST:** `.agent/skills/session-bootstrapper/SKILL.md`

Do NOT start any work until bootstrap is complete.

---

## 2. DEVELOPMENT LIFECYCLE

This is a **prompt-driven development** framework. You describe what you want to build, and the agent helps you plan, execute, and verify every step.

### The Core Loop

```
/plan → /next → build → /done → /next → ... → /handoff
```

| Step | Command | What Happens |
|------|---------|-------------|
| 1. Define | `/plan` | Describe your vision. Agent creates project description + roadmap |
| 2. Start | `/next` | Agent picks the top task, prepares it, and begins implementation |
| 3. Build | *(agent works)* | Agent implements with clarification, verification at each step |
| 4. Complete | `/done` | Agent verifies, documents, and moves task to done list |
| 5. Repeat | `/next` | Pick up the next task and continue |
| 6. Save | `/handoff` | Save session state for seamless continuation next time |

### During Development

| Need | Command | Description |
|------|---------|-------------|
| Add a feature | `/add-feature` | Add new work to the roadmap without interrupting current task |
| Fix a bug | `/fix` | Systematic bug diagnosis and resolution |
| Check status | `/progress` | See what's done, in progress, and remaining |
| Adjust plan | `/replan` | Reassess and reorder the full roadmap |
| Clarify scope | `/clarify` | Get clear on ambiguous requirements before coding |

### Work Modes

**Product Work** (default)  
Building features, fixing bugs, implementing user stories.  
Follow: `/plan` → `/next` → build → `/done` loop. All work tracked in `.project-plan/`.

**Framework Work**  
Editing `.agent/`, skills, documentation, core framework files.  
Skip project plan. Focus on the framework task. Update knowledge files.

---

## 3. PROJECT PLAN FILES

All project tracking lives in `.project-plan/`:

| File | Purpose | Updated By |
|------|---------|------------|
| `PROJECT-DESCRIPTION.md` | What we're building — the north star | `/plan` |
| `ROADMAP.md` | Ordered task queue | `/plan`, `/add-feature`, `/replan` |
| `CURRENT-TASK.md` | Active task details and progress | `/next`, `/done` |
| `STATE.md` | Quick status snapshot for session handoffs | `/done`, `/handoff` |
| `DEFECT-LIST.md` | Known bugs and issues | `/fix` |
| `DONE-LIST.md` | Completed tasks and resolved bugs | `/done` |

### Task Lifecycle

```
ROADMAP.md  ──/next──→  CURRENT-TASK.md  ──/done──→  DONE-LIST.md
   ↑                         │
   └────── task paused ───────┘
```

---

## 4. PROJECT OVERVIEW

| Component | Technology | Port |
|-----------|------------|------|
| Frontend | React 19 + Ant Design + Tailwind | :3001 |
| Backend | Node.js + Express | :3000 |
| Database | MongoDB | MONGO_URI |
| Payments | Stripe | API keys |

---

## 5. CORE RULES

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

## 6. KNOWLEDGE FILES

### Knowledge Directory: `.agent/knowledge/`

**CRITICAL RULE**: ALL knowledge and documentation files MUST be created in `.agent/knowledge/`

**Core Knowledge Files:**

| File | Purpose |
|------|---------||
| `knowledge/CODEBASE-MAP.md` | Structure & file locations |
| `knowledge/PATTERNS.md` | Code patterns to follow |
| `knowledge/GOTCHAS.md` | Pitfalls to avoid |
| `knowledge/DECISIONS.md` | Architecture decisions |
| `knowledge/USER-PREFERENCES.md` | User working style |

**Additional Knowledge:**
- Feature documentation (e.g., `knowledge/ADMIN_MANAGEMENT.md`)
- Domain-specific guides (e.g., `knowledge/API-DESIGN.md`)
- Technical deep-dives
- Setup/configuration guides

**Session Logs:**
| File | Purpose |
|------|---------||
| `JOURNAL.md` | Session logs (root `.agent/` directory) |

**When to create new knowledge files:**
- Documenting a significant new feature or subsystem
- Creating a guide that will be referenced across sessions
- Capturing complex technical information
- Recording domain knowledge or business logic

Update after completing tasks or fixing bugs.

---

## 7. SKILLS — Quick Reference

Each skill has detailed instructions. Read the skill file for full behavior.

### Entry Point
| Skill | Command | When |
|-------|---------|------|
| Session Bootstrapper | *auto* | Session start |

### Project Management
| Skill | Command | When |
|-------|---------|------|
| High Level Project Manager | `/plan`, `/replan` | Define project, create/update roadmap |
| Task Executor | `/next`, `/done`, `/progress`, `/add-feature` | Task lifecycle management |

### Core Skills
| Skill | Command | When |
|-------|---------|------|
| Context Summarizer | `/handoff` | 50% context, session end |
| Codebase Mapper | `/map` | After creating files |
| Pattern Learner | `/learn-patterns` | After creating code |
| Documentation Updater | `/update-docs` | After completing tasks |

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

## 8. COMMANDS — Quick Reference

### Project Management
| Command | Purpose |
|---------|--------|
| `/plan` | Define project and create roadmap |
| `/next` | Start the next task from the roadmap |
| `/done` | Complete current task with verification |
| `/progress` | Show project status dashboard |
| `/add-feature` | Add a new feature to the roadmap |
| `/replan` | Reassess and reorder the full roadmap |
| `/fix` | Start bug fix workflow |
| `/clarify` | Gather requirements before implementing |

### Code Generation
| Command | Purpose |
|---------|--------|
| `/component` | Generate component |
| `/page [name]` | Generate page |
| `/api` | Design API route |
| `/refactor` | Scan for DRY violations |
| `/find-library` | Search for third-party library |

### Documentation & Session
| Command | Purpose |
|---------|--------|
| `/handoff` | Prepare session handoff |
| `/map` | Refresh CODEBASE-MAP.md |
| `/learn-patterns` | Document new patterns |
| `/update-docs` | Update documentation |
| `/note` | Capture learning |

---

## 9. CODING STANDARDS

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

## 10. SERVER PATTERNS

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

## 11. CLIENT PATTERNS

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

## 12. COMMON COMMANDS

```bash
npm start          # Start dev servers
npm run build      # Build client
curl http://localhost:3000/api/auth/me  # Test API
```

---

## 13. QUICK REFERENCE

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

## 14. REMEMBER

1. **Bootstrap first** — Session Bootstrapper before any work
2. **Plan before build** — Use `/plan` to define the project and create the roadmap
3. **One task at a time** — Use `/next` and `/done` to work through tasks systematically
4. **Clarify before code** — Use Task Clarifier for ambiguous tasks
5. **Verify before complete** — Every change needs proof
6. **Document discoveries** — Update knowledge files
7. **Handoff at 50%** — Use `/handoff` before context is full
