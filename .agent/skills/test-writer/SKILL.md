---
Skill Name: Test Writer
Skill Description: Creates tests for new features following project testing conventions
Trigger: Invoked after implementing features, or when tests are specifically requested
---

# Test Writer Skill

> **Status**: Stub - Implementation pending

## Purpose
Ensures code quality by generating appropriate tests for new features, following project testing patterns.

## When to Invoke
- After completing a feature implementation
- When explicitly requested
- When fixing bugs (regression tests)

## Expected Behavior
1. Analyze the implemented feature
2. Determine appropriate test types:
   - Unit tests for utilities/pure functions
   - Component tests for React components
   - Integration tests for API routes
   - E2E tests for critical user flows
3. Generate test files following project conventions
4. Ensure tests are runnable

## Test Types

### Unit Tests
- For utility functions in `@client/src/lib/`
- For server utilities in `@server/lib/`
- Pure function input/output validation

### Component Tests
- For React components
- Render testing
- User interaction simulation
- Props validation

### API Route Tests
- For route handlers
- Request/response validation
- Error handling verification
- Authentication testing

### E2E Tests
- For critical user flows
- Full stack validation
- Happy path + error paths

## Test File Locations
```
@client/src/components/{name}/__tests__/{name}.test.jsx
@client/src/lib/__tests__/{name}.test.js
@server/routes/{feature}/__tests__/{handler}.test.js
```

## Implementation Notes
- Should match existing test patterns if any exist
- Should focus on behavior, not implementation
- Should include edge cases

## TODO: Implementation
- [ ] Determine testing framework in use
- [ ] Build test template library
- [ ] Create test generation logic
- [ ] Add coverage analysis
