import { useState } from "react";
import ProductDemoVideo from "../ProductDemoVideo";
import { Arrow, Eyebrow, Phone, Stand } from "./Visuals";
import { checkoutFor } from "../../lib/commerce";
import { externalLinkProps } from "../../lib/publicLinks";
import { homepageEvent } from "../../lib/homepageEvents";
import s from "./Homepage.module.css";
const steps = [
  ["Tap or scan", "A phone, a stand, a simple connection. NFC and QR both open the same page."],
  ["Your page opens", "Your business and useful links, together on one mobile page. No TapRank app needed."],
  ["They choose an action", "Leave a review. Follow along. Make a booking. Your customer chooses what comes next."],
];
export default function TapDemo({ googleDesign }) {
  const [step, setStep] = useState(0);
  const googleCheckout = checkoutFor("google");
  return <section className={s.demoSection} id="how-it-works" aria-labelledby="demo-title"><div className={s.wrap}>
    <div className={s.sectionHeading}><div><Eyebrow>From your counter to their phone</Eyebrow><h2 id="demo-title">A small tap.<br /><em>A world of next steps.</em></h2></div><p>No typing. No searching.<br />Just an easy way to connect.</p></div>
    <div id="watch-demo" className={s.prominentVideo}><ProductDemoVideo theme="dark" headingId="homepage-video-title" onPlay={() => homepageEvent("demo_video_play")} /></div>
    <div className={s.demoGrid}><div className={s.demoVisual} data-step={step}><div className={s.demoLabels}><span>Physical TapRank stand</span><span>Hosted TapRank<br />business page</span></div><span className={s.demoOrbit} aria-hidden="true" /><div className={s.demoStand}><Stand src={googleDesign.image} alt={`Google Review ${googleDesign.name} TapRank stand`} /></div><div className={s.demoPhone}><Phone /></div><span className={s.nfcSignal} aria-hidden="true">)))</span><div className={s.demoResult} aria-hidden="true"><span>TapRank page opened</span><strong>Review · Follow · Book <Arrow /></strong></div></div>
    <div className={s.demoSteps} aria-label="Explore how TapRank works">{steps.map(([title, copy], index) => <button type="button" key={title} aria-pressed={step === index} className={s.demoStep} onClick={() => { setStep(index); homepageEvent("how_it_works_interaction", { step: index + 1 }); }} data-event="how_it_works_interaction"><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><span aria-hidden="true">↗</span></button>)}<a className={s.demoLink} href="/r/restaurant-demo">Explore a live example <Arrow /></a></div></div>
    <div className={s.sectionPurchasePrompt}><span><strong>Ready to put TapRank on your counter?</strong><small>Google Review TapRank · £64.99 · Free UK delivery</small></span><a className={s.button} href={googleCheckout} {...externalLinkProps(googleCheckout)} onClick={() => homepageEvent("square_checkout_click", { variant: "google", design: "new" })}>Buy now <Arrow /></a></div>
  </div></section>;
}
