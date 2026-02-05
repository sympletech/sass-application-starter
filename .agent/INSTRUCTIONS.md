# You are working on a SASS project that has:
- Public facing marketing pages
- Secured pages for logged in users
- A native authentication system and an OAuth integration with Google and Facebook
- Stripe integrations to manage user payments

# Core Principles

- All code should be clean, well organized, and human readable.  Favor human readability over conciseness.
- As you discover and learn things document them for later reference
- When you are given a task ask clarifying questions before writing any implementation code
- As the code changes keep the documentation up to date
- Reuse code when ever possible - DRY (Don't Repeat Yourself)
- All tasks MUST be empirically validated using a tool, test, or other method.  It is not good enough to just say the code looks correct.
- You prefer to use well maintained third party libraries as opposed to implementing functionality
- You prefer to spawn sub-agents to complete tasks to keep top level context concise
- When your context window hits 50% recommend starting a new session


**Every change MUST be verified before marking complete**

| Change Type     | Verification Method                        |
|-----------------|--------------------------------------------|
| UI changes      | Browser screenshot confirming visual state |
| API changes     | Terminal command showing correct response  |
| Build changes   | Successful build/test command output       |
| Config changes  | Verification command proving effect        |

**Never Mark A Task As Complete based on**

- "The code looks correct"
- "This should work"
- "I've made similar changes before"

**Always Refer To Your Journal And Keep It Up To Date**

- Journal Location: .agent/JOURNAL.md

# Skills

You have the following skills that are available to you that help you perform specific tasks:
---
Skill Name: Note Taker
Skill Description: Records learnings, user preferences, observations, and other information that will be useful for future work on the project.
Skill Path: .agent/skills/note-taker/SKILL.md
---
Skill Name: Task Clarifier
Skill Description: Helps ensure that a task is well understood and planned out.
Skill Path: .agent/skills/task-clarifier/SKILL.md
---
Skill Name: Bug Fixer
Skill Description: Helps troubleshoot bugs and find the root causes of issues.
Skill Path: .agent/skills/bug-fixer/SKILL.md
---
Skill Name: Task Validator
Skill Description: Validates that tasks are completed to specification.
Skill Path: .agent/skills/task-validator/SKILL.md
---
Skill Name: Third Party Module Finder
Skill Description: Helps locate and validate which third party modules are a good choice to use in the project.
Skill Path: .agent/skills/third-party-module-finder/SKILL.md
---

# Workflows

You have access to the following Workflows that the user can use to automate certain development activities.
If a users natural language prompt aligns with a workflow run the workflow as opposed to simply responding to the prompt.

---
Workflow Name: Create Project Description Workflow
Workflow Description: Creates and initial Project Description
Command to Execute Workflow: /create-project-description
Workflow argument-hint: "<project-name>"
Workflow Path: .agent/skills/high-level-project-manager/SKILL.md
---

# Basic Application Framework and Coding Rules

The application is broken into a front end client application and a back end server application
The Client is built in React and runs on port http://localhost:3001 in development
The Server is built in NodeJS and run on port http://localhost:3000 in development
All code is written in modern ES6 Javascript (NOT TYPESCRIPT)
All imports use the "import" syntax not the require syntax
All functions should be declared as arrow functions ex. 
```
    const myFunction = async ()=> {};
```
DO NOT Use classes, use functional programming
All folders and files should use kebab-case or hyphen-case naming convention

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

# .project-plan framework

You will utilize the .project-plan folder for all of your tasks.  The ..project-plan folder should include the following files:

- .project-plan/PROJECT-DESCRIPTION.md
- .project-plan/ROADMAP.md
- .project-plan/STATE.md
- .project-plan/CURRENT-TASK.md
- .project-plan/DEFECT-LIST.md
- .project-plan/DONE-LIST.md
