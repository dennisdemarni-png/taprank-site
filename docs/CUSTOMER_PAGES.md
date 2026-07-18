# Customer pages

## Purpose

A TapRank stand sends an in-venue customer to a permanent, mobile-first page with one prominent primary action and selected secondary business links. The page must remain useful even when individual third-party destinations change.

## Current implementation

The repository currently generates three demo pages and one source-managed customer page from `lib/taprankPages.js`:

- `/r/barber-demo`
- `/r/restaurant-demo`
- `/r/salon-demo`
- `/r/laser-expert-pro`

They all use `components/HostedTapRankPage.jsx` and the same shared TapRank styling. They are statically generated at build time and have no database, admin workflow, or customer ownership. Optional sections are rendered only when the record supplies their data. Unknown slugs return 404. This is not yet a production customer-page management system.

Each demo record is explicit and internally consistent; demo actions use clearly demonstrative destinations rather than inheriting content from another fictional business. `/r/demo` redirects internally to `/r/barber-demo`. Demo and real customer pages remain `noindex, follow` by default. Customer-page indexing requires separate TapRank and customer approval.

## Intended public URL behaviour

- Every business receives a unique permanent route: `/r/[slug]`.
- The slug should be readable, unique, stable, and treated as immutable after the QR code is printed and NFC tag programmed.
- Both QR and NFC should point to the full permanent TapRank URL, never directly to a mutable review/menu/booking destination.
- TapRank may update destinations, labels, order, and enabled state without changing the public URL.
- Production should use HTTPS and one canonical hostname.
- Redirects or domain changes must preserve old permanent URLs.

## Intended business page content

### Business profile

- Business name.
- Optional approved business image or logo.
- Optional category/descriptor.
- Standard TapRank theme initially.
- Business status.
- Optional display-only rating information when accurate and maintainable.

### Links

Each link needs:

- a type, such as review, menu, rewards, Instagram, social, booking, Fresha, WhatsApp, call, website, offer, or another approved type;
- a customer-facing label;
- a valid destination URL or protocol destination;
- a display order;
- an enabled state.

The primary business action—usually Google Reviews—should be visually dominant. Secondary actions should remain easy to tap without competing with it.

## Link validation and safety

Before publication:

- require a supported `https:` destination for web links;
- allow explicitly supported protocols such as `tel:` or `mailto:` only where intended;
- reject blank, malformed, script, or unsafe URLs;
- open third-party web destinations safely;
- verify every destination manually on mobile;
- do not expose private dashboards, edit tokens, customer records, or admin controls.

## Link ordering and status

- `displayOrder` controls the page sequence.
- Disabled links remain stored for future reuse but are omitted from the public page.
- A business draft can contain unpublished changes.
- Only published enabled links should be public.
- Link changes should have an audit record once a database-backed admin system exists.

The current source-controlled page objects do not implement these status rules.

## Business status and invalid pages

Intended future statuses:

- `draft`: visible only in authorised preview.
- `active`: public and using the latest published version.
- `inactive`: public route returns a simple branded “page temporarily unavailable” response without exposing private data.
- `archived`: no public content; retain the record according to policy.

Current behaviour is simpler: known demo slugs render and unknown slugs return the default 404. No inactive state exists.

## Themes

The near-term standard theme should preserve TapRank branding, clear hierarchy, mobile spacing, and accessibility. A future custom theme may incorporate approved customer logos and colours while preserving contrast, tap targets, focus visibility, and the dominant primary action.

Custom themes must not allow arbitrary script or unsafe markup.

## Updating links without changing hardware

1. Keep the QR code and NFC tag pointed at the permanent TapRank URL.
2. Update the destination in the page record.
3. Validate and preview the change.
4. Publish it.
5. Revalidate or refresh the public page/cache.
6. Test the same physical QR code and NFC tag.

The permanent slug must not be changed as part of a normal link update.

## Intended minimum data model

This model is a design target only; it is not implemented.

### Business

| Field | Purpose |
| --- | --- |
| `id` | Internal immutable identifier |
| `businessName` | Public full business name |
| `slug` | Unique permanent public route key |
| `status` | Draft, active, inactive, or archived state |
| `theme` | Approved standard/custom theme identifier |
| `createdAt` | Creation timestamp |
| `updatedAt` | Last-updated timestamp |

### Business link

| Field | Purpose |
| --- | --- |
| `id` | Internal immutable identifier |
| `businessId` | Parent business identifier |
| `linkType` | Review, menu, rewards, social, booking, etc. |
| `linkLabel` | Public button label |
| `destinationUrl` | Validated destination |
| `displayOrder` | Stable integer ordering value |
| `enabled` | Whether the link appears publicly |
| `createdAt` | Creation timestamp |
| `updatedAt` | Last-updated timestamp |

An implementation will also need an authorised ownership/admin model and a safe publication record. Those are deliberately outside this minimum public-page data description.

## Mobile-first requirements

- Design and test first at common phone widths.
- No horizontal overflow or clipped content.
- The primary action should be visible quickly and use a large tap target.
- Secondary actions must remain comfortably tappable.
- Images should have stable dimensions to avoid layout shift.
- Pages should work on slow connections and with JavaScript delays where practical.
- Test iOS Safari and Android Chrome on physical devices when possible.

## Accessibility requirements

- Semantic headings and link/button elements.
- Descriptive alternative text for meaningful images; empty alt text for decoration.
- Keyboard access and clearly visible focus states.
- Minimum practical 44-by-44-pixel targets for main controls.
- Sufficient text/icon/background contrast, including custom themes.
- No meaning communicated by colour alone.
- Reduced-motion support.
- Screen-reader labels for icon-only controls.
- A logical reading and tab order.

## Future capabilities

These are not currently implemented:

- customer accounts and business ownership;
- self-service link editing and preview;
- custom themes;
- analytics for page views and link clicks;
- subscriptions and feature access;
- offers, rewards, campaigns, or integrations.

They should be introduced only through the validation gates in `ROADMAP.md`.
