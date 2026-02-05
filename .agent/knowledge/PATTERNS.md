# Code Patterns

> **Purpose**: Documents recurring patterns discovered in the codebase. Agents should follow these patterns when creating new code.
> **Last Updated**: [Not yet populated]

---

## How to Use This Document

1. **Before creating new code**: Check if a relevant pattern exists here
2. **After completing a task**: If you discovered/used a pattern not documented here, add it
3. **Patterns should include**: Name, when to use, example code, and any gotchas

---

## Component Patterns

### Standard Component Structure
```jsx
// @client/src/components/<name>/<name>.jsx
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './<name>.css';

/**
 * Brief description of what this component does.
 */
const ComponentName = ({
    children = <></>,
    className = '',
    variant = 'default'
}) => (
    <div className={classNames('component-name', className)}>
        {children}
    </div>
);

ComponentName.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'alt'])
};

export default ComponentName;
```

**When to use**: Every new component
**Key rules**:
- One component per file
- Arrow function, not function declaration
- Default values in function signature (not defaultProps)
- PropTypes at the bottom
- CSS in separate file if needed

---

## Route Handler Patterns

### Public Route Handler
```javascript
// @server/routes/<feature>/<action>.js
export default async ({ param1, param2 }) => {
    // Business logic here
    return { success: true, data: result };
};
```

### Secured Route Handler
```javascript
// @server/routes/<feature>/<action>.js
export default async ({ param1 }, { user }) => {
    // user is guaranteed to exist
    // Business logic here
    return { success: true, data: result };
};
```

### Route with Error Handling
```javascript
export default async ({ email }) => {
    if (!email) {
        const err = new Error('Email is required');
        err.status = 400;
        throw err;
    }
    
    // For redirects on error
    const err = new Error('Account inactive');
    err.status = 403;
    err.redirect = '/reactivate';
    throw err;
};
```

---

## Data Fetching Patterns

### SWR-Style (Preferred for Data Display)
```jsx
import { useApiGet } from '@client/lib/use-api.js';

const MyComponent = () => {
    const [data, error, isLoading] = useApiGet('/api/endpoint', {
        params: { key: 'value' },
        defaultValue: null,
    });

    if (error) return <div>Error: {error}</div>;
    if (isLoading) return <div>Loading...</div>;
    
    return <div>{data}</div>;
};
```

### Async/Await Style (Preferred for User Actions)
```jsx
import { postData } from '@client/lib/use-api.js';

const handleSubmit = async () => {
    try {
        const result = await postData('/api/endpoint', { data: 'value' });
        // Handle success
    } catch (err) {
        // Handle error
    }
};
```

---

## CSS Patterns

### Component CSS with BEM-like Naming
```css
.component-name {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    
    .component-name__header {
        /* Child element */
    }
    
    .component-name__content {
        /* Another child */
    }
    
    &.component-name--variant {
        /* Modifier */
    }
}
```

### Using Theme Variables
```css
/* Always use variables from theme.css */
.my-component {
    color: var(--text-body);
    background: var(--surface-base);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-soft);
    transition: var(--transition-normal);
}
```

---

## Database Patterns

### Adding a New Collection
```javascript
// In @server/lib/mongo-client.js
db.collections = {
    accounts: db.collection("accounts"),
    sessions: db.collection("sessions"),
    newCollection: db.collection("new-collection"), // Add here
};
```

### Querying Collections
```javascript
import { db } from '@server/lib/mongo-client.js';

// Find one
const user = await db.collections.accounts.findOne({ email });

// Find many
const items = await db.collections.items.find({ userId }).toArray();

// Insert
await db.collections.items.insertOne({ ...data, createdAt: new Date() });

// Update
await db.collections.items.updateOne(
    { _id: itemId },
    { $set: { ...updates, updatedAt: new Date() } }
);
```

---

## Page Patterns

### Page with Sections
```jsx
// @client/src/pages/<name>/<name>.jsx
import HeroSection from './hero-section.jsx';
import FeatureSection from './feature-section.jsx';

const PageName = () => (
    <>
        <HeroSection />
        <FeatureSection />
    </>
);

export default PageName;
```

### Section Component
```jsx
// @client/src/pages/<name>/<section>-section.jsx
import AppSection from '@client/src/components/app-section/app-section.jsx';
import SectionHeader from '@client/src/components/section-header/section-header.jsx';

const FeatureSection = () => (
    <AppSection>
        <SectionHeader title="Features" subtitle="What we offer" />
        {/* Section content */}
    </AppSection>
);

export default FeatureSection;
```

---

## Discovered Patterns

> Add new patterns here as you discover them during development

<!-- 
Template for new patterns:

### Pattern Name
```code
Example code here
```
**When to use**: Description
**Key rules**: List of rules
**Gotchas**: Any pitfalls to avoid
-->
