# Skills To Build

## Core Skills (Stubbed - Ready for Implementation)

| Skill | Priority | Status | Description |
|-------|----------|--------|-------------|
| Session Bootstrapper | HIGH | Stubbed | Loads context at session start |
| Codebase Mapper | HIGH | Stubbed | Maintains CODEBASE-MAP.md |
| Context Summarizer | HIGH | Stubbed | Creates session handoffs |
| Pattern Learner | MEDIUM | Stubbed | Documents patterns as discovered |
| Documentation Updater | MEDIUM | Stubbed | Keeps docs in sync |
| Component Generator | MEDIUM | Stubbed | Scaffolds new components |
| Test Writer | MEDIUM | Stubbed | Generates tests |
| Refactoring Assistant | LOW | Stubbed | Identifies DRY opportunities |
| API Designer | LOW | Stubbed | Ensures API consistency |

## Existing Skills (Referenced in INSTRUCTIONS.md)

| Skill | Status | Location |
|-------|--------|----------|
| Note Taker | Referenced | `.agent/skills/note-taker/SKILL.md` |
| Task Clarifier | Referenced | `.agent/skills/task-clarifier/SKILL.md` |
| Bug Fixer | Referenced | `.agent/skills/bug-fixer/SKILL.md` |
| Task Validator | Referenced | `.agent/skills/task-validator/SKILL.md` |
| Third Party Module Finder | Referenced | `.agent/skills/third-party-module-finder/SKILL.md` |
| High Level Project Manager | Exists | `.agent/skills/high-level-project-manager/SKILL.md` |

## Workflows

| Workflow | Status | Command | Location |
|----------|--------|---------|----------|
| Create Project Description | Exists | `/create-project-description` | `.agent/workflows/create-project-description.md` |
| Session Handoff | Created | `/handoff` | `.agent/workflows/session-handoff.md` |

## Implementation Order Recommendation

1. **Session Bootstrapper** - Enables immediate context on session start
2. **Context Summarizer** - Enables session continuity
3. **Codebase Mapper** - Keeps structure knowledge current
4. **Pattern Learner** - Builds knowledge over time
5. **Documentation Updater** - Maintains doc accuracy
6. **Component Generator** - Speeds up development
7. **Test Writer** - Improves code quality
8. **Refactoring Assistant** - Code quality maintenance
9. **API Designer** - API consistency

## Skills To Consider Adding

- **Migration Planner** - For database schema changes
- **Performance Analyzer** - For identifying bottlenecks
- **Security Auditor** - For security best practices
- **Dependency Updater** - For managing package updates
- **Error Handler** - For consistent error handling patterns