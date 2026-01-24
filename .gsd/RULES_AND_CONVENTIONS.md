# RULES_AND_CONVENTIONS

## Front End

### Styling

- No Inline styles, all CSS must be written in .css files that accompany the component that they support
- DO NOT hard code colors, use the colors defined in `@client/theme.css`
- If you need a color that is not in the theme file add it to `@client/theme.css`
- Component level styling must be scoped to the component, do not use global styles
- Use nesting in .css files to make styles specific
- All pages must be mobile responsive
- All components must support both light mode and dark mode

### Components

- Only one component per file
- If a component is a utility component that can be used in multiple places place it in `@client/src/components`
- If a component is a sub component of another component and will only be used by that component place it in a `./sub-components` folder of that component
- All imports that reference shared components and resources should begin with `@client/...`
- All imports that reference sub-components should be relative and use `./...` 
- All Components need PropTypes
- All Components need there props to be defaulted to initial values
- All components should have a top level className wrapping the component that matches the name of the component
