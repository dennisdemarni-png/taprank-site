// Public purchase destinations only. Never store payment credentials here.
export const EXISTING_STANDARD_CHECKOUT_URL = "https://square.link/u/kbq7PFVV";
export const CHECKOUTS = Object.freeze({
  // User-supplied placeholder, 2026-09-08. Price is not yet correct.
  // TODO: confirm Google variant and £64.99 price, then set approved: true.
  google: Object.freeze({ url: "https://checkout.square.site/merchant/MLXDQB4BMJPQH/checkout/QEE7T4LHYXE4RLFO5HYWE66S", approved: false }),
  // TODO: supply approved Square destinations for each exact variant and price.
  instagram: Object.freeze({ url: null, approved: false }),
  tripadvisor: Object.freeze({ url: null, approved: false }),
  custom: Object.freeze({ url: null, approved: false }),
});
// TODO: provide an approved TapRank Etsy shop/listing destination. Never guess.
export const ETSY_URL = null;
export function checkoutFor(id) {
  const checkout = CHECKOUTS[id];
  if (!checkout?.approved || !checkout.url) return null;
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
  dispatchPromise: "Dispatched within 48 hours.",
  launchBundleEnabled: false,
});
