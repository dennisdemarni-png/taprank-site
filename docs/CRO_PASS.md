# Conversion-rate optimisation pass — 12 September 2026

## Scope

This pass preserves the approved TapRank homepage, visual system, current stand
assets, hosted-page model and checkout configuration. It adds dedicated product
landing pages for paid-ad and high-intent traffic without introducing a new
platform, payment flow or analytics provider.

## Product landing routes

- `/google-review-stand`
- `/instagram-stand`
- `/tripadvisor-stand`
- `/custom-taprank`

All four routes render the shared `components/product/ProductLanding.jsx`
implementation. Product-specific messaging, current imagery, route metadata and
prices come from `components/homepage/content.js`; Square destinations remain in
`lib/commerce.js`.

The Google Review route is the primary direct-response page. Its Current design
is available and visually dominant. The sold-out Classic design remains available
through a small secondary disclosure for visitors arriving from older adverts.

## Conversion journey

The landing-page sequence is hero and purchase action, prominent current-product
video, three-step customer interaction, existing customer proof, purchase prompt,
basic-stand comparison, included product/page functionality, four-step setup,
delivery/subscription/warranty reassurance, FAQ and final purchase action. A compact
mobile purchase bar appears only after the hero and hides at the final purchase
section. It respects the mobile safe area.

The homepage now shows the eight-second video earlier and without an extra reveal
interaction. It is muted, inline, looped, user-controlled and automatically plays
where the browser permits. Natural purchase prompts follow the demonstration,
differentiation and customer-proof sections. Each variant links to its dedicated
page.

## Links, demos and measurement

`lib/publicLinks.js` centralises detection of outbound web links. Square, Etsy,
Trustpilot and real hosted-page web destinations open in a new tab with
`noopener noreferrer`. Internal TapRank routes, `mailto:` and `tel:` remain in the
same browsing context.

Demo hosted pages render business actions as accessible buttons. They never open
Google, Instagram, WhatsApp, booking, maps, phone, menu or website destinations;
instead they show a small in-page status message. The real `/r/laser-expert-pro`
page continues to render genuine external links.

The existing Meta integration is retained. Allowlisted product-page views, video
plays, demo visits and Square checkout starts use fixed product identifiers only.
No order, contact or arbitrary customer data is sent, and checkout clicks are not
reported as purchases.

## Customer information and known omissions

The public support email is centralised as `Info@taprank.co.uk`. The homepage and
product footers link to Contact, delivery/setup information, warranty information,
order setup and the existing Privacy notice.

No Terms or Returns / Refunds pages were created because approved policy content
does not exist in the repository. Footer code includes a TODO to add those links
only after TapRank supplies and approves the wording. No policy, guarantee,
testimonial, exact customer result or product capability was invented.

## Verification

- Run `pnpm run test:homepage`.
- Run `pnpm run build`.
- Check all four product routes at desktop and phone widths.
- Check that every Square/Etsy/Trustpilot link opens safely in a new tab.
- Check that demo actions stay on the demo route and show the preview message.
- Check that real customer actions remain anchors with their approved destinations.
- Check the Current Google design remains primary and the Classic disclosure is
  discoverable but secondary.
