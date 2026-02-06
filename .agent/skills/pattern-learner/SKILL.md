---
Skill Name: Pattern Learner
Skill Description: Identifies and documents recurring code patterns as the agent works
Trigger: Automatically invoked after completing tasks that involve creating new code
---

# Pattern Learner Skill

## Purpose
Continuously improves the knowledge base by identifying reusable patterns during development and documenting them in `.agent/knowledge/PATTERNS.md` for future consistency.

## When to Invoke

| Trigger | Description |
|---------|-------------|
| After creating new component | Check if new structural or styling patterns emerged |
| After creating new routes/handlers | Check if new API patterns or error handling emerged |
| After implementing complex features | Check if multi-file coordination patterns emerged |
| After solving a tricky problem | Document the solution approach as a pattern |
| After Context Summarizer runs | Review session work for undocumented patterns |
| User asks to document a pattern | Explicitly document the pattern they mention |

---

## Execution Process

### Phase 1: Collect Recently Created Code

Identify all code created in the current task or session:

```
GATHER:
1. List all files created/modified this session
2. Categorize by type:
   - Components (jsx files in components/)
   - Pages (jsx files in pages/)
   - Page Sections (jsx files in pages/ with -section suffix)
   - Route Handlers (js files in routes/)
   - Hooks (js files in hooks/)
   - Utilities (js files in lib/)
   - CSS files
```

### Phase 2: Pattern Detection

Analyze the collected code for pattern candidates:

#### Pattern Detection Criteria

| Criterion | What to Look For |
|-----------|------------------|
| **Reusability** | Could this approach be used in 2+ other places? |
| **Complexity** | Is this more than trivial/obvious? |
| **Novelty** | Is this different from existing documented patterns? |
| **Teachability** | Can this be explained as a rule or template? |

#### Pattern Categories to Check

1. **Structural Patterns**
   - File/folder organization
   - Import ordering
   - Component composition
   - Props interface design

2. **Behavioral Patterns**
   - State management approaches
   - Data fetching strategies
   - Error handling techniques
   - Event handling patterns

3. **Styling Patterns**
   - CSS class naming conventions
   - Theme variable usage
   - Responsive design approaches
   - Animation techniques

4. **Integration Patterns**
   - Client-server coordination
   - Third-party library usage
   - Database access patterns
   - Authentication/authorization

### Phase 3: Compare Against Existing Patterns

Read current patterns file:
```
READ: .agent/knowledge/PATTERNS.md
```

For each pattern candidate, check:

| Check | Action |
|-------|--------|
| Pattern already documented? | Skip (maybe verify it's still accurate) |
| Similar pattern exists? | Consider updating existing vs. adding variant |
| Contradicts existing pattern? | Flag for review - may need to update old pattern |
| Completely new? | Add to appropriate section |

### Phase 4: Document New Patterns

#### Pattern Documentation Template

Add new patterns to the **Discovered Patterns** section of PATTERNS.md:

```markdown
### [Descriptive Pattern Name]

**Category**: [Structural | Behavioral | Styling | Integration]

```[language]
// Generalized, reusable example code
// Use placeholders like {name}, <component>, etc.
// Include essential structure, omit irrelevant details
```

**When to use**: 
[Describe the situation that calls for this pattern]

**Key rules**:
- [Rule 1]
- [Rule 2]
- [Rule 3]

**Gotchas**:
- [Pitfall to avoid, if any]

**Example usage**: 
[Brief real-world example or reference to where it's used in codebase]

**Discovered**: [YYYY-MM-DD] - [Brief context of when/why it was needed]
```

#### Pattern Quality Standards

✅ **Good Pattern** characteristics:
- Solves a recurring problem
- Has clear "when to use" criteria
- Includes concrete, runnable example
- Notes any edge cases or gotchas
- Can be followed by looking at the example alone

❌ **Skip documenting** if:
- One-off solution unlikely to recur
- Too trivial (obvious to any developer)
- Too specific to a single use case
- Already well-documented in external library docs

### Phase 5: Update Existing Patterns (If Needed)

If implementation has evolved from a documented pattern:

1. **Assess the change:**
   - Is this an improvement or just a variation?
   - Does the old pattern still apply in some cases?

2. **Update options:**
   | Situation | Action |
   |-----------|--------|
   | Better approach found | Update the existing pattern |
   | Valid alternative | Add as variant with "Alternative:" |
   | Context-dependent | Add "When to use which" guidance |
   | Old way deprecated | Mark old as deprecated, add new |

3. **Preserve history:**
   - Note when pattern was updated
   - Keep deprecated patterns with warnings if still in codebase

---

## Section Organization in PATTERNS.md

Patterns should be organized under these sections:

```
## Component Patterns          → React component structures
## Route Handler Patterns      → Server API patterns
## Data Fetching Patterns      → Client-server data flow
## CSS Patterns                → Styling approaches
## Database Patterns           → MongoDB operations
## Page Patterns               → Page and section structures
## Hook Patterns               → Custom hook structures (if complex)
## Discovered Patterns         → Newly found patterns awaiting categorization
```

### Moving Patterns to Proper Section

When adding to "Discovered Patterns":
- If pattern clearly fits existing section → add there instead
- If uncertain → add to Discovered Patterns
- During periodic review → move matured patterns to proper section

---

## Integration Points

| After Pattern Learner | Consider Invoking |
|-----------------------|-------------------|
| Pattern affects file structure | Codebase Mapper (update structure notes) |
| Pattern relates to gotcha | Add to GOTCHAS.md as well |
| Pattern represents decision | Add to DECISIONS.md with rationale |

| Before Pattern Learner | Check |
|------------------------|-------|
| Codebase Mapper ran | Useful for knowing what files were created |
| Task completed | All code is in final state, not work-in-progress |

---

## Output: Pattern Documentation Confirmation

After documenting patterns, confirm:

```
📚 **Pattern Learner Complete**

**Patterns analyzed:** [X] code files from this session

**New patterns documented:**
- [Pattern Name] → [Section added to]
- [Pattern Name] → [Section added to]

**Existing patterns verified:**
- [Pattern Name] ✓ Still accurate
- [Pattern Name] → Updated with [what changed]

**Skipped (not pattern-worthy):**
- [Brief reason: one-off, trivial, etc.]

PATTERNS.md updated: [timestamp]
```

If no new patterns:
```
📚 **Pattern Learner Complete**

Analyzed [X] files from this session.
All code follows existing documented patterns. No new patterns to add.
```

---

## Command Reference

| Command | Description |
|---------|-------------|
| `/learn-patterns` | Manually invoke pattern analysis for recent work |
| `/document-pattern [name]` | Document a specific pattern the user mentions |
| `/review-patterns` | Review and categorize patterns in Discovered section |

---

## Anti-Patterns (What NOT to Document)

❌ **DON'T** document these:

| Anti-Pattern | Why |
|--------------|-----|
| Library boilerplate | Already documented in library docs |
| Single-use solutions | Won't help future development |
| Obvious JavaScript | Every developer knows this |
| Overly specific code | Can't be generalized |
| Work-in-progress code | May change before finalized |
| User-specific preferences | Goes in USER-PREFERENCES.md |
| Bug fixes | Goes in GOTCHAS.md instead |

---

## Examples

### Example 1: Detecting a Component Pattern

**Scenario:** Created a new modal component that uses a specific structure.

**Analysis:**
1. Is this reusable? → Yes, modals are common
2. Is this complex enough? → Yes, has specific accessibility requirements
3. Is it novel? → Yes, not documented yet
4. Is it teachable? → Yes, clear structure

**Result:** Document as "Modal Component Pattern" in Component Patterns section

### Example 2: Detecting an API Pattern

**Scenario:** Created a route that handles paginated list responses.

**Analysis:**
1. Is this reusable? → Yes, many lists need pagination
2. Is this complex enough? → Yes, has cursor/offset logic
3. Is it novel? → Yes, no pagination pattern documented
4. Is it teachable? → Yes, clear params and response structure

**Result:** Document as "Paginated List Response Pattern" in Route Handler Patterns

### Example 3: Skipping a Pattern

**Scenario:** Created a utility function that formats dates for one specific report.

**Analysis:**
1. Is this reusable? → Maybe, but very specific format
2. Is this complex enough? → No, just date formatting
3. Is it novel? → No, just uses standard date methods
4. Is it teachable? → Not really, too specific

**Result:** Skip - this is a one-off utility, not a pattern

---

## Checklist

Before completing pattern learning:

- [ ] Identified all code created this session
- [ ] Analyzed each file for pattern candidates
- [ ] Compared candidates against existing patterns
- [ ] Documented new patterns with full template
- [ ] Updated existing patterns if evolved
- [ ] Used correct section in PATTERNS.md
- [ ] Preserved all existing patterns
- [ ] Updated "Last Updated" in PATTERNS.md
- [ ] Provided confirmation output
