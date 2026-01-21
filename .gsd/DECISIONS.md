# Decisions

## Phase 1 Decisions

**Date:** 2026-01-20

### Scope
- **Mobile Navigation**: Use a standard hamburger menu (Ant Design Drawer) for mobile.
- **Pricing**: Pricing section will be an anchor on the Home page, not a separate page.
- **Header**: Refactor `PublicLayout` header to use a "premium" feel (glassmorphism/blur effect, sticky positioning).

### Approach
- **CSS Strategy**: Chose **Option A + B (Hybrid)**. Use Ant Design's `ConfigProvider` for core tokens (colors, radii) and Vanilla CSS variables in `index.css` for the "Premium" layer (gradients, animations, glassmorphism).

---

## Phase 2 Decisions

**Date:** 2026-01-20

### Scope
- **Tagline**: "The Ultimate Foundation for your Next Big Idea"
- **Pricing Names**: Hobby, Startup, Pro, Enterprise.
- **Product Visual**: Use a high-quality generated image for the Hero section.
- **Icons**: Ant Design icons styled with primary gradients.

### Approach
- **Hero**: Use a two-column layout (Text/CTA vs Image) for the Hero.
- **Features**: 4-column grid for key starter capabilities.
- **Pricing**: Responsive 4-card layout with a "Most Popular" highlight on the Startup/Pro tier.
- **Anchor**: Implement scroll-to-id behavior for the "Pricing" nav link.
