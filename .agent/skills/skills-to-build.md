# Skills To Build

## Implemented Skills

| Skill | Priority | Status | Description |
|-------|----------|--------|-------------|
| Session Bootstrapper | HIGH | ✅ Implemented | Loads context at session start, determines workflow |
| High Level Project Manager | HIGH | ✅ Implemented | Collaborates with user to define and plan the project |
| Context Summarizer | HIGH | ✅ Implemented | Creates session handoffs, ensures continuity |
| Codebase Mapper | HIGH | ✅ Implemented | Maintains CODEBASE-MAP.md with project structure |
| Pattern Learner | MEDIUM | ✅ Implemented | Documents patterns as discovered |
| Documentation Updater | MEDIUM | ✅ Implemented | Keeps docs in sync with code changes |
| Bug Fixer | MEDIUM | ✅ Implemented | Systematic debugging with root cause analysis |
| Component Generator | MEDIUM | ✅ Implemented | Scaffolds new components following project patterns |
| API Designer | MEDIUM | ✅ Implemented | Ensures consistent API design across all routes |
| Refactoring Assistant | MEDIUM | ✅ Implemented | Identifies code duplication and DRY opportunities |
| Note Taker | MEDIUM | ✅ Implemented | Captures learnings and routes to knowledge files |
| Third Party Module Finder | MEDIUM | ✅ Implemented | Evaluates and recommends third-party libraries |
| Task Clarifier | MEDIUM | ✅ Implemented | Gathers requirements before implementation |

## Stubbed Skills (Ready for Implementation)

| Skill | Priority | Status | Description |
|-------|----------|--------|-------------|
| Test Writer | MEDIUM | Stubbed | Generates tests |
| Task Validator | LOW | Stubbed | Validates task completion |

## Referenced Skills (Need Creation)

| Skill | Status | Location |
|-------|--------|----------|
| Test Writer | Stubbed | `.agent/skills/test-writer/SKILL.md` (needs creation) |
| Task Validator | Stubbed | `.agent/skills/task-validator/SKILL.md` |

## Workflows

| Workflow | Status | Command | Location |
|----------|--------|---------|----------|
| Create Project Description | Exists | `/create-project-description` | `.agent/workflows/create-project-description.md` |
| Session Handoff | Exists | `/handoff` | `.agent/workflows/session-handoff.md` |
| Task Clarification | Exists | `/clarify` | `.agent/skills/task-clarifier/SKILL.md` |
| Generate Component | Exists | `/generate` | `.agent/skills/component-generator/SKILL.md` |
| API Design | Exists | `/api` | `.agent/skills/api-designer/SKILL.md` |
| Refactor Code | Exists | `/refactor` | `.agent/skills/refactoring-assistant/SKILL.md` |
| Capture Notes | Exists | `/note` | `.agent/skills/note-taker/SKILL.md` |
| Find Library | Exists | `/find-library` | `.agent/skills/third-party-module-finder/SKILL.md` |
| Update Codebase Map | Exists | `/map` | `.agent/skills/codebase-mapper/SKILL.md` |

## Implementation Order Recommendation

All core skills are now implemented! Remaining work:

1. **Test Writer** - Generates unit/integration tests
2. **Task Validator** - Validates task completion with checklists

## Skills To Consider Adding

- **Migration Planner** - For database schema changes
- **Performance Analyzer** - For identifying bottlenecks
- **Security Auditor** - For security best practices
- **Dependency Updater** - For managing package updates
- **Error Handler** - For consistent error handling patterns