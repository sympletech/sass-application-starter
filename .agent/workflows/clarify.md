---
description: Invoke the Task Clarifier skill to gather requirements before implementing a task
---

# Task Clarification Workflow

This workflow invokes the **Task Clarifier** skill to ensure complete understanding of requirements before starting implementation work.

## Steps

### 1. Read the Task Clarifier Skill
Read the full skill instructions:
```
.agent/skills/task-clarifier/SKILL.md
```

### 2. Follow the Skill Process
Execute the Task Clarifier skill process:
1. **Analyze the request** - Identify what's clear vs. ambiguous
2. **Check existing context** - Review PATTERNS.md, DECISIONS.md, USER-PREFERENCES.md
3. **Formulate questions** - Prioritize blocking questions, offer options
4. **Present clarifications** - Ask all questions in one organized message
5. **Confirm understanding** - Summarize what you'll build before starting

### 3. Document Requirements
Once requirements are clear:
- If working on a product task, update CURRENT-TASK.md with clarified requirements
- Note any assumptions that were confirmed

### 4. Proceed with Implementation
After user confirms understanding, begin implementation work.

## Usage

Invoke this workflow when:
- Starting a new task that could be interpreted multiple ways
- User request is complex with multiple parts
- You would need to make significant assumptions
- Task involves unfamiliar domain or technology

## Quick Reference

```
📋 **Task Clarification**

**Understanding:** [One-sentence summary]

## Questions

### Required (blocking)
1. [Question with options]

### Recommended (scope-affecting)
2. [Question with context]

## My Assumptions
- [Assumption 1]
- [Assumption 2]

## Proposed Approach
1. [Step 1]
2. [Step 2]

Does this align with what you have in mind?
```
