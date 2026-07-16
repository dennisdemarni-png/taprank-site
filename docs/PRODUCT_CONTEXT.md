# Product context

## Current reality

TapRank is a UK NFC and QR product business for independent local businesses. It combines a physical acrylic countertop stand with a permanent, mobile-first TapRank-hosted page.

Tagline: **Connect customers to what matters.**

### Products currently sold

- Standard acrylic NFC + QR countertop stand: currently £39.99.
- Custom-designed acrylic NFC + QR countertop stand: currently £69.99.
- A TapRank-hosted mobile business page connected to each stand.

Pricing is commercial context and may change. It must not become embedded in unrelated application logic.

TapRank does **not** currently sell NFC stickers or NFC cards. Those formats may be explored later but must not be presented as active products now.

### How the product works

1. A business purchases a standard or custom stand.
2. TapRank creates a permanent hosted URL for that business.
3. The stand's QR code and NFC tag both point to that URL.
4. A customer in the venue taps or scans the stand.
5. The hosted page directs the customer to approved destinations such as Google Reviews, menus, rewards, Instagram, other social channels, booking pages, Fresha, WhatsApp, contact details, offers, or other important links.
6. TapRank can change those destination links later without reprinting the QR code or reprogramming the NFC tag, provided the permanent TapRank URL remains unchanged.

### Target customers

- Restaurants and takeaways
- Barbers and salons
- Cafés
- Clinics
- Independent shops
- Small local service businesses

### Customer value proposition

TapRank gives an in-venue customer a quick, obvious route to the action a business values most. The business receives a physical, counter-ready product and a mobile page that can be updated without replacing the stand.

### Business model and current stage

TapRank is an early MVP with its first paid order. The immediate model is a one-off hardware sale plus a TapRank-managed hosted page. TapRank initially creates and updates each page manually.

No real customer identity, links, payment information, or private order information belongs in this repository's public documentation.

### Commercial priorities

In order:

1. Fulfil paid customer orders correctly.
2. Make public customer pages reliable.
3. Make business links easy for TapRank to create and update.
4. Keep the marketing website commercially usable.
5. Improve conversion and lead follow-up.
6. Validate repeat demand.
7. Add customer self-service only when it removes meaningful operational work.
8. Add subscriptions and advanced analytics only after recurring value is proven.

### Immediate operational requirement

TapRank needs a reliable internal process to:

- create a business page;
- assign a unique permanent URL;
- add, order, edit, enable, and disable links;
- preview and publish updates;
- preserve the permanent URL when links change.

A complete customer SaaS portal is not required for the next order.

## Near-term plans

- Fulfil multiple paid orders using a safe, repeatable manual workflow.
- Replace demo-only page records with a small, secure admin-managed page system only when that meaningfully reduces risk or operating time.
- Improve deployment ownership, verification, rollback, and record keeping.
- Gather customer feedback about editable pages and desired actions.

Near-term work should reuse the existing Next.js application and public `/r/[slug]` pattern. It should not rebuild the marketing website.

## Long-term vision

Long-term possibilities include customer accounts, self-service editing, subscriptions, analytics, offers, rewards, campaigns, integrations, multi-location management, and team access.

These are directions, not implemented features or current commitments. Architecture should leave a sensible path to them without paying their full complexity before demand is validated.

## Brand direction

TapRank should feel clean, premium, modern, mobile-first, product-led, and easy to understand. Preferred traits include:

- white or off-white backgrounds;
- navy or dark-blue typography;
- TapRank blue accents;
- rounded corners and clear spacing;
- strong visual hierarchy with minimal clutter;
- professional, high-conversion design without an overly corporate tone.

Standard stands and pages use TapRank branding. Custom products may incorporate approved customer logos, colours, and business branding.

## Validation-first principles

- Solve paid-order and page-management problems before platform ambitions.
- Prefer a small reversible change over a broad rewrite.
- Require commercial evidence before each roadmap phase.
- Keep permanent customer URLs stable.
- Do not confuse future product ideas with products currently sold.
- Do not make unsupported performance claims.
- Protect customer privacy and never expose admin credentials to public pages.
