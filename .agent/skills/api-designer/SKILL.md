---
Skill Name: API Designer
Skill Description: Ensures consistent API design across all routes
Trigger: Invoked when creating new API routes or modifying existing ones
---

# API Designer Skill

> **Status**: Stub - Implementation pending

## Purpose
Maintains consistency in API design by ensuring new routes follow established patterns and conventions.

## When to Invoke
- When creating new API routes
- When modifying existing routes
- When reviewing API design decisions

## Expected Behavior
1. Review proposed route design
2. Check against existing patterns:
   - URL structure
   - HTTP method usage
   - Request/response format
   - Error handling
   - Authentication requirements
3. Suggest improvements for consistency
4. Update patterns documentation if new valid pattern emerges

## Consistency Checks
- **URL Naming**: kebab-case, resource-based
- **HTTP Methods**: GET for reads, POST for writes
- **Response Format**: Consistent structure
- **Error Format**: Standard error response shape
- **Authentication**: Proper use of secured vs public routes

## Current API Conventions
```
GET  /api/{resource}          - List resources
GET  /api/{resource}/{id}     - Get single resource
POST /api/{resource}          - Create resource
POST /api/{resource}/{action} - Perform action
```

## Implementation Notes
- Should reference existing routes as examples
- Should not block development for minor inconsistencies
- Should document new patterns when they're valid innovations

## TODO: Implementation
- [ ] Build route analysis logic
- [ ] Create consistency checker
- [ ] Build suggestion generator
- [ ] Add auto-fix for simple issues
