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

---

## Phase 3 Decisions

**Date:** 2026-01-20

### Scope
- **Footer Columns**: 4 columns (Product, Company, Legal, Socials).
- **About Page**: Focus on "Product Mission".
- **Legal Content**: Standard SaaS boilerplate for Privacy/Terms.

### Approach
- **Componentization**: Move the Footer into a standalone `@client/src/components/Footer.jsx` component.
- **Layout Integrity**: Ensure the footer styling matches the premium aesthetic of the header and cards.

---

## Phase 4 Decisions

**Date:** 2026-01-20

### Scope
- **Animations**: Go "Bold" with scroll reveal and card scaling.
- **Micro-interactions**: Enhanced hover glows and transformations for all premium cards.
- **Auth Styling**: Apply premium glassmorphism to Login and Signup pages.

### Approach
- **Animations**: Use CSS keyframes + `IntersectionObserver` for staggered reveal effects.
- **Glassmorphism**: Refactor `AuthCard.css` to use the global glassmorphism tokens.
- **Consistency**: Final pass to ensure all CTA buttons use the premium gradient and hover states.
