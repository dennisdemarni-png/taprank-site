import HostedTapRankPage from "../../components/HostedTapRankPage";

const actions = [
  { label: "Book Appointment", icon: "booking", href: "https://example.com/book", primary: true },
  { label: "Leave a Google Review", icon: "review", href: "https://www.google.com/search?q=google+review", primary: true },
  { label: "View Treatments", icon: "treatments", href: "#treatments" },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
  { label: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/" },
  { label: "WhatsApp", icon: "whatsapp", href: "https://wa.me/447000000000" },
];

export default function SalonDemo() {
  return <HostedTapRankPage theme="salon" businessName="Example Beauty Salon" monogram="EB" eyebrow="BEAUTY · CARE · YOU" copy="Thank you for visiting Example Beauty Salon. Book, review or connect with us below." actions={actions} />;
}
