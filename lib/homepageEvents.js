/** Storefront-only events through the already approved Meta Pixel.
 * Only allowlisted UI identifiers are sent. Never send order/contact data.
 * Checkout clicks are InitiateCheckout, never Purchase: Square must confirm payment.
 */
const events = new Set(['storefront_view', 'product_page_view', 'hero_buy_click', 'product_cta_click', 'variant_selected', 'bundle_selected', 'business_selected', 'add_to_cart', 'square_checkout_click', 'etsy_click', 'how_it_works_interaction', 'demo_video_play', 'demo_viewed', 'faq_open']);
const prices = { google: 64.99, instagram: 64.99, tripadvisor: 64.99, custom: 84.99 };
const productPaths = new Set(['/google-review-stand', '/instagram-stand', '/tripadvisor-stand', '/custom-taprank']);

function safeProductIds(ids, fallback) {
  const safe = Array.isArray(ids) ? [...new Set(ids.filter((id) => Object.hasOwn(prices, id)))] : [];
  return safe.length ? safe : fallback && Object.hasOwn(prices, fallback) ? [fallback] : [];
}

export function homepageEvent(name, context = {}) {
  if (typeof window === 'undefined' || !events.has(name) || typeof window.fbq !== 'function') return;
  const path = window.location.pathname;
  if (path !== '/' && !productPaths.has(path)) return;
  const data = { page_type: path === '/' ? 'storefront' : 'product_landing' };
  if (Object.hasOwn(prices, context.variant)) data.variant = context.variant;
  if (data.variant === 'google' && ['new', 'classic'].includes(context.design)) data.design = context.design;
  if ([1, 2, 3, 5].includes(context.quantity)) data.quantity = context.quantity;
  if ([1, 2, 3].includes(context.step)) data.step = context.step;
  try {
    if (name === 'square_checkout_click') {
      const contentIds = safeProductIds(context.productIds, data.variant);
      if (!contentIds.length) return;
      const totalPence = Number(context.totalPence);
      const quantity = Number(context.quantity);
      window.fbq('track', 'InitiateCheckout', {
        ...data,
        content_ids: contentIds,
        content_type: 'product',
        currency: 'GBP',
        value: Number.isInteger(totalPence) && totalPence > 0 ? totalPence / 100 : prices[data.variant],
        num_items: Number.isInteger(quantity) && quantity > 0 && quantity <= 100 ? quantity : 1,
      });
    } else window.fbq('trackCustom', name, data);
  } catch { /* Analytics must never interrupt shopping. */ }
}

export function trackVerifiedPurchase({ reference, totalPence, itemCount, productIds }) {
  if (typeof window === 'undefined' || window.location?.pathname !== '/order-confirmation' || typeof window.fbq !== 'function') return false;
  if (!/^TR-[A-F0-9]{24}$/.test(String(reference || ''))) return false;
  const valuePence = Number(totalPence);
  const quantity = Number(itemCount);
  if (!Number.isInteger(valuePence) || valuePence <= 0 || !Number.isInteger(quantity) || quantity <= 0 || quantity > 100) return false;
  const storageKey = `taprank:meta-purchase:${reference}`;
  try { if (window.localStorage?.getItem(storageKey)) return true; } catch { /* Storage may be unavailable. */ }
  try {
    const contentIds = safeProductIds(productIds);
    window.fbq('track', 'Purchase', {
      ...(contentIds.length ? { content_ids: contentIds, content_type: 'product' } : {}),
      currency: 'GBP',
      value: valuePence / 100,
      num_items: quantity,
    });
    try { window.localStorage?.setItem(storageKey, '1'); } catch { /* Tracking must not depend on storage. */ }
    return true;
  } catch {
    return false;
  }
}
