# Product configurator, cart and Square checkout

## Status

The repository contains the first implementation of an ecommerce-style product
configuration and cart flow. The storefront Supabase migration was applied to the
TapRank project on 12 September 2026. A Standard cart, Google Places selection,
£64.99 Square Sandbox payment-link creation and order-status lookup were verified.
Custom ordering is temporarily disabled. The flow remains gated until the Square Sandbox webhook is
configured on a stable HTTPS deployment and an end-to-end Sandbox payment passes.

The existing approved static Square Payment Links remain available from the
configurator as a fallback. Do not remove them until the dynamic flow is verified
in production.

## Customer flow

```text
Product page
  -> business and primary action configuration
  -> up to five optional links, opening hours and location
  -> HttpOnly-cookie cart
  -> server price and configuration validation
  -> Square-hosted checkout
  -> signed Square payment webhook
  -> paid private order record
```

Custom catalogue and validation support are retained for continuity, but the public
route returns 404 and the cart rejects new Custom items until TapRank re-enables it.
A quantity greater than one uses one shared configuration. Differently configured
stands must be added as separate cart items.

Standard Google Review, Instagram and Tripadvisor products use fixed bundle
quantities and server-controlled discounts: 1 stand at list price, 2 at 30% off,
3 at 40% off and 5 at 50% off. Totals are rounded once to the nearest penny and
sent to Square as one exact bundle line.
Both Current and Classic Google designs are accepted by the same cart and checkout.

## Unpaid cart lifecycle

An anonymous cart remains editable until a verified Square `COMPLETED` payment
webhook converts it. Merely opening, returning from or abandoning Square checkout
does not change the cart status, hide Remove controls or issue a new shopper cookie.
Legacy `checkout_started` carts are also treated as editable.

Each checkout request reloads every current cart item from Supabase, validates its
configuration and rebuilds pricing before creating Square line items. An existing
payment link is reused only when its server-side order snapshot and total exactly
match the current cart. Adding or removing an item first deletes any earlier open
Square payment link and marks its local order cancelled, so a stale checkout cannot
silently charge for an outdated basket. A late, genuinely completed signed webhook
is still recorded as paid and converts the matching cart.

The product page explicitly hydrates the saved server cart before presenting an
empty state. A cart response produced by an Add or Remove action cannot be
overwritten by an older hydration request.

## Apply the database migration

Open the Supabase SQL Editor for the TapRank project and run the complete contents
of:

`supabase/migrations/202609120001_create_storefront_commerce.sql`

The migration adds private carts, cart items, checkout orders, minimal webhook
idempotency records and the private `storefront-branding` Storage bucket. All new
tables have RLS enabled and grant access only to `service_role`.

## Square Sandbox

The API creates Square payment links from a server-controlled Order. The browser
never supplies a price. Configure a Sandbox webhook subscription whose notification
URL exactly matches `SQUARE_WEBHOOK_NOTIFICATION_URL`, subscribing initially to
`payment.updated`. The endpoint validates the raw body with the Square signature
key and records event IDs so repeated notifications are safe.

A customer redirect is not payment evidence. Only a validated webhook carrying a
`COMPLETED` payment for the matching Square order changes the local order to paid.
Preview and local checkouts return to their own trusted host; production uses the
configured `NEXT_PUBLIC_SITE_URL`.

## Required environment

```text
SUPABASE_URL
SUPABASE_SECRET_KEY
ORDER_DETAILS_RATE_LIMIT_SECRET
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
SQUARE_ENVIRONMENT
NEXT_PUBLIC_SQUARE_APPLICATION_ID
NEXT_PUBLIC_SQUARE_LOCATION_ID
SQUARE_ACCESS_TOKEN
SQUARE_WEBHOOK_SIGNATURE_KEY
SQUARE_WEBHOOK_NOTIFICATION_URL
```

`GOOGLE_PLACES_API_KEY` is reserved for a future server-side Places REST request
and is not required by the current browser search.

## Production gate

- [x] Apply and review the Supabase migration.
- [x] Verify standard cart storage and server-controlled product and bundle pricing.
- [x] Create a Square Sandbox payment link and read its unpaid order status.
- [x] Add the required Preview environment variables in Vercel.
- [x] Verify browser Google Places suggestions and selection locally.
- [x] Verify a single cart retains Google, Instagram and Tripadvisor across checkout creation, targeted removal and a later addition.
- [x] Verify a cart edit invalidates the prior Square Sandbox payment link and produces a fresh checkout snapshot.
- Confirm anonymous Supabase reads and writes fail.
- Use a stable HTTPS preview notification URL for the Sandbox webhook.
- Complete a successful Sandbox order and confirm the local status becomes paid.
- Confirm duplicate and invalidly signed webhook events do not change an order.
- Confirm failed/abandoned payment remains unconfirmed.
- Test all three active products, both Google designs, five optional links and supported bundle quantities.
- Replace Sandbox credentials with separately configured Production credentials.
- Complete one low-value real-card transaction and refund verification before launch.

## Operational limitation

Square collects payment and the delivery address. TapRank stores configuration and
payment status but does not yet provide a staff admin dashboard. Paid orders are
reviewed in the private Supabase records and Square Dashboard using the shared
TapRank order reference.
