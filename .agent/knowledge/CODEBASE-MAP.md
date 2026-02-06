# Codebase Map

> **Purpose**: Provides agents with immediate understanding of the codebase structure without needing to search.
> **Last Updated**: 2026-02-05
> **Updated By**: Agent (Codebase Mapper skill implemented)

---

## Quick Reference

| Item | Location |
|------|----------|
| Client Entry | `@client/src/main.jsx` |
| Server Entry | `@server/server.js` |
| Route Definitions | `@server/routes/*/_*-routes.js` |
| Components | `@client/src/components/<name>/<name>.jsx` |
| Pages | `@client/src/pages/<name>/<name>.jsx` |
| Layouts | `@client/src/layouts/<name>/<name>-layout.jsx` |
| Hooks | `@client/src/hooks/` |
| Theme Variables | `@client/theme.css` |
| Global Styles | `@client/src/index.css` |
| MongoDB Client | `@server/lib/mongo-client.js` |
| Stripe Client | `@server/lib/stripe-client.js` |

---

## Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              React Client (Port 3001)                │    │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐             │    │
│  │  │  Pages  │  │Components│  │ Layouts │             │    │
│  │  └────┬────┘  └────┬────┘  └────┬────┘             │    │
│  │       └───────────┬┴───────────┘                    │    │
│  │              useApi hooks                            │    │
│  └──────────────────┬──────────────────────────────────┘    │
└─────────────────────┼───────────────────────────────────────┘
                      │ HTTP/JSON
┌─────────────────────┼───────────────────────────────────────┐
│                     ▼                                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            Express Server (Port 3000)                │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │    │
│  │  │Auth Routes  │  │Account Routes│  │ OAuth      │  │    │
│  │  └──────┬──────┘  └──────┬──────┘  └─────┬──────┘  │    │
│  │         └────────────────┼───────────────┘          │    │
│  │                          ▼                          │    │
│  │  ┌─────────────┐  ┌─────────────┐                  │    │
│  │  │ MongoDB     │  │  Stripe     │                  │    │
│  │  └─────────────┘  └─────────────┘                  │    │
│  └─────────────────────────────────────────────────────┘    │
│                     NODE.JS SERVER                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Feature → File Mapping

### Authentication System
| Feature | Client | Server |
|---------|--------|--------|
| Login | `@client/src/pages/login/login.jsx` | `@server/routes/auth/login.js` |
| Signup | `@client/src/pages/signup/signup.jsx` | `@server/routes/account/signup.js` |
| Current User | via `useApiGet('/api/auth/me')` | `@server/routes/auth/me.js` |
| OAuth | `@client/src/components/auth/social-auth-buttons.jsx` | `@server/lib/register-oauth.js` |
| Route Definitions | - | `@server/routes/auth/_auth-routes.js` |

### Payment System (Stripe)
| Feature | Client | Server |
|---------|--------|--------|
| Payment Form | `@client/src/components/auth/payment-form.jsx` | - |
| Convert to Paid | - | `@server/routes/account/convert-to-paid.js` |
| Cancel Subscription | - | `@server/routes/account/cancel.js` |
| Reactivate | `@client/src/pages/reactivate/reactivate.jsx` | `@server/routes/account/reactivate.js` |
| Stripe Portal | - | `@server/routes/account/create-stripe-portal-session-url.js` |
| Setup Intent | - | `@server/routes/account/stripe-create-setup-intent.js` |
| Subscription Status | - | `@server/lib/derive-subscription-status.js` |
| Route Definitions | - | `@server/routes/account/_account-routes.js` |

### User Profile
| Feature | Client | Server |
|---------|--------|--------|
| Profile Page | `@client/src/pages/profile/profile.jsx` | - |
| Profile Details | `@client/src/pages/profile/profile-details-card.jsx` | - |
| Subscription Card | `@client/src/pages/profile/account-subscription-card.jsx` | - |

### Public Marketing Pages
| Page | Location | Sections |
|------|----------|----------|
| Home | `@client/src/pages/home/home.jsx` | hero-section, features-section, pricing-section |
| About | `@client/src/pages/about/about.jsx` | mission-section, story-section, vision-section |
| Legal | `@client/src/pages/legal/legal.jsx` | - |

### Layouts
| Layout | Location | Purpose |
|--------|----------|---------|
| Public | `@client/src/layouts/public/public-layout.jsx` | Marketing pages, unauthenticated users |
| Logged In | `@client/src/layouts/logged-in/logged-in-layout.jsx` | Dashboard, profile, authenticated users |

---

## Database Collections

> Defined in `@server/lib/mongo-client.js`

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| `accounts` | User accounts | [To be documented] |
| `sessions` | User sessions | [To be documented] |

---

## Reusable Components

| Component | Location | Purpose |
|-----------|----------|---------|
| AppSection | `@client/src/components/app-section/` | Page section wrapper |
| AuthCard | `@client/src/components/auth/auth-card.jsx` | Auth form container |
| AuthHeader | `@client/src/components/auth/auth-header.jsx` | Auth page header |
| FeatureCard | `@client/src/components/feature-card/` | Feature display card |
| Footer | `@client/src/components/footer/` | Site footer |
| InfoItem | `@client/src/components/info-item/` | Information display |
| Logo | `@client/src/components/logo/` | Brand logo |
| PageHeader | `@client/src/components/page-header/` | Page title header |
| PricingCard | `@client/src/components/pricing-card/` | Pricing tier card |
| ScrollToTop | `@client/src/components/scroll-to-top/` | Scroll behavior |
| SectionHeader | `@client/src/components/section-header/` | Section title |
| SocialAuthButtons | `@client/src/components/auth/social-auth-buttons.jsx` | OAuth buttons |
| PaymentForm | `@client/src/components/auth/payment-form.jsx` | Stripe payment |

---

## Custom Hooks

| Hook | Location | Purpose |
|------|----------|---------|
| useDrawer | `@client/src/hooks/use-drawer.js` | Drawer state management |
| useResponsive | `@client/src/hooks/use-responsive.js` | Responsive breakpoints |
| useReveal | `@client/src/hooks/use-reveal.js` | Scroll reveal animations |
| useTheme | `@client/src/hooks/use-theme.js` | Theme switching |
| useApiGet | `@client/src/lib/use-api.js` | SWR-style GET requests |
| useApiPost | `@client/src/lib/use-api.js` | SWR-style POST requests |
| getData | `@client/src/lib/use-api.js` | Async GET requests |
| postData | `@client/src/lib/use-api.js` | Async POST requests |

---

## Environment Variables

| Variable | Used By | Purpose |
|----------|---------|---------|
| `MONGO_URI` | Server | MongoDB connection string |
| `MONGO_DB_NAME` | Server | Database name |
| `VITE_SERVER_PORT` | Both | Server port (default: 3000) |
| `SESSION_SECRET` | Server | Express session secret |
| `PASSWORD_SALT` | Server | Password hashing salt |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Client | Stripe public key |
| `STRIPE_SECRET_KEY` | Server | Stripe secret key |

---

## Import Aliases

| Alias | Resolves To |
|-------|-------------|
| `@client/` | `./client/` |
| `@server/` | `./server/` |

---

## Notes

> Add observations about the codebase structure as you discover them

- [No notes yet]
