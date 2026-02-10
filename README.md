# Sympletech Application Starter

A premium SaaS starter template with a built-in **prompt-driven development framework**. Describe what you want to build, and the AI agent plans, implements, and verifies every step — from project definition through production features.

## What's Included

| Layer | Technology | Details |
|-------|-----------|---------|
| Frontend | React 19 + Ant Design + Tailwind | Port 3001 |
| Backend | Node.js + Express | Port 3000 |
| Database | MongoDB | Via MONGO_URI |
| Payments | Stripe | Subscriptions, trials, billing portal |
| Auth | Email/password + Google, Facebook, Twitter OAuth | Session-based |
| AI Framework | 14 skills + workflows | Prompt-driven development |

---

## Quick Start

### 1. Clone and Install

```bash
git clone git@github.com:sympletech/sass-application-starter.git
cd sass-application-starter
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `MONGO_URI` — MongoDB connection string
- `SESSION_SECRET` — Express session secret
- `PASSWORD_SALT` — For password hashing

Optional (for full features):
- `STRIPE_SECRET_KEY`, `VITE_STRIPE_PUBLISHABLE_KEY`, `STRIPE_TRIAL_PRICE_ID`
- `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`
- `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`
- `TWITTER_CLIENT_ID`, `TWITTER_CLIENT_SECRET`

### 3. Start Development

```bash
npm start
```

Frontend: http://localhost:3001 | Backend: http://localhost:3000

---

## Prompt-Driven Development

This project is designed to be built with an AI coding agent (GitHub Copilot, Claude, Cursor, etc.). The `.agent/` directory contains a complete framework that turns your AI assistant into a collaborative development partner.

### How It Works

You talk to the agent in natural language. The agent reads the framework instructions, understands the project structure, maintains state across sessions, and builds your product one verified task at a time.

### Getting Started with Your Project

#### Step 1: Start a Session

Open your AI agent chat. The agent automatically reads `.agent/INSTRUCTIONS.md`, loads all project context, and greets you with the current project state.

If this is your first session, it will detect that no project is defined and offer to help you plan.

#### Step 2: Define Your Project — `/plan`

Tell the agent what you want to build:

```
/plan

I want to build a project management tool where teams can create projects,
assign tasks, track progress, and communicate through comments. It should
have a free tier with limited projects and a paid tier with unlimited access.
```

The agent will:
1. **Ask thoughtful questions** to understand your vision
2. **Write a project description** (`.project-plan/PROJECT-DESCRIPTION.md`) and confirm it with you
3. **Create a task roadmap** (`.project-plan/ROADMAP.md`) with small, ordered, dependency-aware tasks
4. **Each task has a clear definition of done** — specific, verifiable criteria

#### Step 3: Build Task by Task — `/next`

```
/next
```

The agent:
1. Picks the top-priority task from the roadmap
2. Reviews the implementation plan (may ask clarifying questions via `/clarify`)
3. Implements the feature — backend routes, frontend components, styling
4. Verifies the work with evidence (screenshots, curl output, build results)

#### Step 4: Complete and Continue — `/done`

```
/done
```

The agent:
1. Verifies all definition-of-done criteria are met with proof
2. Moves the task to the done list
3. Updates project state and documentation
4. Suggests the next task

Then just `/next` again to keep going.

#### Step 5: Save Your Progress — `/handoff`

When you're done for the day (or context is getting full):

```
/handoff
```

The agent saves all state, writes a journal entry, and prepares a handoff so the next session resumes seamlessly.

### Typical Session

```
(Agent bootstraps automatically — loads context, shows status)

You:  /next
Agent: Starting TASK-003: User dashboard page...
       (implements, verifies)

You:  /done
Agent: Task complete. Next up: TASK-004. Use /next to continue.

You:  Actually, I just thought of something — users should be able to
      export their data as CSV.

You:  /add-feature Export user data as CSV from the dashboard

Agent: Added TASK-012 to the roadmap. Placed after the dashboard tasks.
       Continuing with current work.

You:  /next
Agent: Starting TASK-004...
```

### All Commands

#### Project Management
| Command | What It Does |
|---------|-------------|
| `/plan` | Define your project vision and create the task roadmap |
| `/next` | Start the next task from the roadmap |
| `/done` | Complete the current task (with verification) |
| `/progress` | See project status — completed, in progress, remaining |
| `/add-feature` | Add a new feature to the roadmap |
| `/replan` | Reassess and reorder the full roadmap |

#### During Development
| Command | What It Does |
|---------|-------------|
| `/fix` | Systematic bug diagnosis and fix |
| `/clarify` | Get clear on ambiguous requirements before coding |
| `/component` | Generate a React component following project patterns |
| `/page [name]` | Generate a page component |
| `/api` | Design and create an API route |
| `/refactor` | Find and fix code duplication |
| `/find-library` | Find a third-party library for a need |

#### Documentation & Session
| Command | What It Does |
|---------|-------------|
| `/handoff` | Save session state for seamless continuation |
| `/map` | Update the codebase map after structural changes |
| `/learn-patterns` | Document new code patterns |
| `/update-docs` | Sync documentation with code changes |
| `/note` | Capture a learning or decision |

---

## Project Structure

```
.agent/                    # AI development framework
  INSTRUCTIONS.md          # Agent's primary guide
  JOURNAL.md               # Session logs
  knowledge/               # Codebase map, patterns, gotchas, decisions
  skills/                  # 14 skill definitions (planning, coding, docs)
  workflows/               # Multi-step workflow definitions

.project-plan/             # Your project tracking
  PROJECT-DESCRIPTION.md   # What you're building
  ROADMAP.md               # Ordered task queue
  CURRENT-TASK.md          # Active task details
  STATE.md                 # Quick status snapshot
  DEFECT-LIST.md           # Bug tracking
  DONE-LIST.md             # Completed work

@client/                   # React frontend (port 3001)
  src/
    components/            # Reusable UI components
    pages/                 # Route pages
    hooks/                 # Custom React hooks
    lib/                   # Utilities and API helpers
    layouts/               # Page layouts (public, logged-in)

@server/                   # Express backend (port 3000)
  server.js                # Entry point
  lib/                     # Database, Stripe, auth helpers
  routes/                  # API routes organized by feature
```

---

## Integration Setup

### Stripe (Payments & Subscriptions)

1. Create a [Stripe](https://stripe.com) account
2. Get API keys from **Developers > API keys**
3. Create a product with a recurring price in **Product catalog**
4. Add to `.env`:
   - `VITE_STRIPE_PUBLISHABLE_KEY` — Publishable key
   - `STRIPE_SECRET_KEY` — Secret key
   - `STRIPE_TRIAL_PRICE_ID` — Price ID (starts with `price_...`)

Trial period is hardcoded to 14 days in `@server/routes/auth/_auth-routes.js`.

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → **APIs & Services > Credentials > Create OAuth client ID**
3. Add authorized redirect URI: `http://localhost:3000/auth/google/callback`
4. Add to `.env`:
   - `GOOGLE_OAUTH_CLIENT_ID`
   - `GOOGLE_OAUTH_CLIENT_SECRET`

### Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create an app → Set up **Facebook Login** → Add platform **Web**
3. Add Valid OAuth Redirect URI: `http://localhost:3000/auth/facebook/callback`
4. Add to `.env`:
   - `FACEBOOK_APP_ID`
   - `FACEBOOK_APP_SECRET`

### Twitter (X) OAuth

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create an app → Enable **OAuth 1.0a** → Set permissions to **Read**
3. Add Callback URL: `http://localhost:3000/auth/twitter/callback`
4. Add to `.env`:
   - `TWITTER_CLIENT_ID` — API Key
   - `TWITTER_CLIENT_SECRET` — API Key Secret