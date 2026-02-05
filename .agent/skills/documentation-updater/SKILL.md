---
Skill Name: Documentation Updater
Skill Description: Keeps documentation in sync with code changes
Trigger: Invoked after completing tasks that change documented behavior
---

# Documentation Updater Skill

> **Status**: Stub - Implementation pending

## Purpose
Ensures documentation stays accurate by automatically updating relevant docs when code changes.

## When to Invoke
- After completing any task that changes:
  - API endpoints
  - Component props
  - Configuration options
  - Environment variables
  - Database schema
- After adding new features
- After fixing bugs that reveal documentation gaps

## Expected Behavior
1. Identify what documentation might be affected
2. Check each relevant doc:
   - `.agent/knowledge/CODEBASE-MAP.md`
   - `.agent/knowledge/PATTERNS.md`
   - `.agent/INSTRUCTIONS.md`
   - `README.md`
   - Any inline documentation
3. Update docs to reflect changes
4. Flag if major documentation rewrite needed

## Documentation Types

### Knowledge Files
- Update CODEBASE-MAP when structure changes
- Update PATTERNS when patterns change
- Update GOTCHAS when issues are discovered
- Update DECISIONS when decisions are made

### Code Documentation
- JSDoc comments on functions
- PropTypes on components
- Inline comments for complex logic

### Project Documentation
- README for user-facing changes
- INSTRUCTIONS for agent-facing changes

## Implementation Notes
- Should run as post-task activity
- Should not over-document trivial changes
- Should maintain documentation style consistency

## TODO: Implementation
- [ ] Build change detection logic
- [ ] Create doc-to-change mapping
- [ ] Build documentation update generator
- [ ] Add consistency checker
