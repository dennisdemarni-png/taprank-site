import Image from "next/image";
import { assets } from "./content";
import { Arrow, Eyebrow, Phone, Stand, TrustLine } from "./Visuals";
import { homepageEvent } from "../../lib/homepageEvents";
import s from "./Homepage.module.css";
export default function Hero() {
  return <>
    <section className={`${s.wrap} ${s.hero}`} aria-labelledby="hero-title" id="hero">
      <div className={s.heroCopy}>
        <Eyebrow>Small stand. More possibilities.</Eyebrow>
        <h1 id="hero-title">Turn happy<br />customers<br /><em>into action.</em></h1>
        <p className={s.lead}>The NFC + QR tabletop stand that connects your customers to reviews, socials, bookings and more. One tap. Your business, at their fingertips.</p>
        <div className={s.heroButtons}><a className={s.button} href="#options" data-event="hero_buy_click" onClick={() => homepageEvent("hero_buy_click")}>Buy TapRank <Arrow /></a><a className={s.textLink} href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a></div>
        <p className={s.heroPrice}>From <strong>£64.99</strong> <span>· One-off payment</span></p>
      </div>
      <div className={s.heroVisual}>
        <div className={s.heroDisc} aria-hidden="true" />
        <div className={s.heroClassicStand}><Stand priority src={assets.googleClassic} alt="Google Review Classic design TapRank stand" /><span>Classic design <small>Sold out</small></span></div>
        <div className={s.heroCurrentStand}><Stand priority src={assets.google} alt="Google Review Current design TapRank stand" /><span>Current design</span></div>
        <div className={s.heroPhone}><Phone priority /><span>Your TapRank page</span></div>
        <div className={s.tapConnector} aria-hidden="true"><span>One tap opens it all</span><svg viewBox="0 0 160 80"><path d="M5 60 Q70 90 145 12 M125 12 L145 12 L144 32" /></svg></div>
        <span className={s.productFootnote}>A7 acrylic · NFC + QR · Ready to use</span>
      </div>
      <div className={s.heroBottom}><TrustLine /><span>Made for the moments that matter.</span></div>
    </section>
    <div className={s.platformBand} aria-label="Connect customers to Google, Instagram, Tripadvisor and more"><span>One TapRank. Your favourite destinations.</span><div>{Object.entries(assets.platforms).map(([id, src]) => <div className={s.platformLogo} key={id}><Image src={src} alt={id === "tripadvisor" ? "Tripadvisor" : id === "google" ? "Google" : "Instagram"} fill sizes="130px" /></div>)}<b>+ your business links</b></div></div>
  </>;
}
