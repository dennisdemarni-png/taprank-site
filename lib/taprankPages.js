export const taprankPages = {
  "barber-demo": {
    slug: "barber-demo",
    businessName: "Sunset Barber Co.",
    initials: "SB",
    categoryLabel: "Barbershop",
    theme: "barber",
    bannerLabel: "Cuts · Shaves · Style",
    heroImage: null,
    heroAlt: "Sunset Barber Co. TapRank page banner placeholder",
    rating: { score: "4.9", count: "248" },
    welcomeText: "No searching. No typing. Just tap what you need.",
    primaryAction: { label: "Review us on Google", icon: "review", href: "https://www.google.com/search?q=google+review" },
    links: [
      { label: "Book an Appointment", icon: "booking", href: "#", featured: true },
      { label: "View Our Services", icon: "services", href: "#" },
      { label: "Follow on Instagram", icon: "instagram", href: "#" },
      { label: "Call Us", icon: "call", href: "#" },
      { label: "Visit Our Website", icon: "website", href: "#" },
    ],
    infoItems: ["Open today", "Walk-ins welcome", "Birmingham, UK"],
    footerText: "Connect customers to what matters.",
  },
  "restaurant-demo": {
    slug: "restaurant-demo",
    businessName: "Olive & Oak",
    initials: "OO",
    categoryLabel: "Restaurant",
    theme: "restaurant",
    bannerLabel: "Kitchen · Table · Welcome",
    heroImage: null,
    heroAlt: "Olive & Oak TapRank page banner placeholder",
    rating: { score: "4.8", count: "312" },
    welcomeText: "View the menu, book a table or find us in one tap.",
    primaryAction: { label: "View Menu", icon: "menu", href: "#menu" },
    links: [
      { label: "Book a Table", icon: "booking", href: "#", featured: true },
      { label: "Review us on Google", icon: "review", href: "https://www.google.com/search?q=google+review", featured: true },
      { label: "Follow on Instagram", icon: "instagram", href: "#" },
      { label: "Allergens Info", icon: "allergens", href: "#" },
      { label: "Get Directions", icon: "directions", href: "#" },
    ],
    infoItems: ["Open for lunch & dinner", "Table bookings available", "Allergen info available"],
    footerText: "Connect customers to what matters.",
  },
  "salon-demo": {
    slug: "salon-demo",
    businessName: "Luxe Beauty Salon",
    initials: "LS",
    categoryLabel: "Beauty Salon",
    theme: "salon",
    bannerLabel: "Beauty · Care · You",
    heroImage: null,
    heroAlt: "Luxe Beauty Salon TapRank page banner placeholder",
    rating: { score: "4.9", count: "186" },
    welcomeText: "Book, review or connect with the salon in seconds.",
    primaryAction: { label: "Book Appointment", icon: "booking", href: "#" },
    links: [
      { label: "Review us on Google", icon: "review", href: "https://www.google.com/search?q=google+review", featured: true },
      { label: "View Treatments", icon: "treatments", href: "#" },
      { label: "Follow on Instagram", icon: "instagram", href: "#" },
      { label: "TikTok", icon: "tiktok", href: "#" },
      { label: "WhatsApp", icon: "whatsapp", href: "#" },
    ],
    infoItems: ["Appointments available", "New clients welcome", "Patch test may be required"],
    footerText: "Connect customers to what matters.",
  },
};

export const taprankPageSlugs = Object.keys(taprankPages);

export function getTapRankPage(slug) {
  return taprankPages[slug] || null;
}
