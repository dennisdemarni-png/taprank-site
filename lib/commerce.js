// Public purchase destinations only. Never store payment credentials here.
export const EXISTING_STANDARD_CHECKOUT_URL = "https://square.link/u/kbq7PFVV";
export const CHECKOUTS = Object.freeze({
  // Exact variant destinations approved by TapRank; Square is primary.
  google: Object.freeze({
    new: Object.freeze({ url: "https://square.link/u/kbq7PFVV", approved: true }),
    classic: Object.freeze({ url: null, approved: false, soldOut: true }),
  }),
  instagram: Object.freeze({ url: "https://square.link/u/Nr0kuTQ2", approved: true }),
  tripadvisor: Object.freeze({ url: "https://square.link/u/fuQpb9Eo", approved: true }),
  custom: Object.freeze({ url: "https://square.link/u/tzzKvksd", approved: true }),
});
// User-approved secondary purchase destination. Square remains primary.
export const ETSY_URL = "https://taprank.etsy.com/uk/listing/4569990571/google-review-nfc-stand-qr-code-review";

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
