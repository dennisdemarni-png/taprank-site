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

export const taprankPages = {
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
};

export const taprankPageSlugs = Object.keys(taprankPages);

export function getTapRankPage(slug) {
  return taprankPages[slug] || null;
}
