# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

**DC (Despeses Compartides)** — a mobile-first shared-expense app for two users
(Víctor and Sílvia), replacing Splitwise for personal use.

## Design reference

**`design/` contains a reference implementation exported from Claude Design.**
Read it before implementing any UI. It is the source of truth for layout,
spacing, typography, colour and interaction patterns.

It is reference material, NOT production code:
- Never import from `design/` at runtime
- Never modify `design/` — it is a design artefact
- Adapt it to this project's conventions (see below) rather than copying verbatim

## Conventions

- **Language**: all user-facing text in Catalan (ca-ES). Code, comments, commits
  and GitHub issues in English.
- **Mobile-first**: single column, full-width cards, minimum 44px tap targets,
  modals full-screen on mobile.
- **Styling**: CSS variables defined in `app/globals.css`. Inline styles only —
  no Tailwind classes for layout or colour.
- **Currency**: EUR only, formatted `ca-ES`.

## Stack

Next.js 15 (App Router), React 19, TypeScript, Supabase (`@supabase/ssr`),
deployed on Vercel.

## Database

Supabase project ref `dneudwadlfafwcmbaimm`, schema **`sw`**.

**Never touch the `public` schema** — it belongs to a separate app (FinanceViz)
that shares this Supabase project. All queries must target `sw`.

Configure the client with `{ db: { schema: 'sw' } }`.

### Tables

- `sw.categories` — 10 seeded rows, Catalan names, with icon + colour
- `sw.groups` — `type` is `general` (one permanent ledger) or `project`;
  `status` is `active` or `closed`
- `sw.expenses` — soft-deleted via `deleted_at`; always filter `deleted_at IS NULL`
- `sw.expense_shares` — stores `owed_amount` (exact EUR), **not** a ratio
- `sw.settlements` — settle-up records between the two users

### Views

- `sw.v_balances` — net balance per user (positive = user is owed money)
- `sw.v_monthly_general_totals` — monthly totals, **General ledger only**
  (project expenses are deliberately excluded)

### Key facts

- The permanent General ledger id is `ac73e37d-7c22-46a9-89ad-f95de8185ec5`
- Closing a project rolls its net imbalance into a single General-ledger expense,
  tagged via `rolled_up_from_group_id`
- `external_ref` exists on `expenses` and `settlements` to make the Splitwise
  historical import idempotent

## Migrations

SQL migrations are written as files for manual execution in the Supabase SQL
Editor. Never run migrations directly.

## Branching

Active branch is `staging`. Merge to `main` only when stable.
Always include `Closes #<issue-number>` in commit messages.
