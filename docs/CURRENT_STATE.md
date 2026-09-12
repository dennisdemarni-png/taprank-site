# Current repository state

> **Redesign branch, 8 September 2026:** The homepage conversion redesign is
> implemented for Preview only and is not approved for production. See
> [homepage redesign notes](HOMEPAGE_REDESIGN.md) for architecture, current
> prices, pending checkout links, verification and production safeguards.
> The older homepage descriptions below record the pre-redesign baseline.

> **CRO implementation, 12 September 2026:** Four static product landing pages,
> reusable outbound-link handling and non-navigating demo controls are now present
> on the working branch. See [CRO pass](CRO_PASS.md). The detailed snapshot below
> remains the earlier audit baseline unless explicitly superseded by that document.

> **Product merchandising update, 12 September 2026:** The working branch adds a
> gallery-led purchase layout, both Google stand designs, progressively disclosed
> configuration and server-validated Standard bundle pricing. The promotion
> countdown framework is present but intentionally disabled pending a genuine
> campaign deadline. Production remains unchanged.

Implementation snapshot: **28 July 2026**

PR 2 base commit: `dd33e34` (`improve website conversion and demo accuracy (#18)`)

This file records evidence from the repository. Proposed systems are documented separately and are not described here as existing.

## Stack

- Framework: Next.js 16.2.9, Pages Router.
- UI runtime: React and ReactDOM 19.2.7.
- Languages: JavaScript and JSX, plus CSS and JSON configuration.
- Package manager: pnpm, with a version 9 lockfile and workspace configuration.
- Node requirement: 20.9 or newer.
- UI system: hand-built React components and custom CSS; no component library is installed.
- Icons: inline SVGs and custom SVG helpers; no icon package is installed.

## Application structure

```text
components/HostedTapRankPage.jsx  Reusable public hosted-page UI
components/OrderPageShell.jsx      Shared setup/privacy layout
lib/commerce.js                   Public product, price and Square checkout configuration
lib/storefront.js                 Shared cart configuration validation and safe browser shapes
lib/cartServer.js                 HttpOnly cart identity and private cart lookup
lib/squareServer.js               Server-only dynamic Square Checkout client
lib/contact.js                    Central public TapRank sales contact values
lib/orderDetails.js               Setup-form options and validation
lib/supabaseAdmin.js              Server-only Supabase client
lib/taprankPages.js               Static demo business-page records
pages/_app.jsx                    Global CSS and favicon metadata
pages/index.jsx                   Marketing homepage and its interactions
pages/order-details.jsx           Post-checkout setup form
pages/privacy.jsx                 Setup privacy notice
pages/api/order-details.js        Trusted setup-submission endpoint
pages/api/cart.js                 Private cart and custom-logo endpoint
pages/api/checkout.js             Server-priced Square checkout creation endpoint
pages/api/order-status.js         Minimal order confirmation status endpoint
pages/api/square/webhook.js       Raw-body signature validation and payment matching
pages/r/[slug].jsx                Static hosted-page route
pages/r/demo.jsx                  Server-rendered redirect
supabase/migrations/              Private record, rate-limit and Storage schema
public/                           Logos, icons, product and demo images
styles/globals.css                All global and page styling
vercel.json                       Vercel install/build commands
```

The homepage and global stylesheet remain large, coupled files. Much of the homepage's content, data, and interactive logic is held in one page file.

## Routes and rendering

| Route | Rendering | Current behaviour |
| --- | --- | --- |
| `/` | Static page | Marketing homepage with direct Square checkout for the Standard Stand, enquiry-led Custom Stand and bulk journeys, demos, pricing and FAQs. |
| `/order-details` | Static page | `noindex` post-checkout form for business, link and branding details. |
| `/order-confirmation` | Static page | `noindex` Square return page that shows only verified payment status. |
| `/privacy` | Static page | `noindex` setup-form privacy notice. |
| `/api/order-details` | Server API | Validates, rate-limits and stores multipart setup submissions when Supabase is configured. |
| `/api/cart` | Server API | Reads and writes a private cookie-addressed configured cart after migration. |
| `/api/checkout` | Server API | Revalidates server prices and creates a Square-hosted payment link. |
| `/api/order-status` | Server API | Returns a minimal order status for a high-entropy order reference. |
| `/api/square/webhook` | Server API | Validates Square signatures and marks matching completed payments paid. |
| `/r/[slug]` | Static generation | Builds only the slugs exported by `lib/taprankPages.js`; `fallback: false`. |
| `/r/barber-demo` | Static generation | Barber demonstration page. |
| `/r/restaurant-demo` | Static generation | Restaurant demonstration page. |
| `/r/salon-demo` | Static generation | Salon demonstration page. |
| `/r/laser-expert-pro` | Static generation | First source-managed customer page, with approved Google Reviews and Instagram destinations. |
| `/r/demo` | Server-side redirect | Temporary internal redirect to `/r/barber-demo`. |
| Unknown `/r/{slug}` | 404 | No dynamic fallback or database lookup exists. |

The server routes include the existing order-details submission plus a gated private cart, dynamic Square checkout, minimal order-status lookup and signed Square webhook endpoint.

## Hosted-page functionality

`lib/taprankPages.js` contains three public demo objects and one source-managed customer record. At build time, `/r/[slug].jsx` generates their pages and passes each object to `HostedTapRankPage`.

The hosted-page component supports business name, image, category line, rating, rating count, review URL, menu URL, order URL, Instagram URL, phone, website URL, booking URL, opening hours, address, maps URL, and an optional action array. Optional fields render only when supplied by the page record.

Current hosted-page limitations:

- Records are source-controlled rather than persisted in a customer-page system.
- Adding or changing a record requires a source edit, commit, build, and deployment.
- There is no active/inactive link state, business status, validation, preview/publish workflow, or admin interface.
- Public destinations receive build-time protocol validation, but there is no remote ownership or availability check during the build.
- Each demo has an explicit business record, matching location/hours data, business-specific review preview and safe demonstrative action destinations.
- Demo telephone numbers use Ofcom's reserved fictional `01632 960xxx` range; example web and email destinations use the reserved `example.com` domain.
- Demo review actions open a Google search preview rather than claiming to submit a review for a real business.
- All hosted pages, including the source-managed customer page, use `noindex, follow` by default.

## Styling and user interface

The site uses one global custom stylesheet with CSS variables, responsive media queries, transitions, custom animations, and reduced-motion handling. There is no CSS framework, design-system package, or CSS module structure.

The stylesheet contains selectors for several historical homepage and hosted-page iterations. Some appear unreferenced by current JSX, but their usage has not been proven comprehensively enough to remove them safely. This audit intentionally made no cleanup.

## Data, authentication, and content management

- Database: Supabase Postgres integration for private order setup records and the private storefront cart/order schema. The storefront migration was applied to the current TapRank project on 12 September 2026; each deployment still requires matching server environment configuration.
- Authentication: none.
- CMS: none.
- Admin interface: none.
- Customer accounts: none.
- Persistent application storage: private Supabase records and optional private logo files after configuration.
- Analytics or event tracking: none found.
- Checkout: existing approved outbound Square links remain available as fallback. Dedicated product pages contain a gated dynamic Square-hosted checkout. Cart creation, Custom-logo storage and Square Sandbox payment-link creation have been verified, but it is not production-ready until the signed webhook is configured on a stable deployment and a complete Sandbox payment is verified. TapRank does not host card fields.
- Subscription billing: none.

## Environment variables and secrets

The private submission endpoint reads `SUPABASE_URL`, `SUPABASE_SECRET_KEY` and `ORDER_DETAILS_RATE_LIMIT_SECRET`. `.env.example` contains placeholders and `.gitignore` excludes real `.env*` files. The endpoint fails closed when configuration is absent.

`lib/contact.js` contains business-facing phone and email values used in `tel:`, `sms:`, and `mailto:` links. They are intentionally public contact details, not secrets.

`lib/commerce.js` contains public product prices, customer-facing dispatch/delivery copy, and the confirmed Square Payment Link. These are public business settings, not credentials.

## External services and links

Confirmed from code or configuration:

- Vercel-compatible deployment configuration.
- GitHub remote for `dennisdemarni-png/taprank-site`.
- Square-hosted Standard TapRank Stand checkout.
- Google Reviews/Search and Maps destinations.
- Instagram destinations.
- Browser-native email, telephone, and SMS links.
- Unsplash source URLs stored as attribution/source fields in demo data; those fields are not rendered by the current component.

No authenticated third-party API integration was found.

## Deployment setup

`vercel.json` identifies the framework as Next.js and configures:

```text
Install: pnpm install --frozen-lockfile
Build:   pnpm run build
```

The repository does not prove:

- the Vercel team or project name;
- which Git branch is production;
- whether GitHub auto-deployment is enabled;
- which deployment owns `taprank.co.uk`;
- who has production access;
- whether deployment environment variables exist;
- the current rollback and retention settings.

Those facts must be confirmed in Vercel rather than guessed.

## Development and verification commands

| Check | Command | State |
| --- | --- | --- |
| Development | `pnpm run dev` | Configured |
| Production build | `pnpm run build` | Configured |
| Production server | `pnpm run start` | Configured |
| Lint | None | No script/config found |
| Type-check | None | No script/config found |
| Test | `pnpm test` | Node test suite covers public configuration, tracking, storefront validation, bundle pricing, cart totals, promotion expiry and webhook safeguards. |

## Production-ready parts

- A static, responsive marketing homepage.
- Direct Standard Stand purchase through the approved Square Payment Link, with UK-delivery reassurance.
- Central public TapRank sales-contact configuration.
- Three mobile-first business-page demonstrations and one source-managed customer page.
- Logo, favicon, product, and demo assets stored locally.
- Frozen-lockfile Vercel install/build configuration.
- Stable public demo and customer paths generated at build time.

“Production-ready” here means technically usable in the present static marketing/demo scope. It does not mean a production customer-management platform exists.

## Limitations, debt, and production risks

1. **No real customer-page record system.** The next customer currently requires editing source-controlled JavaScript.
2. **No page-management controls.** Link ordering, status, validation, preview, publication, and rollback are manual deployment operations.
3. **No authentication or ownership model.** An admin/customer portal cannot be added safely without introducing these deliberately.
4. **Build-time slug list.** Unknown customer slugs return 404 and every new slug needs a full deployment.
5. **Demonstrative demo destinations.** Demo actions intentionally use fictional phone numbers, `example.com`, Google search previews and broad map areas rather than real merchant accounts.
6. **Manual payment matching.** `/order-details` captures setup information, but Square payment still needs manual confirmation before production.
7. **No automated quality gates.** Lint, type-check, tests, accessibility tests, and end-to-end route checks are absent.
8. **Large, coupled files.** The homepage and global stylesheet increase regression risk and make unused-code decisions difficult.
9. **Potential unused assets/selectors.** Several public images and historical selectors appear unreferenced. They were not removed because deletion needs separate evidence and approval.
10. **Image performance.** The current pages use plain image elements rather than Next.js image optimisation.
11. **No operational telemetry.** There is no application monitoring, error tracking, or analytics.
12. **No explicit security headers.** No repository-level CSP or related response-header policy was found.
13. **Deployment ownership is undocumented.** A recovery or rollback could depend on knowledge held outside the repository.
14. **Asset rights unknown.** The licensing/usage status of existing photos cannot be confirmed from code.
15. **Source-managed commerce configuration.** Current prices, dispatch wording and the public Square link are intentionally centralised in source and still require review/deployment to change.
16. **Supabase deployment is external state.** The storefront migration was observed succeeding in the current TapRank project on 12 September 2026, but the repository cannot prove another deployment's project, environment variables, plan or region.
17. **No onboarding admin interface.** TapRank initially reviews and updates private submissions in the Supabase dashboard.
18. **Storage backup gap.** Database backups do not restore deleted branding objects; a separate branding-file backup process is still required.

## Behaviour future work must preserve

- The working marketing homepage and its responsive design.
- Public contact routes in `lib/contact.js`.
- Existing demo URLs and the internal `/r/demo` redirect to `/r/barber-demo`.
- Permanent customer URL semantics for future `/r/[slug]` pages.
- Both NFC and QR codes pointing to the permanent TapRank URL rather than directly to mutable third-party links.
- Mobile-first accessibility and reduced-motion behaviour.
- Vercel's frozen pnpm install and Next.js build unless deployment is deliberately migrated.

## Information still required

- Vercel project/team, domain mapping, production branch, auto-deploy, access owners, and rollback policy.
- GitHub repository access owners and branch protection rules.
- The internal system currently used for orders, customer records, consent, and link-change requests.
- NFC writing tools, QR generation tools, physical QA devices, and exact fulfilment ownership.
- Photo/logo licensing and customer-brand-asset approval process.
- Monitoring expectations and incident contact.
- Desired production indexing policy for real customer pages.
- Data retention, privacy, admin-access, and backup requirements for a future database.
- Dispatch promise and support response targets that should become operating policy.
