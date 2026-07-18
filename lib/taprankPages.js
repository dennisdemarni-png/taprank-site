const supportedPublicProtocols = new Set(["https:", "tel:", "mailto:"]);

function assertSafePublicDestination(href, fieldName, { webOnly = false } = {}) {
  if (typeof href !== "string" || !href.trim() || href !== href.trim()) {
    throw new Error(`${fieldName} must be a non-empty destination.`);
  }

  if (href.startsWith("#") && href.length > 1 && !webOnly) {
    return;
  }

  let destination;

  try {
    destination = new URL(href);
  } catch {
    throw new Error(`${fieldName} must be a valid public destination.`);
  }

  if (webOnly ? destination.protocol !== "https:" : !supportedPublicProtocols.has(destination.protocol)) {
    throw new Error(`${fieldName} uses an unsupported destination protocol.`);
  }

  if (destination.username || destination.password) {
    throw new Error(`${fieldName} must not contain credentials.`);
  }
}

function validateTapRankPages(pages) {
  Object.entries(pages).forEach(([slug, page]) => {
    if (page.slug !== slug) {
      throw new Error(`TapRank page key "${slug}" must match its slug.`);
    }

    if (typeof page.businessName !== "string" || !page.businessName.trim()) {
      throw new Error(`TapRank page "${slug}" must have a business name.`);
    }

    ["reviewUrl", "menuUrl", "orderUrl", "instagramUrl", "websiteUrl", "bookingUrl", "mapsUrl"].forEach((field) => {
      if (page[field]) {
        assertSafePublicDestination(page[field], `${slug}.${field}`, { webOnly: true });
      }
    });

    if (page.actions !== undefined && !Array.isArray(page.actions)) {
      throw new Error(`TapRank page "${slug}" actions must be an array.`);
    }

    page.actions?.forEach((action, index) => {
      if (!action?.label || !action?.icon) {
        throw new Error(`TapRank page "${slug}" action ${index + 1} needs a label and icon.`);
      }

      assertSafePublicDestination(action.href, `${slug}.actions[${index}].href`);
    });
  });

  return pages;
}

export const taprankPages = validateTapRankPages({
  "barber-demo": {
    slug: "barber-demo",
    businessName: "Fade Club Barbers",
    businessImage: "/demo/barber-shop.jpg",
    photoSource: "https://unsplash.com/photos/Yg80kbHnuTU",
    categoryLine: "Barber • Reviews • Bookings • Contact",
    ratingValue: "4.9",
    ratingCount: "248",
    supportingText: "This is a TapRank demonstration page. Choose an example action below.",
    reviewLabel: "Preview Google Review Action",
    reviewUrl: "https://www.google.com/search?q=Fade+Club+Barbers+TapRank+demo+reviews",
    actions: [
      { label: "Example Website", icon: "website", href: "https://example.com/" },
      { label: "Booking Enquiry", icon: "booking", href: "mailto:fade-club@example.com" },
      { label: "Call Demo Business", icon: "call", href: "tel:+441632960001" },
      { label: "Directions", icon: "map", href: "https://www.google.com/maps/search/?api=1&query=Northern+Quarter%2C+Manchester" },
    ],
    openingHours: [
      { days: "Mon – Fri", hours: "9am–7pm" },
      { days: "Sat", hours: "9am–5pm" },
      { days: "Sun", hours: "Closed" },
    ],
    address: "Northern Quarter, Manchester",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Northern+Quarter%2C+Manchester",
  },
  "restaurant-demo": {
    slug: "restaurant-demo",
    businessName: "Ember & Vine",
    businessImage: "/demo/restaurant-interior.jpg",
    photoSource: "https://unsplash.com/photos/JWUKBFHzyh0",
    categoryLine: "Restaurant • Reviews • Menu • Bookings",
    ratingValue: "4.8",
    ratingCount: "386",
    supportingText: "This is a TapRank demonstration page. Choose an example action below.",
    reviewLabel: "Preview Google Review Action",
    reviewUrl: "https://www.google.com/search?q=Ember+%26+Vine+TapRank+demo+reviews",
    actions: [
      { label: "Example Menu", icon: "menu", href: "https://example.com/" },
      { label: "Booking Enquiry", icon: "booking", href: "mailto:ember-and-vine@example.com" },
      { label: "Call Demo Restaurant", icon: "call", href: "tel:+441632960002" },
      { label: "Directions", icon: "map", href: "https://www.google.com/maps/search/?api=1&query=Spinningfields%2C+Manchester" },
    ],
    openingHours: [
      { days: "Mon – Thu", hours: "12pm–10pm" },
      { days: "Fri – Sat", hours: "12pm–11pm" },
      { days: "Sun", hours: "12pm–9pm" },
    ],
    address: "Spinningfields, Manchester",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Spinningfields%2C+Manchester",
  },
  "salon-demo": {
    slug: "salon-demo",
    businessName: "Luna Hair Studio",
    businessImage: "/demo/salon-interior.jpg",
    photoSource: "https://unsplash.com/photos/SmDZa6NlwMg",
    categoryLine: "Salon • Reviews • Bookings • Contact",
    ratingValue: "4.9",
    ratingCount: "174",
    supportingText: "This is a TapRank demonstration page. Choose an example action below.",
    reviewLabel: "Preview Google Review Action",
    reviewUrl: "https://www.google.com/search?q=Luna+Hair+Studio+TapRank+demo+reviews",
    actions: [
      { label: "Example Website", icon: "website", href: "https://example.com/" },
      { label: "Booking Enquiry", icon: "booking", href: "mailto:luna-hair@example.com" },
      { label: "Call Demo Salon", icon: "call", href: "tel:+441632960003" },
      { label: "Directions", icon: "map", href: "https://www.google.com/maps/search/?api=1&query=Ancoats%2C+Manchester" },
    ],
    openingHours: [
      { days: "Tue – Fri", hours: "9am–7pm" },
      { days: "Sat", hours: "9am–5pm" },
      { days: "Sun – Mon", hours: "Closed" },
    ],
    address: "Ancoats, Manchester",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ancoats%2C+Manchester",
  },
  "laser-expert-pro": {
    slug: "laser-expert-pro",
    businessName: "Laser Expert Pro",
    businessImage: "/customer-assets/laser-expert-pro-logo.png",
    businessImageAlt: "Laser Expert Pro logo",
    businessImageFit: "contain",
    categoryLine: "Advanced Laser & Skin Clinic",
    supportingText: "Tap below to leave a review or explore more.",
    reviewUrl: "https://www.google.com/maps/place//@51.4843267,0.0016451,17z/data=!3m1!4b1!4m3!3m2!1s0x47d8a990d4031e7f:0xc6ebd5fb0c28c332!12e1?entry=ttu&g_ep=EgoyMDI2MDcxMy4wIKXMDSoASAFQAw%3D%3D",
    actions: [
      {
        label: "Instagram",
        icon: "instagram",
        href: "https://www.instagram.com/laser_expert_pro",
      },
    ],
    openingHours: [
      { days: "Open daily", hours: "10am–7pm" },
    ],
    address: "111 Trafalgar Rd, London SE10 9TS",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=111+Trafalgar+Rd%2C+London+SE10+9TS",
  },
});

export const taprankPageSlugs = Object.keys(taprankPages);

export function getTapRankPage(slug) {
  return taprankPages[slug] || null;
}
