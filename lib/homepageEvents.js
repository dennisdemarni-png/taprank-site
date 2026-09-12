/** Storefront-only events through the already approved Meta Pixel.
 * Only allowlisted UI identifiers are sent. Never send order/contact data.
 * Checkout clicks are InitiateCheckout, never Purchase: Square must confirm payment.
 */
const events = new Set(['storefront_view', 'product_page_view', 'hero_buy_click', 'product_cta_click', 'variant_selected', 'business_selected', 'add_to_cart', 'square_checkout_click', 'etsy_click', 'how_it_works_interaction', 'demo_video_play', 'demo_viewed', 'faq_open']);
const prices = { google: 64.99, instagram: 64.99, tripadvisor: 64.99, custom: 84.99 };
const productPaths = new Set(['/google-review-stand', '/instagram-stand', '/tripadvisor-stand', '/custom-taprank']);
export function homepageEvent(name, context = {}) {
  if (typeof window === 'undefined' || !events.has(name) || typeof window.fbq !== 'function') return;
  const path = window.location.pathname;
  if (path !== '/' && !productPaths.has(path)) return;
  const data = { page_type: path === '/' ? 'storefront' : 'product_landing' };
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
