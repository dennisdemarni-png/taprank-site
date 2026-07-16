# TapRank

TapRank is a UK NFC and QR product business for local businesses. Its acrylic countertop stands send customers to permanent, mobile-first TapRank pages for reviews, menus, rewards, social media, booking, contact details, offers, and other approved links.

Tagline: **Connect customers to what matters.**

This repository contains the public marketing website and three static hosted-page demos. It is an early MVP: customer pages are currently represented by source-controlled demo data, not a database or admin system.

## Technical stack

- Next.js 16.2.9 using the Pages Router
- React 19.2.7
- JavaScript and JSX
- Custom global CSS
- pnpm lockfile and Vercel build configuration
- Node.js 20.9 or newer

There is currently no database, authentication, CMS, API route, analytics service, or checkout implementation in this repository.

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

The application currently references no environment variables, so no `.env.example` is required. If environment variables are introduced later:

- document placeholders in `.env.example`;
- keep local values in an ignored local environment file such as `.env.local`;
- configure production values in the deployment platform;
- never commit secrets or privileged credentials.

Note: `.gitignore` ignores `.env*.local`, but not every possible `.env` filename. Check staged files carefully before committing environment configuration.

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
| `/` | Static marketing homepage |
| `/r/barber-demo` | Statically generated barber demo page |
| `/r/restaurant-demo` | Statically generated restaurant demo page |
| `/r/salon-demo` | Statically generated salon demo page |
| `/r/demo` | Server-side temporary redirect to a generic Google search |
| `/r/{other-slug}` | 404 because static fallback is disabled |

See [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md) for the full audit.

## Deployment

[`vercel.json`](vercel.json) declares the Next.js framework, frozen pnpm installation, and `pnpm run build`. The repository confirms compatibility with Vercel, but it does not record the Vercel team, project, production branch, custom-domain binding, access owners, or automatic deployment settings. Confirm those in Vercel before production work.

## Repository structure

```text
components/              Hosted TapRank page component
lib/                     Static page data and public contact configuration
pages/                   Next.js Pages Router pages
public/                  Product, business, icon, and logo assets
styles/                  Global site styling
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
- [Operations runbook](docs/OPERATIONS_RUNBOOK.md)
- [Roadmap](docs/ROADMAP.md)
- [Decision log](docs/DECISIONS.md)

Do not add real customer details, payment information, private links, passwords, or API keys to public documentation or source control.
