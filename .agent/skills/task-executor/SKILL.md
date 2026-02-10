````skill
---
Skill Name: Task Executor
Skill Description: Manages the task lifecycle — starting, executing, completing, and transitioning between tasks
Trigger: User invokes /next, /done, /progress, or /add-feature commands
---

# Task Executor Skill

## Purpose
Drives the core development loop by managing how tasks flow from **Roadmap → Current Task → Done List**. This skill bridges the gap between planning (High-Level Project Manager) and implementation (coding skills), ensuring the user always has clear direction and steady progress.

## When to Invoke

| Trigger | Action |
|---------|--------|
| User says `/next` | Pick up the next task from ROADMAP.md |
| User says `/done` | Complete current task, move to DONE-LIST.md |
| User says `/progress` | Show project status dashboard |
| User says `/add-feature` | Add a new feature/task to ROADMAP.md |
| Session Bootstrapper (Type C) | Suggest starting next task |
| Task naturally completes | Prompt user to mark done |

---

## Commands

### `/next` — Start Next Task

Picks the top-priority task from ROADMAP.md and begins work on it.

#### Process:

1. **Check prerequisites**
   - Is there already an active task in CURRENT-TASK.md?
     - Yes → Ask: "You have [task] in progress. Want to finish that first, park it, or abandon it?"
     - No → Continue

2. **Select the next task**
   - Read ROADMAP.md
   - Select the first task under "Up Next"
   - If no tasks exist → Suggest running `/plan` to create the roadmap

3. **Prepare the task**
   - Read the task description and implementation plan
   - Check if it needs clarification (invoke Task Clarifier if ambiguous)
   - Identify files that will be affected (check CODEBASE-MAP.md)

4. **Move to CURRENT-TASK.md**
   ```markdown
   # Current Task

   ## Task Details
   **Name**: [TASK-XXX] Task Name
   **Started**: [YYYY-MM-DD]
   **Status**: In Progress

   ## Description
   [From roadmap]

   ## Implementation Plan
   1. [ ] Step 1
   2. [ ] Step 2
   3. [ ] Step 3

   ## Definition of Done
   - [ ] Criterion 1
   - [ ] Criterion 2

   ## Progress Notes
   [Updated as work progresses]
   ```

5. **Remove from ROADMAP.md**
   - Delete the task from the "Up Next" section

6. **Begin work**
   - Present the plan to the user
   - Start on step 1

#### Output:
```
🚀 **Starting Task**

**[TASK-XXX]** Task Name

**Plan:**
1. Step 1
2. Step 2
3. Step 3

**Definition of Done:**
- [ ] Criterion 1
- [ ] Criterion 2

Starting with step 1. Let's go!
```

---

### `/done` — Complete Current Task

Marks the current task as complete after verification.

#### Process:

1. **Read CURRENT-TASK.md**
   - Get the active task details
   - If no active task → "Nothing in progress. Use `/next` to start a task."

2. **Verify completion**
   - Check all Definition of Done criteria
   - For each criterion, gather evidence:

   | Criterion Type | Evidence Required |
   |---------------|-------------------|
   | UI change | Screenshot |
   | API change | curl output |
   | Build change | Build output |
   | Data change | Database query result |
   | Config change | Command proving effect |

   - If criteria are not yet met → List what's remaining

3. **Mark complete**
   - Move task entry to DONE-LIST.md with completion details:
   ```markdown
   ### [TASK-XXX] Task Name
   **Completed**: [YYYY-MM-DD]
   **Summary**: [What was built/changed]
   **Verification**: [Evidence gathered]
   **Files Changed**:
   - [file1] — [what changed]
   - [file2] — [what changed]
   ```

4. **Clear CURRENT-TASK.md**
   ```markdown
   # Current Task

   > No active task. Use `/next` to start the next task from the roadmap.
   ```

5. **Update STATE.md**
   - Add to recent changes
   - Update current status

6. **Trigger follow-up skills**
   - `/map` — Update CODEBASE-MAP.md if new files were created
   - `/learn-patterns` — Check for new patterns
   - `/update-docs` — Update documentation if needed

7. **Suggest next action**
   - Show count of remaining tasks
   - Suggest `/next` to continue

#### Output:
```
✅ **Task Complete**

**[TASK-XXX]** Task Name

**Verification:**
- [x] Criterion 1 — [evidence]
- [x] Criterion 2 — [evidence]

**Files Changed:**
- [file1] — [summary]
- [file2] — [summary]

**Documentation Updated:**
- [x] DONE-LIST.md
- [x] CODEBASE-MAP.md (if applicable)
- [x] STATE.md

---

📋 **Remaining:** [N] tasks in roadmap
**Next up:** [TASK-XXX] [Name]

Use `/next` to continue, or `/progress` to review the full roadmap.
```

---

### `/progress` — Show Project Status

Displays a dashboard of project progress.

#### Process:

1. **Read all project-plan files**
   - PROJECT-DESCRIPTION.md → Project name and summary
   - ROADMAP.md → Pending tasks
   - CURRENT-TASK.md → Active work
   - DONE-LIST.md → Completed work
   - DEFECT-LIST.md → Open bugs

2. **Calculate metrics**
   - Tasks completed vs total
   - Open defects by priority
   - Current task status

3. **Present dashboard**

#### Output:
```
📊 **Project Progress**

**Project:** [Name]

## Status
| Category | Count |
|----------|-------|
| ✅ Completed | [N] |
| 🔄 In Progress | [0-1] |
| 📋 Remaining | [N] |
| 🐛 Open Bugs | [N] |

## Current Task
[Task name and brief status, or "None — use `/next` to start"]

## Up Next
1. [TASK-XXX] [Name]
2. [TASK-XXX] [Name]
3. [TASK-XXX] [Name]

## Recently Completed
- [TASK-XXX] [Name] — [date]
- [TASK-XXX] [Name] — [date]

## Open Defects
- [BUG-XXX] [Name] — [priority]

---
Use `/next` to start a task, `/add-feature` to add work, or `/fix` to address a bug.
```

---

### `/add-feature` — Add Feature to Roadmap

Adds a new feature or task to the roadmap without interrupting current work.

#### Process:

1. **Capture the feature**
   - User describes what they want: `/add-feature [description]`
   - If no description provided, ask: "What feature would you like to add?"

2. **Collaborate on task definition**
   - Use the High-Level Project Manager's collaboration style
   - Ask clarifying questions if needed (keep it brief — 1-2 questions max)
   - Define:
     - Task name
     - Description
     - Implementation plan (high-level steps)
     - Dependencies (does it depend on other tasks?)
     - Definition of done

3. **Determine placement**
   - Ask user: "Where should this go in the roadmap?"
     - **Next up** — Right after current work
     - **After [specific task]** — In a specific position
     - **Backlog** — Not prioritized yet
   - If the feature depends on incomplete tasks, place it after those dependencies

4. **Add to ROADMAP.md**
   - Insert in correct position using standard task format:
   ```markdown
   ### [TASK-XXX] Feature Name

   **Description**: What needs to be done and why

   **Implementation Plan**:
   1. Step 1
   2. Step 2

   **Dependencies**: [None | TASK-XXX]

   **Definition of Done**:
   - [ ] Verification step 1
   - [ ] Verification step 2
   ```

5. **Update task numbering**
   - Ensure TASK IDs are sequential
   - Check for dependency conflicts

6. **Confirm to user**

#### Output:
```
📝 **Feature Added to Roadmap**

**[TASK-XXX]** Feature Name
**Position:** [Next up / After TASK-XXX / Backlog]
**Dependencies:** [None / TASK-XXX]

**Roadmap now has [N] tasks remaining.**
Use `/progress` to see the full roadmap.
```

---

## Task Lifecycle

```
┌─────────────┐     /next      ┌──────────────┐     /done      ┌─────────────┐
│  ROADMAP.md │ ──────────────→ │ CURRENT-TASK │ ──────────────→ │ DONE-LIST   │
│  (planned)  │                 │  (active)    │                 │ (completed) │
└─────────────┘                 └──────────────┘                 └─────────────┘
       ↑                               │
       │         task paused            │
       └────────────────────────────────┘

       ┌─────────────┐     /fix        ┌──────────────┐
       │ DEFECT-LIST │ ──────────────→ │ CURRENT-TASK │ ──→ DONE-LIST
       │  (bugs)     │                 │  (fixing)    │
       └─────────────┘                 └──────────────┘
```

### Task States

| State | Location | Meaning |
|-------|----------|---------|
| Planned | ROADMAP.md | Defined but not started |
| Backlog | ROADMAP.md (Backlog section) | Identified but not prioritized |
| Active | CURRENT-TASK.md | Currently being worked on |
| Paused | ROADMAP.md (with notes) | Was active, returned to queue |
| Complete | DONE-LIST.md | Verified and finished |

---

## Handling Edge Cases

### User wants to switch tasks mid-work
```
You have [TASK-XXX] in progress. Options:

1. **Park it** — Move back to ROADMAP.md with progress notes (can resume later)
2. **Abandon it** — Move to ROADMAP.md without progress (start fresh later)
3. **Finish first** — Complete the current task before switching

Which would you prefer?
```

### Roadmap is empty
```
📋 The roadmap is empty. Let's plan some work:

1. **`/plan`** — Define your project and create a full roadmap
2. **`/add-feature`** — Add a specific feature
3. **Tell me what you want to build** — I'll help break it down

What would you like to do?
```

### Task is bigger than expected
```
⚠️ This task is larger than originally estimated. 

I'd recommend breaking it into smaller tasks:
1. [Subtask A] — [scope]
2. [Subtask B] — [scope]

Want me to split this in the roadmap? The current progress would carry into [Subtask A].
```

### Definition of Done can't be verified
```
⚠️ I can't fully verify this task:

- [x] Criterion 1 — Verified
- [ ] Criterion 2 — Needs manual verification

**What I need:** [Description of what to check]
**How to verify:** [Steps the user should take]

Can you confirm this works, or should I adjust the approach?
```

---

## Integration Points

| After Task Executor | Invoke |
|--------------------|--------|
| Task started (`/next`) | Task Clarifier (if complex) |
| Task completed (`/done`) | Codebase Mapper, Pattern Learner, Documentation Updater |
| Feature added (`/add-feature`) | High-Level Project Manager (if scope is large) |
| Progress shown (`/progress`) | — (read-only) |

| Before Task Executor | Check |
|---------------------|-------|
| Session bootstrapped | Full context loaded |
| Project defined | PROJECT-DESCRIPTION.md not empty |
| Roadmap exists | ROADMAP.md has tasks |

---

## Anti-Patterns

| Don't | Why | Instead |
|-------|-----|---------|
| Skip `/done` and start next task | Loses verification and documentation | Always complete before starting new |
| Work without an active task | No tracking or context | Use `/next` to formally start |
| Add features without `/add-feature` | Not tracked in roadmap | Always add to roadmap first |
| Let CURRENT-TASK.md go stale | Next session gets confused | Update progress notes as you work |
| Mark done without evidence | "Should work" isn't verification | Gather proof for each criterion |

---

## Checklist

### Before starting a task (`/next`):
- [ ] No other task is active (or user chose to park it)
- [ ] Task selected from top of ROADMAP.md
- [ ] Task moved to CURRENT-TASK.md with full details
- [ ] Task removed from ROADMAP.md
- [ ] Implementation plan reviewed and understood

### Before completing a task (`/done`):
- [ ] All Definition of Done criteria verified with evidence
- [ ] Task moved to DONE-LIST.md with completion details
- [ ] CURRENT-TASK.md cleared
- [ ] STATE.md updated
- [ ] Codebase map updated (if files created)
- [ ] Patterns documented (if new patterns discovered)

### When adding a feature (`/add-feature`):
- [ ] Feature described with clear scope
- [ ] Implementation plan created
- [ ] Dependencies identified
- [ ] Definition of done defined
- [ ] Placed in correct roadmap position
- [ ] Task ID assigned

````
