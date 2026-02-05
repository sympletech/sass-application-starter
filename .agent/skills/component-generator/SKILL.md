---
Skill Name: Component Generator
Skill Description: Scaffolds new components following project patterns exactly
Trigger: Invoked when creating new React components
---

# Component Generator Skill

> **Status**: Stub - Implementation pending

## Purpose
Quickly generates new components that perfectly match project conventions, reducing boilerplate time and ensuring consistency.

## When to Invoke
- When user requests a new component
- When a new component is needed as part of a feature

## Expected Behavior
1. Gather component requirements:
   - Component name
   - Props needed
   - Component type (simple, with state, with data fetching)
2. Generate files:
   - `@client/src/components/{name}/{name}.jsx`
   - `@client/src/components/{name}/{name}.css` (if needed)
3. Follow exact patterns from `.agent/knowledge/PATTERNS.md`

## Component Templates

### Simple Component
- Stateless, presentational
- Props with defaults
- PropTypes
- Optional CSS file

### Stateful Component
- Uses hooks
- Local state management
- Event handlers

### Data-Fetching Component
- Uses useApiGet or useApiPost
- Loading/error states
- Proper data display

### Page Component
- Section-based structure
- Layout integration
- Route configuration note

## Generated File Structure
```
@client/src/components/{component-name}/
├── {component-name}.jsx
└── {component-name}.css (optional)
```

## Implementation Notes
- Should ask clarifying questions before generating
- Should match existing patterns exactly
- Should include helpful comments in generated code

## TODO: Implementation
- [ ] Build template library
- [ ] Create requirements gatherer
- [ ] Build file generator
- [ ] Add route registration hints for pages
