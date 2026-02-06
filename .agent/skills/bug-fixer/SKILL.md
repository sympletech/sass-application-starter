---
Skill Name: Bug Fixer
Skill Description: Systematic approach to diagnosing, fixing, and documenting bugs
Trigger: Invoked when debugging issues or fixing defects from DEFECT-LIST.md
---

# Bug Fixer Skill

## Purpose
Provides a systematic, methodical approach to diagnosing and fixing bugs, ensuring root causes are identified, fixes are verified, and learnings are documented to prevent recurrence.

## When to Invoke

| Trigger | Description |
|---------|-------------|
| User reports a bug | Something isn't working as expected |
| Error appears in console | Runtime or build errors |
| Test failure | Automated or manual test fails |
| Picking up bug from DEFECT-LIST.md | Working on prioritized defect |
| Unexpected behavior discovered | Feature doesn't work as intended |
| User executes `/fix` | Manual invocation of bug fixing workflow |

---

## Execution Process

### Phase 1: Document Before Fixing

**CRITICAL: Add to DEFECT-LIST.md BEFORE attempting to fix**

This ensures:
- Bug is tracked even if fix takes multiple sessions
- Others know about the issue
- Resolution is documented for future reference

**Document with:**
```markdown
### [BUG-XXX] Brief Description

**Reported**: [YYYY-MM-DD]
**Priority**: [Critical | High | Medium | Low]
**Status**: Open

**Description**:
[What is happening incorrectly]

**Expected Behavior**:
[What should happen instead]

**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]

**Related Files**:
- [File paths that may be involved]
```

### Phase 2: Understand the Bug

Before writing any fix, fully understand the problem:

#### 2.1 Reproduce the Bug
1. Follow the exact reproduction steps
2. Observe the actual behavior
3. Note any error messages (exact text)
4. Check browser console for errors (if frontend)
5. Check server logs for errors (if backend)

**Verification checkpoint:**
```
✓ I can reliably reproduce this bug
✓ I understand what behavior is incorrect
✓ I have captured error messages/stack traces
```

#### 2.2 Gather Context
| Check | Action |
|-------|--------|
| GOTCHAS.md | Is this a known pitfall? |
| PATTERNS.md | Is there a pattern being violated? |
| Recent changes | Was this working before? What changed? |
| Related code | What other code interacts with this area? |

#### 2.3 Identify Scope
| Question | Impact |
|----------|--------|
| When did this start? | Recent regression vs. long-standing |
| How many users affected? | Isolated vs. widespread |
| What's the workaround? | Critical vs. inconvenient |
| What else might be affected? | Isolated vs. systemic |

### Phase 3: Diagnose Root Cause

#### 3.1 Form Hypothesis
Based on the evidence, form a hypothesis about the root cause:

```
HYPOTHESIS: [What I think is causing this]
EVIDENCE: [Why I think this]
TEST: [How to verify this hypothesis]
```

#### 3.2 Diagnostic Strategies

| Bug Type | Diagnostic Approach |
|----------|---------------------|
| **UI not rendering** | Check component props, state, conditional rendering |
| **API error** | Check request payload, route handler, database query |
| **Data not saving** | Trace data flow from UI → API → database |
| **Styling issue** | Check CSS specificity, theme variables, class names |
| **Authentication issue** | Check session, cookies, secured route handler |
| **Build error** | Check imports, syntax, dependencies |

#### 3.3 Debugging Techniques

**Frontend (React):**
```javascript
// Add temporary logging
console.log('Component state:', { props, state });
console.log('API response:', response);

// Check if component renders
console.log('MyComponent rendered');
```

**Backend (Express):**
```javascript
// Add temporary logging
console.log('Route handler params:', params);
console.log('User context:', user);
console.log('Database result:', result);
```

**Network:**
- Use browser DevTools Network tab
- Check request/response payloads
- Verify status codes

#### 3.4 Narrow Down Location

Use binary search approach:
1. Is the bug in frontend or backend?
2. Is it in data fetching or rendering?
3. Is it in a specific component or utility?
4. Is it in a specific function or condition?

**Update status:**
```markdown
**Status**: Investigating
**Current understanding**: [What we know so far]
```

### Phase 4: Implement the Fix

#### 4.1 Plan the Fix
Before writing code:

```
ROOT CAUSE: [Confirmed cause of the bug]
FIX APPROACH: [How I will fix it]
AFFECTED FILES: [Files that need changes]
RISK ASSESSMENT: [What else might break]
```

#### 4.2 Make Minimal Changes
- Fix ONLY what's broken
- Don't refactor while fixing
- Don't add features while fixing
- Keep the diff as small as possible

#### 4.3 Consider Edge Cases
| Question | Action |
|----------|--------|
| What if input is null/undefined? | Add null checks |
| What if array is empty? | Handle empty case |
| What if user is not authenticated? | Check auth state |
| What if API fails? | Handle error case |

#### 4.4 Update Status
```markdown
**Status**: In Progress
**Fix approach**: [What you're changing]
```

### Phase 5: Verify the Fix

**CRITICAL: Do NOT mark as fixed without verification**

#### 5.1 Verification Checklist
| Check | Method |
|-------|--------|
| Bug is fixed | Follow original reproduction steps |
| No regression | Test related functionality |
| Error is gone | Check console/logs for errors |
| Expected behavior works | Verify correct behavior occurs |

#### 5.2 Verification Evidence

For UI fixes:
```
✓ Screenshot showing correct behavior
✓ No console errors
```

For API fixes:
```
✓ curl/API response showing correct data
✓ No server errors in logs
```

For build fixes:
```
✓ Build completes successfully
✓ Application runs without errors
```

### Phase 6: Document the Fix

#### 6.1 Update DEFECT-LIST.md
Change status and add resolution:
```markdown
**Status**: Fixed
**Resolution**: [Brief description of what was changed]
**Fixed**: [YYYY-MM-DD]
```

#### 6.2 Move to DONE-LIST.md
After verification, move the defect entry:
```markdown
### [BUG-XXX] Brief Description
**Completed**: [YYYY-MM-DD]
**Resolution**: [What was changed and why]
**Root Cause**: [What actually caused the bug]
**Verification**: [How we verified it's fixed]
```

#### 6.3 Add to GOTCHAS.md (If Applicable)
If this bug reveals a pitfall others might encounter:

```markdown
### [Descriptive Title]
❌ **Wrong**:
```code
The incorrect approach that caused the bug
```

✅ **Correct**:
```code
The correct approach that fixes it
```
**Why**: [Explanation of why this matters]
**Discovered**: [Date] - [Context: BUG-XXX]
```

#### 6.4 Update PATTERNS.md (If Applicable)
If the fix establishes a pattern for avoiding similar bugs:
- Document the pattern
- Reference it for future development

---

## Bug Priority Guidelines

| Priority | Criteria | Response |
|----------|----------|----------|
| **Critical** | App unusable, data loss, security issue | Fix immediately, interrupt other work |
| **High** | Major feature broken, significant UX impact | Fix before new features |
| **Medium** | Feature partially broken, workaround exists | Fix in normal priority order |
| **Low** | Minor inconvenience, cosmetic issue | Fix when convenient |

---

## Integration Points

| After Bug Fixer | Consider Invoking |
|-----------------|-------------------|
| Fix reveals pattern | Pattern Learner |
| Documentation needed | Documentation Updater |
| Structure changed | Codebase Mapper |
| Session ending | Context Summarizer |

| Before Bug Fixer | Check |
|------------------|-------|
| GOTCHAS.md | Is this a known issue? |
| DEFECT-LIST.md | Is this already documented? |
| Recent JOURNAL.md | Has this been worked on? |

---

## Output: Bug Fix Confirmation

After fixing a bug, confirm:

```
🐛 **Bug Fixed**

**Bug**: [BUG-XXX] [Title]
**Root Cause**: [What was actually wrong]
**Fix**: [What was changed]

**Verification**:
- [x] Reproduction steps no longer reproduce bug
- [x] Expected behavior now works
- [x] No console/log errors
- [x] Related functionality still works

**Documentation Updated**:
- [x] DEFECT-LIST.md → Marked as fixed
- [x] DONE-LIST.md → Added with resolution
- [x] GOTCHAS.md → Added pitfall (if applicable)

**Files Changed**:
- [file1.js] - [what changed]
- [file2.jsx] - [what changed]
```

---

## Command Reference

| Command | Description |
|---------|-------------|
| `/fix` | Start bug fixing workflow for current issue |
| `/diagnose` | Run diagnostic phase only (no fix yet) |
| `/verify-fix` | Verify a previously applied fix |

---

## Common Bug Patterns

### Pattern 1: Null/Undefined Access
**Symptom**: "Cannot read property 'x' of undefined"
**Diagnosis**: 
1. Find the line in stack trace
2. Identify which variable is undefined
3. Trace back to where it should be defined

**Common causes**:
- Async data not loaded yet
- Optional prop not provided
- API returned unexpected structure

### Pattern 2: State Not Updating
**Symptom**: UI doesn't reflect changes
**Diagnosis**:
1. Is setState being called?
2. Is the new value different from old?
3. Is the component re-rendering?

**Common causes**:
- Mutating state directly
- Missing dependency in useEffect
- Wrong state variable

### Pattern 3: API Route Not Found
**Symptom**: 404 error on API call
**Diagnosis**:
1. Is route file named correctly (`_*-routes.js`)?
2. Is route registered in routes file?
3. Does URL path match registration?

**Common causes**:
- Route file naming pattern wrong
- Typo in route path
- Missing import in routes file

### Pattern 4: Authentication Issues
**Symptom**: User appears logged out, 401 errors
**Diagnosis**:
1. Is session cookie present?
2. Is route using `securedGet`/`securedPost`?
3. Is user object available in handler?

**Common causes**:
- Using `get` instead of `securedGet`
- Accessing user from params instead of context
- Session expired

---

## Anti-Patterns (What NOT to Do)

❌ **DON'T** do these:

| Anti-Pattern | Why |
|--------------|-----|
| Fix without documenting first | Loses context if interrupted |
| Make fix and assume it works | Must verify with evidence |
| Refactor while fixing | Increases risk, obscures fix |
| Fix multiple bugs at once | Makes verification harder |
| Skip updating GOTCHAS.md | Loses learning for future |
| Guess at cause without diagnosing | May fix symptom, not cause |

✅ **DO** these:

| Best Practice | Why |
|---------------|-----|
| Document before fixing | Preserves context |
| Form and test hypothesis | Systematic diagnosis |
| Make minimal changes | Reduces risk |
| Verify with evidence | Ensures fix works |
| Document root cause | Prevents recurrence |
| Update GOTCHAS.md | Helps future development |

---

## Checklist

Before marking a bug as fixed:

- [ ] Bug documented in DEFECT-LIST.md before fixing
- [ ] Reproduction steps followed and bug confirmed
- [ ] Root cause identified (not just symptom)
- [ ] Fix implemented with minimal changes
- [ ] Fix verified with evidence (screenshot, curl, etc.)
- [ ] Related functionality tested for regression
- [ ] DEFECT-LIST.md updated with resolution
- [ ] Entry moved to DONE-LIST.md
- [ ] GOTCHAS.md updated (if applicable)
- [ ] PATTERNS.md updated (if applicable)
