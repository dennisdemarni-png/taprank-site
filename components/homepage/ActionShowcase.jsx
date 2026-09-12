import { useState } from "react";
import ActionPreview from "./ActionPreview";
import { actions } from "./content";
import { Eyebrow } from "./Visuals";
import { homepageEvent } from "../../lib/homepageEvents";
import { checkoutFor } from "../../lib/commerce";
import { externalLinkProps } from "../../lib/publicLinks";
import s from "./Homepage.module.css";
export default function ActionShowcase() {
  const [activeId, setActiveId] = useState(actions[0].id);
  const active = actions.find(action => action.id === activeId) || actions[0];
  return <>
    <section className={`${s.wrap} ${s.problem}`}><Eyebrow>Keep the moment going</Eyebrow><h2>They had a great experience.<br /><span>Don’t make them search<br className={s.desktopBreak} /> for you later.</span></h2><p>A review, a follow, a reason to come back. TapRank puts the next step right where your customer already is.</p></section>
    <section className={`${s.wrap} ${s.actionSection}`} aria-labelledby="actions-title"><div className={s.sectionHeading}><div><Eyebrow>One page. Your possibilities.</Eyebrow><h2 id="actions-title">What happens next<br /><em>is up to them.</em></h2></div><p>Your TapRank page brings your business links together. Choose the actions that matter to you.</p></div>
      <div className={s.actionTabs} aria-label="Explore customer actions">{actions.map(action => <button key={action.id} type="button" aria-pressed={active.id === action.id} aria-controls="action-preview" onClick={() => { setActiveId(action.id); homepageEvent("how_it_works_interaction", { action: action.id }); }}>{action.label}<span aria-hidden="true">↗</span></button>)}</div>
      <div className={s.actionPanel} id="action-preview"><div className={s.actionCopy} aria-live="polite"><span className={s.actionNumber}>0{actions.indexOf(active) + 1} / 06</span><h3>{active.title}</h3><p>{active.copy}</p><span className={s.exampleLabel}>TapRank page · illustrative action preview</span></div><div className={s.actionArt}><ActionPreview actionId={active.id} /></div></div>
    </section>
    <section className={`${s.wrap} ${s.difference}`} aria-labelledby="difference-title"><div><Eyebrow>The TapRank difference</Eyebrow><h2 id="difference-title">More than<br />a review stand.</h2><p>The stand starts the connection.<br />Your TapRank page makes it useful.</p></div><div><div className={s.comparison}><div><span>A single-link stand</span><p>Tap / scan <b aria-hidden="true">→</b> One destination</p></div><div><span>With TapRank</span><p>NFC + QR <b aria-hidden="true">→</b> Your TapRank page</p><div className={s.actionBranches}><span>Reviews</span><span>Socials</span><span>Bookings</span><span>Menu & more</span></div></div></div><a className={s.differenceCta} href={checkoutFor("google")} {...externalLinkProps(checkoutFor("google"))} onClick={() => homepageEvent("square_checkout_click", { variant: "google", design: "new" })}>Get Google Review TapRank · £64.99 <span aria-hidden="true">↗</span></a></div></section>
  </>;
}
