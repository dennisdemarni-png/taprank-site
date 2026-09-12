import { Eyebrow, Arrow } from "./Visuals";
import { checkoutFor } from "../../lib/commerce";
import { externalLinkProps } from "../../lib/publicLinks";
import { homepageEvent } from "../../lib/homepageEvents";
import { customerProof } from "./content";
import s from "./Homepage.module.css";

// Review and result supplied by TapRank. This is an individual review, not a
// business TrustScore. The result is a separate anonymous customer example.
export default function CustomerProof() {
  const checkoutUrl = checkoutFor("google");
  return <section className={`${s.wrap} ${s.customerProof}`} aria-labelledby="proof-title">
    <Eyebrow>In business, in practice</Eyebrow>
    <h2 id="proof-title">Small stand. Real experiences.</h2>
    <div className={s.proofGrid}>
      <article className={s.resultProof} aria-label="One business’s review growth">
        <p className={s.proofLabel}>Real customer result</p>
        <strong className={s.resultNumber}><span>{customerProof.metricPrefix}</span>{customerProof.metric}</strong>
        <h3>the reviews<br /><span>in approximately 2 months</span></h3>
        <p>{customerProof.summary}</p>
        <small>{customerProof.disclaimer}</small>
      </article>
      <figure className={s.reviewProof}>
        <div className={s.reviewStars} aria-label="This customer rated TapRank five out of five stars">★★★★★</div>
        <blockquote>
          <p>“{customerProof.quoteLead}”</p>
          <p>“{customerProof.quoteBody}”</p>
        </blockquote>
        <figcaption><strong>{customerProof.reviewer}</strong><span>{customerProof.sourceLabel}</span></figcaption>
        <a href={customerProof.sourceUrl} {...externalLinkProps(customerProof.sourceUrl)} className={s.textLink}>View review on Trustpilot <Arrow /></a>
      </figure>
    </div>
    <div className={s.proofPurchase}><span><strong>Get the same system for your business</strong><small>Google Review TapRank · £64.99</small></span><a className={s.button} href={checkoutUrl} {...externalLinkProps(checkoutUrl)} onClick={() => homepageEvent("square_checkout_click", { variant: "google", design: "new" })}>Buy now <Arrow /></a></div>
  </section>;
}
