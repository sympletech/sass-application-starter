# Gotchas & Pitfalls

> **Purpose**: Documents known issues, edge cases, and things that have caused problems in the past. Check this before making changes to avoid repeating mistakes.
> **Last Updated**: [Not yet populated]

---

## How to Use This Document

1. **Before making changes**: Scan relevant sections for known issues
2. **After fixing a bug**: Document the root cause and solution here
3. **After discovering an edge case**: Add it here to prevent future issues

---

## React / Client-Side

### Do NOT Use defaultProps
❌ **Wrong**:
```jsx
MyComponent.defaultProps = {
    variant: 'default'
};
```

✅ **Correct**:
```jsx
const MyComponent = ({ variant = 'default' }) => { ... };
```
**Why**: React 19 deprecates defaultProps for function components.

---

### Do NOT Use Inline Styles
❌ **Wrong**:
```jsx
<div style={{ color: 'red', padding: '10px' }}>
```

✅ **Correct**:
```jsx
<div className="my-component">
// with CSS:
.my-component { color: var(--state-danger); padding: 10px; }
```
**Why**: Project convention - use Tailwind classes or CSS files.

---

### Do NOT Hardcode Colors
❌ **Wrong**:
```css
.my-component { color: #333; background: #fff; }
```

✅ **Correct**:
```css
.my-component { color: var(--text-body); background: var(--surface-base); }
```
**Why**: All colors should come from theme.css for consistency and theming support.

---

## Server-Side

### Route Files Must Match Pattern
Route definition files **must** match the pattern `_*-routes.js` to be auto-discovered.

❌ **Wrong**: `routes.js`, `account-routes.js`, `_routes.js`
✅ **Correct**: `_account-routes.js`, `_auth-routes.js`

---

### Always Use db.collections
❌ **Wrong**:
```javascript
const accounts = db.collection('accounts');
```

✅ **Correct**:
```javascript
import { db } from '@server/lib/mongo-client.js';
const accounts = db.collections.accounts;
```
**Why**: Collections should be registered centrally for consistency.

---

### Secured Routes Receive user in Context, Not Params
❌ **Wrong**:
```javascript
export default async ({ user }) => { ... };
```

✅ **Correct**:
```javascript
export default async (params, { user }) => { ... };
```
**Why**: user comes from the context object (second parameter), not the params object.

---

## Build & Deployment

### [Add build-related gotchas as discovered]

---

## Stripe Integration

### [Add Stripe-specific gotchas as discovered]

---

## OAuth

### [Add OAuth-specific gotchas as discovered]

---

## Database

### [Add MongoDB-specific gotchas as discovered]

---

## Discovered Issues

> Add new gotchas here as you encounter them

<!--
Template for new gotchas:

### Issue Title
❌ **Wrong**:
```code
Bad example
```

✅ **Correct**:
```code
Good example
```
**Why**: Explanation of why this matters
**Discovered**: Date and context
-->
