# Architecture

## Current architecture

TapRank is a single Next.js Pages Router application deployed as a marketing site plus statically generated demo pages.

```text
Browser
  |
  v
Vercel / Next.js
  |-- /                       static marketing page
  |-- /r/[slug]               statically generated known page slugs
  |-- /r/demo                 server-rendered redirect
  |
  |-- lib/taprankPages.js     source-controlled demo and customer records
  |-- lib/contact.js          public TapRank sales contact values
  |-- public/*                local image/logo assets
  `-- external destinations  Google, Instagram, Maps, mail, phone, SMS
```

There is no application database, API layer, authentication service, CMS, queue, background worker, or server-side customer-management system.

## Folder and component organisation

- `pages/index.jsx` owns the marketing homepage, its section data, and most interactive homepage components.
- `pages/_app.jsx` loads the global stylesheet and favicon metadata.
- `pages/r/[slug].jsx` builds public hosted-page paths from static data.
- `pages/r/demo.jsx` performs a server-side redirect.
- `components/HostedTapRankPage.jsx` renders hosted business pages.
- `lib/taprankPages.js` exports the supported demo/customer slugs and records.
- `lib/contact.js` centralises TapRank's public sales phone and email routes.
- `styles/globals.css` styles all pages globally.
- `public/` stores all website images and icons.

## Routing model

The Pages Router maps files under `pages/` to URLs. `pages/r/[slug].jsx` uses `getStaticPaths` and `getStaticProps`:

1. `getStaticPaths` reads the demo and customer slugs exported by `lib/taprankPages.js`.
2. Next.js produces those paths at build time.
3. `fallback: false` makes every other slug a 404.
4. `getStaticProps` passes the matching static object to the hosted-page component.

`pages/r/demo.jsx` uses `getServerSideProps` only to return a temporary redirect.

## Rendering model

- Homepage: statically rendered by Next.js.
- Known hosted demos: statically generated during the production build.
- Demo redirect: evaluated server-side per request.
- Interactions: client-side React state/effects for galleries, accordions, menus, sliders, and similar UI.

There is no runtime customer record lookup. A data or slug change needs a new build and deployment.

## Styling system

The project uses custom global CSS. It has shared colour/spacing variables, responsive breakpoints, custom animations, hover/focus states, and `prefers-reduced-motion` support. Component class names are global rather than locally scoped.

No UI library, utility CSS framework, CSS-in-JS library, or formal component package is installed. SVG icons are defined in application code.

## Current data flow

### Marketing contact

`lib/contact.js` contains intentionally public TapRank contact values and a mailto builder. `pages/index.jsx` imports those values and routes sales buttons to `tel:`, `sms:`, and `mailto:` destinations.

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

- Existing API routes: none.
- Existing database: none.
- Existing authentication: none.
- Existing authorisation/ownership rules: none.
- Existing admin interface: none.

Any future privileged data operation must therefore introduce a trusted server-side boundary; it must not place admin credentials in browser JavaScript.

## Third-party services

- Vercel is configured as the deployment target in `vercel.json`.
- GitHub is the source remote.
- Public page actions can link to Google, Maps, Instagram, telephone, SMS, email, and other configured URLs.
- No third-party service is called with authenticated API credentials.

## Environment configuration

The current application references no environment variables. If future services are added, values should be documented with placeholders in `.env.example`, stored locally in `.env.local`, and configured in Vercel by environment. Server-only secrets must never use a public client prefix or be returned to the browser.

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
