export const taprankPages = {
  "barber-demo": {
    slug: "barber-demo",
    businessName: "Example Barber Co.",
    initials: "EB",
    categoryLabel: "Barbershop",
    theme: "barber",
    bannerLabel: "Premium cuts · Birmingham",
    rating: { score: "4.9", count: "248" },
    welcomeText: "Thanks for visiting. Choose what you need below.",
    primaryAction: { label: "Review us on Google", icon: "review", href: "https://www.google.com/search?q=google+review" },
    links: [
      { label: "Book an Appointment", icon: "booking", href: "https://example.com/book", featured: true },
      { label: "View Our Services", icon: "prices", href: "#services" },
      { label: "Follow on Instagram", icon: "instagram", href: "https://www.instagram.com/" },
      { label: "Call Us", icon: "call", href: "tel:01210000000" },
      { label: "Visit Our Website", icon: "website", href: "#" },
    ],
    infoItems: ["Open today", "Walk-ins welcome", "Birmingham, UK"],
    footerText: "Connect customers to what matters.",
  },
  "restaurant-demo": {
    slug: "restaurant-demo",
    businessName: "Example Restaurant",
    initials: "ER",
    categoryLabel: "Restaurant",
    theme: "restaurant",
    bannerLabel: "Kitchen · Table · Welcome",
    rating: { score: "4.8", count: "186" },
    welcomeText: "Welcome in. View our menu, book a table or leave us a review.",
    primaryAction: { label: "View Menu", icon: "menu", href: "#menu" },
    links: [
      { label: "Book a Table", icon: "booking", href: "https://example.com/book", featured: true },
      { label: "Review us on Google", icon: "review", href: "https://www.google.com/search?q=google+review", featured: true },
      { label: "Follow on Instagram", icon: "instagram", href: "https://www.instagram.com/" },
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
    categoryLabel: "Beauty Salon",
    theme: "salon",
    bannerLabel: "Beauty · Care · You",
    rating: { score: "4.9", count: "312" },
    welcomeText: "Thank you for visiting. Book, review or connect with us below.",
    primaryAction: { label: "Book Appointment", icon: "booking", href: "https://example.com/book" },
    links: [
      { label: "Review us on Google", icon: "review", href: "https://www.google.com/search?q=google+review", featured: true },
      { label: "View Treatments", icon: "treatments", href: "#treatments" },
      { label: "Follow on Instagram", icon: "instagram", href: "https://www.instagram.com/" },
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
