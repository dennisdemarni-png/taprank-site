export const taprankPages = {
  "barber-demo": {
    slug: "barber-demo",
    businessName: "Example Barber Co.",
    category: "PREMIUM BARBERING",
    theme: "barber",
    monogram: "EB",
    introText: "Thanks for visiting Example Barber Co. Choose what you need below.",
    primaryAction: "Leave a Google Review",
    links: [
      { label: "Leave a Google Review", icon: "review", href: "https://www.google.com/search?q=google+review", primary: true },
      { label: "Book Appointment", icon: "booking", href: "https://example.com/book", primary: true },
      { label: "View Price List", icon: "prices", href: "#prices" },
      { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
      { label: "WhatsApp", icon: "whatsapp", href: "https://wa.me/447000000000" },
      { label: "Get Directions", icon: "directions", href: "https://maps.google.com/" },
    ],
  },
  "restaurant-demo": {
    slug: "restaurant-demo",
    businessName: "Example Restaurant",
    category: "KITCHEN · TABLE · WELCOME",
    theme: "restaurant",
    monogram: "ER",
    introText: "Welcome to Example Restaurant. View our menu, book a table or leave us a review.",
    primaryAction: "View Menu",
    links: [
      { label: "View Menu", icon: "menu", href: "#menu", primary: true },
      { label: "Book a Table", icon: "booking", href: "https://example.com/book", primary: true },
      { label: "Leave a Google Review", icon: "review", href: "https://www.google.com/search?q=google+review" },
      { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
      { label: "Allergens Info", icon: "allergens", href: "#allergens" },
      { label: "Get Directions", icon: "directions", href: "https://maps.google.com/" },
    ],
  },
  "salon-demo": {
    slug: "salon-demo",
    businessName: "Example Beauty Salon",
    category: "BEAUTY · CARE · YOU",
    theme: "salon",
    monogram: "EB",
    introText: "Thank you for visiting Example Beauty Salon. Book, review or connect with us below.",
    primaryAction: "Book Appointment",
    links: [
      { label: "Book Appointment", icon: "booking", href: "https://example.com/book", primary: true },
      { label: "Leave a Google Review", icon: "review", href: "https://www.google.com/search?q=google+review", primary: true },
      { label: "View Treatments", icon: "treatments", href: "#treatments" },
      { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
      { label: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/" },
      { label: "WhatsApp", icon: "whatsapp", href: "https://wa.me/447000000000" },
    ],
  },
};

export const taprankPageSlugs = Object.keys(taprankPages);

export function getTapRankPage(slug) {
  return taprankPages[slug] || null;
}
