import HostedTapRankPage from "../../components/HostedTapRankPage";

const actions = [
  { label: "View Menu", icon: "menu", href: "#menu", primary: true },
  { label: "Book a Table", icon: "booking", href: "https://example.com/book", primary: true },
  { label: "Leave a Google Review", icon: "review", href: "https://www.google.com/search?q=google+review" },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
  { label: "Allergens Info", icon: "allergens", href: "#allergens" },
  { label: "Get Directions", icon: "directions", href: "https://maps.google.com/" },
];

export default function RestaurantDemo() {
  return <HostedTapRankPage theme="restaurant" businessName="Example Restaurant" monogram="ER" eyebrow="KITCHEN · TABLE · WELCOME" copy="Welcome to Example Restaurant. View our menu, book a table or leave us a review." actions={actions} />;
}
