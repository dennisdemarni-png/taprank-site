export const taprankPages = {
  "barber-demo": {
    slug: "barber-demo",
    businessName: "Example Barber Co.",
    initials: "EB",
    categoryLabel: "Premium Barbering",
    theme: "barber",
    welcomeText: "Thanks for visiting Example Barber Co. Choose what you need below.",
    primaryAction: { label: "Book Appointment", icon: "booking", href: "https://example.com/book" },
    links: [
      { label: "Leave a Google Review", icon: "review", href: "https://www.google.com/search?q=google+review", featured: true },
      { label: "View Price List", icon: "prices", href: "#prices" },
      { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
      { label: "WhatsApp", icon: "whatsapp", href: "https://wa.me/447000000000" },
      { label: "Get Directions", icon: "directions", href: "https://maps.google.com/" },
    ],
    infoItems: ["Open today", "Walk-ins welcome", "Birmingham, UK"],
    footerText: "Connect customers to what matters.",
  },
  "restaurant-demo": {
    slug: "restaurant-demo",
    businessName: "Example Restaurant",
    initials: "ER",
    categoryLabel: "Kitchen · Table · Welcome",
    theme: "restaurant",
    welcomeText: "Welcome to Example Restaurant. View our menu, book a table or leave us a review.",
    primaryAction: { label: "View Menu", icon: "menu", href: "#menu" },
    links: [
      { label: "Book a Table", icon: "booking", href: "https://example.com/book", featured: true },
      { label: "Leave a Google Review", icon: "review", href: "https://www.google.com/search?q=google+review", featured: true },
      { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
      { label: "Allergens Info", icon: "allergens", href: "#allergens" },
      { label: "Get Directions", icon: "directions", href: "https://maps.google.com/" },
    ],
    infoItems: ["Open for lunch & dinner", "Table bookings available", "Allergen info available"],
    footerText: "Connect customers to what matters.",
  },
  "salon-demo": {
    slug: "salon-demo",
    businessName: "Example Beauty Salon",
    initials: "ES",
    categoryLabel: "Beauty · Care · You",
    theme: "salon",
    welcomeText: "Thank you for visiting Example Beauty Salon. Book, review or connect with us below.",
    primaryAction: { label: "Book Appointment", icon: "booking", href: "https://example.com/book" },
    links: [
      { label: "Leave a Google Review", icon: "review", href: "https://www.google.com/search?q=google+review", featured: true },
      { label: "View Treatments", icon: "treatments", href: "#treatments" },
      { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
      { label: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/" },
      { label: "WhatsApp", icon: "whatsapp", href: "https://wa.me/447000000000" },
    ],
    infoItems: ["Appointments available", "New clients welcome", "Patch test may be required"],
    footerText: "Connect customers to what matters.",
  },
};

export const taprankPageSlugs = Object.keys(taprankPages);

export function getTapRankPage(slug) {
  return taprankPages[slug] || null;
}
