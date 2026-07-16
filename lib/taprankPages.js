const northAndCoDemo = {
  businessName: "North & Co. Coffee House",
  businessImage: "/product/google-profile-after.png",
  categoryLine: "Coffee • Reviews • Menu • Contact",
  ratingValue: "4.9",
  ratingCount: "512",
  supportingText: "Tap below to leave a review or explore more.",
  reviewUrl: "https://www.google.com/search?q=North+%26+Co.+Coffee+House+Manchester+reviews",
  menuUrl: "https://www.taprank.co.uk/#live-demos",
  orderUrl: "https://www.taprank.co.uk/#pricing",
  instagramUrl: "https://www.instagram.com/",
  phoneNumber: "+441612345678",
  websiteUrl: "https://www.taprank.co.uk/",
  bookingUrl: "https://www.taprank.co.uk/#pricing",
  openingHours: [
    { days: "Mon – Fri", hours: "7:00 AM – 7:00 PM" },
    { days: "Sat – Sun", hours: "8:00 AM – 8:00 PM" },
  ],
  address: "14 Tib St, Manchester M4 1LG",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=14+Tib+St%2C+Manchester+M4+1LG",
};

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
    ...northAndCoDemo,
    slug: "barber-demo",
    businessName: "Fade Club Barbers",
    businessImage: "/demo/barber-shop.jpg",
    photoSource: "https://unsplash.com/photos/Yg80kbHnuTU",
    categoryLine: "Barber • Reviews • Bookings • Contact",
    ratingValue: "4.9",
    ratingCount: "248",
    actions: [
      { label: "View Services", icon: "menu", href: "#services" },
      { label: "Book a Cut", icon: "booking", href: "#book" },
      { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
      { label: "Call Us", icon: "call", href: "tel:+441612345678" },
      { label: "Website", icon: "website", href: "https://www.taprank.co.uk/" },
      { label: "Directions", icon: "map", href: "https://www.google.com/maps/search/?api=1&query=Manchester" },
    ],
  },
  "restaurant-demo": {
    ...northAndCoDemo,
    slug: "restaurant-demo",
    businessName: "Ember & Vine",
    businessImage: "/demo/restaurant-interior.jpg",
    photoSource: "https://unsplash.com/photos/JWUKBFHzyh0",
    categoryLine: "Restaurant • Reviews • Menu • Bookings",
    ratingValue: "4.8",
    ratingCount: "386",
  },
  "salon-demo": {
    ...northAndCoDemo,
    slug: "salon-demo",
    businessName: "Luna Hair Studio",
    businessImage: "/demo/salon-interior.jpg",
    photoSource: "https://unsplash.com/photos/SmDZa6NlwMg",
    categoryLine: "Salon • Reviews • Bookings • Contact",
    ratingValue: "4.9",
    ratingCount: "174",
    actions: [
      { label: "View Services", icon: "menu", href: "#services" },
      { label: "Book Appointment", icon: "booking", href: "#book" },
      { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
      { label: "Call Us", icon: "call", href: "tel:+441612345678" },
      { label: "Website", icon: "website", href: "https://www.taprank.co.uk/" },
      { label: "Directions", icon: "map", href: "https://www.google.com/maps/search/?api=1&query=Manchester" },
    ],
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
