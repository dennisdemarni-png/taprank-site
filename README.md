# TapRank

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

There is no authentication, CMS, admin dashboard, analytics service, custom payment form, Square API, webhook or automated payment verification. The marketing homepage links the Standard TapRank Stand directly to the approved Square-hosted checkout. `/order-details` collects setup information after purchase but does not prove payment.

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
| `/` | Static marketing homepage with direct Square checkout for the Standard TapRank Stand |
| `/order-details` | Static, `noindex` post-checkout business setup form |
| `/privacy` | Setup-form privacy notice |
| `/api/order-details` | Server-only multipart submission endpoint |
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
components/              Hosted-page and order-form layout components
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
- [Operations runbook](docs/OPERATIONS_RUNBOOK.md)
- [Roadmap](docs/ROADMAP.md)
- [Decision log](docs/DECISIONS.md)

Do not add real customer details, payment information, private links, passwords, or API keys to public documentation or source control.
