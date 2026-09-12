# Product configurator, cart and Square checkout

## Status

The repository contains the first implementation of an ecommerce-style product
configuration and cart flow. The storefront Supabase migration was applied to the
TapRank project on 12 September 2026. A standard cart, a private Custom-logo
upload, a £64.99 Square Sandbox payment link and the order-status lookup were then
verified successfully. The flow remains gated until the Square Sandbox webhook is
configured on a stable HTTPS deployment and an end-to-end Sandbox payment passes.

The existing approved static Square Payment Links remain available from the
configurator as a fallback. Do not remove them until the dynamic flow is verified
in production.

## Customer flow

```text
Product page
  -> business and primary action configuration
  -> up to five optional links, opening hours and location
  -> private custom-logo upload when applicable
  -> HttpOnly-cookie cart
  -> server price and configuration validation
  -> Square-hosted checkout
  -> signed Square payment webhook
  -> paid private order record
```

The Custom product requires a logo and lets the customer choose Google Review,
Instagram or Tripadvisor as the primary action. A quantity greater than one uses
one shared configuration. Differently configured stands must be added as separate
cart items.

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
and is not required by the current browser widget.

## Production gate

- [x] Apply and review the Supabase migration.
- [x] Verify standard cart storage and server-controlled £64.99 pricing.
- [x] Verify private Custom-logo upload and server-controlled £84.99 pricing.
- [x] Create a Square Sandbox payment link and read its unpaid order status.
- Confirm anonymous Supabase reads and writes fail.
- Add Preview environment variables in Vercel without exposing server secrets.
- Use a stable HTTPS preview notification URL for the Sandbox webhook.
- Complete a successful Sandbox order and confirm the local status becomes paid.
- Confirm duplicate and invalidly signed webhook events do not change an order.
- Confirm failed/abandoned payment remains unconfirmed.
- Test all four products, custom logo upload, five optional links and multiple quantities.
- Review the existing privacy notice for the new pre-checkout cart collection flow.
- Replace Sandbox credentials with separately configured Production credentials.
- Complete one low-value real-card transaction and refund verification before launch.

## Operational limitation

Square collects payment and the delivery address. TapRank stores configuration and
payment status but does not yet provide a staff admin dashboard. Paid orders are
reviewed in the private Supabase records and Square Dashboard using the shared
TapRank order reference.
