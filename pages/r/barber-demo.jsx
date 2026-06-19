import HostedTapRankPage from "../../components/HostedTapRankPage";

const actions = [
  { label: "Leave a Google Review", icon: "review", href: "https://www.google.com/search?q=google+review", primary: true },
  { label: "Book Appointment", icon: "booking", href: "https://example.com/book", primary: true },
  { label: "View Price List", icon: "prices", href: "#prices" },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
  { label: "WhatsApp", icon: "whatsapp", href: "https://wa.me/447000000000" },
  { label: "Get Directions", icon: "directions", href: "https://maps.google.com/" },
];

export default function BarberDemo() {
  return <HostedTapRankPage theme="barber" businessName="Example Barber Co." monogram="EB" eyebrow="PREMIUM BARBERING" copy="Thanks for visiting Example Barber Co. Choose what you need below." actions={actions} />;
}
