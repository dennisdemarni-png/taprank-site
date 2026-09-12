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

### 2026-07-18 — Standard Stand uses direct Square-hosted checkout

- **Date:** 2026-07-18
- **Decision:** Send high-intent Standard TapRank Stand calls to action to the confirmed £39.99 Square Payment Link in the same tab. Keep support contact routes as secondary options.
- **Status:** Accepted.
- **Context:** The email-first purchase journey created unnecessary friction for a ready-to-buy standard product.
- **Reason:** Square already provides secure hosted checkout and collects the delivery address without requiring a custom payment form or credentials in this repository.
- **Alternatives considered:** Continuing email-only ordering; building a custom payment form; opening Square in a new tab.
- **Consequences:** The website states that secure checkout is handled through Square and that standard UK delivery is included. No return URL is configured until a separately approved onboarding route is live, and a future return URL must never be treated as payment evidence.
- **Related files or pull requests:** `lib/commerce.js`, `pages/index.jsx`.

### 2026-07-18 — Current hosted pages remain noindex by default

- **Date:** 2026-07-18
- **Decision:** Keep demos, Laser Expert Pro and future real customer pages `noindex` by default. Indexing requires explicit customer and TapRank approval.
- **Status:** Accepted.
- **Context:** Hosted pages contain customer-facing business content, while marketing publication and search indexing permission have not been established.
- **Reason:** Default non-indexing protects customer approval boundaries without affecting the indexable TapRank marketing homepage.
- **Alternatives considered:** Automatically indexing all real customer pages.
- **Consequences:** Each hosted page still receives accurate route-specific metadata and a canonical URL, but search engines are instructed not to index it.
- **Related files or pull requests:** `components/HostedTapRankPage.jsx`, `docs/CUSTOMER_PAGES.md`.

### 2026-07-28 — Supabase-backed post-checkout setup records

- **Date:** 2026-07-28
- **Decision:** Collect post-checkout business details through a server-validated `/order-details` flow and store them in private Supabase Postgres/Storage records.
- **Status:** Accepted.
- **Context:** Square collects payment and delivery information, but TapRank still needs the business profile, links and branding required to prepare the hosted page and stand.
- **Reason:** A small private operating record reduces fulfilment errors without introducing customer accounts or a full admin platform.
- **Alternatives considered:** Email-only onboarding; a client-direct public database insert; building customer accounts and an admin dashboard immediately.
- **Consequences:** TapRank must own and configure the Supabase project, environment secrets, RLS, backups, retention and operational access. The form remains separate from payment verification.
- **Related files or pull requests:** `pages/order-details.jsx`, `pages/api/order-details.js`, `supabase/migrations/`, `docs/ORDER_DETAILS.md`.

### 2026-07-28 — Order submission does not verify Square payment

- **Date:** 2026-07-28
- **Decision:** Keep `payment_status` unverified at submission and require manual Square reconciliation before production.
- **Status:** Accepted.
- **Context:** The approved phase does not include Square API credentials, webhooks or automatic payment matching.
- **Reason:** A redirect or public form can be reached without completing a genuine payment.
- **Alternatives considered:** Trusting the redirect; adding Square API/webhooks in the same release.
- **Consequences:** TapRank operators must match each submission to Square. Automatic verification remains separate future work.
- **Related files or pull requests:** `pages/api/order-details.js`, `docs/ORDER_DETAILS.md`, `docs/OPERATIONS_RUNBOOK.md`.

### 2026-09-12 — Configure before purchase with a TapRank cart and Square-hosted payment

- **Date:** 2026-09-12
- **Decision:** Dedicated product pages collect the required primary action and business configuration before checkout. Custom buyers choose Google Review, Instagram or Tripadvisor and must upload a logo. Up to five secondary links, opening times and location are optional. Quantity duplicates one configuration; different configurations use separate cart items.
- **Status:** Implemented behind a database and Sandbox verification gate.
- **Context:** TapRank needs a familiar product-page buying flow that can connect each paid line item to its fulfilment configuration.
- **Reason:** This removes duplicate setup entry while keeping card entry and payment authentication with Square.
- **Alternatives considered:** Continuing only with static Payment Links; embedding Square card fields immediately; building customer accounts.
- **Consequences:** TapRank stores private anonymous carts and order snapshots in Supabase. Prices are server-controlled. Only a signed Square webhook can mark an order paid. Existing approved Square links remain as rollback/fallback until verification is complete.
- **Related files:** `components/product/`, `pages/api/cart.js`, `pages/api/checkout.js`, `pages/api/square/webhook.js`, `supabase/migrations/202609120001_create_storefront_commerce.sql`, `docs/STOREFRONT_CHECKOUT.md`.

### 2026-09-12 — Pause Custom ordering and run a fixed five-day Standard promotion

- **Date:** 2026-09-12
- **Decision:** Remove Custom stands from public selection and reject new Custom cart additions while retaining the underlying catalogue and historical order support. Run the confirmed Standard promotion from the genuine £79.99 reference price to £64.99 until 17 September 2026 at 14:30 BST.
- **Status:** Implemented on the storefront branch.
- **Context:** TapRank asked to focus the live buying journey on Google Review, Instagram and Tripadvisor faces and confirmed both Google Current and Classic are in stock.
- **Reason:** The smaller range reduces buying friction, while a fixed campaign deadline creates accurate urgency without an evergreen resetting timer.
- **Alternatives considered:** Deleting Custom infrastructure; leaving Custom visible but unpurchasable; using a rolling timer.
- **Consequences:** `/custom-taprank` returns 404 and new Custom cart requests fail closed. The campaign automatically drops its sale state after the fixed deadline. Re-enabling Custom requires a deliberate public-route and cart-boundary change.
- **Related files:** `lib/promotion.js`, `components/homepage/content.js`, `components/product/PromotionBar.jsx`, `pages/custom-taprank.jsx`, `pages/api/cart.js`.
