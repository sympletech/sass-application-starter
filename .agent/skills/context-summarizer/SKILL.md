---
Skill Name: Context Summarizer
Skill Description: Creates handoff summaries when context window is getting full, ensuring seamless session transitions
Trigger: Automatically invoked when context usage reaches 50%, before ending a session, or via /handoff command
---

# Context Summarizer Skill

## Purpose
Ensures smooth session transitions by creating comprehensive handoff documents that capture all relevant context, enabling the next session to resume immediately without searching or re-learning.

## When to Invoke

| Trigger | Action |
|---------|--------|
| Context at ~50% | Proactively suggest handoff to user |
| User says "let's wrap up" | Begin handoff process |
| User executes `/handoff` | Execute full handoff workflow |
| Switching task domains | Capture current context before switching |
| Before planned break | Ensure state is preserved |

---

## Execution Process

### Phase 1: Context Assessment

Before creating the handoff, assess what happened this session:

**Ask yourself:**
1. What tasks were worked on?
2. What was completed vs still in progress?
3. What decisions were made and why?
4. What problems were encountered?
5. What did I learn about the codebase?
6. What does the next session need to know immediately?

**Gather from memory:**
- Files created or modified
- Commands run and their outcomes
- User feedback received
- Bugs discovered or fixed
- Patterns identified

### Phase 2: Update Knowledge Files

Review each knowledge file and update if this session produced relevant information:

#### .agent/knowledge/CODEBASE-MAP.md
**Update if:**
- New files/folders were created
- New routes were added
- New components were built
- File relationships changed

**What to add:**
```markdown
## Notes
- [Date]: Added [component/route/file] for [purpose]
```

#### .agent/knowledge/PATTERNS.md
**Update if:**
- Discovered a reusable pattern
- Found a better way to do something
- Created code that should be templated

**What to add:**
```markdown
### [Pattern Name]
**Discovered**: [Date]
**Use when**: [Situation]
**Example**: [Code or reference]
```

#### .agent/knowledge/GOTCHAS.md
**Update if:**
- Encountered a bug and found the cause
- Discovered something that doesn't work as expected
- Found an edge case

**What to add:**
```markdown
### [Issue Title]
**Discovered**: [Date]
**Problem**: [What went wrong]
**Solution**: [How to avoid/fix]
```

#### .agent/knowledge/DECISIONS.md
**Update if:**
- Made a significant architectural choice
- Chose between alternatives
- User expressed strong preference

**What to add:**
```markdown
### [DECISION-XXX] [Title]
**Date**: [Date]
**Decision**: [What was decided]
**Rationale**: [Why]
```

#### .agent/knowledge/USER-PREFERENCES.md
**Update if:**
- User corrected your approach
- User expressed how they like things done
- Learned something about user's working style

**What to add:**
```markdown
### [Preference Name]
**Learned from**: [Context]
**Preference**: [What user prefers]
```

### Phase 3: Update Project State Files

#### .project-plan/STATE.md

Update with current snapshot:

```markdown
# Project State

**Last Updated**: [YYYY-MM-DD HH:MM]
**Last Session**: [Brief description of what was done]

## Current Status
[Overall: What's working, what's in progress, what's blocked]

## Recent Changes
- [Change 1]
- [Change 2]
- [Change 3]

## Active Concerns
- [Any issues needing attention]

## Notes for Next Session
- [Important context]
```

#### .project-plan/CURRENT-TASK.md

If a task is in progress, update with detailed state:

```markdown
# Current Task

## Task Details
**Name**: [Task name]
**Started**: [When]
**Status**: [In Progress / Paused / Blocked]

## Progress
**Completed**:
- [x] Step 1
- [x] Step 2

**Current Step**: 
[What was being worked on when session ended]

**Remaining**:
- [ ] Step 3
- [ ] Step 4

## Context for Resuming
[Specific details needed to continue immediately]
- File being edited: [path]
- Current approach: [description]
- Next action: [exact next step]

## Blockers
[None / Description of blocker]
```

If NO task is in progress, ensure file shows:

```markdown
# Current Task

> No active task. See ROADMAP.md for next priority.
```

### Phase 4: Write Journal Entry

Add entry to `.agent/JOURNAL.md`:

```markdown
---

## Session: [YYYY-MM-DD]

### Summary
[One paragraph: What was the goal? What was accomplished?]

### Work Completed
- [Specific completed items with verification notes]

### Work In Progress
- [Task]: [State and next step]

### Decisions Made
| Decision | Rationale |
|----------|-----------|
| [Decision] | [Why] |

### Issues Encountered
| Issue | Resolution |
|-------|------------|
| [Problem] | [Fixed / Workaround / Unresolved] |

### Discoveries
- [Anything learned about the codebase, patterns, or user preferences]

### Next Session Should
1. [First priority - be specific]
2. [Second priority]
3. [Third priority]

### Warnings
- [Anything the next session needs to watch out for]

---
```

### Phase 5: Verify Handoff Completeness

Before confirming handoff, check:

| Check | Status |
|-------|--------|
| STATE.md updated with current status | [ ] |
| CURRENT-TASK.md reflects work state | [ ] |
| JOURNAL.md has session entry | [ ] |
| Knowledge files updated (if discoveries made) | [ ] |
| No critical context only in memory | [ ] |

### Phase 6: Provide Handoff Confirmation

Give user a summary:

```
✅ **Handoff Complete**

**Session Summary:**
[2-3 sentences of what was accomplished]

**Files Updated:**
- .project-plan/STATE.md
- .project-plan/CURRENT-TASK.md
- .agent/JOURNAL.md
- [Any knowledge files updated]

**Next Session Will:**
1. [First thing next session should do]
2. [Second priority]

**Ready for new session.** The next agent will have full context to continue.
```

---

## Proactive Handoff Triggers

When you notice these situations, suggest a handoff:

### Context Getting Full
```
💡 My context window is getting full (~50% used). 

To preserve our progress, I recommend doing a handoff now. This will:
- Save everything we've accomplished
- Update all state files
- Ensure the next session can continue seamlessly

Shall I prepare the handoff?
```

### Natural Stopping Point
```
✨ We've completed [task/milestone]. This is a good stopping point.

Would you like to:
1. Continue with the next task
2. Do a handoff and wrap up

If you're planning to take a break, a handoff now ensures nothing is lost.
```

### Before Major Context Switch
```
🔄 You're asking about [new topic] which is quite different from what we've been working on.

Before switching, should I do a quick handoff to capture our current progress on [current task]? This will help if we need to return to it later.
```

---

## Integration with /handoff Workflow

This skill executes the core logic of the `/handoff` workflow:

1. User types `/handoff` OR agent suggests handoff
2. **Context Summarizer skill activates**
3. Skill executes Phases 1-6
4. Provides confirmation to user
5. Session can safely end

---

## Quality Checklist

A good handoff enables the next session to:

- [ ] Understand current project state in < 30 seconds
- [ ] Know exactly what task is in progress (if any)
- [ ] See the immediate next action to take
- [ ] Avoid repeating mistakes (gotchas documented)
- [ ] Continue with user's preferred approach
- [ ] Not need to search codebase for recent changes

---

## Anti-Patterns to Avoid

| Don't Do | Do Instead |
|----------|------------|
| Write vague summaries | Be specific: file names, line numbers, exact next steps |
| Skip knowledge updates | Always check if discoveries should be recorded |
| Leave CURRENT-TASK.md stale | Update or clear it based on actual state |
| Forget to update STATE.md | This is the quick-reference for next session |
| Only update journal | All state files need to be consistent |
| Rush the handoff | Take time to capture context properly |

---

## Error Handling

### If files are locked/unwritable:
```
⚠️ Unable to update [filename]. 

Providing handoff summary in chat instead:
[Include all the content that would have been written]

Please copy this to the appropriate file manually, or the next session will need to recreate this context.
```

### If session ended abruptly:
The Session Bootstrapper will detect stale/incomplete state and alert the next session to reconcile.
