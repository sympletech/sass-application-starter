# Architecture Decisions

> **Purpose**: Records significant technical decisions and their rationale. Helps agents understand WHY things are built a certain way.
> **Last Updated**: [Not yet populated]

---

## How to Use This Document

1. **Before proposing a different approach**: Check if there's a documented reason for the current approach
2. **After making a significant decision**: Document it here with rationale
3. **When questioning an approach**: Check here first for context

---

## Decision Record Template

When adding a new decision, use this format:

```markdown
### [DECISION-XXX] Title

**Date**: YYYY-MM-DD
**Status**: Accepted | Superseded by DECISION-XXX | Deprecated

**Context**: What situation prompted this decision?

**Decision**: What was decided?

**Rationale**: Why was this decision made?

**Consequences**: What are the implications?

**Alternatives Considered**: What other options were evaluated?
```

---

## Foundational Decisions

### [DECISION-001] ES6 JavaScript Over TypeScript

**Date**: Project inception
**Status**: Accepted

**Context**: Choosing the primary language for both client and server.

**Decision**: Use modern ES6 JavaScript instead of TypeScript.

**Rationale**: 
- Faster development iteration
- Simpler build configuration
- Lower barrier to entry
- Sufficient type safety through PropTypes and runtime checks

**Consequences**: 
- No compile-time type checking
- Must be diligent with PropTypes
- Runtime errors instead of compile errors

---

### [DECISION-002] Express + React Architecture

**Date**: Project inception
**Status**: Accepted

**Context**: Choosing the application architecture.

**Decision**: Separate Express backend (port 3000) serving API and React frontend (port 3001) for development.

**Rationale**:
- Clean separation of concerns
- Independent scaling potential
- Standard SaaS architecture
- Easy to understand and maintain

**Consequences**:
- CORS configuration needed in development
- Two processes to manage locally
- Build step needed for production

---

### [DECISION-003] Auto-Discovery Route Registration

**Date**: Project inception
**Status**: Accepted

**Context**: How to organize and register API routes.

**Decision**: Routes are auto-discovered by scanning for `_*-routes.js` files.

**Rationale**:
- No manual registration needed
- Self-organizing file structure
- Easy to add new route groups
- Reduces boilerplate

**Consequences**:
- Must follow naming convention exactly
- Slightly magical (less explicit)
- Route files must export default function

---

### [DECISION-004] Ant Design Component Library

**Date**: Project inception
**Status**: Accepted

**Context**: Choosing a UI component library.

**Decision**: Use Ant Design (antd) for all major UI components.

**Rationale**:
- Comprehensive component set
- Professional appearance
- Good documentation
- Active maintenance

**Consequences**:
- Large bundle size
- Must follow antd patterns
- Custom styling may be complex

---

### [DECISION-005] Tailwind + CSS Hybrid Styling

**Date**: Project inception
**Status**: Accepted

**Context**: Choosing a styling approach.

**Decision**: Use Tailwind for utilities and layout, CSS files for complex component styles, CSS variables for all design tokens.

**Rationale**:
- Tailwind for rapid development
- CSS files for maintainable complex styles
- CSS variables for theming consistency

**Consequences**:
- Two systems to understand
- Must be consistent about when to use which
- theme.css must be kept up to date

---

## Feature Decisions

> Add feature-specific decisions as they are made

---

## Superseded Decisions

> Move deprecated decisions here with explanation of what replaced them
