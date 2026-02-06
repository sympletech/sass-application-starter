---
Skill Name: Session Bootstrapper
Skill Description: Initializes agent context at the start of each session by loading all knowledge files and determining the appropriate session workflow
Trigger: Automatically invoked at the start of every new agent session
---

# Session Bootstrapper Skill

## Purpose
Ensures every new agent session starts with full project context, enabling immediate productive work without searching the codebase.

## When to Invoke
- At the very beginning of every new agent session
- This is the FIRST thing you do, before any other work

---

## Execution Process

### Phase 1: Load Knowledge Base (REQUIRED)

Read these files in order. Do NOT skip any.

```
READ ORDER:
1. .agent/knowledge/CODEBASE-MAP.md      → Project structure
2. .agent/knowledge/GOTCHAS.md           → What to avoid
3. .agent/knowledge/USER-PREFERENCES.md  → How user works
4. .agent/knowledge/PATTERNS.md          → Code conventions
5. .agent/knowledge/DECISIONS.md         → Why things are built this way
```

**As you read, note:**
- Any recent updates (check "Last Updated" fields)
- Any warnings or critical information
- Patterns you'll need for likely tasks

### Phase 2: Load Project State

Read the project plan files:

```
READ ORDER:
1. .project-plan/PROJECT-DESCRIPTION.md  → What we're building
2. .project-plan/STATE.md                → Current status
3. .project-plan/CURRENT-TASK.md         → Work in progress
4. .project-plan/ROADMAP.md              → What's next
5. .project-plan/DEFECT-LIST.md          → Known bugs
```

**Assess project readiness:**

| Check | Look For |
|-------|----------|
| Project defined? | Does PROJECT-DESCRIPTION.md have `[To be defined]` or `[Not yet initialized]`? |
| Work in progress? | Is there an active task in CURRENT-TASK.md? |
| Critical bugs? | Are there Critical/High priority items in DEFECT-LIST.md? |
| Next task clear? | Is ROADMAP.md populated with prioritized tasks? |

### Phase 3: Load Session Context

Read recent journal entries:

```
READ: .agent/JOURNAL.md (scan last 3-5 entries)
```

**Look for:**
- What was accomplished in recent sessions
- Any handoff notes or warnings
- Patterns in the type of work being done
- Any unresolved issues mentioned

### Phase 4: Determine Session Type

Based on what you've loaded, classify the likely session type:

#### Type A: Project Planning Needed
**Indicators:**
- PROJECT-DESCRIPTION.md contains `[To be defined]` or `[Not yet initialized]`
- ROADMAP.md is empty or has only template content
- No clear direction for work

**Action:** Prepare to offer High Level Project Manager skill

#### Type B: Task Continuation
**Indicators:**
- CURRENT-TASK.md has an active task with incomplete steps
- Work was paused mid-task in previous session

**Action:** Prepare to resume the in-progress task

#### Type C: New Task Ready
**Indicators:**
- No active task in CURRENT-TASK.md
- ROADMAP.md has prioritized tasks ready
- Project is well-defined

**Action:** Prepare to start the next priority task

#### Type D: Bug Fixing Needed
**Indicators:**
- DEFECT-LIST.md has Critical or High priority bugs
- These should take precedence over new features

**Action:** Prepare to address critical bugs first

#### Type E: Framework/Maintenance
**Indicators:**
- User's first message mentions: skills, agent, instructions, documentation
- Or: previous session was doing framework work

**Action:** Skip project plan workflow, focus on framework task

---

## Output: Status Greeting

After loading all context, greet the user with a concise status. Format:

### If Project Needs Definition (Type A):
```
👋 **Session Started**

I've loaded the project context. I notice the project plan isn't fully defined yet.

Would you like to:
1. **Define the project** - Work together to build out the project description and roadmap
2. **Work on the framework** - Focus on skills, documentation, or agent infrastructure  
3. **Jump to a specific task** - Skip planning and work on something specific

What would you prefer?
```

### If Task In Progress (Type B):
```
👋 **Session Started**

**Resuming:** [Task name from CURRENT-TASK.md]
**Progress:** [X of Y steps complete]
**Next step:** [The immediate next action]

[Any relevant notes from journal about this task]

Ready to continue, or would you like to work on something else?
```

### If Ready for New Task (Type C):
```
👋 **Session Started**

**Project:** [Name from PROJECT-DESCRIPTION.md]
**Status:** [Brief from STATE.md]

**Next up:** [First task from ROADMAP.md]
- [Brief description]

**Also pending:** [Count] other tasks in roadmap

Shall I start on [task name], or did you have something else in mind?
```

### If Critical Bugs (Type D):
```
👋 **Session Started**

⚠️ **Critical bug requires attention:**
[Bug name and brief description from DEFECT-LIST.md]

This is blocking/high priority. Should I address this first, or continue with planned work?

**Planned next:** [Task from ROADMAP.md if any]
```

### If Framework Work Detected (Type E):
```
👋 **Session Started**

I see you're working on the framework/starter itself. I've loaded the knowledge base and am ready to help with [skills/documentation/agent infrastructure].

What would you like to work on?
```

---

## Staleness Detection

While loading files, check for staleness indicators:

| File | Staleness Signal | Action |
|------|------------------|--------|
| CODEBASE-MAP.md | "Last Updated" > 7 days old | Note: "Codebase map may need refresh" |
| STATE.md | "Last Session" doesn't match recent journal | Note: "State may be outdated" |
| CURRENT-TASK.md | Task started > 3 sessions ago | Note: "Long-running task - consider breaking down" |
| JOURNAL.md | No entries in last 7 days | Note: "Journal gaps - context may be limited" |

Include staleness warnings in your greeting if detected.

---

## Error Handling

### If knowledge files are missing:
```
⚠️ Some knowledge files are missing or empty:
- [List missing files]

Would you like me to initialize them, or proceed without?
```

### If project plan files are missing:
```
📋 Project plan not yet initialized.

The .project-plan/ folder needs to be set up. Would you like to:
1. Initialize the project plan and define what we're building
2. Skip this and work on something specific
```

### If files can't be read:
```
❌ Unable to read [filename]: [error]

Proceeding with available context. Some capabilities may be limited.
```

---

## Integration Points

| After Bootstrap | Hand Off To |
|-----------------|-------------|
| Project needs definition | High Level Project Manager skill |
| Task ready to start | Task Clarifier skill (if complex) |
| Bug to fix | Bug Fixer skill |
| Context at 50% | Context Summarizer skill |
| Session ending | /handoff workflow |

---

## Checklist

Before proceeding to any work, confirm:

- [ ] All 5 knowledge files read (or noted as missing)
- [ ] All 5 project plan files read (or noted as missing)
- [ ] Recent journal entries scanned
- [ ] Session type determined
- [ ] Status greeting provided to user
- [ ] Any staleness warnings communicated
- [ ] User has confirmed direction (or provided their own)
