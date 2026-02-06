# Skills To Build

## Implemented Skills

| Skill | Priority | Status | Description |
|-------|----------|--------|-------------|
| Session Bootstrapper | HIGH | ✅ Implemented | Loads context at session start, determines workflow |
| High Level Project Manager | HIGH | ✅ Implemented | Collaborates with user to define and plan the project |

## Stubbed Skills (Ready for Implementation)

| Skill | Priority | Status | Description |
|-------|----------|--------|-------------|
| Context Summarizer | HIGH | Stubbed | Creates session handoffs |
| Codebase Mapper | HIGH | Stubbed | Maintains CODEBASE-MAP.md |
| Pattern Learner | MEDIUM | Stubbed | Documents patterns as discovered |
| Documentation Updater | MEDIUM | Stubbed | Keeps docs in sync |
| Component Generator | MEDIUM | Stubbed | Scaffolds new components |
| Test Writer | MEDIUM | Stubbed | Generates tests |
| Refactoring Assistant | LOW | Stubbed | Identifies DRY opportunities |
| API Designer | LOW | Stubbed | Ensures API consistency |

## Referenced Skills (Need Creation)

| Skill | Status | Location |
|-------|--------|----------|
| Note Taker | Referenced | `.agent/skills/note-taker/SKILL.md` |
| Task Clarifier | Referenced | `.agent/skills/task-clarifier/SKILL.md` |
| Bug Fixer | Referenced | `.agent/skills/bug-fixer/SKILL.md` |
| Task Validator | Referenced | `.agent/skills/task-validator/SKILL.md` |
| Third Party Module Finder | Referenced | `.agent/skills/third-party-module-finder/SKILL.md` |

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