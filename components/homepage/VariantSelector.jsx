import { homepageEvent } from "../../lib/homepageEvents";
import { variants } from "./content";
import { Arrow, Eyebrow, Stand } from "./Visuals";
import { PRODUCT_PROMOTION, validRegularPricePence } from "../../lib/promotion";
import { formatPrice } from "../../lib/commerce";
import { usePromotionCountdown } from "../product/usePromotionCountdown";
import s from "./Homepage.module.css";
const cardCopy = {
  google: "Make Google reviews the first action customers see.",
  instagram: "Make following your Instagram the first action customers see.",
  tripadvisor: "Make Tripadvisor reviews the first action guests see.",
};
export default function VariantSelector() {
  const promotion = usePromotionCountdown();
  const regularPricePence = promotion.active ? validRegularPricePence(6499) : null;
  return <section className={s.purchaseSection} id="products" aria-labelledby="products-title"><div className={s.wrap}>
    <div className={s.purchaseHeading}><Eyebrow>Shop by customer action</Eyebrow><h2 id="products-title">Choose what customers notice first.</h2><p>Every face includes NFC, QR and a hosted TapRank business page. Pick the action you want front and centre.</p></div>
    <div className={s.productCards}>
      {variants.map((variant, index) => <article className={s.productCard} data-variant={variant.id} key={variant.id}>
        <a className={s.productCardImage} href={variant.route} aria-label={`View ${variant.name} TapRank`} onClick={() => homepageEvent("product_cta_click", { variant: variant.id, location: "homepage_product_image" })}><span className={s.productCardBadge}>{index === 0 ? "Two designs in stock" : "In stock"}</span><Stand src={variant.image} alt={`${variant.name} TapRank NFC and QR acrylic stand`} /></a>
        <div className={s.productCardBody}><p>{variant.name} TapRank</p><h3>{cardCopy[variant.id]}</h3><ul><li>NFC + QR configured</li><li>Hosted business page</li><li>Free UK delivery</li></ul><div className={s.productCardOffer}>{promotion.active ? <small>{PRODUCT_PROMOTION.saleLabel}</small> : null}<strong>£{variant.price}</strong>{regularPricePence ? <del>{formatPrice(regularPricePence)}</del> : null}</div><a className={s.productCardButton} href={variant.route} onClick={() => homepageEvent("product_cta_click", { variant: variant.id, location: "homepage_product_card" })}>View product <Arrow /></a></div>
      </article>)}
    </div>
    <p className={s.productSectionNote}>One-off purchase · No subscription · We configure everything before dispatch</p>
  </div></section>;
}
