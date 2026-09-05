# Architecture

## Current architecture

TapRank is a single Next.js Pages Router application deployed as a marketing site, post-checkout setup flow and statically generated hosted pages.

```text
Browser
  |
  v
Vercel / Next.js
  |-- /                       static marketing page
  |-- /order-details          static post-checkout setup form
  |-- /privacy                setup privacy notice
  |-- /api/order-details      trusted server submission boundary
  |-- /r/[slug]               statically generated known page slugs
  |-- /r/demo                 server-rendered redirect to /r/barber-demo
  |
  |-- lib/taprankPages.js     source-controlled demo and customer records
  |-- lib/commerce.js         public product, price and Square checkout configuration
  |-- lib/contact.js          public TapRank sales contact values
  |-- public/*                local image/logo assets
  |-- Supabase Postgres       private setup records
  |-- Supabase Storage        optional private customer logos
  `-- external destinations  Google, Instagram, Maps, mail, phone, SMS
```

Supabase is used only for private post-checkout setup submissions. There is no authentication service, CMS, admin dashboard, queue, background worker, dynamic customer-page database or Square API integration.

## Folder and component organisation

- `pages/index.jsx` owns the marketing homepage, its section data, and most interactive homepage components.
- `pages/_app.jsx` loads the global stylesheet and favicon metadata.
- `pages/order-details.jsx` renders the `noindex` post-checkout form.
- `pages/api/order-details.js` validates, rate-limits and stores private submissions.
- `pages/privacy.jsx` explains how setup details are used.
- `pages/r/[slug].jsx` builds public hosted-page paths from static data.
- `pages/r/demo.jsx` performs a server-side redirect.
- `components/HostedTapRankPage.jsx` renders hosted business pages.
- `lib/taprankPages.js` exports the supported demo/customer slugs and records.
- `lib/contact.js` centralises TapRank's public sales phone and email routes.
- `lib/commerce.js` centralises the confirmed Standard Stand Square link, current public prices, delivery reassurance, and dispatch wording.
- `lib/orderDetails.js` centralises form options and shared server validation.
- `lib/supabaseAdmin.js` creates the server-only privileged Supabase client.
- `supabase/migrations/` defines private onboarding records, rate limiting and branding storage.
- `styles/globals.css` styles all pages globally.
- `public/` stores all website images and icons.

## Routing model

The Pages Router maps files under `pages/` to URLs. `pages/r/[slug].jsx` uses `getStaticPaths` and `getStaticProps`:

1. `getStaticPaths` reads the demo and customer slugs exported by `lib/taprankPages.js`.
2. Next.js produces those paths at build time.
3. `fallback: false` makes every other slug a 404.
4. `getStaticProps` passes the matching static object to the hosted-page component.

`pages/r/demo.jsx` uses `getServerSideProps` only to return a temporary internal redirect to `/r/barber-demo`.

## Rendering model

- Homepage: statically rendered by Next.js.
- Known hosted demos: statically generated during the production build.
- Demo redirect: evaluated server-side per request.
- Interactions: client-side React state/effects for galleries, accordions, menus, sliders, and similar UI.

There is no runtime customer-page lookup. A public customer-page data or slug change still needs a new build and deployment. Private order submissions do not automatically create or publish a customer page.

## Styling system

The project uses custom global CSS. It has shared colour/spacing variables, responsive breakpoints, custom animations, hover/focus states, and `prefers-reduced-motion` support. Component class names are global rather than locally scoped.

No UI library, utility CSS framework, CSS-in-JS library, or formal component package is installed. SVG icons are defined in application code.

## Current data flow

### Marketing checkout and contact

`lib/commerce.js` contains the intentionally public Square Payment Link for the Standard TapRank Stand. High-intent Standard Stand calls to action navigate to Square in the same tab. Square hosts checkout and collects payment and delivery details; TapRank does not implement a payment form or treat a future return URL as payment evidence.

`lib/contact.js` contains intentionally public TapRank contact values and a mailto builder. `pages/index.jsx` retains those values for telephone, SMS, general support, custom-stand enquiries, and bulk-order enquiries.

### Hosted demo pages

```text
lib/taprankPages.js
        |
        v
pages/r/[slug].jsx -- build time --> static HTML/page data
        |
        v
HostedTapRankPage.jsx -- click --> external business destination
```

The optional action-array shape can override the component's generated action list. Optional business sections are omitted when their data is absent. Public destinations receive build-time protocol validation, but records are not persisted or remotely verified.

## APIs, database, and authentication

- Existing API routes: `POST /api/order-details`.
- Existing database integration: private Supabase order-detail records after migration/configuration.
- Existing private file storage: Supabase `order-branding` bucket after migration/configuration.
- Existing authentication: none.
- Existing authorisation/ownership rules: none.
- Existing admin interface: none.

The order-details endpoint is the current trusted server boundary. Its Supabase secret key must remain server-only. Customer-page administration still needs a separately approved authentication and ownership model.

## Third-party services

- Vercel is configured as the deployment target in `vercel.json`.
- GitHub is the source remote.
- Square hosts the approved Standard TapRank Stand checkout. No Square credentials or API integration are present.
- Public page actions can link to Google, Maps, Instagram, telephone, SMS, email, and other configured URLs.
- No third-party service is called with authenticated API credentials.

## Environment configuration

The post-checkout endpoint requires `SUPABASE_URL`, `SUPABASE_SECRET_KEY` and `ORDER_DETAILS_RATE_LIMIT_SECRET`. Placeholders are documented in `.env.example`; real values belong in ignored `.env.local` files and Vercel environment settings. They must never use a public client prefix or be returned to the browser.

## Build and deployment

`vercel.json` runs a frozen pnpm installation and `pnpm run build`. The build executes `next build` and produces the static homepage and supported hosted-page slugs.

The production Git branch, Vercel project, custom domain assignment, and automatic deployment settings are outside the repository and remain unconfirmed.

## Verification model

Available:

- `pnpm run build`
- `pnpm run dev`
- `pnpm run start`

Unavailable:

- lint script/configuration;
- type-check script/configuration;
- unit/integration/end-to-end tests.

Until automated route tests exist, changes need a production build plus manual checks of `/`, `/r/demo`, and every configured `/r/{slug}` route.

## Proposed Future Architecture

Everything in this section is proposed and is **not implemented**.

### Near-term recommendation

Do not rebuild the marketing site. Keep the existing Next.js Pages Router and the permanent `/r/[slug]` public URL model.

For the next immediate paid order, the fastest path is a carefully controlled source-based record plus the operational runbook. This has minimal infrastructure cost but must be treated as a short-term operating mode because every edit requires a deployment and has no field-level validation.

After a few pages, introduce the smallest safe admin-managed system:

- Supabase Postgres for businesses and links.
- Supabase Auth for one or a small allowlist of TapRank administrators, using a managed sign-in method.
- Row Level Security and server-side access checks.
- Private `/admin` pages inside the existing Next.js repository.
- A server-only credential for privileged operations; never expose it to the client.
- Draft, preview, and publish states.
- Stable unique slugs.
- Public `/r/[slug]` pages rendered from published active records, using server rendering or controlled revalidation.
- Cache revalidation after publication so a link update does not require changing the physical QR/NFC destination.

Initial scope should explicitly exclude customer accounts, analytics, Stripe, subscriptions, complex roles, campaigns, and multi-location support.

### Minimum admin MVP flow

1. TapRank administrator signs in through managed authentication.
2. Admin creates a business with a unique immutable public slug.
3. Admin adds links, labels, destinations, display order, and enabled state.
4. Admin previews a draft page.
5. Admin publishes the draft.
6. The public route reads only the published active business and enabled links.
7. Publication revalidates or refreshes the page while preserving its URL.
8. A change is reversible using a stored prior published version or a controlled audit history.

### Architecture options

| Option | First-customer speed | Security/simplicity | Cost | Future path | Maintenance |
| --- | --- | --- | --- | --- | --- |
| Keep source-controlled JavaScript records | Fastest; already works | No auth surface, but manual edits/deployments are error-prone | Existing hosting only | Poor for accounts/analytics | Low infrastructure, high operational risk as pages grow |
| Supabase Auth + Postgres in current app | Fast after initial setup | Managed auth, database, and RLS in one service | Low MVP entry cost; confirm current pricing before adoption | Good path to accounts and analytics; billing can remain separate | Recommended balance of few services and strong controls |
| Managed Postgres/Neon + Auth.js | Compatible with Next.js | Secure when configured well, but more integration choices and code | Varies by providers | Flexible for accounts/analytics/subscriptions | More parts and ongoing maintenance than the MVP needs |

Supabase is the recommended balance only after manual source management becomes an operational bottleneck. Provider pricing and current product capabilities must be checked at implementation time.

### Future customer authentication

Customer accounts belong to Phase 2, after evidence that self-service reduces work. Add business ownership and explicit authorisation before exposing edit controls. Customers should never gain access to another business's record, drafts, analytics, or billing state.

### Future analytics

Analytics belong to Phase 3. Define lawful data collection, consent, retention, bot filtering, event semantics, and reporting value before implementation. Potential events include page views, link clicks, and acquisition method (QR/NFC/direct) only if that method can be measured reliably and transparently.

### Future subscriptions

Subscriptions also belong to Phase 3 and should follow evidence of recurring customer value. Billing status should control entitled features through trusted server-side checks, not client-only UI conditions. No billing provider is selected today.
