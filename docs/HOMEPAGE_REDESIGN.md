# Homepage conversion redesign — Preview only

Status: implemented on `homepage-conversion-redesign`, **not approved for production**.
Base: `a3d15e4`, the GitHub main commit inspected on 8 September 2026.

## Experience and architecture

The homepage sells one physical + digital TapRank product before presenting four
stand variants. The narrative is hero → tap/page/action demonstration → customer
moment → interactive action explorer → differentiation → variant selection →
custom branding → ordering → reassurance → FAQ → final purchase prompt.

`pages/index.jsx` contains homepage metadata and structured product offers.
`components/homepage/` owns the section components, content and CSS Module.
`styles/globals.css` and customer/order route implementations are untouched.
The old homepage is preserved verbatim in `archive/homepage-pre-redesign/index.jsx`.
That snapshot is not a route or part of the client bundle. Its original relative
imports resolve again when the file is restored to `pages/index.jsx`.

No frontend dependencies were added. Next Image provides responsive resizing,
lazy loading and modern delivery formats. The hero product and phone are prioritised;
other images are lazy. Explicit dimensions reserve image space. The supplied phone
screenshots sit inside rounded device viewports; source images are unchanged.
Video is not mounted or downloaded until requested, has native controls, and never
autoplays. Its source is centralised in `content.js` for easy replacement.
Native React state and CSS transitions power the demo. Reduced motion disables
transitions, while all explanatory copy remains present. FAQs use native details.
The mobile purchase bar appears after the hero, hides while the purchase section
is visible, and reflects the selected variant. It returns to the selector rather
than navigating to an unapproved checkout.

## Current approved offer for this redesign

- Google Review, Instagram, Tripadvisor: £64.99 GBP each.
- Custom Logo + Branding: £84.99 GBP, including stand and hosted-page branding.
- Free UK delivery; dispatch within 48 hours; no subscription required.
- A7 acrylic tabletop stand, configured NFC, TapRank-generated/configured QR,
  hosted business page, ready for immediate use, 1-year replacement warranty.
- Standard uses the standard TapRank-hosted page design.
- No new warranty exclusions or coverage claims have been introduced.

Both NFC and QR open the hosted page. Destination changes remain manually managed
by TapRank. Nothing in the redesign adds self-service, payment verification or
automatic customer-page creation.

## Checkout — actions required before launch

`lib/commerce.js` is the sole public checkout configuration. Each variant has an
independent `{ url, approved }` record. The UI only links to a configured HTTPS
Square destination when `approved` is true; it never falls back to another variant.

| Variant | URL status | Enabled |
| --- | --- | --- |
| Google Review | User-supplied Square placeholder; user says price is not correct yet | No |
| Instagram | TODO: approved destination required | No |
| Tripadvisor | TODO: approved destination required | No |
| Custom | TODO: approved destination required | No |

Confirm the supplied placeholder's product/variant and £64.99 amount before
approving Google checkout. Configure the other exact variant destinations and
prices separately. The previous Standard `square.link` URL is retained as
`EXISTING_STANDARD_CHECKOUT_URL`; it is not used by the redesigned purchase UI.
Missing checkouts show an unavailable purchase button and a contact link.

No approved Etsy destination was found. `ETSY_URL` is null. The lower-emphasis
Etsy line is ready to become a link when the user supplies the approved URL.
Do not invent a shop address. No purchases or order submissions were made in QA.

## Supplied assets

The exact directory is `public/Assets/redesign/` (capital A). Original images and
video are committed intact, with their existing names. Consult its README first.
The file labelled Restaurant actually depicts Space Jump; the redesign uses the
correctly named Space Jump and Laser Expert Pro examples, plus supplied restaurant
action screenshots. Custom compositions are labelled as branding examples, not
endorsements. The video shows an older physical stand and is labelled accordingly.
Current stand PNGs and TapRank logos remain the source of truth.

## Analytics

`lib/homepageEvents.js` is intentionally inactive: no third-party scripts, data
transmission, browser storage or console logging. Call sites identify
`hero_buy_click`, `variant_selected`, `square_checkout_click`, `etsy_click`,
`how_it_works_interaction`, `demo_video_play`, and `faq_open`. A future approved
adapter must use fixed UI identifiers, never private order or contact information.

## Preview safety and verification

The build script runs `scripts/assert-preview.mjs` before Next. On Vercel it fails
closed unless `VERCEL_ENV=preview`. Local production-mode builds remain allowed.
This is a temporary safeguard until explicit production approval; remove it only
as part of the approved launch. It does not prevent someone manually promoting an
already-built Preview: do not promote, merge, or change production settings.
Vercel environment semantics: https://vercel.com/docs/environment-variables/system-environment-variables

- `pnpm run build`: production compilation and generation of all existing routes.
- `pnpm run test:homepage`: pricing, missing-checkout gates, asset existence and
  the production-build safeguard.
- Browser QA: desktop and mobile, four variants, action previews, demo controls,
  FAQs, navigation, missing-checkout states and responsive overflow.
- Runtime route checks use GET only. API POSTs and real purchases are prohibited
  during this Preview review because Preview may share production credentials.
- No standalone lint or TypeScript project/type-check script exists.

Production approval, final Square amounts/URLs, Etsy URL and advertising analytics
remain separate follow-up work. Preview is a design review, not launch approval.
