# Decision log

This log records confirmed product and architectural decisions. It does not invent historical rationale. Add entries when a decision is approved, and link the implementing pull request where available.

## Entry template

### YYYY-MM-DD — Decision title

- **Date:** YYYY-MM-DD
- **Decision:** Concise statement.
- **Status:** Proposed, accepted, superseded, or rejected.
- **Context:** Facts and constraints that required a decision.
- **Reason:** Why this option was selected.
- **Alternatives considered:** Other viable choices.
- **Consequences:** Positive and negative effects.
- **Related files or pull requests:** Links or repository paths.

## Confirmed decisions

### 2026-07-16 — Validation-first product development

- **Date:** 2026-07-16
- **Decision:** Prioritise paid-order fulfilment, reliable public pages, and repeatable manual operations before customer accounts, subscriptions, or advanced analytics.
- **Status:** Accepted.
- **Context:** TapRank is an early MVP with its first paid order and needs to prove repeat demand.
- **Reason:** The next commercial risks are fulfilment and page reliability, not a lack of large-platform features.
- **Alternatives considered:** Building a complete multi-tenant SaaS portal immediately.
- **Consequences:** Near-term architecture stays small and reversible; self-service and recurring software features require roadmap validation gates.
- **Related files or pull requests:** `docs/PRODUCT_CONTEXT.md`, `docs/ROADMAP.md`.

### 2026-07-16 — Current active physical product scope

- **Date:** 2026-07-16
- **Decision:** Present standard and custom acrylic NFC + QR countertop stands as the current physical products; do not present cards or stickers as currently sold.
- **Status:** Accepted.
- **Context:** The supplied business context explicitly limits the current catalogue.
- **Reason:** Product documentation and sales claims must match current fulfilment capability.
- **Alternatives considered:** Listing potential future physical formats as active products.
- **Consequences:** Future card/sticker concepts must be labelled as future until separately approved. Existing runtime wording that mentions them is a documented discrepancy for a later product-copy task.
- **Related files or pull requests:** `docs/PRODUCT_CONTEXT.md`, `docs/CURRENT_STATE.md`.

### 2026-07-16 — Permanent TapRank URL is the hardware destination

- **Date:** 2026-07-16
- **Decision:** QR codes and NFC tags should point to a stable TapRank `/r/[slug]` URL, with mutable business destinations managed behind it.
- **Status:** Accepted.
- **Context:** Businesses need links updated without reprinting QR codes or reprogramming NFC tags.
- **Reason:** A permanent intermediate URL separates durable hardware from changeable third-party links.
- **Alternatives considered:** Encoding the Google Review, menu, or booking URL directly in each physical product.
- **Consequences:** Slug stability, domain continuity, customer-page reliability, and safe redirects become critical operational requirements.
- **Related files or pull requests:** `pages/r/[slug].jsx`, `lib/taprankPages.js`, `docs/CUSTOMER_PAGES.md`.

### 2026-07-16 — Current hosted demos use source-controlled build-time data

- **Date:** 2026-07-16
- **Decision:** Record the existing static JavaScript data and Next.js static generation as the current demo implementation, not as a database-backed platform.
- **Status:** Accepted as current state; temporary for production customer management.
- **Context:** The repository exports three slugs from `lib/taprankPages.js`; `fallback` is disabled and no database exists.
- **Reason:** Documentation must describe the code that actually runs.
- **Alternatives considered:** Describing proposed admin/database capabilities as already present.
- **Consequences:** New records currently require source edits and deployment. A future admin-managed architecture is separately proposed and validation-gated.
- **Related files or pull requests:** `lib/taprankPages.js`, `pages/r/[slug].jsx`, `components/HostedTapRankPage.jsx`, `docs/CURRENT_STATE.md`.

### 2026-07-16 — Preserve the existing Next.js marketing application

- **Date:** 2026-07-16
- **Decision:** Future customer-page management should reuse the existing Next.js repository and `/r/[slug]` route rather than rebuild the marketing website solely for an admin feature.
- **Status:** Accepted direction.
- **Context:** The current marketing site and demo pages are working, while the missing capability is safe page management.
- **Reason:** Reuse is faster, lower risk, and more compatible with validation-first development.
- **Alternatives considered:** Replatforming or rewriting the public website before implementing customer-page management.
- **Consequences:** Future proposals should add a small trusted data/admin layer without changing unrelated marketing behaviour.
- **Related files or pull requests:** `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`.

### 2026-07-16 — Vercel and pnpm are the documented current build path

- **Date:** 2026-07-16
- **Decision:** Use the committed pnpm lockfile and Vercel install/build commands as the current repository build/deployment contract.
- **Status:** Accepted as current state.
- **Context:** `vercel.json`, `pnpm-lock.yaml`, and package scripts define this path.
- **Reason:** It is the only deployment path confirmed by repository evidence.
- **Alternatives considered:** Assuming a different package manager or hosting platform.
- **Consequences:** Production ownership and settings still require confirmation in Vercel; changes to this contract require deliberate review.
- **Related files or pull requests:** `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `vercel.json`.
