---
Skill Name: Pattern Learner
Skill Description: Identifies and documents recurring code patterns as the agent works
Trigger: Automatically invoked after completing tasks that involve creating new code
---

# Pattern Learner Skill

> **Status**: Stub - Implementation pending

## Purpose
Continuously improves the knowledge base by identifying patterns during development and documenting them for future use.

## When to Invoke
- After creating new components
- After creating new routes/handlers
- After implementing features that could serve as templates
- When the agent notices it's following an undocumented pattern

## Expected Behavior
1. Analyze recently created code
2. Compare against documented patterns in `.agent/knowledge/PATTERNS.md`
3. If new pattern detected:
   - Document it with example
   - Note when to use it
   - Add any gotchas discovered
4. If existing pattern was followed:
   - Verify it's still accurate
   - Update if implementation has evolved

## Pattern Documentation Format
```markdown
### Pattern Name
\`\`\`code
Example code here
\`\`\`
**When to use**: Description
**Key rules**: List of rules
**Gotchas**: Any pitfalls to avoid
**Discovered**: Date and context
```

## Implementation Notes
- Should not interrupt workflow
- Should run as post-task activity
- Should avoid documenting one-off solutions

## TODO: Implementation
- [ ] Define pattern detection criteria
- [ ] Build comparison logic
- [ ] Create documentation generator
- [ ] Add deduplication logic
