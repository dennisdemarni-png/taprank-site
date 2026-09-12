import { useEffect, useState } from "react";
import Hero from "./Hero";
import CustomerProof from "./CustomerProof";
import TapDemo from "./TapDemo";
import ActionShowcase from "./ActionShowcase";
import VariantSelector from "./VariantSelector";
import { CustomShowcase, FAQ, FinalCTA, Ordering, TrustStrip } from "./ClosingSections";
import { variants, googleDesigns } from "./content";
import { Arrow, Logo } from "./Visuals";
import { homepageEvent } from "../../lib/homepageEvents";
import { TAPRANK_CONTACT } from "../../lib/contact";
import s from "./Homepage.module.css";
function MobilePurchase({ selected, googleDesign }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero");
    const options = document.getElementById("purchase-checkout");
    const finalCta = document.getElementById("final-cta");
    if (!hero || !options || !window.IntersectionObserver) return;
    let heroPassed = false;
    let optionsVisible = false;
    let finalVisible = false;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === hero) heroPassed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        if (entry.target === options) optionsVisible = entry.isIntersecting;
        if (entry.target === finalCta) finalVisible = entry.isIntersecting;
      }
      setVisible(heroPassed && !optionsVisible && !finalVisible);
    });
    observer.observe(hero); observer.observe(options);
    if (finalCta) observer.observe(finalCta);
    return () => observer.disconnect();
  }, [googleDesign.soldOut, selected.id]);
  const url = `${selected.route}${selected.id === "google" && googleDesign.id === "classic" ? "?design=classic" : ""}#configure`;
  return visible ? <div className={s.mobileSticky}><span><strong>{selected.name}{selected.id === "google" ? ` · ${googleDesign.name}` : ""}</strong><small>£{selected.price} · Free UK delivery</small></span><a className={s.button} href={url} onClick={() => homepageEvent("product_cta_click", { variant: selected.id, ...(selected.id === "google" ? { design: googleDesign.id } : {}) })}>Configure <Arrow /></a></div> : null;
}
export default function Homepage() {
  const [selected, setSelected] = useState(variants[0]);
  const [googleDesign, setGoogleDesign] = useState(googleDesigns[0]);
  function selectDesign(design) { setGoogleDesign(design); setSelected(variants[0]); homepageEvent("variant_selected", { variant: "google", design: design.id }); }
  const [menuOpen, setMenuOpen] = useState(false);
  function selectVariant(variant) { setSelected(variant); homepageEvent("variant_selected", { variant: variant.id }); }
  return <div className={s.home} id="top"><a className={s.skipLink} href="#main">Skip to content</a><div className={s.announcement}>Free UK delivery <span>·</span> Ready to use <span>·</span> No subscription</div>
    <header className={s.header}><div className={s.wrap}><a href="#top" aria-label="TapRank home"><Logo /></a><nav className={s.desktopNav} aria-label="Main navigation"><a href="#how-it-works">How it works</a><a href="#options">Options</a><a href="#custom">Custom</a><a href="#faq">FAQ</a></nav><a className={s.navBuy} href="#options">Buy TapRank <Arrow /></a><button className={s.menuButton} type="button" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button></div>{menuOpen && <nav id="mobile-nav" className={s.mobileNav} aria-label="Mobile navigation">{[["How it works", "how-it-works"], ["Options", "options"], ["Custom", "custom"], ["FAQ", "faq"]].map(([name, id]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{name}</a>)}</nav>}</header>
    <main id="main"><Hero /><TapDemo googleDesign={googleDesign} /><ActionShowcase /><CustomerProof /><VariantSelector selected={selected} onSelect={selectVariant} googleDesign={googleDesign} onDesignSelect={selectDesign} /><CustomShowcase onSelect={selectVariant} /><Ordering /><TrustStrip /><FAQ /><FinalCTA googleDesign={googleDesign} /></main>
    <footer className={s.footer}><div className={`${s.wrap} ${s.footerGrid}`}><div><a href="#top" aria-label="TapRank home"><Logo /></a><p>Your business. One tap away.</p></div><div><strong>Products &amp; demos</strong><a href="/google-review-stand">Google Review</a><a href="/instagram-stand">Instagram</a><a href="/tripadvisor-stand">Tripadvisor</a><a href="/custom-taprank">Custom Branding + Logo</a><a href="/r/restaurant-demo">TapRank page demo</a></div><div><strong>Here to help</strong><a href={`mailto:${TAPRANK_CONTACT.email}`}>Contact</a><a href="#how-it-works">Delivery &amp; setup</a><a href="#faq">Warranty</a><a href="/order-details">Order setup</a><a href="/privacy">Privacy</a>{/* TODO: Add Returns / Refunds and Terms links only after TapRank supplies and approves the policy wording. */}</div></div><div className={`${s.wrap} ${s.footerBottom}`}><span>© {new Date().getFullYear()} TapRank</span><span>{TAPRANK_CONTACT.email}</span></div></footer><MobilePurchase selected={selected} googleDesign={googleDesign} />
  </div>;
}
