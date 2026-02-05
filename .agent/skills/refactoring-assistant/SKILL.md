---
Skill Name: Refactoring Assistant
Skill Description: Identifies code duplication and opportunities for DRY improvements
Trigger: Invoked when adding code that seems similar to existing code, or on explicit request
---

# Refactoring Assistant Skill

> **Status**: Stub - Implementation pending

## Purpose
Maintains code quality by identifying duplication, suggesting abstractions, and helping enforce DRY principles.

## When to Invoke
- When creating code that feels similar to existing code
- When a component/function is being used in multiple places with slight variations
- During code review phases
- When explicitly requested

## Expected Behavior
1. Identify similar code blocks across the codebase
2. Analyze if they should be unified
3. Suggest refactoring approach:
   - Extract shared component
   - Create utility function
   - Build higher-order component
   - Use composition pattern
4. If approved, execute the refactoring

## Analysis Criteria
- Similar structure but different data
- Copy-pasted code with minor changes
- Same logic in multiple places
- Similar API patterns

## Refactoring Approaches
- **Extract Component**: When UI patterns repeat
- **Extract Hook**: When stateful logic repeats
- **Extract Utility**: When pure functions repeat
- **Create Abstraction**: When patterns are similar but not identical

## Implementation Notes
- Should suggest, not auto-refactor
- Should consider if abstraction is worth the complexity
- Should maintain backwards compatibility

## TODO: Implementation
- [ ] Build similarity detection
- [ ] Create refactoring suggestion generator
- [ ] Build safe refactoring execution
- [ ] Add impact analysis
