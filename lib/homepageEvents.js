/** Storefront-only events through the already approved Meta Pixel.
 * Only allowlisted UI identifiers are sent. Never send order/contact data.
 * Checkout clicks are InitiateCheckout, never Purchase: Square must confirm payment.
 */
const events = new Set(['storefront_view', 'hero_buy_click', 'variant_selected', 'square_checkout_click', 'etsy_click', 'how_it_works_interaction', 'demo_video_play', 'faq_open']);
const prices = { google: 64.99, instagram: 64.99, tripadvisor: 64.99, custom: 84.99 };
export function homepageEvent(name, context = {}) {
  if (typeof window === 'undefined' || window.location.pathname !== '/' || !events.has(name) || typeof window.fbq !== 'function') return;
  const data = { page_type: 'storefront' };
  if (Object.hasOwn(prices, context.variant)) data.variant = context.variant;
  if (data.variant === 'google' && ['new', 'classic'].includes(context.design)) data.design = context.design;
  if ([1, 2, 3].includes(context.step)) data.step = context.step;
  try {
    if (name === 'square_checkout_click') {
      if (!data.variant || data.design === 'classic') return;
      window.fbq('track', 'InitiateCheckout', { ...data, content_ids: [data.variant], content_type: 'product', currency: 'GBP', value: prices[data.variant], num_items: 1 });
    } else window.fbq('trackCustom', name, data);
  } catch { /* Analytics must never interrupt shopping. */ }
}
