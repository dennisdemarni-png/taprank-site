import Image from "next/image";
import { assets } from "./content";
import s from "./Homepage.module.css";
export function Arrow() { return <span aria-hidden="true">↗</span>; }
export function Logo({ white = false }) {
  return <span className={s.logo}><Image src={white ? assets.whiteLogo : assets.logo} alt="TapRank" width={220} height={165} sizes="220px" /></span>;
}
export function Stand({ src = assets.google, alt = "TapRank Google Review NFC and QR acrylic tabletop stand", priority = false, className = "" }) {
  return <div className={`${s.stand} ${[assets.google, assets.instagram, assets.tripadvisor].includes(src) ? s.currentStand : ""} ${className}`}><Image src={src} alt={alt} fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 55vw, 600px" priority={priority} /></div>;
}
export function Phone({ src = assets.restaurantPage, alt = "Restaurant TapRank page example with Google reviews, menu, bookings, calling and directions", className = "", priority = false }) {
  return <div className={`${s.phone} ${src === assets.restaurantPage ? s.demoPagePhone : ""} ${className}`}><Image src={src} alt={alt} fill sizes="(max-width: 600px) 200px, 320px" priority={priority} /></div>;
}
export function Eyebrow({ children }) { return <p className={s.eyebrow}>{children}</p>; }
export function TrustLine() {
  return <ul className={s.trustLine}><li>Free UK delivery</li><li>No subscription</li><li>Dispatch within 48 hours</li></ul>;
}
