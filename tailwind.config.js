/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./@client/index.html",
    "./@client/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          400: 'var(--color-brand-400)',
        },
        accent: {
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          400: 'var(--color-accent-400)',
          350: 'var(--color-accent-350)',
          300: 'var(--color-accent-300)',
        },
        surface: {
          base: 'var(--surface-base)',
          muted: 'var(--surface-muted)',
          border: 'var(--surface-border)',
          'border-soft': 'var(--surface-border-soft)',
          'border-strong': 'var(--surface-border-strong)',
          subtle: 'var(--surface-subtle)',
          'header-dark': 'var(--surface-header-dark)',
        },
        text: {
          strong: 'var(--text-strong)',
          title: 'var(--text-title)',
          body: 'var(--text-body)',
          muted: 'var(--text-muted)',
          faint: 'var(--text-faint)',
          inverse: 'var(--text-inverse)',
          'strong-alt': 'var(--text-strong-alt)',
        },
        state: {
          success: 'var(--state-success)',
          'success-soft': 'var(--state-success-soft)',
          warning: 'var(--state-warning)',
          'warning-soft': 'var(--state-warning-soft)',
          danger: 'var(--state-danger)',
          'danger-soft': 'var(--state-danger-soft)',
          info: 'var(--state-info)',
          'info-soft': 'var(--state-info-soft)',
        },
        glass: {
          bg: 'var(--glass-bg)',
          border: 'var(--glass-border)',
          'bg-dark': 'var(--glass-bg-dark)',
          'border-dark': 'var(--glass-border-dark)',
        },
        glow: {
          1: 'var(--glow-1)',
          2: 'var(--glow-2)',
        }
      },
      fontFamily: {
        premium: ['var(--font-premium)'],
      },
      boxShadow: {
        hero: 'var(--shadow-hero)',
        'button-hover': 'var(--shadow-button-hover)',
        soft: 'var(--shadow-soft)',
        'glass-hover': 'var(--shadow-glass-hover)',
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-primary-hover': 'var(--gradient-primary-hover)',
        'gradient-alt': 'var(--gradient-alt)',
        'gradient-alt-hover': 'var(--gradient-alt-hover)',
      }
    },
  },
  plugins: [],
}
