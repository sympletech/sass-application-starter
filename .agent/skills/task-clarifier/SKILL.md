---
Skill Name: Task Clarifier
Skill Description: Ensures complete understanding of task requirements before implementation by asking targeted clarifying questions
Trigger: Before starting tasks that have ambiguous, complex, or incomplete requirements
---

# Task Clarifier Skill

## Purpose
Prevents wasted effort and rework by ensuring the agent fully understands what needs to be built BEFORE writing implementation code. This skill embodies the principle: "Measure twice, cut once."

## When to Invoke

| Trigger | Description |
|---------|-------------|
| After Session Bootstrap (complex task) | When CURRENT-TASK.md has a task that lacks implementation details |
| New user request is ambiguous | User's request can be interpreted multiple ways |
| New user request is complex | Multiple parts, dependencies, or unknowns |
| User says "build", "create", "implement" | Before jumping into creation tasks |
| Task involves unfamiliar domain | When agent isn't sure about requirements |
| Task affects multiple systems | Cross-cutting concerns need clarification |

## When NOT to Invoke

| Situation | Reason |
|-----------|--------|
| Simple, unambiguous requests | "Fix the typo on the about page" |
| Direct answers expected | "How does the auth flow work?" |
| User provides complete spec | Requirements are already clear |
| Follow-up work on existing task | Context already established |
| Framework/documentation work | Usually self-explanatory |
| User explicitly says "just do it" | User knows what they want |

---

## Execution Process

### Phase 1: Initial Request Analysis

When receiving a new task or request, assess:

```
ANALYZE REQUEST:
1. What is the user asking for?
2. What information is explicitly provided?
3. What information is missing or ambiguous?
4. What assumptions would I need to make?
5. What are the potential interpretations?
```

#### Clarity Assessment Matrix

| Aspect | Clear ✓ | Needs Clarification ? |
|--------|---------|----------------------|
| **What** (Goal) | Specific outcome stated | Vague or multiple interpretations |
| **Where** (Location) | Files/components specified | "Somewhere in the app" |
| **How** (Approach) | Method implied or stated | Multiple valid approaches |
| **Constraints** | Limitations mentioned | Unknown restrictions |
| **Dependencies** | Related work identified | Unclear what else is affected |
| **Acceptance** | Success criteria given | "It should work" |

### Phase 2: Identify Clarification Needs

For each unclear aspect, determine:

1. **Is this blocking?** - Can I proceed without knowing?
2. **Can I infer safely?** - Is there an obvious/standard answer?
3. **Does it affect scope?** - Will the answer change what I build?
4. **Are there trade-offs?** - Will the answer affect cost/complexity?

#### Question Priority Levels

| Priority | Type | When to Ask |
|----------|------|-------------|
| **Blocking** | Cannot proceed without answer | Always ask first |
| **Scope-affecting** | Answer changes what to build | Ask before starting |
| **Preference** | Multiple valid approaches | Ask or state assumption |
| **Nice-to-know** | Would improve solution | Ask if time permits |

### Phase 3: Formulate Clarifying Questions

Structure questions for efficiency and clarity:

#### Good Question Characteristics
- ✅ Specific - Not "what do you want?" but "should the button be primary or secondary?"
- ✅ Bounded - Offers options when possible: "Should this be A, B, or C?"
- ✅ Contextual - Explains why the question matters
- ✅ Grouped - Related questions together
- ✅ Prioritized - Most important first

#### Question Templates

**For Scope Clarification:**
```
I want to make sure I understand the scope:
- [Interpretation A], or
- [Interpretation B]?

This affects [what it affects].
```

**For Technical Approach:**
```
There are a few ways to approach this:

1. **[Approach A]** - [pros/cons]
2. **[Approach B]** - [pros/cons]

Which direction would you prefer? (I'd recommend [X] because [reason])
```

**For Missing Information:**
```
To complete this, I need to know:

1. [Question 1] - [why it matters]
2. [Question 2] - [why it matters]

For [Question 3], I'll assume [X] unless you say otherwise.
```

**For Constraints:**
```
A few things that might affect implementation:

- [Constraint question 1]
- [Constraint question 2]

If none of these apply, I'll proceed with the default approach.
```

### Phase 4: Gather Context

While waiting for clarification (or to inform questions), gather relevant context:

```
CHECK EXISTING CONTEXT:
1. CODEBASE-MAP.md → Related files and structures
2. PATTERNS.md → Established approaches for similar tasks
3. DECISIONS.md → Previous decisions that may apply
4. GOTCHAS.md → Pitfalls to avoid
5. USER-PREFERENCES.md → User working style
```

#### Context Application

| Found | Action |
|-------|--------|
| Related pattern exists | Reference in discussion: "We have a pattern for this..." |
| Similar work done before | Reference it: "Similar to the X feature..." |
| Relevant decision | Apply it: "Per DECISION-003, we use..." |
| Known gotcha | Warn: "Note: there's a gotcha with X..." |
| User preference | Apply: "Based on your preference, I'll..." |

### Phase 5: Present Clarifications Efficiently

Present all questions in a single, organized message:

#### Clarification Request Template

```markdown
# 📋 Task Clarification

**Understanding:** [One-sentence summary of what I think you want]

## Questions

### Required (blocking)
1. [Question 1]
   - Option A: [description]
   - Option B: [description]

2. [Question 2]

### Recommended (scope-affecting)
3. [Question 3 with context on why it matters]

## My Assumptions
Unless you say otherwise, I'll assume:
- [Assumption 1]
- [Assumption 2]

## Proposed Approach
Once confirmed, I plan to:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Does this align with what you have in mind?
```

---

## Response Handling

### After User Responds

| User Response | Action |
|--------------|--------|
| Answers all questions | Confirm understanding, begin work |
| Answers some questions | Ask about remaining blockers only |
| Says "just do it" | State assumptions, proceed |
| Provides new info | Re-evaluate, ask follow-ups if needed |
| Changes direction | Reset, clarify new direction |

### Confirmation Before Proceeding

Always confirm understanding before implementation:

```
✅ **Understood.** Here's what I'll build:

[Concise summary incorporating their answers]

Starting now. I'll update you as I progress.
```

---

## Integration Points

| After Task Clarifier | Hand Off To |
|---------------------|-------------|
| Requirements clear | Begin implementation |
| Complex task | Consider breaking into subtasks (ROADMAP.md) |
| Missing knowledge | Note Taker skill for research |
| Needs third-party solution | Third Party Module Finder skill |

| Before Task Clarifier | Check |
|----------------------|-------|
| Session Bootstrapper ran | Context loaded for better questions |
| Task identified | Something to clarify exists |

---

## Output: Clarification Patterns

### Pattern A: Quick Clarification (1-2 questions)
```
Quick question before I start:

[Question]

(I'm leaning toward [option] because [reason], but wanted to check.)
```

### Pattern B: Standard Clarification (3-5 questions)
```
📋 **Before I start, a few questions:**

1. [Question 1]
2. [Question 2]
3. [Question 3]

**My assumptions:**
- [Assumption]

Go ahead if this looks right, or let me know what to adjust.
```

### Pattern C: Complex Task Breakdown
```
📋 **Task Clarification**

**My understanding:** [Summary]

This is a multi-part task. Let me confirm the scope:

## Part 1: [Name]
[Questions about this part]

## Part 2: [Name]
[Questions about this part]

**Suggested approach:**
[Proposed breakdown]

Want me to proceed with this breakdown, or adjust something?
```

---

## Anti-Patterns (What NOT to Do)

| Anti-Pattern | Why | Instead |
|--------------|-----|---------|
| ❌ Asking too many questions | Slows down progress | Prioritize, assume for non-blocking |
| ❌ Asking obvious questions | Wastes user's time | Use context, apply common sense |
| ❌ Open-ended questions | Hard to answer | Offer specific options |
| ❌ Technical jargon | User may not understand | Use clear, simple language |
| ❌ Asking after starting | Work may be wasted | Always clarify BEFORE implementing |
| ❌ Not stating assumptions | User can't verify | Always list what you'll assume |
| ❌ Ignoring context | May repeat solved problems | Check knowledge files first |

---

## Self-Assessment Checklist

Before asking clarifying questions:

- [ ] Have I actually tried to understand the request?
- [ ] Have I checked existing context (patterns, decisions, preferences)?
- [ ] Are my questions truly blocking or scope-affecting?
- [ ] Have I grouped related questions together?
- [ ] Have I provided options where possible?
- [ ] Have I stated my proposed approach?
- [ ] Have I listed my assumptions?
- [ ] Is this the minimum number of questions needed?

Before proceeding with implementation:

- [ ] Do I understand WHAT needs to be built?
- [ ] Do I know WHERE changes will be made?
- [ ] Do I know HOW to approach this (or have options)?
- [ ] Have I identified CONSTRAINTS and DEPENDENCIES?
- [ ] Can I describe the SUCCESS CRITERIA?
- [ ] Have I confirmed my understanding with the user?

---

## Examples

### Example 1: Simple Clarification

**User Request:** "Add a contact form to the site"

**Clarification:**
```
Quick question before I start:

Should the contact form go on:
1. A new `/contact` page, or
2. The existing About page?

(I'm thinking a dedicated /contact page would be cleaner, but wanted to check.)
```

### Example 2: Multiple Questions

**User Request:** "Set up email notifications"

**Clarification:**
```
📋 **Before I start, a few questions:**

1. **What triggers notifications?** (new user signup, password reset, both?)
2. **Email provider?** (SendGrid, AWS SES, other preference?)
3. **Template style?** (Plain text, branded HTML, both?)

**My assumptions:**
- Server-side sending (not client)
- Store email templates in a `/templates` folder

Go ahead if this looks right, or let me know what to adjust.
```

### Example 3: Complex Task

**User Request:** "Add a blog to the application"

**Clarification:**
```
📋 **Task Clarification**

**My understanding:** You want to add a blog feature to the app where users (or admins?) can publish posts.

This is a multi-part task. Let me confirm the scope:

## Content Management
- Who can create posts? (Admins only / All users / Specific roles?)
- Do posts need categories/tags?
- Should posts support rich text formatting?

## Display
- Dedicated `/blog` section or integrated with existing pages?
- Pagination needed?
- Search/filter capabilities?

## Technical
- Store in MongoDB with the existing database?
- Any SEO requirements (meta tags, sitemaps)?

**Suggested approach:**
I'd break this into phases:
1. Data model & basic CRUD
2. Frontend display
3. Admin creation interface
4. Optional: Search, categories, SEO

Want me to proceed with this breakdown, or adjust something?
```

---

## Command Reference

| Command | Description |
|---------|-------------|
| `/clarify` | Manually invoke task clarifier on current task |
| `/clarify [task description]` | Clarify a specific task |

---

## Checklist

Before completing task clarification:

- [ ] Analyzed the request for clarity
- [ ] Checked existing knowledge files for context
- [ ] Identified blocking vs. preference questions
- [ ] Formulated specific, bounded questions
- [ ] Provided options where possible
- [ ] Listed assumptions clearly
- [ ] Described proposed approach
- [ ] Presented questions efficiently (not too many)
- [ ] Confirmed understanding before proceeding
- [ ] Documented any new requirements in CURRENT-TASK.md
