import { useEffect, useState } from "react";
import { assets } from "./content";
import { Arrow, Eyebrow, Phone, Stand } from "./Visuals";
import { homepageEvent } from "../../lib/homepageEvents";
import s from "./Homepage.module.css";
const steps = [
  ["Tap or scan", "A phone, a stand, a simple connection. NFC and QR both open the same page."],
  ["Your page opens", "Your business and useful links, together on one mobile page. No TapRank app needed."],
  ["They choose an action", "Leave a review. Follow along. Make a booking. Your customer chooses what comes next."],
];
export default function TapDemo({ googleDesign }) {
  const [step, setStep] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    const openFromHero = () => { if (window.location.hash === "#watch-demo") setShowVideo(true); };
    openFromHero();
    window.addEventListener("hashchange", openFromHero);
    return () => window.removeEventListener("hashchange", openFromHero);
  }, []);
  return <section className={s.demoSection} id="how-it-works" aria-labelledby="demo-title"><div className={s.wrap}>
    <div className={s.sectionHeading}><div><Eyebrow>From your counter to their phone</Eyebrow><h2 id="demo-title">A small tap.<br /><em>A world of next steps.</em></h2></div><p>No typing. No searching.<br />Just an easy way to connect.</p></div>
    <div className={s.demoGrid}><div className={s.demoVisual} data-step={step}><div className={s.demoLabels}><span>Physical TapRank stand</span><span>Hosted TapRank<br />business page</span></div><span className={s.demoOrbit} aria-hidden="true" /><div className={s.demoStand}><Stand src={googleDesign.image} alt={`Google Review ${googleDesign.name} TapRank stand`} /></div><div className={s.demoPhone}><Phone /></div><span className={s.nfcSignal} aria-hidden="true">)))</span><div className={s.demoResult} aria-hidden="true"><span>TapRank page opened</span><strong>Review · Follow · Book <Arrow /></strong></div></div>
    <div className={s.demoSteps} aria-label="Explore how TapRank works">{steps.map(([title, copy], index) => <button type="button" key={title} aria-pressed={step === index} className={s.demoStep} onClick={() => { setStep(index); homepageEvent("how_it_works_interaction", { step: index + 1 }); }} data-event="how_it_works_interaction"><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><span aria-hidden="true">↗</span></button>)}<a className={s.demoLink} href="/r/restaurant-demo">Explore a live example <Arrow /></a></div></div>
    <div className={s.videoRow} id="watch-demo"><div><strong>See a real tap in action.</strong><p>See how TapRank connects your stand to your business page.</p></div><button className={s.outlineButton} type="button" aria-expanded={showVideo} aria-controls="taprank-video" onClick={() => setShowVideo(!showVideo)}>{showVideo ? "Close video" : "▶ Watch the 8-second demo"}</button></div>
    <div id="taprank-video">{showVideo && <div className={s.videoPanel}><video controls playsInline preload="none" poster={assets.videoPoster} src={assets.video} onPlay={() => homepageEvent("demo_video_play")} aria-label="TapRank product demonstration" /><p>Video description: a phone taps the NFC area, opens a TapRank business page, and shows the customer action links.</p></div>}</div>
  </div></section>;
}
