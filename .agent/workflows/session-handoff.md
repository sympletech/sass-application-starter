---
Workflow Name: Session Handoff
Workflow Description: Creates a comprehensive handoff for session continuity
Command to Execute Workflow: /handoff
Workflow argument-hint: "[optional: reason for handoff]"
---

# /handoff Workflow

<objective>
Create a complete handoff that enables the next session to resume immediately without context loss.
</objective>

<when-to-use>
- Context window is approaching 50% capacity
- Ending a work session
- Switching to a significantly different task area
- User requests a handoff
- Before a planned break
</when-to-use>

<process>

## 1. Assess Current State

Gather information about:
- What tasks were worked on this session
- What was completed
- What is in progress
- What decisions were made
- What problems were encountered
- What discoveries were made about the codebase

## 2. Update Knowledge Files

Review and update as needed:

### .agent/knowledge/CODEBASE-MAP.md
- Add any new files created
- Update feature mappings if changed
- Add new components/routes/hooks

### .agent/knowledge/PATTERNS.md
- Document any new patterns discovered
- Update existing patterns if modified

### .agent/knowledge/GOTCHAS.md
- Add any bugs encountered and their solutions
- Document any pitfalls discovered

### .agent/knowledge/DECISIONS.md
- Record any significant decisions made
- Include rationale

### .agent/knowledge/USER-PREFERENCES.md
- Note any preferences learned from user feedback

## 3. Update Project State

### .project-plan/STATE.md
```markdown
# Project State
Last Updated: [timestamp]

## Current Status
[Overall project status - what's working, what's not]

## Recent Changes
[What changed in this session]

## Active Concerns
[Any issues requiring attention]
```

### .project-plan/CURRENT-TASK.md
If a task is in progress:
```markdown
# Current Task

## Task Name
[Name from roadmap]

## Status
[percentage complete or status description]

## Work Completed
- [List of completed steps]

## Current Step
[What was being worked on]

## Next Steps
1. [Immediate next step]
2. [Following steps]

## Blockers
[Any blockers if present]

## Notes
[Important context for resuming]
```

## 4. Write Journal Entry

Add entry to `.agent/JOURNAL.md`:
```markdown
---

## Session: [Date and approximate time]

### Summary
[One paragraph summary of what was accomplished]

### Tasks Completed
- [Task 1]
- [Task 2]

### Tasks In Progress
- [Task with current state]

### Decisions Made
- [Decision]: [Brief rationale]

### Issues Encountered
- [Issue]: [Resolution or current status]

### Discoveries
- [Any learnings about the codebase]

### Next Session Should
1. [First priority]
2. [Second priority]
3. [Third priority]

### Warnings/Notes
- [Anything the next session needs to know]

---
```

## 5. Final Verification

Before completing handoff:
- [ ] All modified knowledge files are saved
- [ ] Journal entry is complete
- [ ] CURRENT-TASK.md accurately reflects work state
- [ ] STATE.md is up to date
- [ ] No uncommitted critical context remains in memory only

## 6. Provide Handoff Summary to User

Give the user a brief summary:
- What was accomplished
- What's ready for next session
- Any recommendations

</process>

<output>
Confirm to the user that handoff is complete and what files were updated.
</output>
