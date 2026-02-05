---
Skill Name: Context Summarizer
Skill Description: Creates handoff summaries when context window is getting full
Trigger: Automatically invoked when context usage reaches 50%, or before ending a session
---

# Context Summarizer Skill

> **Status**: Stub - Implementation pending

## Purpose
Ensures smooth session transitions by creating comprehensive handoff documents that capture all relevant context for the next session.

## When to Invoke
- When context window reaches 50% capacity
- Before intentionally ending a session
- When user requests a session handoff
- When switching to a significantly different task

## Expected Behavior
1. Analyze current session state
2. Identify what needs to be captured:
   - Work completed
   - Work in progress
   - Decisions made
   - Problems encountered
   - Next steps planned
3. Update relevant files:
   - `.agent/JOURNAL.md` with session log
   - `.project-plan/STATE.md` with current state
   - `.project-plan/CURRENT-TASK.md` if task in progress
   - Knowledge files if discoveries were made
4. Provide clear handoff instructions

## Handoff Document Structure

### Journal Entry
```markdown
## Session: [Date/Time]

### Completed This Session
- [List of completed work]

### In Progress
- [Current task state]
- [Where we left off]
- [Next immediate step]

### Decisions Made
- [Any decisions with rationale]

### Issues Encountered
- [Problems and their resolutions or status]

### Notes for Next Session
- [Important context to remember]
- [Warnings or gotchas discovered]
```

### State Update
Current application state, what's working, what's not.

### Task Update
Detailed state of current task if one is in progress.

## Implementation Notes
- Should be thorough but concise
- Should prioritize actionable information
- Should make it easy to resume immediately

## TODO: Implementation
- [ ] Build context analysis logic
- [ ] Create summarization templates
- [ ] Build file update logic
- [ ] Add "ready to handoff" validation
