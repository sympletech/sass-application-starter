---
Skill Name: Refactoring Assistant
Skill Description: Identifies code duplication, DRY violations, and refactoring opportunities to maintain code quality and consistency
Trigger: Invoked when adding similar code, during code reviews, or when explicitly requested
---

# Refactoring Assistant Skill

## Purpose
Maintains code quality by identifying duplication, suggesting abstractions, and executing safe refactoring operations that follow project patterns.

## When to Invoke
- **After adding code** that feels similar to existing code
- **During code reviews** when patterns repeat
- **When copy-pasting** code between files
- **When a component/function** is used in multiple places with variations
- **On explicit request** via `/refactor` command
- **After completing features** to identify optimization opportunities

---

## Execution Process

### Phase 1: Identify Duplication

**Scan for these duplication patterns:**

| Pattern Type | What to Look For |
|--------------|------------------|
| **Structural** | Same JSX structure with different props/content |
| **Logical** | Same conditional logic or data transformations |
| **Behavioral** | Same event handlers or state management patterns |
| **Stylistic** | Same CSS classes applied repeatedly |
| **API** | Same fetch/mutation patterns with different endpoints |

**Detection Triggers:**
- Two or more code blocks with >70% structural similarity
- Same function/hook used with identical configuration
- Copy-pasted code with only variable name changes
- Similar error handling patterns repeated
- Identical layout structures across pages

### Phase 2: Analyze Refactoring Value

Before suggesting refactoring, evaluate:

| Question | Consider |
|----------|----------|
| **Frequency** | How many times does this pattern appear? (3+ = high value) |
| **Stability** | Will this pattern likely change together or diverge? |
| **Complexity** | Would abstraction simplify or complicate? |
| **Readability** | Would abstraction improve or hurt understanding? |
| **Maintenance** | Would changes need to happen in multiple places? |

**Refactor when:**
- Pattern appears 3+ times
- Changes would need to be synchronized
- Abstraction reduces total lines of code
- Pattern is stable and unlikely to diverge

**Don't refactor when:**
- Only 2 occurrences and likely to diverge
- Abstraction would be more complex than duplication
- Differences are intentional and semantic
- Code is in flux and patterns aren't settled

### Phase 3: Select Refactoring Strategy

Choose the appropriate strategy based on what's duplicated:

#### Strategy: Extract Component
**Use when:** UI patterns repeat with different data/content

**Candidates:**
- Same card layout used in multiple places
- Repeated form field patterns
- Similar list item structures
- Shared section layouts

**Template:** `@client/src/components/{component-name}/{component-name}.jsx`

#### Strategy: Extract Hook
**Use when:** Stateful logic repeats across components

**Candidates:**
- Same useState + useEffect pattern
- Shared data fetching logic
- Common form handling
- Repeated event listeners

**Template:** `@client/src/hooks/use-{name}.js`

#### Strategy: Extract Utility
**Use when:** Pure functions repeat

**Candidates:**
- Same data transformation
- Shared validation logic
- Common formatting functions
- Repeated calculations

**Template:** `@client/src/lib/{name}.js` or `@server/lib/{name}.js`

#### Strategy: Parameterize Component
**Use when:** Component variants differ by small configuration

**Candidates:**
- Button with different sizes
- Card with different themes
- Input with different validation

**Approach:** Add props with sensible defaults

#### Strategy: Composition Pattern
**Use when:** Components share base behavior but have unique parts

**Candidates:**
- Pages with shared layout but different sections
- Cards with shared structure but different content areas
- Forms with shared validation but different fields

**Approach:** Use children, render props, or slot patterns

### Phase 4: Propose Refactoring

Present refactoring proposal to user:

```
🔧 **Refactoring Opportunity Detected**

**Pattern:** [Description of the repeated pattern]
**Occurrences:** [List of files/locations]
**Strategy:** [Extract Component/Hook/Utility/etc.]

**Proposed Abstraction:**
- **Name:** `{proposed-name}`
- **Location:** `{file-path}`
- **Props/Params:** [List key parameters]

**Benefits:**
- [Benefit 1]
- [Benefit 2]

**Files to Update:**
- [File 1] - Replace with new abstraction
- [File 2] - Replace with new abstraction

Shall I proceed with this refactoring?
```

### Phase 5: Execute Refactoring

If approved, execute safely:

1. **Create the abstraction** (new component/hook/utility)
2. **Update first usage** and verify it works
3. **Update remaining usages** one at a time
4. **Run verification** to ensure nothing broke
5. **Remove dead code** that's no longer needed
6. **Update documentation** (CODEBASE-MAP.md, imports)

### Phase 6: Verify and Document

- Test that all updated usages work correctly
- Update CODEBASE-MAP.md with new abstraction
- Document the pattern in PATTERNS.md if it's reusable
- Note any gotchas discovered during refactoring

---

## Refactoring Templates

### Template: Extracted Component

```jsx
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * [Brief description of what this component abstracts]
 * Extracted from: [list original locations]
 */
const ComponentName = ({
    // Required props
    requiredProp,
    // Optional props with defaults
    optionalProp = 'default',
    className = '',
    children = null
}) => (
    <div className={classNames('component-name', className)}>
        {/* Extracted structure */}
    </div>
);

ComponentName.propTypes = {
    requiredProp: PropTypes.string.isRequired,
    optionalProp: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
};

export default ComponentName;
```

### Template: Extracted Hook

```javascript
import { useState, useEffect } from 'react';

/**
 * [Brief description of what this hook abstracts]
 * Extracted from: [list original locations]
 * 
 * @param {Object} options - Hook configuration
 * @param {type} options.param - Description
 * @returns {Object} { value, loading, error, actions }
 */
export const useHookName = ({ param = defaultValue } = {}) => {
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Extracted effect logic
    }, [param]);

    const actions = {
        // Extracted action methods
        reset: () => setValue(null),
    };

    return { value, loading, error, ...actions };
};
```

### Template: Extracted Utility

```javascript
/**
 * [Brief description of what this utility does]
 * Extracted from: [list original locations]
 * 
 * @param {type} param - Description
 * @returns {type} Description of return value
 */
export const utilityName = (param) => {
    // Extracted logic
    return result;
};

/**
 * Related utility if applicable
 */
export const relatedUtility = (param) => {
    // Related logic
    return result;
};
```

### Template: Parameterized Component Props

When adding variants to existing component:

```jsx
const Component = ({
    // Existing props...
    
    // NEW: Variant prop with clear options
    variant = 'default',  // 'default' | 'compact' | 'large'
    
    // NEW: Feature flags for optional behavior
    showIcon = true,
    showDescription = false,
}) => (
    <div className={classNames('component', {
        'component--compact': variant === 'compact',
        'component--large': variant === 'large',
    })}>
        {showIcon && <Icon />}
        {/* ... */}
        {showDescription && <p>{description}</p>}
    </div>
);
```

---

## Common Refactoring Scenarios

### Scenario: Repeated Card Layouts

**Before:**
```jsx
// In file-a.jsx
<div className="bg-white rounded-lg p-6 shadow">
    <h3>{titleA}</h3>
    <p>{descriptionA}</p>
</div>

// In file-b.jsx
<div className="bg-white rounded-lg p-6 shadow">
    <h3>{titleB}</h3>
    <p>{descriptionB}</p>
</div>
```

**After:**
```jsx
// In components/content-card/content-card.jsx
const ContentCard = ({ title, description, className }) => (
    <div className={classNames('bg-white rounded-lg p-6 shadow', className)}>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

// Usage in both files
<ContentCard title={title} description={description} />
```

### Scenario: Repeated Data Fetching

**Before:**
```jsx
// In component-a.jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
    getData('/api/resource-a').then(setData).finally(() => setLoading(false));
}, []);

// In component-b.jsx  
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
    getData('/api/resource-b').then(setData).finally(() => setLoading(false));
}, []);
```

**After:**
```jsx
// Use existing useApiGet hook from @client/lib/use-api.js
const [data, error, loading] = useApiGet('/api/resource-a');
```

### Scenario: Repeated Form Validation

**Before:**
```jsx
// In signup.jsx
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// In login.jsx (same function)
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
```

**After:**
```javascript
// In lib/validation-utils.js
export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Usage
import { isValidEmail } from '@client/lib/validation-utils.js';
```

### Scenario: Repeated Error Handling

**Before:**
```jsx
// In multiple files
try {
    await postData('/api/action');
    message.success('Done!');
} catch (error) {
    if (error?.response?.data?.error) {
        message.error(error.response.data.error);
    } else {
        message.error('Something went wrong');
    }
}
```

**After:**
```jsx
// Use existing handleApiError from @client/lib/error-utils.js
import { handleApiError } from '@client/lib/error-utils.js';

try {
    await postData('/api/action');
    message.success('Done!');
} catch (error) {
    handleApiError(error, 'Something went wrong');
}
```

---

## Code Smell Detection

Look for these indicators that suggest refactoring is needed:

### High Priority Smells
| Smell | Indicator | Refactoring |
|-------|-----------|-------------|
| **Copy-Paste Code** | Identical blocks in multiple files | Extract to shared module |
| **Long Component** | Component > 200 lines | Split into sub-components |
| **Prop Drilling** | Same props passed through 3+ levels | Use context or composition |
| **Giant Conditional** | if/switch with 5+ branches rendering UI | Extract to separate components |
| **Magic Strings** | Same string literal used in multiple places | Extract to constants |

### Medium Priority Smells
| Smell | Indicator | Refactoring |
|-------|-----------|-------------|
| **Similar Functions** | Functions with 80%+ same logic | Parameterize differences |
| **Repeated useEffect** | Same effect pattern in multiple components | Extract to custom hook |
| **Inline Styles** | Tailwind classes repeated verbatim | Extract to CSS class or component |
| **Hardcoded Values** | Colors, sizes not using theme variables | Use CSS variables |

### Low Priority Smells
| Smell | Indicator | Refactoring |
|-------|-----------|-------------|
| **Long Imports** | Same 5+ imports in multiple files | Consider re-export barrel file |
| **Similar Tests** | Test setup repeated | Extract test utilities |

---

## Impact Analysis

Before refactoring, assess impact:

### Check Dependencies
```
1. Search for all usages of the code being changed
2. Identify components that import the affected module
3. Check if any tests depend on current structure
4. Look for any dynamic imports or lazy loading
```

### Risk Assessment
| Change Type | Risk Level | Mitigation |
|-------------|------------|------------|
| Rename export | Medium | Check all imports |
| Change prop names | High | Update all usages |
| Change function signature | High | Update all call sites |
| Add optional prop | Low | Defaults handle existing usages |
| Extract to new file | Low | Import paths change only |

### Breaking Change Checklist
- [ ] All usages identified
- [ ] No dynamic imports that might be missed
- [ ] Prop/param defaults cover existing usages
- [ ] Test coverage exists for affected code
- [ ] Can verify each change works

---

## Anti-Patterns to Avoid

### ❌ Premature Abstraction
```jsx
// BAD: Creating abstraction for single use
const SingleUseWrapper = ({ children }) => <div>{children}</div>;

// GOOD: Wait until pattern appears 3+ times
```

### ❌ Over-Abstraction
```jsx
// BAD: So generic it's confusing
const GenericContainer = ({ as: Tag, variant, size, color, ...props }) => (
    <Tag className={getClasses(variant, size, color)} {...props} />
);

// GOOD: Specific, clear purpose
const FeatureCard = ({ title, description, icon }) => (
    <div className="feature-card">
        {icon}
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);
```

### ❌ Wrong Abstraction
```jsx
// BAD: Forcing things together that should differ
const UnifiedButton = ({ type }) => {
    if (type === 'submit') return <button type="submit">Submit</button>;
    if (type === 'link') return <a href="#">Link</a>;
    if (type === 'action') return <span onClick={...}>Action</span>;
};

// GOOD: Let different things be different
const SubmitButton = () => <button type="submit">Submit</button>;
const LinkButton = ({ href }) => <a href={href}>Link</a>;
```

### ❌ Abstraction Without Verification
```jsx
// BAD: Refactoring without testing
// "I'll just extract this and update all the imports..."

// GOOD: Verify each step
// 1. Create abstraction
// 2. Update ONE usage
// 3. Verify it works
// 4. Update next usage
// 5. Repeat
```

---

## Commands

| Command | Action |
|---------|--------|
| `/refactor` | Scan recent changes for refactoring opportunities |
| `/refactor {file}` | Analyze specific file for DRY violations |
| `/refactor-check` | Report on code duplication without making changes |
| `/extract-component {name}` | Start component extraction workflow |
| `/extract-hook {name}` | Start hook extraction workflow |

---

## Integration Points

| After Refactoring | Next Step |
|-------------------|-----------|
| New component created | Update CODEBASE-MAP.md (invoke Codebase Mapper) |
| New pattern established | Document in PATTERNS.md (invoke Pattern Learner) |
| Found potential issue | Add to GOTCHAS.md |
| Large refactoring complete | Run Documentation Updater |

---

## Checklist: Before Refactoring

- [ ] Pattern appears 3+ times (or 2+ times and stable)
- [ ] Abstraction would reduce total complexity
- [ ] All usages identified
- [ ] Clear name for the abstraction
- [ ] Appropriate location determined
- [ ] User has approved the refactoring plan

## Checklist: During Refactoring

- [ ] Abstraction created following project patterns
- [ ] First usage updated and verified
- [ ] Remaining usages updated incrementally
- [ ] Each change verified before proceeding
- [ ] No breaking changes to public interfaces

## Checklist: After Refactoring

- [ ] All usages verified working
- [ ] Dead code removed
- [ ] CODEBASE-MAP.md updated
- [ ] PATTERNS.md updated if new pattern
- [ ] No console errors or warnings
- [ ] Imports cleaned up
