// Public purchase destinations only. Never store payment credentials here.
export const EXISTING_STANDARD_CHECKOUT_URL = "https://square.link/u/kbq7PFVV";
export const CHECKOUTS = Object.freeze({
  // Exact variant destinations approved by TapRank; Square is primary.
  google: Object.freeze({
    new: Object.freeze({ url: "https://square.link/u/kbq7PFVV", approved: true }),
    // Classic uses the in-site configured cart and dynamic Square checkout. It
    // intentionally has no separate static Payment Link fallback.
    classic: Object.freeze({ url: null, approved: false, soldOut: false }),
  }),
  instagram: Object.freeze({ url: "https://square.link/u/Nr0kuTQ2", approved: true }),
  tripadvisor: Object.freeze({ url: "https://square.link/u/fuQpb9Eo", approved: true }),
  custom: Object.freeze({ url: "https://square.link/u/tzzKvksd", approved: true }),
});
// User-approved secondary purchase destination. Square remains primary.
export const ETSY_URL = "https://taprank.etsy.com/uk/listing/4569990571/google-review-nfc-stand-qr-code-review";
export const ETSY_SHOP_URL = "https://taprank.etsy.com";

// Standard-product volume pricing approved by TapRank. These values are shared
// by the browser presentation and every server-side total calculation.
export const STANDARD_BUNDLE_TIERS = Object.freeze([
  Object.freeze({ quantity: 1, discountPercent: 0, label: "Starter" }),
  Object.freeze({ quantity: 2, discountPercent: 30, label: "30% off" }),
  Object.freeze({ quantity: 3, discountPercent: 40, label: "Most popular" }),
  Object.freeze({ quantity: 5, discountPercent: 50, label: "Best value" }),
]);

// Trusted server and client catalogue. Checkout APIs must always derive prices
// from this object rather than accepting a browser-supplied amount.
export const PRODUCT_CATALOG = Object.freeze({
  google: Object.freeze({
    id: "google",
    name: "Google Review TapRank",
    shortName: "Google Review",
    pricePence: 6499,
    primaryAction: "google",
  }),
  instagram: Object.freeze({
    id: "instagram",
    name: "Instagram TapRank",
    shortName: "Instagram",
    pricePence: 6499,
    primaryAction: "instagram",
  }),
  tripadvisor: Object.freeze({
    id: "tripadvisor",
    name: "Tripadvisor TapRank",
    shortName: "Tripadvisor",
    pricePence: 6499,
    primaryAction: "tripadvisor",
  }),
  custom: Object.freeze({
    id: "custom",
    name: "Custom Branding + Logo TapRank",
    shortName: "Custom Branding + Logo",
    pricePence: 8499,
    primaryAction: null,
  }),
});

export function productFor(id) {
  return Object.hasOwn(PRODUCT_CATALOG, id) ? PRODUCT_CATALOG[id] : null;
}

export function formatPrice(pricePence) {
  return `£${(pricePence / 100).toFixed(2)}`;
}

export function bundleTierFor(productId, quantity) {
  if (productId === "custom") {
    return Number.isInteger(quantity) && quantity >= 1 && quantity <= 20
      ? { quantity, discountPercent: 0, label: quantity === 1 ? "Single stand" : `${quantity} stands` }
      : null;
  }
  if (!productFor(productId)) return null;
  return STANDARD_BUNDLE_TIERS.find((tier) => tier.quantity === quantity) || null;
}

export function linePricingFor(productId, quantity) {
  const product = productFor(productId);
  const tier = bundleTierFor(productId, quantity);
  if (!product || !tier) return null;
  const regularTotalPence = product.pricePence * quantity;
  const totalPence = Math.round(regularTotalPence * (100 - tier.discountPercent) / 100);
  return {
    quantity,
    unitPricePence: product.pricePence,
    regularTotalPence,
    totalPence,
    effectiveUnitPricePence: Math.round(totalPence / quantity),
    discountPercent: tier.discountPercent,
    label: tier.label,
  };
}

export function checkoutFor(id, design = "new") {
  const checkout = id === "google" ? CHECKOUTS.google[design] : CHECKOUTS[id];
  if (checkout?.soldOut || !checkout?.approved || !checkout.url) return null;
  try {
    const url = new URL(checkout.url);
    return url.protocol === "https:" && ["square.link", "checkout.square.site"].includes(url.hostname) ? url.href : null;
  } catch { return null; }
}
// Compatibility shape retained for the archived homepage.
export const TAPRANK_COMMERCE = Object.freeze({
  standard: Object.freeze({ name: "Standard TapRank", price: "£64.99", checkoutUrl: EXISTING_STANDARD_CHECKOUT_URL, cta: "Buy TapRank — £64.99" }),
  custom: Object.freeze({ name: "Custom Logo + Branding", price: "£84.99", cta: "Buy Custom TapRank — £84.99" }),
  checkoutReassurance: "Secure checkout with Square. Free UK delivery.",
  dispatchPromise: "Dispatched within 48 hours of receiving your business details.",
  launchBundleEnabled: false,
});
