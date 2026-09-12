# TapRank

> **Homepage launch approved:** The conversion homepage and all four Square
> destinations are approved for production. See
> [homepage redesign notes](docs/HOMEPAGE_REDESIGN.md) for implementation and checks.
> The older homepage descriptions below record the pre-redesign baseline.

TapRank is a UK NFC and QR product business for local businesses. Its acrylic countertop stands send customers to permanent, mobile-first TapRank pages for reviews, menus, rewards, social media, booking, contact details, offers, and other approved links.

Tagline: **Connect customers to what matters.**

This repository contains the public marketing website, a secure post-checkout setup form, three static hosted-page demos, and the first source-managed customer page. It is an early MVP: hosted pages are currently represented by source-controlled data, while private order-setup submissions use Supabase after the project migration and server environment are configured.

## Technical stack

- Next.js 16.2.9 using the Pages Router
- React 19.2.7
- JavaScript and JSX
- Custom global CSS
- Supabase Postgres and private Storage for post-checkout setup submissions
- pnpm lockfile and Vercel build configuration
- Node.js 20.9 or newer

There is no authentication, CMS, admin dashboard or custom card form. The product pages now contain a gated product configurator, private cart, dynamic Square-hosted checkout API and signed payment webhook. The current Supabase migration, cart, private Custom-logo upload and Square Sandbox payment-link creation have been verified. The new flow must not be treated as live until its signed-webhook and completed-payment checks pass on a stable HTTPS deployment. Existing approved Square Payment Links remain available as a fallback. `/order-details` remains available for earlier/manual orders.

## Local setup

Prerequisites:

- Node.js `>=20.9.0`
- pnpm compatible with the committed lockfile

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

Open `http://localhost:3000`.

## Environment setup

Copy `.env.example` to an ignored `.env.local` and configure:

| Variable | Purpose | Browser-safe |
| --- | --- | --- |
| `SUPABASE_URL` | Supabase project API URL | No need to expose it |
| `SUPABASE_SECRET_KEY` | Server-only key used for private records and logo storage | **No** |
| `ORDER_DETAILS_RATE_LIMIT_SECRET` | Long random server-only value used to hash rate-limit identifiers | **No** |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Referrer-restricted browser key for Google business search | Yes |
| `NEXT_PUBLIC_SQUARE_APPLICATION_ID` | Square application identifier | Yes |
| `NEXT_PUBLIC_SQUARE_LOCATION_ID` | Square location identifier | Yes |
| `SQUARE_ACCESS_TOKEN` | Server-only Square API credential | **No** |
| `SQUARE_WEBHOOK_SIGNATURE_KEY` | Server-only webhook verification secret | **No** |
| `SQUARE_WEBHOOK_NOTIFICATION_URL` | Exact public webhook URL used in signature verification | No need to expose it |

The order form renders without these values, but its submission endpoint fails closed with a support message until they are configured. Never commit real values or use a privileged key in browser code.

Apply the migration in `supabase/migrations/` before enabling production submissions. See [`docs/ORDER_DETAILS.md`](docs/ORDER_DETAILS.md).

## Commands

| Purpose | Command | Current status |
| --- | --- | --- |
| Development | `pnpm run dev` | Configured |
| Production build | `pnpm run build` | Configured |
| Production server | `pnpm run start` | Configured; run after a build |
| Lint | Not configured | No lint script or config exists |
| Type-check | Not configured | JavaScript project; no type-check script exists |
| Tests | Not configured | No test script or test suite exists |

## Public routes

| Route | Behaviour |
| --- | --- |
| `/` | Static marketing homepage with direct Square checkout and links to dedicated product pages |
| `/google-review-stand` | Direct-response Google Review TapRank product page |
| `/instagram-stand` | Instagram TapRank product page |
| `/tripadvisor-stand` | Tripadvisor TapRank product page |
| `/custom-taprank` | Custom Branding + Logo TapRank product page |
| `/order-details` | Static, `noindex` post-checkout business setup form |
| `/order-confirmation` | `noindex` Square return/status page; never treats the redirect as payment proof |
| `/privacy` | Setup-form privacy notice |
| `/api/order-details` | Server-only multipart submission endpoint |
| `/api/cart` | Private cookie-addressed product cart API |
| `/api/checkout` | Server-validated dynamic Square Checkout API |
| `/api/order-status` | Minimal reference-scoped payment status API |
| `/api/square/webhook` | Raw-body Square signature verification and paid-order update endpoint |
| `/r/barber-demo` | Statically generated barber demo page |
| `/r/restaurant-demo` | Statically generated restaurant demo page |
| `/r/salon-demo` | Statically generated salon demo page |
| `/r/laser-expert-pro` | Statically generated customer page |
| `/r/demo` | Server-side temporary redirect to `/r/barber-demo` |
| `/r/{other-slug}` | 404 because static fallback is disabled |

See [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md) for the full audit.

## Deployment

[`vercel.json`](vercel.json) declares the Next.js framework, frozen pnpm installation, and `pnpm run build`. The repository confirms compatibility with Vercel, but it does not record the Vercel team, project, production branch, custom-domain binding, access owners, or automatic deployment settings. Confirm those in Vercel before production work.

## Repository structure

```text
components/              Homepage, product-page, hosted-page and order-form components
lib/                     Static page data, validation, Supabase server client and public configuration
pages/                   Next.js Pages Router pages and secure API route
public/                  Product, business, icon, and logo assets
styles/                  Global site styling
supabase/migrations/     Reviewed database, RLS, rate-limit and private-storage setup
docs/                    Product, technical, and operating documentation
AGENTS.md                Instructions for future coding agents
package.json             Runtime versions and scripts
vercel.json              Vercel build settings
```

## Project documentation

- [Agent guide](AGENTS.md)
- [Product context](docs/PRODUCT_CONTEXT.md)
- [Current repository state](docs/CURRENT_STATE.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Customer pages](docs/CUSTOMER_PAGES.md)
- [Post-checkout setup system](docs/ORDER_DETAILS.md)
- [Product configurator, cart and Square checkout](docs/STOREFRONT_CHECKOUT.md)
- [Conversion-rate optimisation pass](docs/CRO_PASS.md)
- [Operations runbook](docs/OPERATIONS_RUNBOOK.md)
- [Roadmap](docs/ROADMAP.md)
- [Decision log](docs/DECISIONS.md)

Do not add real customer details, payment information, private links, passwords, or API keys to public documentation or source control.
