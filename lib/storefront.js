import { linePricingFor, productFor } from "./commerce";

export const STOREFRONT_CART_COOKIE = "taprank_cart";
export const STOREFRONT_CART_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
export const STOREFRONT_LOGO_MAX_BYTES = 3 * 1024 * 1024;
export const STOREFRONT_LOGO_TYPES = Object.freeze([
  "image/jpeg",
  "image/png",
  "image/webp",
]);
export const PRIMARY_ACTION_OPTIONS = Object.freeze([
  Object.freeze({ value: "google", label: "Google Review" }),
  Object.freeze({ value: "instagram", label: "Instagram" }),
  Object.freeze({ value: "tripadvisor", label: "Tripadvisor" }),
]);

const ACTION_LABELS = Object.freeze(
  Object.fromEntries(PRIMARY_ACTION_OPTIONS.map((option) => [option.value, option.label]))
);

function cleanText(value, maximumLength) {
  return String(value ?? "").replace(/\u0000/g, "").trim().slice(0, maximumLength);
}

function cleanUrl(value) {
  const cleaned = cleanText(value, 1000);
  if (!cleaned) return "";

  try {
    const url = new URL(cleaned);
    return url.protocol === "https:" && url.hostname ? url.href : "";
  } catch {
    return "";
  }
}

function cleanPlaceId(value) {
  const cleaned = cleanText(value, 255);
  return /^[A-Za-z0-9_-]+$/.test(cleaned) ? cleaned : "";
}

export function googleReviewUrl(placeId) {
  const safePlaceId = cleanPlaceId(placeId);
  return safePlaceId
    ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(safePlaceId)}`
    : "";
}

export function validateProductConfiguration(raw = {}) {
  const product = productFor(cleanText(raw.productId, 30).toLowerCase());
  const errors = {};

  if (!product) {
    return { isValid: false, errors: { productId: "Choose a valid TapRank product." }, values: null };
  }

  const quantity = Number.parseInt(String(raw.quantity ?? ""), 10);
  const businessName = cleanText(raw.businessName, 160);
  const businessAddress = cleanText(raw.businessAddress, 500);
  const placeId = cleanPlaceId(raw.placeId);
  const openingHours = cleanText(raw.openingHours, 1000);
  const businessLocation = cleanText(raw.businessLocation, 500);
  const designId = product.id === "google" ? cleanText(raw.designId || "current", 30).toLowerCase() : null;
  const primaryAction = product.primaryAction || cleanText(raw.primaryAction, 30).toLowerCase();
  const suppliedPrimaryUrl = cleanUrl(raw.primaryUrl);
  const primaryUrl = primaryAction === "google" && placeId
    ? googleReviewUrl(placeId)
    : suppliedPrimaryUrl;

  const pricing = linePricingFor(product.id, quantity);
  if (!pricing) {
    errors.quantity = product.id === "custom"
      ? "Choose a quantity between 1 and 20."
      : "Choose one of the available TapRank bundles.";
  }
  if (!businessName) errors.businessName = "Enter your business name.";
  if (raw.privacyAccepted !== true) errors.privacyAccepted = "Confirm that you have read the privacy notice.";
  if (!ACTION_LABELS[primaryAction]) errors.primaryAction = "Choose the main customer action.";
  if (!primaryUrl) {
    errors.primaryUrl = primaryAction === "google"
      ? "Select your Google business or enter its secure review link."
      : `Enter your secure ${ACTION_LABELS[primaryAction] || "primary"} link.`;
  }
  if (product.id === "google" && designId !== "current") {
    errors.designId = "Choose the available Current Google design.";
  }

  const rawLinks = Array.isArray(raw.additionalLinks) ? raw.additionalLinks.slice(0, 5) : [];
  const additionalLinks = [];
  rawLinks.forEach((link, index) => {
    const label = cleanText(link?.label, 80);
    const url = cleanUrl(link?.url);
    if (!label && !link?.url) return;
    if (!label) errors[`additionalLinks.${index}.label`] = "Add a short link label.";
    if (!url) errors[`additionalLinks.${index}.url`] = "Enter a complete secure link beginning with https://";
    if (label && url) additionalLinks.push({ label, url });
  });

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    values: {
      productId: product.id,
      productName: product.name,
      unitPricePence: product.pricePence,
      quantity,
      pricing,
      configuration: {
        businessName,
        businessAddress,
        placeId: placeId || null,
        primaryAction,
        primaryActionLabel: ACTION_LABELS[primaryAction] || "",
        primaryUrl,
        additionalLinks,
        openingHours: openingHours || null,
        businessLocation: businessLocation || null,
        designId,
      },
    },
  };
}

export function sanitiseCartForBrowser(cart, items = []) {
  const pricedItems = items.map((item) => ({ item, pricing: linePricingFor(item.product_id, item.quantity) }));
  return {
    id: cart?.id || null,
    status: cart?.status || "active",
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    totalPence: pricedItems.reduce((total, { pricing }) => total + (pricing?.totalPence || 0), 0),
    regularTotalPence: pricedItems.reduce((total, { pricing }) => total + (pricing?.regularTotalPence || 0), 0),
    items: pricedItems.map(({ item, pricing }) => ({
      id: item.id,
      productId: item.product_id,
      productName: item.product_name,
      unitPricePence: item.unit_price_pence,
      quantity: item.quantity,
      lineTotalPence: pricing?.totalPence || 0,
      regularLineTotalPence: pricing?.regularTotalPence || 0,
      effectiveUnitPricePence: pricing?.effectiveUnitPricePence || item.unit_price_pence,
      discountPercent: pricing?.discountPercent || 0,
      configuration: item.configuration,
      hasLogo: Boolean(item.logo_path),
    })),
  };
}
