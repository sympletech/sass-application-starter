---
Skill Name: Codebase Mapper
Skill Description: Analyzes the codebase and generates/updates the CODEBASE-MAP.md knowledge file
Trigger: Automatically invoked when significant structural changes are made (new files, new routes, new components)
---

# Codebase Mapper Skill

> **Status**: Stub - Implementation pending

## Purpose
Maintains an accurate, up-to-date map of the codebase structure so that agents can understand the project without extensive searching.

## When to Invoke
- After creating new components, pages, or routes
- After adding new database collections
- After adding new hooks or utilities
- When the agent detects the map is outdated
- When explicitly requested by user

## Expected Behavior
1. Scan the codebase structure
2. Identify new or changed files
3. Update `.agent/knowledge/CODEBASE-MAP.md` with:
   - New file locations
   - Updated feature-to-file mappings
   - New components/hooks/utilities
   - Updated architecture diagrams if needed

## Implementation Notes
- Should be efficient (not full scan every time)
- Should detect what section of the map needs updating
- Should preserve manual annotations

## TODO: Implementation
- [ ] Define scanning strategy
- [ ] Build file analysis logic
- [ ] Create map update logic
- [ ] Add manual annotation preservation
