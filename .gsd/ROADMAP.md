# ROADMAP.md

> **Current Milestone**: v2.0 - Client Refactor & Modernization
> **Goal**: Modernize the client codebase by checking in Tailwind CSS, enforcing theme variables, removing inline styles, and improving component reusability.

## Must-Haves
- [ ] Install and configure Tailwind CSS (v3).
- [ ] Extract reusable UI elements to `@client/src/components`.
- [ ] Replace hardcoded colors with `@client/theme.css` variables.
- [ ] Move inline styles to named CSS files or Tailwind classes.
- [ ] Extract reusable logic into shared libraries.

## Phases

### Phase 1: Foundation & Tailwind Integration
**Status**: ✅ Completed
**Objective**: Install Tailwind CSS v3, configure content paths, and establish the refactoring patterns.
- Install Tailwind CSS and its dependencies.
- Configure `tailwind.config.js` and `postcss.config.js`.
- Verify Tailwind builds correctly with the existing dev server.
- Define a "Refactoring Standard" (e.g., how to name new CSS files, usage of `theme.css`).

### Phase 2: Component Extraction & Cleanup
**Status**: ✅ Completed
**Objective**: Systematically break down large pages/components and remove inline styles.
- Audit `src/pages` for large components.
- Extract reusable parts to `src/components` (e.g., Cards, Buttons, Inputs).
- Move inline `style={{...}}` props to external `.css` files or Tailwind classes.

### Phase 3: Theming & Visual Consistency
**Status**: 🔄 In Progress
**Objective**: Enforce the design system by removing hardcoded values.
- Audit code for hex codes and color literals.
- Replace instances with `var(--theme-var)` from `theme.css`.
- Ensure Tailwind uses the theme variables where possible (extend Tailwind config).

### Phase 4: Shared Logic & Final Polish
**Status**: ⬜ Not Started
**Objective**: DRY up the codebase and verify the refactor.
- Identify duplicated logic (hooks, formatting utils) and move to `src/lib` or `src/hooks`.
- Perform full regression testing to ensure no visual breakages.
