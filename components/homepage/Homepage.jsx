import { useEffect, useState } from "react";
import Hero from "./Hero";
import TapDemo from "./TapDemo";
import ActionShowcase from "./ActionShowcase";
import VariantSelector from "./VariantSelector";
import { CustomShowcase, FAQ, FinalCTA, Ordering, TrustStrip } from "./ClosingSections";
import { variants } from "./content";
import { Arrow, Logo } from "./Visuals";
import { homepageEvent } from "../../lib/homepageEvents";
import { TAPRANK_CONTACT } from "../../lib/contact";
import s from "./Homepage.module.css";
function MobilePurchase({ selected }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero");
    const options = document.getElementById("options");
    if (!hero || !options || !window.IntersectionObserver) return;
    let heroPassed = false;
    let optionsVisible = false;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === hero) heroPassed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        if (entry.target === options) optionsVisible = entry.isIntersecting;
      }
      setVisible(heroPassed && !optionsVisible);
    });
    observer.observe(hero); observer.observe(options);
    return () => observer.disconnect();
  }, []);
  return visible ? <div className={s.mobileSticky}><span><strong>{selected.name}</strong><small>£{selected.price} · Free UK delivery</small></span><a className={s.button} href="#options">Choose <Arrow /></a></div> : null;
}
export default function Homepage() {
  const [selected, setSelected] = useState(variants[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  function selectVariant(variant) { setSelected(variant); homepageEvent("variant_selected", { variant: variant.id }); }
  return <div className={s.home} id="top"><a className={s.skipLink} href="#main">Skip to content</a><div className={s.announcement}>Free UK delivery <span>·</span> Ready to use <span>·</span> No subscription</div>
    <header className={s.header}><div className={s.wrap}><a href="#top" aria-label="TapRank home"><Logo /></a><nav className={s.desktopNav} aria-label="Main navigation"><a href="#how-it-works">How it works</a><a href="#options">Options</a><a href="#custom">Custom</a><a href="#faq">FAQ</a></nav><a className={s.navBuy} href="#options">Buy TapRank <Arrow /></a><button className={s.menuButton} type="button" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button></div>{menuOpen && <nav id="mobile-nav" className={s.mobileNav} aria-label="Mobile navigation">{[["How it works", "how-it-works"], ["Options", "options"], ["Custom", "custom"], ["FAQ", "faq"]].map(([name, id]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{name}</a>)}</nav>}</header>
    <main id="main"><Hero /><TapDemo /><ActionShowcase /><VariantSelector selected={selected} onSelect={selectVariant} /><CustomShowcase onSelect={selectVariant} /><Ordering /><TrustStrip /><FAQ /><FinalCTA /></main>
    <footer className={s.footer}><div className={`${s.wrap} ${s.footerGrid}`}><div><a href="#top" aria-label="TapRank home"><Logo /></a><p>Your business. One tap away.</p></div><div><strong>Explore</strong><a href="#options">Choose your TapRank</a><a href="/r/barber-demo">Barber demo</a><a href="/r/restaurant-demo">Restaurant demo</a><a href="/r/salon-demo">Salon demo</a></div><div><strong>Here to help</strong><a href="/order-details">Order setup</a><a href="/privacy">Privacy</a><a href={TAPRANK_CONTACT.callHref}>Call TapRank</a><a href={`mailto:${TAPRANK_CONTACT.email}`}>Email TapRank</a></div></div><div className={`${s.wrap} ${s.footerBottom}`}><span>© {new Date().getFullYear()} TapRank</span><span>A7 acrylic NFC + QR stands. Made for your business.</span></div></footer><MobilePurchase selected={selected} />
  </div>;
}
