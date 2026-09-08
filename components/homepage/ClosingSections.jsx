import { assets, faqs, variants } from "./content";
import { Arrow, Eyebrow, Phone, Stand, TrustLine } from "./Visuals";
import { homepageEvent } from "../../lib/homepageEvents";
import { TAPRANK_CONTACT, makeContactMailto } from "../../lib/contact";
import s from "./Homepage.module.css";
export function CustomShowcase({ onSelect }) {
  return <section className={s.customSection} id="custom" aria-labelledby="custom-title"><div className={`${s.wrap} ${s.customGrid}`}><div className={s.customCopy}><Eyebrow>Custom Logo + Branding · £84.99</Eyebrow><h2 id="custom-title">Your brand doesn’t<br />stop at the counter.</h2><p>Your logo. Your colours. Your TapRank page. A tailored stand and a custom-branded mobile page, made to feel like they belong to your business.</p><a href="#options" className={s.lightButton} onClick={() => onSelect(variants[3])}>Make it yours <Arrow /></a><span>Physical stand + custom-branded hosted page</span></div><div className={s.customArt}><Stand src={assets.custom} alt="Custom TapRank stand examples with gym, Space Jump and restaurant branding" className={s.customCluster} /><Phone src={assets.spacePage} alt="Space Jump custom-branded TapRank page example" className={s.customPhone} /><span className={s.customCaption}>Custom branding examples</span></div></div></section>;
}
export function Ordering() {
  const steps = [["Choose your TapRank", "Pick Google Review, Instagram, Tripadvisor or Custom."], ["Send your details", "Share your business links and any custom branding."], ["We set it all up", "We prepare your page and configure both QR and NFC."], ["Put it on your counter", "It arrives ready for your customers to tap or scan."]];
  return <section className={`${s.wrap} ${s.ordering}`} aria-labelledby="ordering-title"><div className={s.sectionHeading}><div><Eyebrow>You run your business. We handle the setup.</Eyebrow><h2 id="ordering-title">Ready to go.<br /><em>Right out of the box.</em></h2></div><p>No tag programming.<br />No QR code generating.<br />We take care of it.</p></div><ol>{steps.map(([title, copy], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol><div className={s.orderingNote}><strong>Dispatched within 48 hours. Free UK delivery.</strong><a href="/order-details">Already ordered? Send your setup details <Arrow /></a></div></section>;
}
export function TrustStrip() {
  return <div className={s.trustStrip}><div className={s.wrap}><p><strong>1 year</strong><span>Replacement warranty</span></p><p><strong>£0</strong><span>Monthly subscription required</span></p><p><strong>All set</strong><span>NFC + QR configured</span></p><p><strong>No app</strong><span>Just tap or scan</span></p></div></div>;
}
export function FAQ() {
  return <section className={`${s.wrap} ${s.faq}`} id="faq" aria-labelledby="faq-title"><div><Eyebrow>A few things you might be wondering</Eyebrow><h2 id="faq-title">Good questions.<br />Simple answers.</h2><p>Need a hand choosing?</p><a className={s.textLink} href={`mailto:${TAPRANK_CONTACT.email}`}>Talk to TapRank <Arrow /></a></div><div>{faqs.map(([q, a], i) => <details key={q} onToggle={event => { if (event.currentTarget.open) homepageEvent("faq_open", { question: i }); }} data-event="faq_open"><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}<a className={s.bulkLink} href={makeContactMailto("Multiple TapRank stands", "Hi TapRank, I would like to discuss a multiple-stand order.\n\nQuantity:\nLocations:\nBranding needs:\n")}>Ordering for multiple counters or locations? Get in touch <Arrow /></a></div></section>;
}
export function FinalCTA() {
  return <section className={s.finalSection} id="final-cta"><div className={`${s.wrap} ${s.finalGrid}`}><div><Eyebrow>Connect customers to what matters.</Eyebrow><h2>The next step<br />starts with a tap.</h2><a href="#options" className={s.lightButton}>Choose your TapRank <Arrow /></a><TrustLine /></div><div className={s.finalStands}><Stand src={assets.instagram} alt="Instagram TapRank stand" /><Stand alt="Google Review TapRank stand" /><Stand src={assets.tripadvisor} alt="Tripadvisor TapRank stand" /></div></div></section>;
}
