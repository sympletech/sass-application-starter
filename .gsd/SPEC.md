# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
Elevate the SaaS starter with a premium, high-end landing page experience that showcases its core capabilities (Auth, Stripe, Dashboard) and provides essential public-facing pages (About, Legal) with a unified, polished aesthetic.

## Goals
1. **Hero & Features**: Create a high-impact Home page hero section and feature showcase highlighting the starter's tech stack (React 19, Express 5, Stripe, Passport).
2. **Pricing Widget**: Build a visually compelling 4-tier pricing section (Free Trial, Basic, Better, Good) to demonstrate value proposition.
3. **Content Pages**: Implement polished "About" and "Legal" (Privacy/Terms) pages with professional layouts and boilerplate copy.
4. **Navigation & Footer**: Update `PublicLayout` with a modern, responsive sticky header and a comprehensive multi-column footer.
5. **Premium Polish**: Apply custom CSS refinements (gradients, micro-animations, typography) to the public-facing site for a high-end feel.

## Non-Goals (Out of Scope)
- Implementing backend logic or Stripe products for the "Basic", "Better", and "Good" tiers.
- Redesigning the internal `@` (authenticated) dashboard area.
- Setting up a CMS or dynamic content management for legal pages.
- Changing the existing authentication/signup flows (though UI will be polished).

## Users
- **Prospective Customers**: Browsing the site to understand the "product" (the starter's capabilities).
- **Existing Users**: Accessing the login/signup routes from the landing page.

## Constraints
- Must use existing **Ant Design** components where possible but extend with **Custom CSS** for the "premium" look.
- Maintain compatibility with the existing **React Router 7** and **Vite** setup.
- Stick to the current light mode/dark mode constraints if not explicitly changed (focus on a cohesive premium light or dark theme).