# Decisions

## Phase 1 Decisions

**Date:** 2026-01-20

### Scope
- **Mobile Navigation**: Use a standard hamburger menu (Ant Design Drawer) for mobile.
- **Pricing**: Pricing section will be an anchor on the Home page, not a separate page.
- **Header**: Refactor `PublicLayout` header to use a "premium" feel (glassmorphism/blur effect, sticky positioning).

### Approach
- **CSS Strategy**: Chose **Option A + B (Hybrid)**. Use Ant Design's `ConfigProvider` for core tokens (colors, radii) and Vanilla CSS variables in `index.css` for the "Premium" layer (gradients, animations, glassmorphism).

### Constraints
- Ensure that the new global styles in `index.css` do not break the layout of the authenticated dashboard area (`@` routes).
- Maintain existing Auth route functionality while updating their visual shell.
