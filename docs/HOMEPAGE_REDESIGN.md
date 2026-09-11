# Homepage conversion redesign — production approved

Status: user explicitly approved pushing and merging the redesign live.
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
| Google Review | https://square.link/u/kbq7PFVV | Yes |
| Instagram | https://square.link/u/Nr0kuTQ2 | Yes |
| Tripadvisor | https://square.link/u/fuQpb9Eo | Yes |
| Custom | https://square.link/u/tzzKvksd | Yes |

All four exact destinations are explicitly approved by TapRank. Selecting a variant
updates the primary Square link. The mobile Choose and final CTA return to the
selector without resetting the selected variant. No purchases were made in QA.
Unknown or unapproved future destinations still fail closed.

The user-approved Etsy listing is configured in `ETSY_URL` and displayed as a
lower-emphasis secondary link. Square remains the primary purchase route. No purchases or order submissions were made in QA.

## Supplied assets

The exact directory is `public/Assets/redesign/` (capital A). Original images and
video are committed intact, with their existing names. Consult its README first.
The file labelled Restaurant actually depicts Space Jump; the redesign uses the
correctly named Space Jump example and a current restaurant demo route capture. Custom compositions are labelled as branding examples, not
endorsements. The video shows an older physical stand and is labelled accordingly.
Current stand PNGs and TapRank logos remain the source of truth.

## Analytics

`lib/homepageEvents.js` is intentionally inactive: no third-party scripts, data
transmission, browser storage or console logging. Call sites identify
`hero_buy_click`, `variant_selected`, `square_checkout_click`, `etsy_click`,
`how_it_works_interaction`, `demo_video_play`, and `faq_open`. A future approved
adapter must use fixed UI identifiers, never private order or contact information.

## Preview safety and verification

The user explicitly approved the production merge after Preview review. The temporary
Preview-only build guard has been removed; both Vercel Preview and Production now
use the normal Next.js build. No production environment variables were changed.

- `pnpm run build`: production compilation and generation of all existing routes.
- `pnpm run test:homepage`: pricing, missing-checkout gates, asset existence and
  exact approved checkout destinations.
- Browser QA: desktop and mobile, four variants, action previews, demo controls,
  FAQs, navigation, missing-checkout states and responsive overflow.
- Runtime route checks use GET only. API POSTs and real purchases are prohibited
  during this Preview review because Preview may share production credentials.
- No standalone lint or TypeScript project/type-check script exists.

Meta Pixel base/PageView tracking is now explicitly approved globally. Other conversion-event tracking remains separate follow-up work.

## Targeted refinement pass — 8 September 2026

The established layout, typography, hero, variant selector and checkout gates are
preserved. The tap demonstration has larger, high-contrast connected labels for
the physical stand and hosted page. Its step transitions and reduced-motion rules
remain. The six action tabs now show large HTML/CSS customer-action previews, with
supplied platform imagery and native SVG utility icons. These are clearly labelled
illustrations, not links to unrelated businesses.

A concise proof section after differentiation pairs the user-supplied anonymous
customer result (more than 4× the reviews in approximately two months) with Iryna
S.'s individual five-star Trustpilot review from July 2026. The review text was
provided by TapRank and matched to the public listing:
https://uk.trustpilot.com/reviews/6a5bcd66e47e7599cd68a220
No aggregate Trustpilot rating, TrustScore, widget, guarantee, exact before/after
counts, or claim that this reviewer is the growth case study is introduced.
The growth claim is supplied by TapRank, not an independently audited measurement.

The three demo records now use customer-facing action labels and an explicit
`isDemo` flag. Their disclosure appears near the footer, styled by the isolated
`components/HostedDemo.module.css`. Destination URLs and the real Laser Expert Pro
record are unchanged. This narrowly scoped demo refinement supersedes the earlier
statement that all customer/demo component implementations were untouched.

Mobile final-CTA stands are symmetrically framed with Google dominant. The sticky
purchase bar is suppressed while this section is visible. The header background
is fully opaque. Shared global CSS, checkout configuration, order APIs and
fulfilment functionality remain unchanged in this pass.

## Small visual corrections

Hero tracking is slightly loosened without changing type size or line breaks.
The final three-stand group uses a bounded, proportional stage with symmetric
insets that accommodate rotation, on desktop and mobile.

The default homepage phone now uses `restaurant-demo-homepage.jpg`, captured from
the unchanged `/r/restaurant-demo` production render at 390 × 844. This shows all
five customer actions. Replace this file or `assets.restaurantPage` to refresh it.
Laser Expert Pro is no longer a generic homepage image; its actual route and
original supplied asset remain untouched. Etsy uses the exact user-approved listing;
all four Square destinations are now approved and enabled.

## Global Meta Pixel

User-approved pixel `1100460359044969` is mounted once from `pages/_app.jsx` via
`components/MetaPixel.jsx`. The standard base library loads asynchronously after
hydration, with one PageView on full load and another on completed non-shallow
Next page navigation. Hash links do not count as new pages. A hidden noscript
PageView image handles browsers with JavaScript disabled. All UI routes, including
hosted pages and order setup, share the integration. No extra customer fields or
custom conversion events are passed by this code. Homepage event hooks stay inactive.

## September 11 product refresh

Imported supplied assets unchanged from `/Users/demarnidennis/Documents/Assets`:
Google review stand New design.png, Instagram new design.png, Trip advisor new
design.png, and Product Video (New Design).mp4. The previous Google review stand.png
is retained as Classic. Custom assets, content, price and checkout remain unchanged.

The hero and purchase section share a Google New Design/Classic thumbnail selector.
New Design defaults and keeps the approved Google Square URL. Classic is selectable
but sold out, with a null checkout URL; it cannot fall back to New Design. The mobile
bar includes the selected design and sold-out status. Google design state is separate
from the four main products, and design is included in checkout event context.
The current video remains unmounted until requested, uses preload none, native
controls and playsInline, and never autoplays. Original media files remain available.
The user explicitly approved publishing this refresh live after verification.
