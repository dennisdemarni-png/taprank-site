import { assets, faqs } from "./content";
import { Arrow, Eyebrow, Stand, TrustLine } from "./Visuals";
import { homepageEvent } from "../../lib/homepageEvents";
import { TAPRANK_CONTACT, makeContactMailto } from "../../lib/contact";
import s from "./Homepage.module.css";
export function Ordering() {
  const steps = [["Choose your TapRank face", "Pick Google Review, Instagram or Tripadvisor."], ["Send your details", "Share your business and customer-action links."], ["We set it all up", "We prepare your page and configure both QR and NFC."], ["Put it on your counter", "It arrives ready for your customers to tap or scan."]];
  return <section className={`${s.wrap} ${s.ordering}`} aria-labelledby="ordering-title"><div className={s.sectionHeading}><div><Eyebrow>You run your business. We handle the setup.</Eyebrow><h2 id="ordering-title">Ready to go.<br /><em>Right out of the box.</em></h2></div><p>No tag programming.<br />No QR code generating.<br />We take care of it.</p></div><ol>{steps.map(([title, copy], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol><div className={s.orderingNote}><strong>Dispatched within 48 hours of receiving your business details. Free UK delivery.</strong><a href="/order-details">Already ordered? Send your setup details <Arrow /></a></div></section>;
}
export function TrustStrip() {
  return <div className={s.trustStrip}><div className={s.wrap}><p><strong>1 year</strong><span>Replacement warranty</span></p><p><strong>£0</strong><span>Monthly subscription required</span></p><p><strong>All set</strong><span>NFC + QR configured</span></p><p><strong>No app</strong><span>Just tap or scan</span></p></div></div>;
}
export function FAQ() {
  return <section className={`${s.wrap} ${s.faq}`} id="faq" aria-labelledby="faq-title"><div><Eyebrow>A few things you might be wondering</Eyebrow><h2 id="faq-title">Good questions.<br />Simple answers.</h2><p>Need a hand choosing?</p><a className={s.textLink} href={`mailto:${TAPRANK_CONTACT.email}`}>Talk to TapRank <Arrow /></a></div><div>{faqs.map(([q, a], i) => <details key={q} onToggle={event => { if (event.currentTarget.open) homepageEvent("faq_open", { question: i }); }} data-event="faq_open"><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}<a className={s.bulkLink} href={makeContactMailto("Multiple TapRank stands", "Hi TapRank, I would like to discuss a multiple-stand order.\n\nQuantity:\nLocations:\nBranding needs:\n")}>Ordering for multiple counters or locations? Get in touch <Arrow /></a></div></section>;
}
export function FinalCTA({ googleDesign }) {
  return <section className={s.finalSection} id="final-cta"><div className={`${s.wrap} ${s.finalGrid}`}><div><Eyebrow>Connect customers to what matters.</Eyebrow><h2>The next step<br />starts with a tap.</h2><a href="#options" className={s.lightButton}>Choose your TapRank face <Arrow /></a><TrustLine /></div><div className={s.finalStands}><Stand src={assets.instagram} alt="Instagram TapRank stand" /><Stand src={googleDesign.image} alt={`Google Review ${googleDesign.name} TapRank stand`} /><Stand src={assets.tripadvisor} alt="Tripadvisor TapRank stand" /></div></div></section>;
}
