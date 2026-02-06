# Agent Instructions

> **CRITICAL**: This file is your primary guide. Read it completely at session start.

---

## Session Start

**At the beginning of EVERY session, execute the Session Bootstrapper skill.**

→ See: `.agent/skills/session-bootstrapper/SKILL.md`

The Session Bootstrapper will:
1. Load all knowledge files (codebase map, patterns, gotchas, decisions, preferences)
2. Load project state (description, state, current task, roadmap, defects)
3. Scan recent journal entries
4. Determine session type and appropriate workflow
5. Provide you with a status greeting template

**Do NOT start any work until the bootstrap process is complete.**

---

## Quick Reference: Session Types

After bootstrapping, you'll be in one of these modes:

| Type | Situation | Action |
|------|-----------|--------|
| **Planning** | Project not defined | Invoke High Level Project Manager |
| **Continuation** | Task in progress | Resume from CURRENT-TASK.md |
| **New Task** | Ready for next task | Start from ROADMAP.md |
| **Bug Fix** | Critical bugs exist | Address DEFECT-LIST.md first |
| **Framework** | Working on agent/skills | Skip project plan, focus on framework |

---

## Framework vs Product Work

This starter project has two modes of work:

### Framework Work (Starter Maintenance)
Work on the agent infrastructure, skills, documentation, or base application framework.

**Indicators:**
- User mentions: skills, agent, instructions, documentation, knowledge files
- Files being edited are in `.agent/` or are core framework files
- Work doesn't relate to specific product features

**Behavior:**
- Skip project plan checks
- Focus on the framework task at hand
- Update knowledge files as appropriate

### Product Work (Building the Application)
Building features defined in the project plan.

**Indicators:**
- User wants to build features, fix product bugs, implement user stories
- Work relates to items in ROADMAP.md or DEFECT-LIST.md

**Behavior:**
- Follow project plan workflow
- Check CURRENT-TASK.md before starting
- Update project plan files after completing work

---

## Project Plan Workflow

### Starting Work on a Task
1. Select task from ROADMAP.md (respect priority/dependencies)
2. Move task details to CURRENT-TASK.md
3. Remove from ROADMAP.md
4. Begin implementation

### Completing a Task
1. Verify completion (see Verification Requirements)
2. Move task to DONE-LIST.md with completion notes
3. Update STATE.md with current status
4. Update CODEBASE-MAP.md if new files were created (invoke Codebase Mapper)
5. Run Pattern Learner if new code was created (invoke Pattern Learner)
6. Check if ROADMAP.md needs adjustment
7. Update knowledge files if discoveries were made

### Pausing a Task
If you need to switch tasks before completing:
1. Document current progress in CURRENT-TASK.md
2. Move back to ROADMAP.md with "Paused" status and notes
3. Clear CURRENT-TASK.md
4. Proceed with new task

### Discovering a Bug
1. Add to DEFECT-LIST.md BEFORE attempting to fix
2. Inform user: "I found an issue: [description]. Want me to fix it now, or continue with current work?"
3. If fixing, treat like any other task
4. When fixed, move to DONE-LIST.md

---

## Project Overview

This is a **SaaS application** with:
- Public marketing pages (home, about, pricing)
- User authentication (native + Google/Facebook OAuth)
- Stripe payment integration (subscriptions)
- Protected user dashboard and profile

| Component | Technology | Dev Port |
|-----------|------------|----------|
| Frontend | React 19 + Ant Design + Tailwind | http://localhost:3001 |
| Backend | Node.js + Express | http://localhost:3000 |
| Database | MongoDB | via MONGO_URI |
| Payments | Stripe | via API keys |

---

# Core Principles

## Code Quality
- All code should be clean, well organized, and human readable
- Favor human readability over conciseness
- Reuse code whenever possible - DRY (Don't Repeat Yourself)
- Prefer well-maintained third party libraries over custom implementations

## Learning & Documentation
- As you discover and learn things, document them in knowledge files
- As the code changes, keep documentation up to date
- Update CODEBASE-MAP.md when structure changes
- Add to GOTCHAS.md when you discover pitfalls
- Record decisions in DECISIONS.md with rationale

## Task Execution
- Ask clarifying questions before writing implementation code
- Spawn sub-agents for focused tasks to keep context concise
- When context window hits 50%, execute `/handoff` workflow

---

# Verification Requirements

**Every change MUST be verified before marking complete**

| Change Type | Verification Method |
|-------------|---------------------|
| UI changes | Browser screenshot confirming visual state |
| API changes | Terminal command showing correct response |
| Build changes | Successful build/test command output |
| Config changes | Verification command proving effect |

**Never Mark A Task As Complete based on:**
- "The code looks correct"
- "This should work"
- "I've made similar changes before"

---

# Knowledge System

The agent learns and retains knowledge through these files:

| File | Purpose | Update When |
|------|---------|-------------|
| `.agent/knowledge/CODEBASE-MAP.md` | Structure & file locations | New files/routes created |
| `.agent/knowledge/PATTERNS.md` | Code patterns to follow | New patterns discovered |
| `.agent/knowledge/GOTCHAS.md` | Pitfalls to avoid | Bugs fixed, issues found |
| `.agent/knowledge/DECISIONS.md` | Architecture decisions | Significant choices made |
| `.agent/knowledge/USER-PREFERENCES.md` | User working style | Feedback received |
| `.agent/JOURNAL.md` | Session logs | After completing tasks |

**Update these files after completing tasks or fixing bugs.**

---

# Skills

Skills are invoked automatically based on context. Read the skill file for detailed behavior.

## Entry Point Skill
| Skill | Trigger | Path |
|-------|---------|------|
| **Session Bootstrapper** | **FIRST thing every session** | `.agent/skills/session-bootstrapper/SKILL.md` |

> ⚠️ The Session Bootstrapper is MANDATORY at session start. It loads context and determines workflow.

## Core Skills
| Skill | Trigger | Path |
|-------|---------|------|
| High Level Project Manager | Incomplete project plan / planning requests | `.agent/skills/high-level-project-manager/SKILL.md` |
| Context Summarizer | 50% context / session end / `/handoff` | `.agent/skills/context-summarizer/SKILL.md` |
| Codebase Mapper | After creating files / structure changes / `/map` | `.agent/skills/codebase-mapper/SKILL.md` |
| Pattern Learner | After creating code | `.agent/skills/pattern-learner/SKILL.md` |
| Documentation Updater | After completing tasks | `.agent/skills/documentation-updater/SKILL.md` |

> ⚠️ The Context Summarizer is CRITICAL for session continuity. When context reaches 50%, proactively suggest a handoff.

> 📍 The **Codebase Mapper** should be invoked after creating new components, pages, routes, or hooks. Use `/map` for a full refresh.

> 📚 The **Pattern Learner** should be invoked after creating new code to identify and document reusable patterns. Use `/learn-patterns` for manual invocation.

## Task Skills
| Skill | Trigger | Path |
|-------|---------|------|
| Task Clarifier | Before starting tasks | `.agent/skills/task-clarifier/SKILL.md` |
| Task Validator | After completing tasks | `.agent/skills/task-validator/SKILL.md` |
| Bug Fixer | When debugging | `.agent/skills/bug-fixer/SKILL.md` |

## Development Skills
| Skill | Trigger | Path |
|-------|---------|------|
| Component Generator | Creating components | `.agent/skills/component-generator/SKILL.md` |
| API Designer | Creating routes | `.agent/skills/api-designer/SKILL.md` |
| Refactoring Assistant | DRY opportunities | `.agent/skills/refactoring-assistant/SKILL.md` |

## Utility Skills
| Skill | Trigger | Path |
|-------|---------|------|
| Note Taker | Learning something new | `.agent/skills/note-taker/SKILL.md` |
| Third Party Module Finder | Need external library | `.agent/skills/third-party-module-finder/SKILL.md` |

---

# Workflows

Execute these with the command shown:

| Workflow | Command | Purpose |
|----------|---------|---------|
| Session Handoff | `/handoff` | Invoke Context Summarizer to prepare session handoff |
| Codebase Map Refresh | `/map` | Full scan and update of CODEBASE-MAP.md |
| Pattern Learning | `/learn-patterns` | Analyze recent code and document new patterns |
| Document Pattern | `/document-pattern [name]` | Document a specific pattern mentioned by user |

The `/handoff` command triggers the **Context Summarizer** skill which:
- Updates all state and knowledge files
- Writes a comprehensive journal entry
- Ensures the next session can resume immediately

→ See: `.agent/skills/context-summarizer/SKILL.md` for full process

The `/map` command triggers the **Codebase Mapper** skill which:
- Scans all client and server directories
- Updates CODEBASE-MAP.md with current structure
- Detects new components, pages, routes, and hooks

→ See: `.agent/skills/codebase-mapper/SKILL.md` for full process

The `/learn-patterns` command triggers the **Pattern Learner** skill which:
- Analyzes code created during the session
- Identifies reusable patterns not yet documented
- Compares against existing patterns in PATTERNS.md
- Documents new patterns with examples and guidance

→ See: `.agent/skills/pattern-learner/SKILL.md` for full process

---

# Coding Standards

## Language & Syntax
- **ES6 JavaScript only** (NOT TypeScript)
- Use `import` syntax (NOT `require`)
- Arrow functions only: `const myFunction = async () => {}`
- NO classes - use functional programming
- Naming: `kebab-case` for files/folders

## File Organization
```
@client/src/components/{name}/{name}.jsx   # Components
@client/src/pages/{name}/{name}.jsx        # Pages
@client/src/hooks/use-{name}.js            # Hooks
@client/src/lib/{name}.js                  # Utilities
@server/routes/{feature}/_*-routes.js      # Route definitions
@server/routes/{feature}/{action}.js       # Route handlers
@server/lib/{name}.js                      # Server utilities
```

## @server core functionality

The Server is a Node.js Express application that serves the backend API and the built client application in production.

### Directory Structure
```
@server/
├── server.js                    # Main entry point - Express server setup
├── lib/
│   ├── mongo-client.js          # MongoDB client and collection definitions
│   ├── register-routes.js       # Auto-discovers and registers route files
│   ├── register-oauth.js        # OAuth provider configuration (Google, Facebook)
│   ├── stripe-client.js         # Stripe API client
│   ├── client-path-helpers.js   # URL helpers for redirects
│   └── derive-subscription-status.js  # Stripe subscription status helper
└── routes/
    ├── account/                 # Account management routes
    │   ├── _account-routes.js   # Route definitions
    │   ├── signup.js            # Route handlers...
    │   └── ...
    └── auth/                    # Authentication routes
        ├── _auth-routes.js
        ├── login.js
        └── me.js

```

### MongoDB Client
@server/lib/mongo-client.js exports the MongoDB client and database. All collections must be registered in the `db.collections` object:

```javascript
import { MongoClient } from 'mongodb';

export const client = await MongoClient.connect(process.env.MONGO_URI);
export const db = client.db(process.env.MONGO_DB_NAME);

db.collections = {
    accounts: db.collection("accounts"),
    sessions: db.collection("sessions"),
    // Add new collections here
};
```

Usage in route handlers:
```javascript
import { db } from '@server/lib/mongo-client.js';

export default async () => {
    const results = await db.collections.accounts.find({}).toArray();
    return results;
};
```

### Route Registration
Routes are auto-discovered by @server/lib/register-routes.js. Any file matching `@server/routes/**/_*-routes.js` will be loaded.

**Route Definition File Pattern:**
@server/routes/example/_example-routes.js
```javascript
import hello from './hello.js';
import createItem from './create-item.js';

export default ({ get, post, securedGet, securedPost }) => {
    // Public routes
    get('/example/hello', hello);
    post('/example/create-item', createItem);
    
    // Authenticated routes (user must be logged in)
    securedGet('/example/protected', protectedHandler);
    securedPost('/example/update', updateHandler);
};
```

### Route Handler Pattern
Route handlers receive params as the first argument and context as the second.

**Public Route Handler:**
```javascript
export default async ({ name = 'world' }) => {
    return { message: `Hello ${name}` };
};
```

**Secured Route Handler:**
Secured routes receive a `user` object in the context:
```javascript
export default async (_params, { user }) => {
    return {
        message: `Hello ${user.firstName} ${user.lastName}`,
        email: user.email
    };
};
```

**Full Context Object:**
```javascript
export default async (params, { req, res, user }) => {
    // params: GET query params or POST body
    // req: Express request object
    // res: Express response object  
    // user: User document from accounts collection (secured routes only)
};
```

### Error Handling
Throw errors with optional `status` and `redirect` properties:
```javascript
export default async ({ email }) => {
    if (!email) {
        const err = new Error('Email is required');
        err.status = 400;
        throw err;
    }
    
    // Redirect on error
    const err = new Error('Account inactive');
    err.status = 403;
    err.redirect = '/reactivate';
    throw err;
};
```

### Environment Variables
Required environment variables (in `.env`):
- `MONGO_URI` - MongoDB connection string
- `MONGO_DB_NAME` - Database name
- `VITE_SERVER_PORT` - Server port (default: 3000)
- `SESSION_SECRET` - Express session secret
- `PASSWORD_SALT` - Salt for password hashing
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key

## @client core functionality
The Client is a React 19 application that is styled using tailwind.css and uses the antd component library for all of the main UI components.

### Core Principles
- **One File = One Component** - Multiple components should never be created in the same file
- **No Inline Styles** - All CSS styling should use Tailwind utility classes or separate CSS files
- **No defaultProps** - Use default parameter values in function signatures instead (React 19 compatibility)
- **Arrow Functions Only** - All components should be arrow functions, not function declarations

### Directory Structure
```
@client/
├── index.html          # HTML entry point
├── theme.css           # Global CSS variables (colors, spacing, transitions, etc.)
├── src/
│   ├── main.jsx        # React entry point with route definitions
│   ├── index.css       # Global styles, Tailwind imports, shared animations
│   ├── assets/         # Static assets (images, fonts, etc.)
│   ├── components/     # Reusable UI components (each in its own folder)
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Layout components (public, logged-in)
│   ├── lib/            # Utility functions and API helpers
│   └── pages/          # Page components (each page in its own folder)
```

### Component Organization
- All reusable components go in `@client/src/components/<component-name>/<component-name>.jsx`
- Each component folder contains the component file and optional CSS file
- Pages go in `@client/src/pages/<page-name>/<page-name>.jsx`
- Pages can have sub-components in the same folder (e.g., section components)

### Component Pattern
Components should follow this pattern:

@client/src/components/demo/demo.jsx
```jsx
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './demo.css';

/**
 * Brief description of the component.
 */
const Demo = ({
    children = <></>,
    className = '',
    variant = 'default'
}) => (
    <div className={classNames('demo', className, { 'demo--alt': variant === 'alt' })}>
        <div className="demo__content">
            {children}
        </div>
    </div>
);

Demo.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'alt'])
};

export default Demo;
```

@client/src/components/demo/demo.css
```css
.demo {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    padding: 10px;

    .demo__content {
        background: var(--surface-base);
    }
}
```

### Theme Variables
@client/theme.css contains all CSS custom properties. Never hardcode colors - always use variables:
- **Colors:** `--color-brand-500`, `--text-body`, `--surface-base`, etc.
- **Glass Effects:** `--glass-bg`, `--glass-blur`, `--glass-border`
- **States:** `--state-success`, `--state-danger`, `--state-warning`
- **Shadows:** `--shadow-soft`, `--shadow-hero`, `--shadow-glass-hover`
- **Transitions:** `--transition-fast`, `--transition-normal`, `--transition-spring`
- **Radii:** `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`

### Styling Approach
1. **Prefer Tailwind classes** for layout, spacing, and common utilities
2. **Use CSS files** for complex component-specific styles
3. **Use CSS variables** from theme.css for all colors and design tokens
4. **Combine with classNames** utility for conditional classes

## Fetching Data From the Client ##

-- SWR Style using useApiGet or useApiPost
```
import { useState } from 'react';
import { useApiGet } from '@client/lib/use-api.js';

const MyComponent = ()=>{
    const [name, setName] = useState('Tester');
    const [demo, loadingError, isLoading] = useApiGet('/api/demo', {
        params: { name },
        defaultValue: 'Loading...',
    });

    if(loadingError){
        return <div>{loadingError}<div>
    }

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <div>
            {demo}
            <input onChange={(evt)=>setName(evt.target.value)}>
        </div>
    )
}

```

-- Async/Await style using getData or postData
```
import { useState, useEffect } from 'react';
import { getData } from '@client/lib/use-api.js';

const MyComponent = ()=>{
    const [name, setName] = useState('Tester123');
    const [demo, setDemo] = useState();
    const [loadingError, setLoadingError] = useState();
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        setIsLoading(true);
        setLoadingError(null);
        (async () => {
            try {
                const demoUpdate = await getData('/api/demo', { name });
                setDemo(demoUpdate);
            } catch (err) {
                setLoadingError(err);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [name]);    

    if(loadingError){
        return <div>{loadingError}<div>
    }

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <div>
            {demo}
            <input onChange={(evt)=>setName(evt.target.value)}>
        </div>
    )
}

```

PREFER SWR STYLE DATA LOADING AND ASYNC/AWAIT STYLE FOR POSTING UPDATES THAT ARE TRIGGERED BY USER ACTIONS.

---

# Session Management

## Starting a Session
Execute the **Session Bootstrapper** skill (see top of this document).

→ See: `.agent/skills/session-bootstrapper/SKILL.md`

## During a Session

### For Product Work
- Follow the Project Plan Workflow (see above)
- Keep CURRENT-TASK.md updated with progress
- Document bugs in DEFECT-LIST.md before fixing

### For Framework Work
- Focus on the specific task
- Update relevant knowledge files
- No project plan updates needed

### Always
- Update JOURNAL.md after completing significant work
- Update knowledge files when discoveries are made
- **Monitor context usage** - suggest handoff at 50%

## Ending a Session (Context Summarizer)

Execute the **Context Summarizer** skill when:
- Context window reaches ~50% capacity
- User wants to wrap up or take a break
- Switching to a significantly different task
- User executes `/handoff` command

→ See: `.agent/skills/context-summarizer/SKILL.md`

The Context Summarizer will:
1. Assess what was accomplished this session
2. Update all knowledge files with discoveries
3. Update STATE.md and CURRENT-TASK.md
4. Write a detailed JOURNAL.md entry
5. Provide handoff confirmation

**Proactive Handoff**: When you notice context is getting full, suggest:
```
💡 My context window is getting full (~50% used). 
To preserve our progress, I recommend doing a handoff now.
Shall I prepare the handoff?
```

---

# Common Commands

```bash
# Start development servers
npm start

# Build Client
npm run build

# Test API endpoint
curl http://localhost:3000/api/auth/me

```

---

# Import Aliases

| Alias | Resolves To |
|-------|-------------|
| `@client/` | `./client/` |
| `@server/` | `./server/` |

---

# Quick Reference

## Adding a New API Route
1. Create handler in `@server/routes/{feature}/{action}.js`
2. Import and register in `@server/routes/{feature}/_*-routes.js`
3. Update CODEBASE-MAP.md

## Adding a New Component
1. Create `@client/src/components/{name}/{name}.jsx`
2. Optional: Create `{name}.css` in same folder
3. Follow pattern in PATTERNS.md
4. Update CODEBASE-MAP.md

## Adding a New Page
1. Create `@client/src/pages/{name}/{name}.jsx`
2. Add route in `@client/src/main.jsx`
3. Update CODEBASE-MAP.md

## Adding a Database Collection
1. Add to `db.collections` in `@server/lib/mongo-client.js`
2. Update CODEBASE-MAP.md

---

# Remember

1. **Read before you write** - Check knowledge files first
2. **Verify before complete** - Every change needs proof
3. **Document as you go** - Update knowledge files
4. **Ask when uncertain** - Clarify before implementing
5. **Handoff before context full** - Preserve continuity
