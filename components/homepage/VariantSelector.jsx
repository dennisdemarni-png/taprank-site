import GoogleDesignSelector from "./GoogleDesignSelector";
import { useState } from "react";
import { ETSY_URL } from "../../lib/commerce";
import { homepageEvent } from "../../lib/homepageEvents";
import { variants } from "./content";
import { Arrow, Eyebrow, Stand } from "./Visuals";
import { externalLinkProps } from "../../lib/publicLinks";
import s from "./Homepage.module.css";
export default function VariantSelector({ selected, onSelect, googleDesign, onDesignSelect }) {
  const [showIncluded, setShowIncluded] = useState(true);
  const url = `${selected.route}${selected.id === "google" && googleDesign.id === "classic" ? "?design=classic" : ""}#configure`;
  return <section className={s.purchaseSection} id="options" aria-labelledby="options-title"><div className={s.wrap}>
    <div className={s.purchaseHeading}><Eyebrow>One TapRank. Make it your own.</Eyebrow><h2 id="options-title">Choose your connection.</h2><p>Four stand designs. The same simple tap-to-page experience.</p></div>
    <div className={s.purchaseGrid} style={{ "--variant-accent": selected.accent }}>
      <div className={s.purchaseArt}><span className={s.productBadge}>NFC + QR included</span><Stand src={selected.id === "google" ? googleDesign.image : selected.image} alt={`${selected.name} TapRank A7 acrylic stand${selected.id === "custom" ? " branding examples" : ""}`} className={selected.id === "custom" ? s.customProduct : ""} /><p>{selected.caption}</p><span className={s.productSpec}>A7 acrylic tabletop display · Setup included</span></div>
      <div className={s.purchaseDetails}><p className={s.selectorLabel}>Choose your stand design</p><div className={s.variantOptions} role="group" aria-label="TapRank variants">{variants.map(variant => <button type="button" key={variant.id} aria-pressed={selected.id === variant.id} data-event="variant_selected" onClick={() => onSelect(variant)} style={{ "--option-accent": variant.accent }}><span className={s.radioMark} aria-hidden="true" /><span>{variant.name}<small>£{variant.price}</small></span></button>)}</div>
        {selected.id === "google" && <GoogleDesignSelector selected={googleDesign} onSelect={onDesignSelect} />}
        <div className={s.variantDescription} aria-live="polite" aria-atomic="true"><h3>{selected.name}{selected.id === "google" ? ` — ${googleDesign.name}` : ""}</h3><p>{selected.description}</p><a className={s.variantPageLink} href={selected.route}>View the {selected.name} page <Arrow /></a><div className={s.price}>£{selected.price}<span>GBP · One-off payment</span></div></div>
        <a id="purchase-checkout" className={s.button} href={url} data-event="product_cta_click" onClick={() => homepageEvent("product_cta_click", { variant: selected.id, ...(selected.id === "google" ? { design: googleDesign.id } : {}) })}>Configure {selected.id === "custom" ? "Custom TapRank" : selected.name} · £{selected.price} <Arrow /></a>
        <p className={s.checkoutNote} id="checkout-note">Configure your stand, then pay securely with Square. Free UK delivery.</p>
        <p className={s.setupNote}><strong>We handle the setup.</strong> After checkout, send us your business details. We configure your stand and page for you.</p>
        {ETSY_URL ? <a className={s.etsyLink} href={ETSY_URL} {...externalLinkProps(ETSY_URL)} data-event="etsy_click" onClick={() => homepageEvent("etsy_click", { variant: selected.id, ...(selected.id === "google" ? { design: googleDesign.id } : {}) })}>Prefer Etsy? Shop TapRank on Etsy <Arrow /></a> : <p className={s.etsyPending}>Prefer Etsy? Shop link coming soon.</p>}
        <div className={s.included}><button type="button" aria-expanded={showIncluded} aria-controls="included-list" onClick={() => setShowIncluded(!showIncluded)}>Everything you need is included <span aria-hidden="true">{showIncluded ? "−" : "+"}</span></button><ul id="included-list" hidden={!showIncluded}><li>TapRank-hosted business page</li><li>QR generated and configured by TapRank</li><li>NFC configured before dispatch</li><li>{selected.id === "custom" ? "Your logo, colours & tailored stand and page design" : "Standard TapRank stand and hosted-page branding"}</li><li>1-year replacement warranty</li><li>No subscription · Ready for immediate use</li></ul></div>
        <p className={s.dispatch}>Free UK delivery <span aria-hidden="true">·</span> Dispatch within 48 hours of receiving your details</p>
      </div>
    </div>
  </div></section>;
}
