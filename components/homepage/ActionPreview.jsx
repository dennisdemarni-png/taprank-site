import Image from "next/image";
import { assets } from "./content";
import s from "./Homepage.module.css";

const previews = {
  review: { label: "Leave a Google Review", destination: "Google Reviews", platform: "google" },
  follow: { label: "Follow us on Instagram", destination: "Instagram", platform: "instagram" },
  book: { label: "Booking Enquiry", destination: "Your booking page", icon: "calendar" },
  browse: { label: "View Menu", destination: "Your menu", icon: "menu" },
  call: { label: "Call Us", destination: "Your business phone", icon: "phone" },
  find: { label: "Get Directions", destination: "Your location in Maps", icon: "map" },
};

function ActionGlyph({ icon }) {
  const paths = {
    calendar: <><rect x="4" y="5" width="16" height="16" rx="3" /><path d="M8 3v5m8-5v5M4 11h16m-11 4h6" /></>,
    menu: <><path d="M5 4h14v16H7a2 2 0 0 1-2-2V4Zm0 13h14M9 8h6m-6 4h6" /></>,
    phone: <path d="m7 3 3 5-3 3c1.5 3 3 4.5 6 6l3-3 5 3c0 3-2 4-4 4C9 20 4 15 3 7c0-2 1-4 4-4Z" />,
    map: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[icon]}</svg>;
}

export default function ActionPreview({ actionId }) {
  const action = previews[actionId];
  return <div className={s.actionBrowser}>
    <div className={s.browserBar}><span /><span /><span /><b>Your TapRank page</b></div>
    <div className={s.liveActionPreview} data-action={actionId}>
      <div className={s.actionIdentity}>
        {action.platform ? <Image src={assets.platforms[action.platform]} alt={action.destination} width={120} height={60} sizes="120px" /> : <span className={s.actionGlyph}><ActionGlyph icon={action.icon} /></span>}
        <span>One clear next step</span>
      </div>
      {/* An illustrative control, not a link to an unrelated real business. */}
      <div className={s.customerAction} aria-label={`Illustration: ${action.label}`}>
        <strong>{action.label}</strong><span aria-hidden="true">›</span>
      </div>
      <p>Opens <strong>{action.destination}</strong> <span aria-hidden="true">↗</span></p>
    </div>
  </div>;
}
