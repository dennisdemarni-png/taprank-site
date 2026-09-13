import Image from "next/image";
import { assets } from "./content";
import { Arrow, Eyebrow, Phone, Stand, TrustLine } from "./Visuals";
import { homepageEvent } from "../../lib/homepageEvents";
import { PRODUCT_PROMOTION, validRegularPricePence } from "../../lib/promotion";
import { formatPrice } from "../../lib/commerce";
import { usePromotionCountdown } from "../product/usePromotionCountdown";
import s from "./Homepage.module.css";
export default function Hero() {
  const promotion = usePromotionCountdown();
  const regularPricePence = promotion.active ? validRegularPricePence(6499) : null;
  return <>
    <section className={s.heroShell} aria-labelledby="hero-title" id="hero"><div className={`${s.wrap} ${s.hero}`}>
      <div className={s.heroCopy}>
        <Eyebrow>NFC + QR stands for growing businesses</Eyebrow>
        <h1 id="hero-title">More reviews.<br />More followers.<br /><em>One simple tap.</em></h1>
        <p className={s.lead}>Turn happy customers into Google reviews, Instagram followers and Tripadvisor reviews while they are still with your business.</p>
        <ul className={s.heroBenefits}><li>Configured and ready to use</li><li>Free UK delivery</li><li>No subscription</li></ul>
        <div className={s.heroOffer}>{promotion.active ? <small>{PRODUCT_PROMOTION.saleLabel}</small> : null}<div><strong>£64.99</strong>{regularPricePence ? <del>{formatPrice(regularPricePence)}</del> : null}{promotion.active ? <span className={s.heroCountdown} role="timer" suppressHydrationWarning><b>Ends in</b> {promotion.days}d {String(promotion.hours).padStart(2, "0")}:{String(promotion.minutes).padStart(2, "0")}:{String(promotion.seconds).padStart(2, "0")}</span> : null}</div><p>One-off payment</p></div>
        <div className={s.heroButtons}><a className={s.lightButton} href="/google-review-stand" data-event="hero_buy_click" onClick={() => homepageEvent("hero_buy_click", { variant: "google" })}>Shop Google Review <Arrow /></a><a className={s.heroTextLink} href="#products">Explore all TapRank faces <span aria-hidden="true">↓</span></a></div>
      </div>
      <div className={s.heroVisual}>
        <div className={s.heroDisc} aria-hidden="true" />
        <div className={s.heroClassicStand}><Stand priority src={assets.googleClassic} alt="Google Review White background TapRank stand" /><span>White background <small className={s.stockLabel}><i aria-hidden="true" />In stock</small></span></div>
        <div className={s.heroCurrentStand}><Stand priority src={assets.google} alt="Google Review Blue background TapRank stand" /><span>Blue background <small className={s.stockLabel}><i aria-hidden="true" />In stock</small></span></div>
        <div className={s.heroPhone}><Phone priority /><span>Your TapRank page</span></div>
        <div className={s.tapConnector} aria-hidden="true"><span>One tap opens it all</span><svg viewBox="0 0 160 80"><path d="M5 60 Q70 90 145 12 M125 12 L145 12 L144 32" /></svg></div>
        <span className={s.productFootnote}>A7 acrylic · NFC + QR · Ready to use</span>
      </div>
      <div className={s.heroBottom}><TrustLine /><span>Physical stand + hosted TapRank page</span></div>
    </div></section>
    <div className={s.platformBand} aria-label="Connect customers to Google, Instagram, Tripadvisor and more"><span>One TapRank. Your favourite destinations.</span><div>{Object.entries(assets.platforms).map(([id, src]) => <div className={s.platformLogo} key={id}><Image src={src} alt={id === "tripadvisor" ? "Tripadvisor" : id === "google" ? "Google" : "Instagram"} fill sizes="130px" /></div>)}<b>+ your business links</b></div></div>
  </>;
}
