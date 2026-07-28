export const ORDER_DETAILS_PRIVACY_VERSION = "2026-07-28";
export const ORDER_DETAILS_LOGO_MAX_BYTES = 3 * 1024 * 1024;
export const ORDER_DETAILS_LOGO_TYPES = Object.freeze([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export const ORDER_PRODUCT_TYPES = Object.freeze([
  { value: "standard", label: "Standard TapRank Stand" },
  { value: "custom", label: "Custom TapRank Stand" },
]);

export const PRIMARY_ACTIONS = Object.freeze([
  { value: "review", label: "Leave a Google review" },
  { value: "booking", label: "Make a booking" },
  { value: "menu", label: "View a menu" },
  { value: "website", label: "Visit a website" },
  { value: "social", label: "Follow a social account" },
  { value: "other", label: "Another customer action" },
]);

const TEXT_LIMITS = Object.freeze({
  squareOrderReference: 100,
  contactName: 120,
  contactEmail: 254,
  contactPhone: 40,
  businessName: 160,
  businessType: 120,
  businessAddress: 500,
  publicPhone: 40,
  publicEmail: 254,
  openingHours: 1000,
  primaryActionUrl: 1000,
  websiteUrl: 1000,
  bookingUrl: 1000,
  menuUrl: 1000,
  instagramUrl: 1000,
  facebookUrl: 1000,
  tiktokUrl: 1000,
  whatsappNumber: 40,
  additionalLinkLabel: 80,
  additionalLinkUrl: 1000,
  brandColours: 240,
  brandingNotes: 2000,
});

const URL_FIELDS = Object.freeze([
  "primaryActionUrl",
  "websiteUrl",
  "bookingUrl",
  "menuUrl",
  "instagramUrl",
  "facebookUrl",
  "tiktokUrl",
  "additionalLinkUrl",
]);

function firstValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

function cleanText(value, maximumLength) {
  return String(firstValue(value) ?? "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maximumLength);
}

function isChecked(value) {
  return ["true", "1", "yes", "on"].includes(
    String(firstValue(value) ?? "").toLowerCase()
  );
}

function isHttpsUrl(value) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && Boolean(url.hostname);
  } catch {
    return false;
  }
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value) {
  return /^[+()\d\s.-]{7,40}$/.test(value);
}

export function normaliseOrderDetails(rawFields = {}) {
  const values = {};

  Object.entries(TEXT_LIMITS).forEach(([field, maximumLength]) => {
    values[field] = cleanText(rawFields[field], maximumLength);
  });

  values.productType = cleanText(rawFields.productType, 20).toLowerCase();
  values.primaryAction = cleanText(rawFields.primaryAction, 30).toLowerCase();
  values.quantity = Number.parseInt(cleanText(rawFields.quantity, 3), 10);
  values.accuracyConfirmed = isChecked(rawFields.accuracyConfirmed);
  values.privacyAcknowledged = isChecked(rawFields.privacyAcknowledged);
  values.companyWebsite = cleanText(rawFields.companyWebsite, 240);
  values.startedAt = Number.parseInt(cleanText(rawFields.startedAt, 20), 10);

  return values;
}

export function validateOrderDetails(rawFields = {}) {
  const values = normaliseOrderDetails(rawFields);
  const errors = {};

  if (!["standard", "custom"].includes(values.productType)) {
    errors.productType = "Choose the stand you ordered.";
  }

  if (!Number.isInteger(values.quantity) || values.quantity < 1 || values.quantity > 20) {
    errors.quantity = "Enter a quantity between 1 and 20.";
  }

  [
    ["contactName", "Enter the name TapRank should contact."],
    ["contactEmail", "Enter the email used for this order."],
    ["contactPhone", "Enter a contact telephone number."],
    ["businessName", "Enter the business name exactly as it should appear."],
    ["businessType", "Enter the type of business."],
    ["primaryActionUrl", "Enter the link for the main customer action."],
  ].forEach(([field, message]) => {
    if (!values[field]) errors[field] = message;
  });

  if (values.contactEmail && !isEmail(values.contactEmail)) {
    errors.contactEmail = "Enter a valid contact email address.";
  }

  if (values.publicEmail && !isEmail(values.publicEmail)) {
    errors.publicEmail = "Enter a valid public email address.";
  }

  if (values.contactPhone && !isPhone(values.contactPhone)) {
    errors.contactPhone = "Enter a valid contact telephone number.";
  }

  if (values.publicPhone && !isPhone(values.publicPhone)) {
    errors.publicPhone = "Enter a valid public telephone number.";
  }

  if (values.whatsappNumber && !isPhone(values.whatsappNumber)) {
    errors.whatsappNumber = "Enter a valid WhatsApp telephone number.";
  }

  if (!PRIMARY_ACTIONS.some((action) => action.value === values.primaryAction)) {
    errors.primaryAction = "Choose the main action for your TapRank page.";
  }

  URL_FIELDS.forEach((field) => {
    if (values[field] && !isHttpsUrl(values[field])) {
      errors[field] = "Enter a complete secure link beginning with https://";
    }
  });

  if (values.additionalLinkUrl && !values.additionalLinkLabel) {
    errors.additionalLinkLabel = "Add a label for the additional link.";
  }

  if (values.additionalLinkLabel && !values.additionalLinkUrl) {
    errors.additionalLinkUrl = "Add the secure destination for this link.";
  }

  if (!values.accuracyConfirmed) {
    errors.accuracyConfirmed = "Confirm that the submitted business details are accurate.";
  }

  if (!values.privacyAcknowledged) {
    errors.privacyAcknowledged = "Confirm that you have read how TapRank uses these details.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    values,
  };
}
