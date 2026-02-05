---
Skill Name: Session Bootstrapper
Skill Description: Initializes agent context at the start of each session by loading all knowledge files
Trigger: Automatically invoked at the start of every new agent session
---

# Session Bootstrapper Skill

> **Status**: Stub - Implementation pending

## Purpose
Ensures every new agent session starts with full context of the project without needing to search the codebase.

## When to Invoke
- At the very beginning of every new agent session
- Before any task work begins

## Expected Behavior
1. Read and internalize all knowledge files:
   - `.agent/knowledge/CODEBASE-MAP.md`
   - `.agent/knowledge/PATTERNS.md`
   - `.agent/knowledge/GOTCHAS.md`
   - `.agent/knowledge/DECISIONS.md`
   - `.agent/knowledge/USER-PREFERENCES.md`
2. Read project state:
   - `.project-plan/PROJECT-DESCRIPTION.md`
   - `.project-plan/STATE.md`
   - `.project-plan/CURRENT-TASK.md`
   - `.project-plan/ROADMAP.md`
3. Read recent journal entries:
   - `.agent/JOURNAL.md` (last N entries)
4. Provide a brief status summary to the user

## Output
A concise summary including:
- Current project state
- Active task (if any)
- Recent context from journal
- Any blockers or important notes

## Implementation Notes
- Should be fast (reading, not searching)
- Should prioritize recent/relevant information
- Should highlight anything requiring immediate attention

## TODO: Implementation
- [ ] Define file reading order
- [ ] Create summarization logic
- [ ] Build status report format
- [ ] Add staleness detection for knowledge files
