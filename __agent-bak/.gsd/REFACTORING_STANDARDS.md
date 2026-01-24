# Refactoring Standards

## Overview
This document guides the transition from a messy, inline-styled codebase to a structured, maintainable, and themable design system using Tailwind CSS and React components.

## 1. Naming & File Structure

### Components
- **File Name**: PascalCase (e.g., `Button.jsx`, `FeatureCard.jsx`).
- **Location**:
  - Reusable: `@client/src/components/`
  - Page-specific: Stay in `@client/src/pages/{PageName}/components/` (if it doesn't pollute).
- **Hooks**: CamelCase in `@client/src/hooks/` (e.g., `useWindowSize.js`).

### CSS Files
- **Avoid new CSS files** unless necessary for complex animations or pseudo-elements.
- If created, use kebab-case (e.g., `auth-card.css`).

## 2. Styling Strategy

### Priority Order
1. **Tailwind Utility Classes**: Preferred for detailed layout, spacing, and state (e.g., `flex p-4 hover:bg-surface-muted`).
2. **Theme Variables**: mapped via Tailwind config (e.g., `text-brand-500` -> `var(--color-brand-500)`).
3. **Module/CSS Classes**: For complex components (e.g., `.glass-header` in `index.css`).
4. **Inline Styles**: **FORBIDDEN** (except for dynamic values like coordinates).

### Theming
- **Colors**: NEVER hardcode hex values (e.g., `#6366f1`). Use `bg-brand-500` or `text-surface-base`.
- **Spacing**: Use Tailwind's spacing scale (e.g., `m-4`, `p-6`). Do not use random pixel values.

## 3. Component Extraction Rules
- **Single Reason to Change**: Break components down if they handle too many concerns.
- **Props Interface**: Use standard props (`className`, `style`, `children`) to allow composition.
- **Props Validation**: Define simple defaults; use TypeScript interfaces (if TS) or clear JSDoc.

## 4. Ant Design Coexistence
- **Wrappers**: If customizing an AntD component heavily, wrap it (e.g., `PremiumButton.jsx` wrapping `<Button />`).
- **Overrides**: Use global overrides in `index.css` sparingly. Prefer standardizing on AntD tokens via `ConfigProvider` where possible.
