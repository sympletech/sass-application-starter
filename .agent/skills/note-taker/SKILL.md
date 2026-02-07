---
Skill Name: Note Taker
Skill Description: Captures and routes learnings, discoveries, and observations to the appropriate knowledge files during work
Trigger: Invoked when discovering something new, learning from mistakes, or receiving user feedback
---

# Note Taker Skill

## Purpose
Ensures valuable discoveries and learnings are captured in the appropriate knowledge files as they happen, preventing knowledge loss between sessions and building institutional memory.

## When to Invoke
- **After fixing a bug** - Document the cause and solution in GOTCHAS.md
- **After receiving user feedback** - Update USER-PREFERENCES.md with their preferences
- **When discovering a code pattern** - Consider adding to PATTERNS.md
- **When making a significant technical decision** - Document in DECISIONS.md
- **When finding an edge case** - Document in GOTCHAS.md
- **After a workaround or non-obvious solution** - Document in GOTCHAS.md
- **When learning how something works** - Route to appropriate knowledge file

---

## Execution Process

### Phase 1: Classify the Learning

Determine what type of knowledge was discovered:

| Learning Type | Description | Target File |
|---------------|-------------|-------------|
| **Pitfall/Bug** | Something that went wrong and how to avoid it | `.agent/knowledge/GOTCHAS.md` |
| **User Preference** | How the user likes things done | `.agent/knowledge/USER-PREFERENCES.md` |
| **Code Pattern** | Reusable code structure or convention | `.agent/knowledge/PATTERNS.md` |
| **Technical Decision** | Significant choice about architecture or approach | `.agent/knowledge/DECISIONS.md` |
| **Project Structure** | New files, routes, or organization | `.agent/knowledge/CODEBASE-MAP.md` |
| **Feature Documentation** | Significant feature or subsystem guide | `.agent/knowledge/{FEATURE_NAME}.md` |
| **Session Progress** | Work completed, status updates | `.agent/JOURNAL.md` |

**CRITICAL**: All knowledge files live in `.agent/knowledge/` directory (except JOURNAL.md which is in `.agent/`)

### Phase 2: Format the Note

Use the appropriate template for the target file.

### Phase 3: Insert the Note

Add the note to the correct section of the target file, maintaining document organization.

### Phase 4: Confirm Capture

Briefly acknowledge the note was captured (don't interrupt workflow).

---

## Note Templates by Target File

**Directory**: All knowledge files are in `.agent/knowledge/`

### GOTCHAS.md - Pitfalls and Issues

**Full path**: `.agent/knowledge/GOTCHAS.md`  
Use when something went wrong or could go wrong.

```markdown
### [Brief Title]
❌ **Wrong**:
```[language]
// Code that causes the problem
```

✅ **Correct**:
```[language]
// Code that works correctly
```
**Why**: [Explanation of why this matters and what happens if you get it wrong]
```

**Examples of what to capture:**
- Bug fixes with root causes
- API quirks discovered
- Framework-specific gotchas
- Environment-specific issues
- Edge cases that caused problems

### USER-PREFERENCES.md - User Feedback

**Full path**: `.agent/knowledge/USER-PREFERENCES.md`  
Use when the user expresses a preference or corrects approach.

```markdown
### [Preference Category]
- [x] [What the user prefers]
- [ ] [Alternative approach not preferred]

**Context**: [When/why this preference was expressed]
**Noted**: [Date]
```

**Examples of what to capture:**
- Communication style preferences
- Code style preferences
- Workflow preferences
- Tool preferences
- Feedback on agent behavior

### PATTERNS.md - Code Patterns

**Full path**: `.agent/knowledge/PATTERNS.md`  
Use when identifying a reusable code pattern (consider Pattern Learner for detailed analysis).

```markdown
### [Pattern Name]
**Use When**: [Situation where this pattern applies]

```[language]
// Example code showing the pattern
```

**Key Points**:
- [Important aspect 1]
- [Important aspect 2]
```

**Examples of what to capture:**
- Component structure patterns
- API call patterns
- State management patterns
- Error handling patterns
- Styling conventions

### DECISIONS.md - Technical Decisions

Use for significant architectural or technical choices.

```markdown
### [DECISION-XXX] [Title]

**Date**: [YYYY-MM-DD]
**Status**: Accepted

**Context**: [What situation prompted this decision?]

**Decision**: [What was decided?]

**Rationale**: [Why was this decision made?]

**Consequences**: [What are the implications?]
```

**Examples of what to capture:**
- Library choices
- Architecture patterns
- API design decisions
- Trade-off decisions
- "Why not X" explanations

### JOURNAL.md - Session Notes

Use for session-level progress and notes (usually handled by Context Summarizer).

```markdown
## [YYYY-MM-DD] - [Session Title]

### Session Summary
[Brief description of what was accomplished]

### Work Completed
- [Task/item completed]
- [Task/item completed]

### Notes for Next Session
- [Important context to carry forward]
```

---

## Quick Capture Triggers

The agent should automatically consider Note Taker when:

| Trigger Event | Likely Target | Action |
|---------------|---------------|--------|
| User says "that's not right" | USER-PREFERENCES.md | Capture preference |
| User corrects approach | USER-PREFERENCES.md | Capture preference |
| Bug fix completed | GOTCHAS.md | Document root cause |
| "TIL" or "learned that" | GOTCHAS.md or PATTERNS.md | Capture learning |
| Workaround implemented | GOTCHAS.md | Document workaround |
| User says "I prefer" | USER-PREFERENCES.md | Capture preference |
| "Remember to" | GOTCHAS.md | Document reminder |
| Choice between options made | DECISIONS.md | Document if significant |
| Error encountered and solved | GOTCHAS.md | Document solution |
| Pattern repeated 3+ times | PATTERNS.md | Document pattern |

---

## Classification Decision Tree

When uncertain where to put a note:

```
Is it about user preferences or feedback?
├─ Yes → USER-PREFERENCES.md
└─ No ↓

Is it about what went wrong or could go wrong?
├─ Yes → GOTCHAS.md  
└─ No ↓

Is it a reusable code pattern?
├─ Yes → PATTERNS.md (or invoke Pattern Learner)
└─ No ↓

Is it a significant technical/architectural decision?
├─ Yes → DECISIONS.md
└─ No ↓

Is it about project structure or file locations?
├─ Yes → CODEBASE-MAP.md (or invoke Codebase Mapper)
└─ No ↓

Is it general session progress?
└─ Yes → JOURNAL.md (or invoke Context Summarizer)
```

---

## Capture Urgency

| Urgency | Description | When to Capture |
|---------|-------------|-----------------|
| **Immediate** | Critical gotcha that will cause issues | Capture right now, before continuing |
| **Soon** | Important learning, should not be lost | Capture before session ends |
| **Batch** | Minor notes, patterns | Capture during handoff/summarization |

**Immediate Capture Indicators:**
- User explicitly asked to remember something
- Bug that took significant time to debug
- Non-obvious behavior that will be forgotten
- Critical workaround

---

## Note Quality Guidelines

### Good Notes
- ✅ Specific and actionable
- ✅ Include code examples where relevant
- ✅ Explain WHY, not just WHAT
- ✅ Clear wrong/right comparison
- ✅ Easy to find and scan

### Poor Notes
- ❌ Vague or generic
- ❌ Missing context
- ❌ No examples
- ❌ Just restating code
- ❌ Too long to scan quickly

### Examples

**Good Gotcha:**
```markdown
### Stripe webhooks need raw body
❌ **Wrong**: Using `express.json()` before webhook route
✅ **Correct**: Use `express.raw()` for webhook endpoint
**Why**: Stripe signature verification requires the raw request body
```

**Poor Gotcha:**
```markdown
### Stripe issue
There was a problem with Stripe webhooks.
```

---

## Commands

| Command | Action |
|---------|--------|
| `/note` | Capture a learning and route to appropriate file |
| `/note gotcha` | Quick capture to GOTCHAS.md |
| `/note decision` | Quick capture to DECISIONS.md |
| `/note preference` | Quick capture to USER-PREFERENCES.md |
| `/note pattern` | Quick capture to PATTERNS.md |

---

## Integration Points

| After Capturing Note | Consider Also |
|---------------------|---------------|
| Pattern captured | Invoke Pattern Learner for deeper analysis |
| Decision captured | Consider updating INSTRUCTIONS.md if affects workflow |
| Gotcha captured | Check if DEFECT-LIST.md needs update |
| Preference captured | Apply preference immediately |
| Structure captured | Invoke Codebase Mapper for full update |

---

## Anti-Patterns

### ❌ Over-Noting
Don't capture every small observation. Focus on things that:
- Took time to figure out
- User explicitly cared about
- Will be forgotten and cause problems later
- Differ from expected behavior

### ❌ Under-Noting
Don't skip capturing:
- Bug root causes after difficult debugging
- User corrections (they won't repeat themselves)
- Workarounds for framework/library issues
- Non-obvious configuration

### ❌ Wrong Routing
Don't put:
- User preferences in GOTCHAS (route to USER-PREFERENCES)
- Code patterns in DECISIONS (route to PATTERNS)
- Session progress in GOTCHAS (route to JOURNAL)

### ❌ Duplicate Notes
Before adding, check if the knowledge file already covers this topic.
Update existing entries rather than duplicating.

---

## Checklist: Before Capturing

- [ ] Learning is specific and actionable
- [ ] Target file identified correctly
- [ ] Template format followed
- [ ] Not duplicating existing entry
- [ ] WHY is explained, not just WHAT
- [ ] Code examples included where helpful

## Checklist: After Capturing

- [ ] Note added to correct section of file
- [ ] Document organization maintained
- [ ] Related integrations considered
- [ ] Workflow can continue
