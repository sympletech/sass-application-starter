---
Skill Name: Component Generator
Skill Description: Scaffolds new components following project patterns exactly
Trigger: Invoked when creating new React components
---

# Component Generator Skill

## Purpose
Quickly generates new components that perfectly match project conventions, reducing boilerplate time and ensuring consistency across the codebase.

## When to Invoke

| Trigger | Description |
|---------|-------------|
| User requests a new component | "Create a component for..." |
| Feature requires new UI element | Part of a larger feature implementation |
| User executes `/component` | Manual invocation with component details |
| Refactoring extracts reusable code | Breaking out shared UI into component |

---

## Execution Process

### Phase 1: Gather Requirements

Before generating code, determine component specifications:

#### 1.1 Essential Questions

| Question | Options |
|----------|---------|
| **Component name?** | kebab-case (e.g., `user-avatar`, `data-table`) |
| **Component type?** | Simple, Stateful, Data-Fetching, Page, Section |
| **Location?** | `components/` (reusable) or `pages/{name}/` (page-specific) |
| **Needs CSS file?** | Yes if complex styling, No if Tailwind-only |
| **Required props?** | List with types and defaults |

#### 1.2 Component Type Determination

| Type | Indicators |
|------|------------|
| **Simple** | Presentational only, no state, no side effects |
| **Stateful** | Uses useState, useEffect, or custom hooks |
| **Data-Fetching** | Uses useApiGet/useApiPost, shows loading/error states |
| **Page** | Top-level route component, composes sections |
| **Section** | Part of a page, uses AppSection wrapper |

#### 1.3 Clarifying Questions Template

If requirements are unclear, ask:

```
Before I create this component, I have a few questions:

1. **Name**: What should we call this component? (e.g., `user-card`)
2. **Purpose**: What does this component display/do?
3. **Props**: What data does it need? Any required vs optional?
4. **State**: Does it manage any local state?
5. **Data**: Does it fetch data from an API?
6. **Styling**: Complex styles (needs CSS file) or simple (Tailwind only)?
7. **Location**: Reusable component or page-specific?
```

### Phase 2: Generate Files

Based on requirements, generate appropriate files.

---

## Component Templates

### Template 1: Simple Component (Presentational)

**Use when:** Stateless, receives all data via props

**File:** `@client/src/components/{name}/{name}.jsx`
```jsx
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './{name}.css';

/**
 * {Description of what this component does}
 */
const {ComponentName} = ({
    children = <></>,
    className = '',
    // Add required props here
}) => (
    <div className={classNames('{name}', className)}>
        {children}
    </div>
);

{ComponentName}.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    // Add prop types here
};

export default {ComponentName};
```

**File:** `@client/src/components/{name}/{name}.css`
```css
.{name} {
    /* Component styles using theme variables */
}
```

---

### Template 2: Stateful Component (With Hooks)

**Use when:** Manages local state, event handlers, or effects

**File:** `@client/src/components/{name}/{name}.jsx`
```jsx
import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './{name}.css';

/**
 * {Description of what this component does}
 */
const {ComponentName} = ({
    initialValue = null,
    onChange = () => {},
    className = '',
}) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = useCallback((newValue) => {
        setValue(newValue);
        onChange(newValue);
    }, [onChange]);

    return (
        <div className={classNames('{name}', className)}>
            {/* Component content */}
        </div>
    );
};

{ComponentName}.propTypes = {
    initialValue: PropTypes.any,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

export default {ComponentName};
```

---

### Template 3: Data-Fetching Component

**Use when:** Component needs to load data from API

**File:** `@client/src/components/{name}/{name}.jsx`
```jsx
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Spin, Alert } from 'antd';
import { useApiGet } from '@client/lib/use-api.js';

import './{name}.css';

/**
 * {Description of what this component does}
 */
const {ComponentName} = ({
    id = null,
    className = '',
}) => {
    const [data, error, isLoading] = useApiGet('/api/{endpoint}', {
        params: { id },
        defaultValue: null,
    });

    if (error) {
        return (
            <Alert
                type="error"
                message="Error loading data"
                description={error}
            />
        );
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-8">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className={classNames('{name}', className)}>
            {/* Render data here */}
        </div>
    );
};

{ComponentName}.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
};

export default {ComponentName};
```

---

### Template 4: Page Component

**Use when:** Top-level route component

**File:** `@client/src/pages/{name}/{name}.jsx`
```jsx
// Hooks
import { useReveal } from '@client/hooks/use-reveal.js';

// Section Components
import HeroSection from './hero-section.jsx';
import ContentSection from './content-section.jsx';

/**
 * {Page name} page - {brief description}
 */
const {PageName} = () => {
    // Initialize reveal animations
    useReveal();

    return (
        <div className="{PageName} overflow-hidden">
            <HeroSection />
            <ContentSection />
        </div>
    );
};

export default {PageName};
```

**Note:** After creating a page, add route in `@client/src/main.jsx`

---

### Template 5: Section Component

**Use when:** Section within a page

**File:** `@client/src/pages/{page-name}/{section}-section.jsx`
```jsx
import AppSection from '@client/src/components/app-section/app-section.jsx';
import SectionHeader from '@client/src/components/section-header/section-header.jsx';

/**
 * {Section description}
 */
const {SectionName}Section = () => (
    <AppSection className="reveal">
        <SectionHeader
            title="{Section Title}"
            subtitle="{Section subtitle}"
        />
        <div className="mt-12">
            {/* Section content */}
        </div>
    </AppSection>
);

export default {SectionName}Section;
```

---

### Template 6: Component with Ant Design

**Use when:** Using Ant Design components

**File:** `@client/src/components/{name}/{name}.jsx`
```jsx
import PropTypes from 'prop-types';
import { Card, Typography, Button } from 'antd';
import classNames from 'classnames';

const { Title, Paragraph } = Typography;

/**
 * {Description of what this component does}
 */
const {ComponentName} = ({
    title = '',
    description = '',
    onAction = () => {},
    className = '',
}) => (
    <Card
        className={classNames('rounded-2xl', className)}
        variant="outlined"
    >
        <Title level={4}>{title}</Title>
        <Paragraph className="text-text-body">{description}</Paragraph>
        <Button type="primary" onClick={onAction}>
            Action
        </Button>
    </Card>
);

{ComponentName}.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    onAction: PropTypes.func,
    className: PropTypes.string,
};

export default {ComponentName};
```

---

## CSS File Template

When component needs a CSS file:

**File:** `@client/src/components/{name}/{name}.css`
```css
.{name} {
    /* Use theme variables from @client/theme.css */
    background: var(--surface-base);
    border-radius: var(--radius-md);
    padding: var(--spacing-md, 16px);
    transition: var(--transition-normal);

    /* Child elements using BEM-like nesting */
    .{name}__header {
        color: var(--text-title);
        margin-bottom: var(--spacing-sm, 8px);
    }

    .{name}__content {
        color: var(--text-body);
    }

    /* Modifiers */
    &.{name}--highlighted {
        border: 1px solid var(--color-brand-500);
        box-shadow: var(--shadow-glass-hover);
    }
}
```

---

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Component file | `kebab-case.jsx` | `user-avatar.jsx` |
| Component folder | `kebab-case/` | `user-avatar/` |
| Component name | `PascalCase` | `UserAvatar` |
| CSS file | `kebab-case.css` | `user-avatar.css` |
| CSS class | `kebab-case` | `.user-avatar` |
| CSS child | `parent__child` | `.user-avatar__image` |
| CSS modifier | `parent--modifier` | `.user-avatar--large` |

---

## Prop Type Reference

Common PropTypes to use:

```jsx
import PropTypes from 'prop-types';

ComponentName.propTypes = {
    // Primitives
    stringProp: PropTypes.string,
    numberProp: PropTypes.number,
    boolProp: PropTypes.bool,
    
    // Required
    requiredProp: PropTypes.string.isRequired,
    
    // React elements
    children: PropTypes.node,
    element: PropTypes.element,
    icon: PropTypes.node,
    
    // Functions
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    
    // Collections
    items: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
    }),
    
    // Enum
    variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    
    // Style
    className: PropTypes.string,
    style: PropTypes.object,
};
```

---

## Integration Points

| After Component Generator | Consider Invoking |
|---------------------------|-------------------|
| Component created | Codebase Mapper (update map) |
| Page created | Update main.jsx routes |
| Pattern emerged | Pattern Learner |
| Documentation needed | Documentation Updater |

| Before Component Generator | Check |
|----------------------------|-------|
| PATTERNS.md | Existing patterns to follow |
| Similar components | Existing code for reference |
| Component requirements | Clear specifications |

---

## Output: Component Generation Confirmation

After generating component files:

```
🧩 **Component Generated**

**Component**: {ComponentName}
**Type**: [Simple | Stateful | Data-Fetching | Page | Section]
**Location**: `@client/src/components/{name}/`

**Files created**:
- `{name}.jsx` - Component implementation
- `{name}.css` - Styles (if applicable)

**Props**:
| Prop | Type | Required | Default |
|------|------|----------|---------|
| {prop} | {type} | {yes/no} | {default} |

**Next steps**:
- [ ] Import and use in parent component
- [ ] Add to route in main.jsx (if page)
- [ ] Update CODEBASE-MAP.md

Component follows patterns from PATTERNS.md ✓
```

---

## Command Reference

| Command | Description |
|---------|-------------|
| `/component` | Start component generation workflow |
| `/component {name}` | Generate component with specified name |
| `/page {name}` | Generate page component with sections |
| `/section {name}` | Generate section component |

---

## Anti-Patterns (What NOT to Generate)

❌ **DON'T** generate:

| Anti-Pattern | Why |
|--------------|-----|
| Multiple components in one file | Project convention: one file = one component |
| Class components | Project uses functional components only |
| defaultProps | Use default parameter values instead |
| Inline styles | Use Tailwind classes or CSS files |
| Hardcoded colors | Use theme variables |
| require() imports | Use ES6 import syntax |
| Function declarations | Use arrow functions |

✅ **DO** generate:

| Best Practice | Why |
|---------------|-----|
| Arrow function components | Project convention |
| PropTypes at bottom | Consistent structure |
| Default values in signature | React 19 compatible |
| classNames utility | Conditional class handling |
| Theme CSS variables | Consistent theming |
| Separate CSS file | Organized styles |

---

## Examples

### Example 1: Simple Icon Button

**Request:** "Create a component for an icon button"

**Generated:**
```jsx
// @client/src/components/icon-button/icon-button.jsx
import PropTypes from 'prop-types';
import { Button } from 'antd';
import classNames from 'classnames';

/**
 * A button component that displays only an icon.
 */
const IconButton = ({
    icon = <></>,
    onClick = () => {},
    size = 'medium',
    variant = 'default',
    className = '',
}) => (
    <Button
        type={variant === 'primary' ? 'primary' : 'default'}
        size={size}
        icon={icon}
        onClick={onClick}
        className={classNames('icon-button', className)}
    />
);

IconButton.propTypes = {
    icon: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['default', 'primary']),
    className: PropTypes.string,
};

export default IconButton;
```

### Example 2: Data Card with Loading

**Request:** "Create a component that fetches and displays user stats"

**Generated:** Uses Template 3 (Data-Fetching Component) with stats-specific content.

---

## Checklist

Before completing component generation:

- [ ] Component name follows kebab-case convention
- [ ] Files created in correct location
- [ ] Uses arrow function, not function declaration
- [ ] PropTypes defined for all props
- [ ] Default values in function signature (not defaultProps)
- [ ] Uses classNames utility for className handling
- [ ] CSS uses theme variables (no hardcoded colors)
- [ ] JSDoc comment describes component purpose
- [ ] Imports are clean and organized
- [ ] Component is exported as default
- [ ] CODEBASE-MAP.md updated (via Codebase Mapper)
